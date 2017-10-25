var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('es6-es5', () => {
  gulp.src(['src/*.js', '!src/index.js'])
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
  gulp.watch(['src/*.js', '!src/index.js'], ['default'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['es6-es5']);
gulp.task('dev', ['es6-es5', 'watch']);