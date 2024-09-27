import { test, expect } from 'vitest';
import { updateSearchParams } from './update-search-params';
import { urlSearchParamsToObject } from './url-search-params-to-object';

test('updateSearchParams > add', () => {
  const searchParams = new URLSearchParams({
    foo: 'bar',
    baz: 'qux',
  });

  const update = updateSearchParams(searchParams);

  const newSearchParams = update({
    add: {
      foo: 'qux',
      baz: ['quux', 'quuz'],
      qux: 'quux',
      quuz: ['bar'],
    },
  });

  const expectedParams = {
    foo: ['bar', 'qux'],
    baz: ['qux', 'quux', 'quuz'],
    qux: 'quux',
    quuz: 'bar',
  };

  expect(urlSearchParamsToObject(newSearchParams)).toEqual(expectedParams);
});

test('updateSearchParams > remove', () => {
  const searchParams = new URLSearchParams({
    foo: 'bar',
    baz: 'qux',
  });

  const update = updateSearchParams(searchParams);

  const newSearchParams = update({
    remove: {
      foo: 'bar',
      baz: ['qux'],
      qux: undefined,
    },
  });

  expect(newSearchParams.toString()).toBe('');
});

test('updateSearchParams > set', () => {
  const searchParams = new URLSearchParams({
    foo: 'bar',
    baz: 'qux',
  });

  const update = updateSearchParams(searchParams);

  const newSearchParams = update({
    set: {
      foo: 'qux',
      baz: ['quux', 'quuz'],
      qux: 'quux',
    },
  });

  const expectedParams = {
    foo: 'qux',
    baz: ['quux', 'quuz'],
    qux: 'quux',
  };

  expect(urlSearchParamsToObject(newSearchParams)).toEqual(expectedParams);
});
