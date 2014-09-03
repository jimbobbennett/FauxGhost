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
      gulp.src('dev/src/scss/fauxghost.scss')
        .pipe(sass({style: 'expanded', quiet: false, cacheLocation: 'dev/src/scss/.sass-cache'}))
        .pipe(gulp.dest('dev/dest/css'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('packages/theme/assets/css'))
        .pipe(notify({message: 'SCSS Files Compiled Successfully'})),
      gulp.src('dev/src/framework/foundation/css/foundation.min.css')
        .pipe(gulp.dest('dev/dest/css'))
        .pipe(gulp.dest('packages/theme/assets/css'))
        );
});

// Concat JS Files
gulp.task('concat', function() {
    return gulp.src([
            'dev/src/framework/foundation/js/vendor/modernizr.js',
            'dev/src/framework/foundation/js/foundation/foundation.js',
            'dev/src/framework/foundation/js/foundation/foundation.alert.js',
            'dev/src/framework/foundation/js/foundation/foundation.offcanvas.js',
            'dev/src/framework/foundation/js/foundation/foundation.reveal.js',
            'dev/src/framework/foundation/js/foundation/foundation.tooltip.js',
            'dev/src/js/*.js'])
        .pipe(concat('fauxghost.js'))
        .pipe(gulp.dest('dev/dest/js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('packages/theme/assets/js'))
        .pipe(notify({message: 'JavaScript Files Compiled & Compressed Successfully'}));
});

gulp.task('build', ['scss', 'concat']);

// Zip Packages Files
gulp.task('zip', ['clean_tmp', 'build'], function() {
    return eventstream.concat (
        // Zip Theme Files
        gulp.src('**', {cwd: path.join(process.cwd(), 'packages/theme')})
            .pipe(zip('FauxGhost.zip'))
            .pipe(gulp.dest('dev/tmp/theme')),
        // Zip Documentation Filez
        gulp.src('**', {cwd: path.join(process.cwd(), 'packages/documentation')})
            .pipe(zip('FauxGhost_documentation.zip'))
            .pipe(gulp.dest('dev/tmp/documentation')),
        // Zip Sources Files
        gulp.src('**', {cwd: path.join(process.cwd(), 'packages/sources')})
            .pipe(zip('FauxGhost_sources.zip'))
            .pipe(gulp.dest('dev/tmp/sources')),
        // Zip DemoBuilder Files
        gulp.src('**', {cwd: path.join(process.cwd(), 'packages/demobuilder')})
            .pipe(zip('FauxGhost_demobuilder.zip'))
            .pipe(gulp.dest('dev/tmp/demobuilder'))
    );
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
    return gulp.src('dev/tmp/**/*.zip')
        .pipe(gulp.dest('releases'))
        .pipe(notify({message: 'All Files Released Successfully'}));
});

// Main Task: Release
gulp.task('release', ['final_clean']);
