# use-push-router

A custom hook that simplifies modifying the search params in **Next.js App Router** and navigates to the new URL.

## Installation

```
npm i use-push-router
```

## Demo

[Check out the demo here.](https://playground.nico.fyi/search-params)

## Usage

```tsx
import { usePushRoute } from 'use-push-router';

const { pushSearchParams } = usePushRoute();
```

The `pushSearchParams` function takes an object with the following shape:

```typescript
{
  add?: Record<string, string | string[]>;
  remove?: Record<string, string | string[] | undefined>;
  set?: Record<string, string | string[]>;
}
```

### Adding search params

Adding search params is adding a new parameter to the URL. If the parameter already exists, it will be added as an array of values.

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

There are two ways to add parameters to the URL:

| Method                                     | Example                | Result                                                                                                                         |
| ------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Add a specific parameter value             | `foo: 'bar'`           | Adds `foo=bar` to the URL. If there is already a value for `foo`, it will become an array of values (e.g., `foo=bar&foo=qux`). |
| Add multiple values for the same parameter | `baz: ['qux', 'quux']` | Adds `baz=qux&baz=quux` to the URL.                                                                                            |

Here are some examples of how the add action modifies the URL:

| Previous URL              | Add Action                               | Resulting URL                                        |
| ------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| `/search`                 | `{ foo: 'bar' }`                         | `/search?foo=bar`                                    |
| `/search?foo=bar`         | `{ foo: 'baz' }`                         | `/search?foo=bar&foo=baz`                            |
| `/search?foo=bar`         | `{ foo: ['baz', 'qux'] }`                | `/search?foo=bar&foo=baz&foo=qux`                    |
| `/search?foo=bar&baz=qux` | `{ baz: 'quux' }`                        | `/search?foo=bar&baz=qux&baz=quux`                   |
| `/search?foo=bar`         | `{ foo: ['baz'], baz: 'qux' }`           | `/search?foo=bar&foo=baz&baz=qux`                    |
| `/search?foo=bar&foo=baz` | `{ foo: 'qux' }`                         | `/search?foo=bar&foo=baz&foo=qux`                    |
| `/search?foo=bar&baz=qux` | `{ foo: 'baz', baz: ['quux', 'corge'] }` | `/search?foo=bar&foo=baz&baz=qux&baz=quux&baz=corge` |

### Setting search params

Setting search params is overwriting the existing parameter values with the new values. If the parameter is not present in the URL, it will be added.

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

| Method                                     | Example                | Result                                                                                    |
| ------------------------------------------ | ---------------------- | ----------------------------------------------------------------------------------------- |
| Set a specific parameter value             | `foo: 'bar'`           | Sets `foo=bar` in the URL. If there is already a value for `foo`, it will be overwritten. |
| Set multiple values for the same parameter | `baz: ['qux', 'quux']` | Sets `baz=qux&baz=quux` in the URL and replaces any existing values for `baz`.            |

Here are some examples of how the set action modifies the URL:

| Previous URL              | Set Action                               | Resulting URL                        |
| ------------------------- | ---------------------------------------- | ------------------------------------ |
| `/search`                 | `{ foo: 'bar' }`                         | `/search?foo=bar`                    |
| `/search?foo=bar`         | `{ foo: 'baz' }`                         | `/search?foo=baz`                    |
| `/search?foo=bar`         | `{ foo: ['baz', 'qux'] }`                | `/search?foo=baz&foo=qux`            |
| `/search?foo=bar&baz=qux` | `{ baz: 'quux' }`                        | `/search?foo=bar&baz=quux`           |
| `/search?foo=bar`         | `{ foo: ['baz'], baz: 'qux' }`           | `/search?foo=baz&baz=qux`            |
| `/search?foo=bar&foo=baz` | `{ foo: 'qux' }`                         | `/search?foo=qux`                    |
| `/search?foo=bar&baz=qux` | `{ foo: 'baz', baz: ['quux', 'corge'] }` | `/search?foo=baz&baz=quux&baz=corge` |

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

| Method                                        | Example                | Result                                                 |
| --------------------------------------------- | ---------------------- | ------------------------------------------------------ |
| Remove a specific parameter value             | `foo: 'bar'`           | Removes `foo=bar` from the URL if it exists.           |
| Remove multiple values for the same parameter | `baz: ['qux', 'quux']` | Removes `baz=qux&baz=quux` from the URL if they exist. |
| Remove a parameter entirely                   | `qux: undefined`       | Removes `qux` from the URL if it exists.               |

Here are some examples of how the remove action modifies the URL:

| Previous URL                       | Remove Action                    | Resulting URL             |
| ---------------------------------- | -------------------------------- | ------------------------- |
| `/search?foo=bar`                  | `{ foo: 'bar' }`                 | `/search`                 |
| `/search?foo=bar&foo=baz`          | `{ foo: 'bar' }`                 | `/search?foo=baz`         |
| `/search?foo=bar&foo=baz`          | `{ foo: ['bar', 'baz'] }`        | `/search`                 |
| `/search?foo=bar&baz=qux`          | `{ baz: 'qux' }`                 | `/search?foo=bar`         |
| `/search?foo=bar&baz=qux&baz=quux` | `{ baz: ['qux', 'quux'] }`       | `/search?foo=bar`         |
| `/search?foo=bar&baz=qux`          | `{ foo: 'bar', baz: 'qux' }`     | `/search`                 |
| `/search?foo=bar&baz=qux&qux=quux` | `{ qux: undefined }`             | `/search?foo=bar&baz=qux` |
| `/search?foo=bar&baz=qux&qux=quux` | `{ foo: 'bar', qux: undefined }` | `/search?baz=qux`         |

## License

MIT

## Author

Nico Prananta. Website: https://nico.fyi. Twitter: https://twitter.com/2co_p
