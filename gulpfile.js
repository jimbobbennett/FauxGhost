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
gulp.task('scss', function() {
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
        .pipe(gulp.dest('packages/FauxGhost/assets/css'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'})),
      gulp.src('src/js/fauxghost.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('packages/FauxGhost/assets/js')),
      gulp.src('config.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('packages/FauxGhost/assets/js')),

      // font awesome
      gulp.src('bower_components/fontawesome/css/font-awesome.min.css')
        .pipe(gulp.dest('packages/FauxGhost/assets/css')),
      gulp.src('bower_components/fontawesome/fonts/**')
        .pipe(gulp.dest('packages/FauxGhost/assets/fonts')),

      // JQuery
      gulp.src('bower_components/jquery/dist/jquery.js')
        .pipe(gulp.dest('packages/FauxGhost/assets/js')),

      // foundation
      gulp.src('bower_components/foundation/css/foundation.css')
        .pipe(gulp.dest('packages/FauxGhost/assets/css')),
      gulp.src('bower_components/foundation/js/foundation.js')
        .pipe(gulp.dest('packages/FauxGhost/assets/js')),
      gulp.src('bower_components/foundation/js/vendor/modernizr.js')
        .pipe(gulp.dest('packages/FauxGhost/assets/js')),

      // theme files
      gulp.src('theme/**')
        .pipe(gulp.dest('packages/FauxGhost'))
    );
});

gulp.task('release', ['copy_assets']);







// Compile scss Files
// gulp.task('scss', function() {
//     return eventstream.concat (
//       gulp.src('dev/src/scss/fauxghost.scss')
//         .pipe(sass({style: 'expanded', quiet: false, cacheLocation: 'dev/src/scss/.sass-cache'}))
//         .pipe(gulp.dest('dev/dest/css'))
//         .pipe(minifycss())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('packages/FauxGhost/assets/css'))
//         );
// });

// Concat JS Files
gulp.task('js', function() {
    return eventstream.concat (
      gulp.src([
              'dev/src/framework/fastclick/lib/fastclick.js',
              'dev/src/framework/foundation/js/vendor/modernizr.js',
              'dev/src/framework/foundation/js/foundation.js',
              'dev/src/js/thirdParty/*.js',
              'dev/src/js/fauxGhost/fauxghost.js'])
          .pipe(concat('fauxghost.js'))
          .pipe(gulp.dest('dev/dest/js'))
          .pipe(uglify())
          .pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest('packages/FauxGhost/assets/js')),
      gulp.src('config.js')
          .pipe(gulp.dest('dev/dest/js'))
          .pipe(uglify())
          .pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest('packages/FauxGhost/assets/js'))
    );
});

gulp.task('build', ['scss', 'js']);

// Zip Packages Files
gulp.task('zip', ['clean_tmp', 'build'], function() {
  // Zip Theme Files
  return gulp.src('**', {cwd: path.join(process.cwd(), 'packages/theme')})
      .pipe(zip('FauxGhost.zip'))
      .pipe(gulp.dest('dev/tmp/theme'));
});

// Clean tmp Files
gulp.task('clean_tmp', function() {
  return gulp.src('./dev/tmp')
  .pipe(rimraf());
});

gulp.task('final_clean', ['move_zip'], function() {
  return gulp.src('./dev/tmp')
  .pipe(rimraf());
});

// Clean releases Files
gulp.task('clean_releases', function() {
  return gulp.src('./releases')
    .pipe(rimraf());
});

// Move Zip Files to releases Folder
gulp.task('move_zip', ['zip', 'clean_releases'], function() {
    return eventstream.concat (
       gulp.src('dev/tmp/**/*.zip')
        .pipe(gulp.dest('releases')),
      gulp.src('**', {cwd: path.join(process.cwd(), 'packages/theme')})
          .pipe(gulp.dest('releases/theme/FauxGhost')),
      gulp.src('**', {cwd: path.join(process.cwd(), 'packages/theme')})
          .pipe(gulp.dest('../../ghost-0/content/themes/FauxGhost'))
      );
});
