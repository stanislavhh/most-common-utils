import {cloneDeep} from '../utils';

describe('cloneDeep util', () => {
  it('returns correct clone', () => {
    class MockedClass {
      value = 1;
    }

    const source = {
      string: 'value',
      boolean: false,
      date: new Date('10-10-2000'),
      obj: {
        mockedClass: new MockedClass(),
        array: ['1', {}],
      },
    };

    expect(cloneDeep(source)).toEqual(source);
  });
});
