var gulp = require('gulp'),
   gulp_requirejs = require('gulp-requirejs'),
   concat = require('gulp-concat'),
   sass = require('gulp-sass'),
   params = require('yargs').argv;

var x = {
   styles: params.pg ? './sass/**/*.scss' : ['./sass/**/*.scss', '!./sass/Libs/phone_gap.scss'],
   dest: params.pg ? '../PhoneGap/www/' : '../Web/',
   name: params.pg ? 'startPhoneGap' : 'start'
}

// Build task
gulp.task('build', function () {

   gulp_requirejs({
      namespace: 'HOUSER',
      mainConfigFile: 'config.js',
      include: 'require_lib',
      findNestedDependencies: true,
      keepBuildDir: true,
      baseUrl: './',
      name: './js/' + x.name,
      out: 'houser.js'
   })
   .pipe(gulp.dest(x.dest + 'js'));
});

// Copy HTML.
gulp.task('html', function () {
   gulp.src('mobile.html')
   .pipe(concat('index.html'))
   .pipe(gulp.dest(x.dest));
})

// Build styles
gulp.task('styles', function() {
   gulp.src(x.styles)
   .pipe(sass().on('error', sass.logError))
   .pipe(concat('houser.css'))
   .pipe(gulp.dest(x.dest + '/css'));
});

//Watch task
gulp.task('default',function () {
   gulp.watch('js/**/*.js',['build']);
   gulp.watch('mobile.html',['html']);
   gulp.watch('js/**/*.tmpl',['build']);
   gulp.watch('sass/**/*.scss',['styles']);
});
