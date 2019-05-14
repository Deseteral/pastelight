const { parallel, src, dest } = require('gulp');

function copyWindowHtml() {
  return src('src/windows/*.html').pipe(dest('build/windows'));
}

exports.default = parallel(copyWindowHtml);
