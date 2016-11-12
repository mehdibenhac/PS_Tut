var gulp = require('gulp');
var jshint = require('gulp-jshint');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');

var jsfiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    return gulp.src(jsfiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/js/*.js', './public/css/*.css'], {
        read: false
    });
    var injectOptions = {
        ignorePath: '/public',
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.jade')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsfiles
    };

    return nodemon(options).on('restart', function (ev) {
        console.log('Restarting server...');
    });

});