var gulp = require('gulp'),
    gUtil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    less = require('gulp-less'),
    connect = require('gulp-connect');

var jsSources = [
    'public/js/app.js',
    'public/js/controllers.js',
    'public/js/services.js',
    'public/js/components/project/project.js',
];
var lessSources = ['public/styles/*.less'];
var htmlSources = ['public/**/*html'];

gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('scripts.js'))
        .pipe(browserify())
        .pipe(gulp.dest('public/js'))
        .pipe(connect.reload());
});

gulp.task('less', function () {
    gulp.src(lessSources)
        .pipe(less())
        .pipe(gulp.dest('public/styles'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src(htmlSources)
        .pipe(connect.reload());
});

gulp.task('importCss', function(){
    gulp.src('node_modules/angular-material/angular-material.css')
        .pipe(gulp.dest('public/styles'));
});

gulp.task('watch', function () {
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(lessSources, ['less']);
});

gulp.task('connect', function () {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('default', ['html', 'less', 'js', 'importCss', 'connect', 'watch']);
