const { parallel, src, dest } = require('gulp');
const replace = require('gulp-replace');
const packageJson = require('./package.json');

const APPLICATION_NAME = `${packageJson.name} ${packageJson.version}`;

function copyWindowHtml() {
  return src('src/windows/**/*.html')
    .pipe(replace('{APPLICATION_NAME}', APPLICATION_NAME))
    .pipe(dest('build/windows'));
}

function copyNative() {
  return src('src/native/index.node')
    .pipe(dest('build/native'));
}

exports.default = parallel(copyWindowHtml, copyNative);
