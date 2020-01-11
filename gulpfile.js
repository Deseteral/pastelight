const { parallel, src, dest } = require('gulp');
const packageJson = require('./package.json');

function copyWindowHtml() {
  return src('src/**/*.html')
    .pipe(dest('build'));
}

exports.default = parallel(copyWindowHtml);
