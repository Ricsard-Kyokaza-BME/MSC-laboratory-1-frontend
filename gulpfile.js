var gulp = require('gulp'),
  tsc = require('gulp-tsc'),
  typescript = require('gulp-typescript'),
  stylus = require('gulp-stylus'),
  rucksack = require('rucksack-css'),
  poststylus = require('poststylus'),
  sourcemaps = require('gulp-sourcemaps'),
  spawn = require('child_process').spawn;

const tsProject = typescript.createProject('tsconfig.json');

gulp.task('lite-server', function (cb) {
  var ls = spawn('npm', ['run', 'lite']);

  ls.stdout.on('data', function(data) {
    process.stdout.write('' + data);
  });

  ls.stderr.on('data', function(data) {
    process.stdout.write('' + data);
  });
});

gulp.task('stylus', function () {
  gulp.src('styl/**/*.styl')
    .pipe(stylus({
      'include css': true,
      use: [
        poststylus(['rucksack-css'])
      ]
    }))
    .pipe(gulp.dest('styl/'))
});

gulp.task('watch', function() {
  gulp.watch('styl/**/*.styl', ['stylus']);
  gulp.watch('app/**/*.ts', ['compile']);
});

gulp.task('compile', function(){
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(''));
});

gulp.task('default', ['compile', 'stylus', 'watch', 'lite-server']);
