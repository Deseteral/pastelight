const ImportOnlyModuleIndex = require('./rules/import-only-module-index');
const { RuleTester } = require('../../node_modules/eslint');

const ruleTester = new RuleTester();

const parserOptions = {
  sourceType: 'module',
};

ruleTester.run('import-only-module-index', ImportOnlyModuleIndex, {
  valid: [
    {
      code: "import something from './foo/bar/baz'",
      parserOptions,
    }, {
      code: "import something from '../../foo/bar/baz'",
      parserOptions,
    }, {
      code: "import React from 'react'",
      parserOptions,
    }, {
      code: "import something from '../../foo/bar/application'",
      parserOptions,
    }, {
      code: "import { something } from '../../application'",
      parserOptions,
    }, {
      code: "import * as Something from './foo/anothermodule'",
      parserOptions,
    },
  ],
  invalid: [
    {
      code: "import something from '../application/something'",
      errors: [{ message: 'You may only import from module index' }],
      parserOptions,
    }, {
      code: "import { something } from '../application/something'",
      errors: [{ message: 'You may only import from module index' }],
      parserOptions,
    }, {
      code: "import * as something from '../application/something'",
      errors: [{ message: 'You may only import from module index' }],
      parserOptions,
    },
  ],
});
