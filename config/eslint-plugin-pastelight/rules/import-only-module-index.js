const fs = require('fs');
const path = require('path');

const srcPath = path.join(process.cwd(), 'src');
// TODO: It is possible to use withFileTypes: true and get isDirectory immediately, just have to
//       wait for VSCode to bump their version of node to probably 12? It currently sits on 10 and
//       that's too low
const moduleList = fs.readdirSync(srcPath, { withFileTypes: true, encoding: 'utf8' })
  .map(name => ({ name, stat: fs.lstatSync(path.join(srcPath, name)) }))
  .filter(file => file.stat.isDirectory())
  .map(file => file.name)
  .filter(name => name !== 'application');

const moduleImportPatternList = moduleList.map(name => `/${name}/`);

const processor = context => (node) => {
  const importPath = node.parent.source.value;

  moduleImportPatternList.forEach((pattern) => {
    if (importPath.includes(pattern)) {
      context.report({
        node,
        message: 'You may only import from module index',
      });
    }
  });
};

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
  },
  create: context => ({
    ImportSpecifier: processor(context),
    ImportDefaultSpecifier: processor(context),
    ImportNamespaceSpecifier: processor(context),
  }),
};
