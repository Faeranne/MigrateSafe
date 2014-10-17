gulp = require 'gulp'
coffee = require 'gulp-coffee'

gulp.task 'build', ['coffee']

gulp.task 'coffee', () ->
    gulp.src '*.coffee'
        .pipe coffee()
        .pipe gulp.dest './'

