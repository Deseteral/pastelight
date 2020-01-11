const { parallel, src, dest } = require('gulp');
const packageJson = require('./package.json');

function buildHtml() {
  return src('src/**/*.html').pipe(dest('build'));
}

function buildCss() {
  return src('src/**/*.css').pipe(dest('build'));
}

exports.default = parallel(buildHtml, buildCss);
