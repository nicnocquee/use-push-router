# use-push-router

A custom hook that simplifies modifying the search params in Next.js and navigates to the new URL.

## Installation

```
npm i use-push-router
```

## Usage

```tsx
import { usePushRoute } from 'use-push-router';

const { pushSearchParams } = usePushRoute();
```

The `pushSearchParams` function takes an object with the following shape:

```ts
{
  add?: Record<string, string | string[]>;
  remove?: Record<string, string | string[] | undefined>;
  set?: Record<string, string | string[]>;
}
```

### Adding search params

```tsx
import { usePushRoute } from 'use-push-router';

const Component = () => {
  const { pushSearchParams } = usePushRoute();

  const handleClick = () => {
    pushSearchParams({
      add: {
        foo: 'bar', // adds foo=bar to the search params. If there is already a value for foo, it will be an array of values.
        baz: ['qux', 'quux'], // adds baz=qux&baz=quux to the search params.
      },
    });
  };

  return <button onClick={handleClick}>Add search params</button>;
};
```

Adding a search param with the same key will result in an array of values. For example, current URL is `https://example.com/?foo=bar`, and we add `foo=qux` to the search params, the URL will be `https://example.com/?foo=bar&foo=qux`.

### Setting search params

```tsx
import { usePushRoute } from 'use-push-router';

const Component = () => {
  const { pushSearchParams } = usePushRoute();

  const handleClick = () => {
    pushSearchParams({
      set: {
        foo: 'bar', // sets foo=bar in the search params. If there is already a value for foo, it will be overwritten.
        baz: 'qux', // sets baz=qux in the search params.
      },
    });
  };

  return <button onClick={handleClick}>Set search params</button>;
};
```

If there is already a value for a search param, it will be overwritten. For example, current URL is `https://example.com/?foo=bar&foo=qux`, and we set `foo=quux` in the search params, the URL will be `https://example.com/?foo=quux`.

### Removing search params

```tsx
import { usePushRoute } from 'use-push-router';

const Component = () => {
  const { pushSearchParams } = usePushRoute();

  const handleClick = () => {
    pushSearchParams({
      remove: {
        foo: 'bar', // removes foo=bar from the search params.
        baz: ['qux', 'quux'], // removes baz=qux&baz=quux from the search params.
        qux: undefined, // removes qux from the search params.
      },
    });
  };

  return <button onClick={handleClick}>Remove search params</button>;
};
```

Removing a search param with the same key will result in an array of values. For example, current URL is `https://example.com/?foo=bar&foo=qux`, and we remove `foo=qux` from the search params, the URL will be `https://example.com/?foo=bar`.

However if the value is `undefined`, the search param will be removed. For example, calling `pushSearchParams({ remove: { foo: undefined } })` will remove all values for `foo` from the search params.

## License

MIT

## Author

Nico Prananta. Website: https://nico.fyi. Twitter: https://twitter.com/2co_p
