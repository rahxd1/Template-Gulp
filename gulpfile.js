var gulp = require('gulp');

var uglify = require('gulp-uglify');

var sass = require('gulp-sass');

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
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.on('error', errorlog)
		.pipe(gulp.dest(outputDir+'/js'))
		.pipe(connect.reload());	
});

gulp.task('styles', function(){
	gulp.src('src/scss/**/*.{scss,sass}')
		.pipe(sass({
			sytle: 'compressed'}
		).on('error', sass.logError))
		.pipe(prefix('last 2 versions'))
		.pipe(gulp.dest(outputDir+'/css'))
		.pipe(connect.reload());	
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
	gulp.watch('src/js/*.js', ['scripts'])
	gulp.watch('src/scss/**/*.{scss,sass}', ['styles'])
	gulp.watch('src/templates/**/*.jade',['jade-watch'])
});

gulp.task('default', ['scripts', 'styles', 'jade-compile' ,'watch', 'connect']);