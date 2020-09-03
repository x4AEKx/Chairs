const { src, dest, watch, series, parallel } = require('gulp')
const gulpPug = require('gulp-pug')
const gulpSass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const htmlMin = require('gulp-htmlmin')
const del = require('del')
const browserSync = require('browser-sync').create()

function pug() {
    return src('./src/pug/*.pug')
        .pipe(gulpPug({
            // pretty: true
        }))
        .pipe(htmlMin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(dest('./'))
        .pipe(browserSync.stream())
}

function sass() {
    return src('./src/sass/*.sass')
        .pipe(gulpSass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(dest('./style/'))
        .pipe(browserSync.stream())
}

function clear() {
    return del('./build')
}

function serve() {

    browserSync.init({
        server: './'
    })

    watch('./src/pug/**/*.pug', series(pug)).on('change', browserSync.reload)
    watch('./src/sass/**/*.sass', series(sass)).on('change', browserSync.reload)
    watch('*.html').on('change', browserSync.reload)
}

exports.build = series(clear, parallel(pug, sass))
exports.serve = series(clear, parallel(pug, sass), serve)