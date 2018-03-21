const gulp = require('gulp')
var sourceFiles = [ 'dev/**/*.xml', 'dev/**/*.less', 'dev/**/*.json' ];

gulp.task('copy', function(){
  return gulp
    .src(sourceFiles)
    .pipe(gulp.dest('./_dist'));
})

gulp.task('copy2', function(){
  return gulp
    .src(['dev/assets/**/**.**'])
    .pipe(gulp.dest('./_dist/assets'));
})