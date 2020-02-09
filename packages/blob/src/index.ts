/**
 * @description Convert base64 URL to Blob object
 * @param url base64 URL
 * @param options Blob constructor options
 */
export function base64ToBlob(url: string, options?: BlobPropertyBag) {
  const headerWithData = url.split(',')
  const mineType = (headerWithData[0].match(/:(.*?);/) || [])[1]
  // convert string to binary string
  // binary string is not to represent characters, but binary data.
  // https://developer.mozilla.org/en-US/docs/Web/API/DOMString/Binary
  const binaryString = window.atob(headerWithData[1])

  if (!mineType) throw new TypeError('[base64ToBlob]: invalid mine type.')

  let i = binaryString.length
  // We use Uint8Array bufferView to store every bytes data because 1 byte is
  // the smallest addressable unit of memory, eg. the color of images.
  const uint8View = new Uint8Array(
    i // The size of the binary string data represented is twice as big as it
    // would be in normal binary format, however this will not be visible to
    // the final user, since the length of JavaScript strings is calculated
    // using two bytes as the unit.
    // so we just use binaryString.length size memory, not double size
  )

  // convert each binary string code unit to Unicode value.
  // memory usage will reduce 50%.
  while (i--) {
    uint8View[i] = binaryString.charCodeAt(i)
  }

  return new Blob([uint8View], Object.assign({ type: mineType }, options || {}))
}

/**
 * @description convert data from Blob object to base64
 * @param blob target Blob or File object
 */
export function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onerror = reject
    reader.onload = () => resolve(reader.result as string)
  })
}

export function downloadBlob(blob: Blob, filename: string) {
  const name =
    filename || (blob instanceof File ? (blob as File).name : `untitled`)
  if ('msSaveOrOpenBlob' in navigator) {
    return window.navigator.msSaveOrOpenBlob(blob, name)
  }

  const el = document.createElement('a')
  // create string context with `blob://xxx`
  const url = window.URL.createObjectURL(blob)
  el.href = url
  el.style.display = 'none'
  // https://stackoverflow.com/a/2793756/11708999
  el.download = name
  document.body.appendChild(el)
  el.click()
  document.body.removeChild(el)
  window.URL.revokeObjectURL(url)
  return true
}
