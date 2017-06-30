var gulp = require('gulp'),
browserSync = require('browser-sync').create(),
useref = require('gulp-useref'),
uglify = require('gulp-uglify'),
gulpIf = require('gulp-if'),
cssnano = require('gulp-cssnano'),
del = require('del'),
runSequence = require('run-sequence'),
jasmine = require('gulp-jasmine'),
jasmineBrowser = require('gulp-jasmine-browser'),
watch = require('gulp-watch'),

//typeScript
debug = require('gulp-debug'),
inject = require('gulp-inject'),
tsc = require('gulp-typescript'),
tslint = require('gulp-tslint'),
sourcemaps = require('gulp-sourcemaps'),
Config = require('./gulpfile.config'),
tsProject = tsc.createProject('tsconfig.json'),
superstatic = require( 'superstatic' );

var config = new Config();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});



gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions]; //reference to library .d.ts files
                        

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsProject());

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});


/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [
                              config.tsOutputPath +'/**/*.js',    // path to all JS files auto gen'd by editor
                              config.tsOutputPath +'/**/*.js.map', // path to all sourcemap files auto gen'd by editor
                              '!' + config.tsOutputPath + '/lib'
                           ];

  // delete the files
  del(typeScriptGenFiles, cb);
});

gulp.task('watch', ['browserSync'], function (){
  // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/css/**/*.css', browserSync.reload); 
    gulp.watch('app/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']); 
});
gulp.task('test', function() {
  var filesForTest = ['app/js/**/*.js', 'app/spec/**/*_spec.js'] 
  return gulp.src(filesForTest)
    .pipe(watch(filesForTest))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});


gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['useref'],
    callback
  )
});

gulp.task('default', function (callback) {
  runSequence(['browserSync', 'watch'],['ts-lint', 'compile-ts'],
    callback
  )
})