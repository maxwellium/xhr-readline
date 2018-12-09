const noop = () => { };
const logError = ( e: any ) => console.error( e );

export function readLineStream(
  xhr: XMLHttpRequest,
  onLine: ( line: string ) => void,
  onDone: () => void = noop,
  onError: ( error: any ) => void = logError,
) {

  let seenBytes = 0,
    buffer = '';

  xhr.addEventListener( 'readystatechange', () => {


    if ( xhr.readyState === XMLHttpRequest.LOADING || xhr.readyState === XMLHttpRequest.DONE ) {

      const newData = xhr.responseText.substr( seenBytes );

      let i = newData.indexOf( '\n' );

      if ( i > -1 ) {

        buffer += newData.substring( 0, i );
        onLine( buffer );

        const lines = newData.split( '\n' );
        lines.shift();
        buffer = lines.pop() || '';
        lines.map( l => onLine( l ) );

      } else {
        buffer += newData;
      }

      seenBytes = xhr.responseText.length;

      if ( xhr.readyState === XMLHttpRequest.DONE ) {
        if ( buffer.length ) {
          onError( `buffer not empty! length: ${ buffer.length }` );
        }
        onDone();
      }
    }

  } );
}
