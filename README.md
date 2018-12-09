# xhr-readline
Read large XMLHttpRequests line by line. This package enables parsing of contents as soon as they come in over the wire.


```typescript
export function readLineStream(
  xhr: XMLHttpRequest,
  onLine: ( line: string ) => void,
  onDone: () => void = noop,
  onError: ( error: any ) => void = logError
)
```

should tell you what you need to know ;)

```javascript
const url = '/assets/test.lines';
const xhr = new XMLHttpRequest();
xhr.open( 'GET', url );
readLineStream( xhr, line => console.log( line ) );
xhr.send();
```

since you pass in the xhr object, you retain control over it and can e.g. abort the request at any time.


## Benchmark Idea
If you can spare the time, it would be interesting to see how memory consumption and speed is affected by using this function vs waiting for all the data to be completed and then just using `split('\n')`.
