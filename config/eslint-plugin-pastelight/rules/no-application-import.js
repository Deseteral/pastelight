const processor = context => (node) => {
  const importPath = node.parent.source.value;

  if (importPath.includes('/application')) {
    context.report({
      node,
      message: 'Do not import from application module',
    });
  }
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
