import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { themeBootstrap } from '../src/lib/theme-bootstrap.mjs';
function environment(saved, systemLight = false, blocked = false) {
  return {
    document: { documentElement: { dataset: {} } },
    localStorage: {
      getItem() {
        if (blocked) throw Error('Storage unavailable');
        return saved;
      },
    },
    matchMedia() {
      return { matches: systemLight };
    },
  };
}
test('bootstrap can run repeatedly without global declarations or redeclaration errors', () => {
  const context = vm.createContext(environment('light'));
  vm.runInContext(themeBootstrap, context);
  vm.runInContext(themeBootstrap, context);
  assert.equal(context.document.documentElement.dataset.theme, 'light');
  assert.equal('savedTheme' in context, false);
});
test('saved preferences override the system and blocked storage falls back safely', () => {
  for (const [saved, systemLight, blocked, expected] of [
    ['dark', true, false, 'dark'],
    ['light', false, false, 'light'],
    [null, true, true, 'light'],
    [null, false, true, 'dark'],
  ]) {
    const context = vm.createContext(environment(saved, systemLight, blocked));
    vm.runInContext(themeBootstrap, context);
    assert.equal(context.document.documentElement.dataset.theme, expected);
  }
});
