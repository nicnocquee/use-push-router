import { vi, describe, it, expect } from 'vitest';
// @vitest-environment jsdom

// Create a variable to hold the push mock
const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/test-path',
  useSearchParams: () => new URLSearchParams([['foo', 'bar']]),
}));

import { renderHook, act } from '@testing-library/react';
import { usePushRoute } from './use-push-route';

describe('usePushRoute', () => {
  it('should set the existing search params correctly', async () => {
    const { result } = renderHook(() => usePushRoute());

    act(() => {
      result.current.pushSearchParams({ set: { foo: 'quz' } });
    });

    expect(pushMock).toHaveBeenCalledWith('/test-path?foo=quz');
  });

  it('should set the new search params correctly', async () => {
    const { result } = renderHook(() => usePushRoute());

    act(() => {
      result.current.pushSearchParams({ set: { man: 'dude' } });
    });

    expect(pushMock).toHaveBeenCalledWith('/test-path?foo=bar&man=dude');
  });

  it('should set the new search params array correctly', async () => {
    const { result } = renderHook(() => usePushRoute());

    act(() => {
      result.current.pushSearchParams({ set: { man: ['dude', 'dudette'] } });
    });

    expect(pushMock).toHaveBeenCalledWith(
      '/test-path?foo=bar&man=dude&man=dudette',
    );
  });

  it('should remove the search params correctly', async () => {
    const { result } = renderHook(() => usePushRoute());

    act(() => {
      result.current.pushSearchParams({ remove: { foo: 'bar' } });
    });

    expect(pushMock).toHaveBeenCalledWith('/test-path?');
  });

  it('should remove the search params when the value is undefined', async () => {
    const { result } = renderHook(() => usePushRoute());

    act(() => {
      result.current.pushSearchParams({ remove: { foo: undefined } });
    });

    expect(pushMock).toHaveBeenCalledWith('/test-path?');
  });

  it('should add the search params correctly', async () => {
    const { result } = renderHook(() => usePushRoute());

    act(() => {
      result.current.pushSearchParams({ add: { baz: 'qux' } });
    });

    expect(pushMock).toHaveBeenCalledWith('/test-path?foo=bar&baz=qux');
  });

  it('should add the search params array correctly', async () => {
    const { result } = renderHook(() => usePushRoute());

    act(() => {
      result.current.pushSearchParams({ add: { baz: ['qux', 'quux'] } });
    });

    expect(pushMock).toHaveBeenCalledWith(
      '/test-path?foo=bar&baz=qux&baz=quux',
    );
  });
});
