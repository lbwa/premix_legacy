<h1 align="center">@premix/buffer</h1>

This package is used to help people to handle buffer easily.

## Between ArrayBuffer and Buffer

[ArrayBuffer][mdn-array-buffer] object is used to represent a generic, **fixed-length** _raw binary data buffer_. [Buffer][nodejs-buffer] object in node.js is equivalent to _Uint8Array_ (A kind of [TypedArray][mdn-typed-array])<sup>[source](https://nodejs.org/dist/latest/docs/api/buffer.html#buffer_buffers_and_typedarray)</sup>, not ArrayBuffer object.

A [TypedArray][mdn-typed-array] object describes an array-like view of an underlying binary data buffer.

> With TypedArray available, the [Buffer][nodejs-buffer] class implements the _Uint8Array_ API in a manner that is more optimized and suitable for Node.js.

[mdn-array-buffer]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
[nodejs-buffer]: https://nodejs.org/dist/latest-v13.x/docs/api/buffer.html#buffer_buffer
[mdn-typed-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

## Relationship with binary

1. The Number type is a double-precision **64-bit** binary format IEEE 754 value (numbers between -(2<sup>53</sup> -1) and 2<sup>53</sup> -1).

1. The String type is a set of "elements" of **16-bit** unsigned integer values

## Byte order

If control over byte order is needed, you may need to use _DataView_ and take care of [endian, endianness, byte-order](https://developer.mozilla.org/en-US/docs/Glossary/Endianness).

## Further readings

- [MDN - JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [MDN - ArrayBuffer][mdn-array-buffer]
- [Nodejd.org - Buffer][nodejs-buffer]
- [MDN - TypedArray][mdn-typed-array]
- [ECMA 262 - TypedArray](https://www.ecma-international.org/ecma-262/#sec-typedarray-objects)

## License

MIT © [Bowen Liu](https://github.com/lbwa)
