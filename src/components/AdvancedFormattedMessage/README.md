# Advanced Formatted Message

This utility component provides a wrapper for `react-intl.FormattedMessage`, reducing the amount of boilerplate required to apply custom classes or render logic.

## Usage

```jsx
<AdvancedFormattedMessage
  id="some.locale.id"
  className="highlight"
/>
```

is equivalent to:

```jsx
<FormattedMessage
  id="some.locale.id"
>
  {text => <span className="highlight">{text}</span>}
</FormattedMessage>
```

This also avoids the perf. cost of re-declaring the child function on each render.

All props other than `id`, `values`, and `tag` are passed straight down to the rendered child:
```jsx
<AdvancedFormattedMessage
  id="some.locale.id"
  values={{
    a: "a",
    locale: "locale",
    value: "value",
  }}
  tag={SomeComponent}

  someComponentProp1="hello"
  someComponentProp2="world"
/>
```
