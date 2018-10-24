var gulp = require('gulp');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var include = require('gulp-include');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var imagemin = require('gulp-imagemin');

/**
 * Settings
 */
var src = 'src/';
var dest = 'build/';

var src_paths = {
  styles: src + '_css/**/*.scss',
  scripts: src + '_js/*.js',
  assets: [
    src + '_assets/**/*',
    'node_modules/coop-frontend-toolkit/static/**/*'
  ],
  html: src + '**/*.html'
};

var dest_paths = {
  styles: dest + 'assets/css',
  scripts: dest + 'assets/js',
  assets: dest + 'assets'
};

var settings = {
  sass: {
    outputStyle: 'compressed',
    includePaths: [
      'node_modules',
      src + 'src/css'
    ]
  },
  autoprefixer: {
    browsers: ['> 5%', 'last 2 versions']
  },
  include: {
    includePaths: [
      __dirname + '/node_modules',
      __dirname + '/src/_js'
    ]
  }
};


/**
 * Lint tasks
 */
gulp.task('lintjs', function() {
  return gulp.src([
    src_paths.scripts,
    '!' + src + '_js/vendor'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('lintscss', function() {
  return gulp.src([
    src_paths.styles,
    '!src/_css/_prism.scss'
  ])
    .pipe(scsslint());
});


/**
 * Build tasks
 */

// Copy Co-op components
gulp.task('copy', function () {
  gulp.src([
    'node_modules/coop-components/**/*',
    '!node_modules/coop-components/package.json',
    '!node_modules/coop-components/package-lock.json'
  ])
  .pipe(gulp.dest('src/_includes/'));
});

// Jekyll
gulp.task('html', ['jekyll'], function() {
  return gulp.src(dest + '**/*.html')
    .pipe(connect.reload());
});
gulp.task('jekyll', function (gulpCallBack){
  var spawn = require('child_process').spawn;
  // Get Contenful content
  var contentful = spawn('jekyll', ['contentful']);
  var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit', cwd: 'src'});
  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
  });
});

// Styles
gulp.task('css', function() {
  return gulp.src(src_paths.styles)
    .pipe(sourcemaps.init())
      .pipe(sass(settings.sass))
      .on('error', sass.logError)
      .pipe(autoprefixer(settings.autoprefixer))
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(dest_paths.styles))
    .pipe(connect.reload());
});

// Scripts
gulp.task('js', ['lintjs'], function() {
  return gulp.src(src_paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(include(settings.include))
      .pipe(concat('main.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(dest_paths.scripts))
    .pipe(connect.reload());
});
gulp.task('vendorjs', function() {
  return gulp.src(['node_modules/coop-frontend-toolkit/scripts/vendor/**/*', src + '_js/vendor/**/*'])
    .pipe(gulp.dest(dest_paths.scripts + '/vendor'));
});

// Static assets
gulp.task('assets', function() {
  return gulp.src(src_paths.assets)
    .pipe(gulp.dest(dest_paths.assets))
    .pipe(connect.reload());
});
gulp.task('imagemin', ['assets'], function() {
  return gulp.src(dest_paths.assets + '/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(dest_paths.assets + '/images'));
});


/**
 * Tests
 */
gulp.task('testjs', function() {
  return gulp.src('test.js')
    .pipe(mocha());
});


/**
 * Watch tasks
 */
gulp.task('watch', function() {

  // Toolkit watching for local development
  gulp.watch('node_modules/coop-frontend-toolkit/styles/**/*.scss',  ['css']);
  gulp.watch('node_modules/coop-frontend-toolkit/scripts/**/*.js', ['js']);
  // Source
  gulp.watch('src/_css/**/*.scss',  ['css']);
  gulp.watch(src_paths.scripts, ['lintjs', 'js']);
  gulp.watch(src_paths.assets, ['imagemin']);
  gulp.watch(src_paths.html, ['html']);
});


/**
 * Local server
 */
gulp.task('connect', function() {
  connect.server({
    port: 9000,
    root: 'build',
    livereload: true
  });
});

/**
 * Run tasks
 */
gulp.task('test', ['testjs']);
gulp.task('build', ['html', 'css', 'vendorjs', 'js', 'imagemin', 'copy']);
gulp.task('server', ['build', 'watch', 'connect']);
gulp.task('default', ['build']);
