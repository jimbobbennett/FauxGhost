// Load Gulp Plugins
var gulp        = require('gulp'),
    eventstream = require('event-stream'),
    path        = require('path');
    sass        = require('gulp-ruby-sass'),
    rename      = require('gulp-rename'),
    minifycss   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    notify      = require('gulp-notify'),
    rimraf      = require('gulp-rimraf'),
    zip         = require('gulp-zip');

// Compile scss Files
gulp.task('scss', ['clean_dest', 'clean_release', 'clean_zip'], function() {
    return eventstream.concat (
      gulp.src('src/scss/fauxghost.scss')
        .pipe(sass({style: 'expanded', quiet: false, cacheLocation: 'src/scss/.sass-cache'}))
        .pipe(gulp.dest('dest/css'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('packages/FauxGhost/assets/css'))
    );
});

gulp.task('copy_assets', ['scss'], function(){
    return eventstream.concat (
      // FauxGhost
      gulp.src('dest/css/fauxghost.min.css')
        .pipe(gulp.dest('packages/FauxGhost/assets/css')),

      gulp.src(['bower_components/fastclick/lib/fastclick.js',
                'src/js/thirdparty/*.js',
                'src/js/fauxghost.js'])
      .pipe(concat('fauxghost.js'))
      .pipe(gulp.dest('dest/js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('packages/FauxGhost/assets/js')),
      gulp.src('config/config.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('packages/FauxGhost/assets/js')),
      gulp.src('config/favicons/**')
        .pipe(gulp.dest('packages/FauxGhost/assets/favicons')),
      gulp.src('config/images/**')
        .pipe(gulp.dest('packages/FauxGhost/assets/images')),
      gulp.src('FauxGhost_16x16.png')
        .pipe(gulp.dest('packages/FauxGhost/assets/images')),

      // font awesome
      gulp.src('bower_components/fontawesome/css/font-awesome.min.css')
        .pipe(gulp.dest('packages/FauxGhost/assets/css')),
      gulp.src('bower_components/fontawesome/fonts/**')
        .pipe(gulp.dest('packages/FauxGhost/assets/fonts')),

      // JQuery
      gulp.src('bower_components/jquery/dist/jquery.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('packages/FauxGhost/assets/js')),

      // foundation
      gulp.src('bower_components/foundation/css/foundation.css')
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('packages/FauxGhost/assets/css')),
      gulp.src('bower_components/foundation/js/foundation.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('packages/FauxGhost/assets/js')),

      gulp.src('bower_components/foundation/js/vendor/modernizr.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('packages/FauxGhost/assets/js')),

      // theme files
      gulp.src('theme/**')
        .pipe(gulp.dest('packages/FauxGhost/'))
    );
});

gulp.task('zip', ['copy_assets'], function(){
    gulp.src('**', {cwd: path.join(process.cwd(), 'packages/FauxGhost')})
      .pipe(zip('FauxGhost.zip'))
      .pipe(gulp.dest('.'));
});

gulp.task('release', ['zip'], function(){
});

gulp.task('clean_dest', function(){
  return gulp.src('dest')
  .pipe(rimraf());
});

gulp.task('clean_zip', function(){
  return gulp.src('FauxGhost.zip')
  .pipe(rimraf());
});

gulp.task('clean_release', function(){
  return gulp.src('packages')
  .pipe(rimraf());
});
