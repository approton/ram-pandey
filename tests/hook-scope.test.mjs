import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { parse } = require('espree');
test('client components do not call React hooks at module scope', () => {
  const files = [
    '../src/components/CodeScene/CodeScene.jsx',
    '../src/components/ScrollTyping/ScrollTyping.jsx',
  ];
  for (const file of files) {
    const ast = parse(fs.readFileSync(new URL(file, import.meta.url), 'utf8'), {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    });
    const calls = ast.body.filter(
      (node) =>
        node.type === 'ExpressionStatement' &&
        node.expression.type === 'CallExpression' &&
        /^use[A-Z]/.test(node.expression.callee.name || ''),
    );
    assert.equal(calls.length, 0, `${file} contains a module-scope hook`);
  }
});
