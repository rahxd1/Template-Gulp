'use strict';

var gulp = require('gulp');

var uglify = require('gulp-uglify');

var compass = require('gulp-compass');

var imagemin = require('gulp-imagemin');

var prefix = require('gulp-autoprefixer');

var jade = require('gulp-jade');

var connect = require('gulp-connect');

var outputDir = 'build/development';

function errorlog(error){
	console.error.bind(error);
	this.emit('end');
}

// Tasks

gulp.task('scripts', function(){
	gulp.src('src/js/**/*.js')
		.pipe(uglify())
		.on('error', errorlog)
		.pipe(gulp.dest(outputDir+'/js'))
		.pipe(connect.reload());	
});

gulp.task('compass', function() {
  gulp.src('src/scss/**/*.{scss,sass}')
    .pipe(compass({
    	style: 'expanded',
      	css: outputDir+'/css',
      	sass: 'src/scss',
      	require: ['susy',]
    }))
    .pipe(prefix('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .on('error', function(error) {
      // Would like to catch the error here 
      console.log(error);
      this.emit('end');
    })
    .pipe(gulp.dest(outputDir+'/css'))
    .pipe(connect.reload());;
});

gulp.task('image', function(){
	gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest(outputDir+'/img')); // Comprimir las imagenes en la misma carpeta	
});

gulp.task('jade-compile', function(){
	return gulp.src('src/templates/**/*.jade')
		.pipe(jade(
			{
				pretty:true
			}
		))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload());
});

gulp.task('jade-watch', ['jade-compile'])

gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereolad: true 
	});
});

gulp.task('watch', function(){
	gulp.watch('src/js/**/*.js', ['scripts'])
	gulp.watch('src/scss/**/*.{scss,sass}', ['compass'])
	gulp.watch('src/templates/**/*.jade',['jade-watch'])
});

gulp.task('default', ['scripts', 'compass', 'jade-compile' ,'watch', 'connect']);