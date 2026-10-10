import { strict as assert } from 'node:assert';
import { describe, it } from 'mocha';
import { collectIdAttributes } from '../src/parser/htmlAttributes';
import { validateIds } from '../src/validators/validateIds';
const validate = (html: string) => validateIds(collectIdAttributes(html));

describe('ID Dost HTML ID validation', () => {
  it('accepts unique IDs', () => assert.equal(validate('<div id="one"></div><p id="two"></p>').length, 0));
  it('flags subsequent duplicate occurrences and preserves first location', () => {
    const issues = validate('<div id="x"></div>\n<p id="x"></p>\n<b id="x"></b>').filter(i => i.kind === 'duplicate');
    assert.equal(issues.length, 2); assert.equal(issues[0].originalStart, 9); assert.equal(issues[1].originalStart, 9);
  });
  it('compares IDs case-sensitively', () => assert.equal(validate('<div id="Box"></div><p id="box"></p>').length, 0));
  it('flags whitespace but not multiple class names', () => {
    const issues = validate('<div id="header main" class="header main"></div>');
    assert.deepEqual(issues.map(i => i.kind), ['whitespace']);
  });
  it('flags empty values', () => assert.equal(validate('<div id=""></div>').filter(i => i.kind === 'empty').length, 1));
  it('handles single and double quotes', () => assert.equal(validate("<div id='a'></div><p id=\"a\"></p>").filter(i => i.kind === 'duplicate').length, 1));
  it('ignores comments and script strings', () => assert.equal(validate('<!-- <div id="x"> --><script>const s = \'<p id="x">\';</script><div id="x"></div>').length, 0));
  it('handles multiline and incomplete markup', () => assert.equal(validate('<div\n id="x"><p id="x"').filter(i => i.kind === 'duplicate').length, 1));
  it('flags repeated id attributes on one element', () => assert.equal(validate('<div id="a" id="b"></div>').filter(i => i.kind === 'duplicate-attribute').length, 1));
  it('can disable individual rules', () => assert.equal(validateIds(collectIdAttributes('<div id="x"></div><p id="x"></p>'), { duplicates: false }).length, 0));
  it('updates after edits by validating the latest source', () => {
    assert.equal(validate('<div id="x"></div><p id="x"></p>').filter(i => i.kind === 'duplicate').length, 1);
    assert.equal(validate('<div id="x"></div><p id="y"></p>').filter(i => i.kind === 'duplicate').length, 0);
  });
});
