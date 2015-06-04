var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('scripts:compile', function () {
    gulp.src('src/**/*.ts')
        .pipe($.sourcemaps.init())
        .pipe($.typescript({
            noImplicitAny: true,
            target: 'ES5',
            module: 'commonjs',
            declarationFiles: true,
            typescript: require('typescript')
        }))
        .pipe($.size())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp'));
});

gulp.task('views', function () {
    gulp.src('src/views/**/*.html')
        .pipe(gulp.dest('.tmp/views/'));
});

gulp.task('usemin', function () {
    return gulp.src('src/index.html')
        .pipe($.usemin({
            css: ['concat', $.rev(), $.size()],
            js: [$.rev(), $.size()]
        }))
        .pipe(gulp.dest('.tmp/'));
})

gulp.task('scripts', ['scripts:compile', 'usemin'], function () {
    gulp.src('.tmp/scripts/app.js')
        .pipe($.sourcemaps.init())
        .pipe($.webpack())
        .pipe($.rename('app-bundle.js'))
        //.pipe($.uglify())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('serve', ['scripts', 'views'], function () {
    gulp.src('.tmp')
        .pipe($.webserver({
            livereload: true,
            open: true,
            fallback: 'index.html'
        }));

    gulp.watch('src/index.html', ['scripts']);
    gulp.watch('src/views/**/*.html', ['views']);
    gulp.watch('src/scripts/**/*.ts', ['scripts']);
    gulp.watch('node_modules/**/*.js', ['usemin']);
});
