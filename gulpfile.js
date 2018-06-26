var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var wait = require('gulp-wait');
var rigger = require('gulp-rigger');

gulp.task('sass', function () {
	return gulp
		.src('./src/scss/style.scss')
		.pipe(wait(500))
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 version', '> 5%']
		}))
		.pipe(gulp.dest('./build'))
});

gulp.task('js', function () {
	gulp.src('src/js/script.js')
		.pipe(rigger())
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./build'));
});
