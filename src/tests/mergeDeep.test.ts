import { mergeDeep } from '@/utils/common';

describe('mergeDeep util', () => {
  it('works with arrays', () => {
    expect(mergeDeep([{ test: 'it' }], [{ lets: 'do' }])).toEqual([{ test: 'it', lets: 'do' }]);
  });

  it('merges target with sources with a correct result (hard case)', () => {
    const fn = () => 'fn new';
    const target = {
      deeper: {
        deeper: {
          deeper: {
            deeper: {
              primitive: 'anything',
              array: [{ hi: 'hi', ok: [{ hard: 'hard' }] }],
              fn: () => 'fn old',
            },
          },
        },
      },
    };
    const s1 = {
      deeper: {
        deeper: {
          deeper: {
            deeper: {
              array: [{ even: 'more', ok: [{ hard2: 'hard2' }] }, { second: 'obj' }],
              fn,
            },
          },
        },
      },
    };

    const s2 = {
      deeper: {
        deeper: {
          deeper: {
            deeper: {
              primitive: 'new',
              array: [{ ok: ['??'] }, { second: 'obj', any: 'else' }, { last: 'one' }],
              doesntExistInTarget: {},
            },
          },
        },
      },
    };

    const res = mergeDeep(target, s1, s2) as {
      deeper: { deeper: { deeper: { deeper: { fn: Function } } } };
    };
    expect(res).toEqual({
      deeper: {
        deeper: {
          deeper: {
            deeper: {
              primitive: 'new',
              array: [
                { hi: 'hi', ok: ['??'], even: 'more' },
                { second: 'obj', any: 'else' },
                { last: 'one' },
              ],
              fn,
              doesntExistInTarget: {},
            },
          },
        },
      },
    });
    expect(res.deeper.deeper.deeper.deeper.fn()).toBe('fn new');
  });
});
