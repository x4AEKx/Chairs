const { src, dest, watch, series } = require('gulp')
const gulpPug = require('gulp-pug')
const del = require('del')
const browserSync = require('browser-sync').create()

function pug() {
    return src('./src/pug/*.pug')
        .pipe(gulpPug({
            pretty: true
        }))
        .pipe(dest('./'))
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
    watch('*.html').on('change', browserSync.reload)
}

exports.build = series(clear, pug)
exports.serve = series(clear, pug, serve)