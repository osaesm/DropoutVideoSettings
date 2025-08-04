window.addEventListener('message', (event) => {
  if (event.data === 'EXTENSION_CHECK_REQUEST') {
    event.source.postMessage('EXTENSION_CHECK_RESPONSE', event.origin);
  }
});