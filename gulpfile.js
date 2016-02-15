var gulp = require('gulp');
var sassLint = require('gulp-sass-lint');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var include = require('gulp-include');

gulp.task('jekyll', function (gulpCallBack){
  // Build Style Guide pages and compile style guide assets
  var spawn = require('child_process').spawn;
  var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
  });
});

gulp.task('lintcss', function() {
  // Lint core toolkit CSS
  return gulp.src([
      'styles/_co-op-styleguide.scss',
      'styles/scss/patterns/**/*.scss',
      '!styles/scss/foundation-custom/**/*.scss',
      '!styles/scss/patterns/_ie.scss'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('buildcss', function() {
  // Compile the Style Guide CSS into the Style Guide Jekyll source
  return gulp.src('styleguide/_assets/css/main.scss')
    .pipe(scss({
        outputStyle: 'compressed',
        includePaths: ['styles', 'bower_components', 'bower_components/foundation/scss/']
      }))
      .pipe(scss.sync().on('error', scss.logError))
      .pipe(autoprefixer({browsers: ['> 5%', 'last 2 versions']}))
      .pipe(gulp.dest('styleguide/css/'));
});

gulp.task('buildjs', function() {
  // Compile the Style Guide scripts into the Style Guide Jekyll source
  return gulp.src('styleguide/_assets/js/main.js')
    .pipe(include())
      .on('error', console.log)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('styleguide/js/'));
});

gulp.task('assets', function() {
  // Copy assets directory into the Style Guide Jekyll source
  return gulp.src('assets/**/*')
    .pipe(gulp.dest('styleguide/assets/'));
});

gulp.task('reload', ['build'], function () {
  gulp.src('_site/**/*')
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    port: 8888,
    livereload: true,
    root: '_site/'
  });
});

gulp.task('build', [
  // 'lintcss',
  'assets',
  'buildcss',
  'buildjs',
  'jekyll'
]);

gulp.task('watch', function() {
  gulp.watch([
    'assets/**/*',
    'styles/**/*',
    'scripts/**/*',
    'styleguide/**/*.html',
    'styleguide/_assets/**/*'
  ], ['reload']);
});

gulp.task('default', [
  'build',
  'connect',
  'watch'
]);
