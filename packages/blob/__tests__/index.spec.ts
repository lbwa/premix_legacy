import { base64ToBlob, blobToBase64 } from '../src'

describe('@premix/blob: blob converter', () => {
  it('should convert Blob object to base64 string', done => {
    const blobOptions = {
      type: 'image/png'
    }
    const blob = new Blob(['1'], blobOptions)
    blobToBase64(blob).then(string => {
      const dataWithMeta = string.split(',')
      const mineType = (/:(.*?);/.exec(dataWithMeta[0] || '') || [])[1]
      expect(string.length).toBeGreaterThan(0)
      expect(mineType).toEqual(blobOptions.type)
      done()
    })
  })

  it('Should convert base64 string to blob object', () => {
    const base64String = 'data:image/png;base64,MQ=='
    const blob = base64ToBlob(base64String)
    expect(blob instanceof Blob).toBeTruthy()
    expect(blob.size).toEqual(1)
  })

  it('Should handle invalid mine type error', () => {
    const base64String = 'data:;base64,MQ=='
    expect(() => {
      base64ToBlob(base64String)
    }).toThrowError('invalid mine type')
  })
})
