import { vi, describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams([['foo', 'bar']]),
}));

import { useModifiableSearchParams } from './use-modifiable-search-params';

describe('useModifiableSearchParams', () => {
  it('should return searchParams and updateSearchParams', () => {
    const { result } = renderHook(() => useModifiableSearchParams());
    expect(result.current.searchParams).toBeInstanceOf(URLSearchParams);
    expect(typeof result.current.updateSearchParams).toBe('function');
  });

  it('updateSearchParams should add params', () => {
    const { result } = renderHook(() => useModifiableSearchParams());
    const updated = result.current.updateSearchParams({ add: { baz: 'qux' } });
    expect(updated.get('foo')).toBe('bar');
    expect(updated.get('baz')).toBe('qux');
  });

  it('updateSearchParams should remove params', () => {
    const { result } = renderHook(() => useModifiableSearchParams());
    const updated = result.current.updateSearchParams({
      remove: { foo: 'bar' },
    });
    expect(updated.get('foo')).toBeNull();
  });

  it('updateSearchParams should set params', () => {
    const { result } = renderHook(() => useModifiableSearchParams());
    const updated = result.current.updateSearchParams({ set: { foo: 'baz' } });
    expect(updated.get('foo')).toBe('baz');
  });
});
