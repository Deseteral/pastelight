const NoApplicationImport = require('./rules/no-application-import');
const { RuleTester } = require('../../node_modules/eslint');

const ruleTester = new RuleTester();

const parserOptions = {
  sourceType: 'module',
};

ruleTester.run('no-application-import', NoApplicationImport, {
  valid: [
    {
      code: "import something from './foo/bar/baz'",
      parserOptions,
    }, {
      code: "import React from 'react'",
      parserOptions,
    },
  ],
  invalid: [
    {
      code: "import something from '../application/something'",
      errors: [{ message: 'Do not import from application module' }],
      parserOptions,
    }, {
      code: "import { something } from '../application'",
      errors: [{ message: 'Do not import from application module' }],
      parserOptions,
    }, {
      code: "import * as something from '../application'",
      errors: [{ message: 'Do not import from application module' }],
      parserOptions,
    },
  ],
});
