var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    babel = require('gulp-babel');

gulp.task('serve', ['sass', 'babel'], function(){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['babel']);
});

var prefixOptions = {
  browsers: ['last 10 versions'],
  cascade: false
};

var babelOptions = {
  presets: ['es2015']
};

var errorOptions = {
  errorHandler: function(error) {
    console.log(error.message);
    this.emit('end');
  }
};

gulp.task('sass', function(){
  return gulp.src('./src/scss/**/*.scss')
    .pipe(plumber(errorOptions))
    .pipe(sass())
    .pipe(prefix(prefixOptions))
    .pipe(gulp.dest('dist/'))
});

gulp.task('babel', function(){
  return gulp.src('./src/js/*.js')
    .pipe(plumber(errorOptions))
    .pipe(babel(babelOptions))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['serve']);