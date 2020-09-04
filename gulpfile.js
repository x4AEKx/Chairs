const { src, dest, watch, series, parallel } = require('gulp')
const gulpPug = require('gulp-pug')
const gulpSass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const htmlMin = require('gulp-htmlmin')
const imageMin = require('gulp-imagemin')
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
        .pipe(dest('./build/'))
        .pipe(browserSync.stream())
}

function sass() {
    return src('./src/sass/*.sass')
        .pipe(gulpSass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(dest('./build/style/'))
        .pipe(browserSync.stream())
}

function fonts() {
  return src('./src/fonts/**/*')
    .pipe(dest('./build/fonts/'))
}

function scripts() {
	return src('./src/scripts/**/*.js')
	  .pipe(dest('./build/scripts/'))
}

function imageMinify() {
	return src('src/img/*.{gif,png,jpg,svg,webp}')
	  	.pipe(imageMin([
			imageMin.gifsicle({ interlaced: true }),
			imageMin.mozjpeg({
				quality: 75,
				progressive: true
			}),
			imageMin.optipng({ optimizationLevel: 5 }),
			imageMin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
		  		]
			})
	  	]))
	  	.pipe(dest('build/img'))
}

function clear() {
    return del('./build')
}

function serve() {
    browserSync.init({
        server: './build/'
    })

    watch('./src/pug/**/*.pug', series(pug)).on('change', browserSync.reload)
    watch('./src/sass/**/*.sass', series(sass)).on('change', browserSync.reload)
    watch('./src/scripts/**/*.js', series(scripts)).on('change', browserSync.reload)
    watch('*.html').on('change', browserSync.reload)
}

exports.build = series(clear, parallel(pug, sass, fonts, imageMinify, scripts))
exports.serve = series(clear, parallel(pug, sass, fonts, imageMinify, scripts), serve)