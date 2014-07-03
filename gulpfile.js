// include gulp
var gulp = require('gulp');

//include plug-ins
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var livereload = require('gulp-livereload');
var	lr = require('tiny-lr');
var server = lr();
var sassSources = [
	'src/sass/**/*.scss'
];


// JS hint task
gulp.task('jshint', function() {
	gulp.src('./src/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
	var imgSrc = './src/images/**/*',
		imgDst = './build/images';

	gulp.src(imgSrc)
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});



// JS concat, strip debugging and minify
gulp.task('scripts', function() {
	gulp.src(['./src/scripts/vendor/*.js','./src/scripts/*.js'])
		.pipe(concat('script.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('./build/scripts/'))
		.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('sass', function() {
	gulp.src(sassSources)
		.pipe(sass({style: 'expanded', lineNumbers: true}))
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    .pipe(gulp.dest('./build/css/'))
	    .pipe(rename({ suffix: '.min' }))
	    .pipe(minifycss())
	    .pipe(gulp.dest('./build/css/'))
	    .pipe(notify({ message: 'Styles task complete' }))
		.pipe(livereload());
});

// default gulp task
gulp.task('default', ['imagemin', 'scripts', 'sass'], function() {
	var server = livereload();

	// watch for HTML changes
	gulp.watch(['./*.php','./parts/*.php','./**/*.html']).on('change', function(file) {
          server.changed(file.path);
      });

	// watch for JS changes
	gulp.watch('./src/scripts/*.js', function() {
		gulp.run('jshint', 'scripts');
	});

	// watch for SASS changes
	gulp.watch('./src/sass/**/*.scss', function() {
		gulp.run('sass');
	});

})
