var gulp = require('gulp');
var bower = require('gulp-bower');
var sassLint = require('gulp-sass-lint');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');

var src = 'src/';
var dist = 'dist/';

gulp.task('jekyll', function (gulpCallBack){
  var spawn = require('child_process').spawn;
  var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit', cwd: 'src'});

  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
  });
});

gulp.task('lintcss', function() {
  return gulp.src([
      'assets/_co-op-styleguide.scss',
      'assets/scss/patterns/**/*.scss',
      '!assets/scss/foundation-custom/**/*.scss',
      '!assets/scss/patterns/_ie.scss'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('buildcss', function() {
  return gulp.src('assets/kitchen-sink.scss')
    .pipe(scss({
        outputStyle: 'compressed',
        sourcemap: true,
        includePaths: ['bower_components', 'bower_components/foundation/scss/']
      }))
      .pipe(scss.sync().on('error', scss.logError))
      .pipe(autoprefixer({browsers: ['> 5%', 'last 2 versions']}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dist + 'css/'));
});

gulp.task('autoprefix', function () {
  return gulp.src(dist + 'css/kitchen-sink.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(dist + 'css/'));
});

// app.use(wwwhisper(false));

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    port: 8888,
    livereload: true,
    root: 'dist/'
  });
});

gulp.task('bower', bower);

gulp.task('default', [
  'build',
  'connect'
]);

gulp.task('build', [
  'jekyll',
  'lintcss',
  'buildcss',
  'autoprefix',
  'bower'
]);

gulp.task('watch', ['default'], function() {
  gulp.watch([
    'assets/kitchen-sink.scss',
    'assets/_co-op-styleguide.scss',
    'assets/scss/**/*.scss'
  ], ['build']);
});
