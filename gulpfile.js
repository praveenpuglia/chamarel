var gulp = require('gulp');
var rename = require('gulp-rename');
var myth = require('gulp-myth');

var path = {
    css : "show-me-my-colors.css"
}

gulp.task('css', function () {
    return gulp.src(path.css)
        .pipe(myth())
        .pipe(rename("style.css"))
        .pipe(gulp.dest('.'));
});

gulp.task("watch", function(){
    gulp.watch(path.css,["css"]);
});

gulp.task("default",["css","watch"]);