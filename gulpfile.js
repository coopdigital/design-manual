var gulp = require('gulp');
var sassLint = require('gulp-sass-lint');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var include = require('gulp-include');

gulp.task('jekyll', function (gulpCallBack){
  var spawn = require('child_process').spawn;
  var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
  });
});

gulp.task('lintcss', function() {
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
  return gulp.src('styleguide/_assets/css/main.scss')
    .pipe(scss({
        outputStyle: 'compressed',
        includePaths: ['styles', 'bower_components', 'bower_components/foundation/scss/']
      }))
      .pipe(scss.sync().on('error', scss.logError))
      .pipe(autoprefixer({browsers: ['> 5%', 'last 2 versions']}))
      .pipe(gulp.dest('styleguide/css/'));
});

// gulp.task('autoprefix', function () {
//   return gulp.src('styleguide/css/main.css')
//     .pipe(autoprefixer({
//       browsers: ['> 5%', 'last 2 versions'],
//       cascade: false
//     }))
//     .pipe(gulp.dest('build/css/'));
// });

gulp.task('buildjs', function() {
  return gulp.src('styleguide/_assets/js/main.js')
    .pipe(include())
      .on('error', console.log)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('styleguide/js/'));
});

gulp.task('copyassets', function() {
  return gulp.src('assets/**/*')
    .pipe(gulp.dest('styleguide/assets/'));
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    port: 8888,
    livereload: true,
    root: 'build/'
  });
});

gulp.task('default', [
  'build',
  'connect'
]);

gulp.task('build', [
  // 'lintcss',
  'copyassets',
  'buildcss',
  'buildjs',
  'jekyll'
]);

gulp.task('watch', ['default'], function() {
  gulp.watch([
    'styles/**/*.scss',
    'scripts/**/*.js'
  ], ['build']);
});
