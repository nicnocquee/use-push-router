import { urlSearchParamsToObject } from './url-search-params-to-object';
import { describe, it, expect } from 'vitest';

describe('urlSearchParamsToObject', () => {
  it('should convert single key-value pair', () => {
    const params = new URLSearchParams('foo=bar');
    expect(urlSearchParamsToObject(params)).toEqual({ foo: 'bar' });
  });

  it('should convert multiple key-value pairs', () => {
    const params = new URLSearchParams('foo=bar&baz=qux');
    expect(urlSearchParamsToObject(params)).toEqual({ foo: 'bar', baz: 'qux' });
  });

  it('should handle repeated keys as arrays', () => {
    const params = new URLSearchParams('foo=bar&foo=baz&foo=qux');
    expect(urlSearchParamsToObject(params)).toEqual({
      foo: ['bar', 'baz', 'qux'],
    });
  });

  it('should handle empty search params', () => {
    const params = new URLSearchParams('');
    expect(urlSearchParamsToObject(params)).toEqual({});
  });

  it('should handle special characters', () => {
    const params = new URLSearchParams('f%20o%20o=b%40r&baz=qu%3Dx');
    expect(urlSearchParamsToObject(params)).toEqual({
      'f o o': 'b@r',
      baz: 'qu=x',
    });
  });

  it('should handle mix of single and repeated keys', () => {
    const params = new URLSearchParams('a=1&a=2&b=3');
    expect(urlSearchParamsToObject(params)).toEqual({ a: ['1', '2'], b: '3' });
  });
});
