var gulp    	 = require('gulp'),
	sass    	 = require('gulp-sass'),
	browserSync  = require('browser-sync').create(),
	concat       = require('gulp-concat'),
	concatCss    = require('gulp-concat-css'),
	uglify       = require('gulp-uglifyjs'),
	rigger 		 = require('gulp-rigger'),
	del          = require('del');
	imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
	cssnano      = require('gulp-cssnano');


gulp.task('sass',function() {
	return gulp.src('app/sass/**/style.+(sass|scss)')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
})

gulp.task('browser-sync',function() {
	browserSync.init({
		server: {
			baseDir: './app/'
		},
		notify: false
	})
})

gulp.task('clean',function() {
	return del.sync('dist');
})

gulp.task('scripts',function() {
	return gulp.src('app/libs/**/*.js')
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
})

gulp.task('css',function() {
	return gulp.src('app/libs/**/*.css')
		.pipe(concatCss("libs.min.css"))
		.pipe(cssnano())
		.pipe(gulp.dest('app/css'));
})

gulp.task('img', function() {
    return gulp.src('app/img/**/*') 
        .pipe(cache(imagemin({  
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('watch',['browser-sync','sass','scripts','css'],function() {
	gulp.watch('app/sass/**/*.+(sass|scss)',['sass']);
	gulp.watch('app/js/**/*.js',browserSync.reload);
	gulp.watch('app/*.html',browserSync.reload);
})

gulp.task('build',['clean','img','sass','scripts','css'],function() {
	gulp.src([
		'app/css/libs.min.css',
		'app/css/style.css',
		'app/css/ie.css',
		])
		.pipe(gulp.dest('dist/css'));

	gulp.src([
		'app/js/libs.min.js',
		'app/js/main.js'
		])
		.pipe(gulp.dest('dist/js'));

	gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
})

gulp.task('default', ['watch']);