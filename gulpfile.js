var gulp = require('gulp'),
    gUtil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    minifyHTML = require('gulp-minify-html'),
    minifyCSS = require('gulp-minify-css'),
    jsonminify = require('gulp-jsonminify'),
    uglify = require('gulp-uglify');

var mode = 'development';
var jsSources = [
    'builds/development/js/app.js',
    'builds/development/js/controllers.js',
    'builds/development/js/services.js',
    'builds/development/js/filters.js',
    'builds/development/js/components/project/project.js',
];
var lessSources = ['builds/development/styles/*.less'];
var cssImportSources = ['node_modules/angular-material/angular-material.css'];
var htmlSources = ['builds/development/**/*html'];
var jsonSources = ['builds/development/js/data/**/*.json'];

gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('bundled.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
        .pipe(connect.reload());
});

gulp.task('less', function () {
    gulp.src(lessSources)
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('builds/development/styles'))
        .pipe(connect.reload());
});

gulp.task('import-css', function(){
    gulp.src(cssImportSources)
        .pipe(gulp.dest('builds/development/styles'));
});

gulp.task('html', function () {
    gulp.src(htmlSources)
        .pipe(connect.reload());
});

gulp.task('json', function() {
    gulp.src(jsonSources)
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(jsonSources, ['json']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(lessSources, ['less']);
});

gulp.task('connect', function () {
    connect.server({
        root: 'builds/development',
        livereload: true
    });
});

gulp.task('connect-production', function () {
    connect.server({
        root: 'builds/production'
    });
});

gulp.task('deploy', ['less', 'js', 'import-css', 'connect-production'], function () {
    mode = 'production';
    gulp.src('builds/development/js/bundled.js')
        .pipe(uglify())
        .pipe(gulp.dest('builds/production/js'));

    gulp.src(cssImportSources)
        .pipe(minifyCSS())
        .pipe(gulp.dest('builds/production/styles'));

    gulp.src('builds/development/styles/styles.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('builds/production/styles'));

    gulp.src(htmlSources)
        .pipe(minifyHTML())
        .pipe(gulp.dest('builds/production'));

    gulp.src(jsonSources)
        .pipe(jsonminify())
        .pipe(gulp.dest('builds/production/js/data'));
});

gulp.task('default', ['html', 'json', 'less', 'js', 'import-css', 'connect', 'watch']);
