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
var imagemin = require('gulp-imagemin');
var cssimport = require('gulp-cssimport');
var postcss = require('gulp-postcss');
var postcssCustomMedia = require('postcss-custom-media');
var spawn = require('child_process').spawn;

/**
 * Settings
 */
var src = 'src/';
var dest = 'build/';

var src_paths = {
  css: src + '_css/**/*.css',
  temp: src + 'temp/**/*',
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
  css: {
    outputStyle: 'compressed', 
    includePaths: [
      'node_modules',
      src + 'src/css/main.css'
    ],
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

var importOptions = {
    matchPattern: "!*.{pcss}",
    includePaths: [
      __dirname + '/node_modules/@coopdigital'
    ]
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


/**
 * Build tasks
 */
// Copy Co-op components

gulp.task('copy', function () {
  gulp.src([
    'node_modules/@coopdigital/**/*'
  ])
  .pipe(gulp.dest('src/_includes/pattern-library/components'))
});

// Jekyll
gulp.task('html', ['contentful', 'jekyll'], function() {
  return gulp.src(dest + '**/*.html')
    .pipe(connect.reload());
});

gulp.task('contentful', function(gulpCallBack) {
  var contentful = spawn('jekyll', ['contentful'], {stdio: 'inherit'});
  contentful.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll Contentful process exited with code: '+code);
  });
});

gulp.task('jekyll', ['contentful'], function (gulpCallBack){
  var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit', cwd: 'src'});
  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
  });
});

// Styles

gulp.task('css', () => gulp.src(src_paths.css)
.pipe(cssimport(importOptions))
.pipe(
  postcss([
    postcssCustomMedia(/* pluginOptions */)
  ])
)
.pipe(autoprefixer(settings.autoprefixer))
.pipe(gulp.dest(dest_paths.styles))

);

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
 * Watch tasks
 */
gulp.task('watch', function() {
  gulp.watch('src/_css/**/*.css', ['css']); 
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
gulp.task('build', ['html', 'css', 'vendorjs', 'js', 'imagemin', 'copy']);
gulp.task('server', ['build', 'watch', 'connect']);
gulp.task('default', ['build']);
