/**
 * @param buffer buffer from string
 */
export function bufferToString(buffer: ArrayBuffer): string {
  const bufferView = new Uint16Array(buffer)
  return String.fromCharCode.apply(String, bufferView)
}

/**
 * @param origin original string data
 */
export function stringToBuffer(origin: string) {
  /**
   * @description Every single string character is represented by one 16-bits
   * (2 bytes)unsigned integer values.
   * @mdn https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
   * @ecma https://www.ecma-international.org/ecma-262/#sec-typedarray-objects
   */
  const bufferView = new Uint16Array(new ArrayBuffer(origin.length * 2))
  for (let i = 0, len = origin.length; i < len; i++) {
    // Every 2 bytes memory will be used to store only one string character.
    bufferView[i] = origin.charCodeAt(i)
  }
  return bufferView.buffer
}
