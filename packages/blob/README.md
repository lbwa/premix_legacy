<h1 align="center">@premix/blob</h1>

This package is a kind of converter between Blob/File and base64 URL.

## Installation

```bash
npm i @premix/blob
```

## Basic usage

```ts
import { base64ToBlob, blobToBase64, downloadBlob } from '@premix/blob'

const base64String = 'data:image/png;base64,xxxx'
const blob = base64ToBlob(base64String)
const base64 = blobToBase64(blob)
console.log(base64String === base64) // true

// download blob object to local file system
downloadBlob(blob)
```

## Advanced usage

- Download the Excel Blob object

  ```ts
  import axios from 'axios'
  import { downloadBlob } from '@premix/blob'

  function downloadExcel(
    url: string,
    payload: Record<string, any>,
    filename: string
  ) {
    return axios
      .post(url, payload, {
        responseType: 'blob'
      })
      .then(res => {
        const blob = new Blob([res], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        })
        // make Blob object downloadable
        downloadBlob(blob)
      })
  }
  ```

- Convert any HTTP(S) URL to base64 or Blob

  ```ts
  import axios from 'axios'
  import { blobToBase64 } from '@premix/blob'

  function urlToBas64(url: string, payload: Record<string, any>) {
    return axios
      .get(url, { params: payload }, { responseType: 'blob' })
      .then(res => blobToBase64(res))
  }
  ```

## License

MIT © [Bowen Liu](https://github.com/lbwa)
