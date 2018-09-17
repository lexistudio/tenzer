const gulp         = require('gulp')
const concat       = require('gulp-concat')
const watch        = require('gulp-watch')
const plumber      = require('gulp-plumber')
const stylus       = require('gulp-stylus')
const cleanCSS     = require('gulp-clean-css')
const gcmq         = require('gulp-group-css-media-queries')
const autoprefixer = require('gulp-autoprefixer')
const rjs          = require('gulp-requirejs-optimize');
const glob         = require('glob');
const path         = require('path');

const css = entry => {
  return () => {
    gulp.src(entry)
      .pipe(plumber())
      .pipe(stylus({ errLogToConsole: true }))
      .pipe(gcmq())
      .pipe(gulp.dest('www/css'))
      .pipe(gcmq())
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulp.dest('www/css/min'))
  }
}

const js = entry => {
  return () => {
    const paths = { lib:  '../app/lib' }
    paths[entry] = '../app/' + entry

    const include = glob.sync('src/js/app/' + entry + '/**/*.js')
      .map( p => p.replace('src/js/app/', '').replace(/\.js$/, ''))

    gulp.src('src/js/app/' + entry + '.js')
      .pipe(rjs({
          baseUrl: 'src/js/lib',
          name: entry,
          preserveLicenseComments: false,
          paths,
          include
      }))
      .pipe(gulp.dest('www/js/app'))
  }
}

gulp
  .task('default', [ 'build', 'watch' ])
  .task('build', [ 'build.css', 'build.js' ])
  .task('build.css', [ 'build.css.site' ])
  .task('build.css.site', css('src/css/site.styl'))
  .task('build.js', [ 'build.js.site' ])
  .task('build.js.site', js('site'))
  .task('watch', () => {
      watch('src/js/app/**/*.js',      e => gulp.start('build.js'))
      watch('src/css/**/*.styl',       e => gulp.start('build.css.site'))
  })

require('fs').chmod = (a, b, cb) => { cb(0) }
