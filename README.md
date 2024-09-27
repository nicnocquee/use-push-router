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

Therea are two ways to add parameters to the URL:

1. Specify a key-value pair to add a specific parameter value: `foo: 'bar'`. After calling this function, `foo=bar` will be added to the URL. If there is already a value for foo, for example `https://example.com/?foo=bar`, it will become `https://example.com/?foo=bar&foo=qux` after calling this function.
2. Use an array to add multiple values for the same parameter: `baz: ['qux', 'quux']`. After calling this function, `baz=qux&baz=quux` will be added to the URL.

### Setting search params

```tsx
import { usePushRoute } from 'use-push-router';

const Component = () => {
  const { pushSearchParams } = usePushRoute();

  const handleClick = () => {
    pushSearchParams({
      set: {
        foo: 'bar', // sets foo=bar in the search params. If there is already a value for foo, it will be overwritten.
        baz: ['qux', 'quux'], // sets baz=qux&baz=quux in the search params.
      },
    });
  };

  return <button onClick={handleClick}>Set search params</button>;
};
```

There are two ways to set parameters in the URL:

1. Specify a key-value pair to set a specific parameter value: `foo: 'bar'`. After calling this function, `foo=bar` will be set in the URL. If there is already a value for `foo`, for example `https://example.com/?foo=qux`, it will become `https://example.com/?foo=bar` after calling this function.
2. Use an array to set multiple values for the same parameter: `baz: ['qux', 'quux']`. After calling this function, `baz=qux&baz=quux` will be set in the URL and replace any existing values for `baz`.

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

You can remove parameters in three ways:

1. Specify a key-value pair to remove a specific parameter value: `foo: 'bar'`. After calling this function, `foo=bar` will be removed from the URL if it exists.
2. Use an array to remove multiple values for the same parameter: `baz: ['qux', 'quux']`. After calling this function, `baz=qux&baz=quux` will be removed from the URL if they exist.
3. Set a parameter to `undefined` to remove it entirely: `qux: undefined`. After calling this function, `qux` will be removed from the URL if it exists.

## License

MIT

## Author

Nico Prananta. Website: https://nico.fyi. Twitter: https://twitter.com/2co_p
