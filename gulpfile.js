var gulp = require('gulp'),
  tsc = require('gulp-tsc'),
  stylus = require('gulp-stylus'),
  rucksack = require('rucksack-css'),
  poststylus = require('poststylus'),
  exec = require('child_process').exec;

gulp.task('lite-server', function (cb) {
  exec('npm run lite', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
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
  gulp.src(['src/**/*.ts'])
});

gulp.task('default', ['compile', 'stylus', 'watch', 'lite-server']);
