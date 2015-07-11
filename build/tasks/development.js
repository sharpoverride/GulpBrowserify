'use strict';

var watchify    = require('watchify'),
    babelify    = require('babelify'),
    browserify  = require('browserify'),
    browserSync = require('browser-sync'),
    gulp        = require('gulp'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    gutil       = require('gulp-util'),
    sourcemaps  = require('gulp-sourcemaps'),
    assign      = require('lodash.assign');

var customOpts = {
    entries: ['./src/index.js'],
    debug: true
};

var opts = assign({}, watchify.args, customOpts);

var bundler = watchify(browserify(opts));
bundler.transform(babelify);

gulp.task('development', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);

function bundle() {
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify error'))
        .pipe(source('bundle.js'))
        // optional, remove you don't need to buffer file contents
        .pipe(buffer())
        // options, remove if you don't want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads maps from browserify
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream: true, once: true}))
        ;
}
