import { base64ToBlob, blobToBase64, downloadBlob } from '../src'

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

  // https://stackoverflow.com/a/55022278/11708999
  it('Should convert blob to a downloadable file', () => {
    window.URL.createObjectURL = jest.fn()
    window.URL.revokeObjectURL = jest.fn()
    const blobOptions = {
      type: 'image/png'
    }
    const filename = ''
    const blob = new Blob(['1'], blobOptions)
    const $ = document.createElement.bind(document)
    const onClick = jest.fn()
    let ele: HTMLAnchorElement = $('a')
    jest
      .spyOn(document, 'createElement')
      .mockImplementation(
        (tagName: string, options?: ElementCreationOptions) => {
          ele = $(tagName, options) as HTMLAnchorElement
          ele.click = onClick
          return ele
        }
      )

    downloadBlob(blob, filename)

    expect(window.URL.createObjectURL).toHaveBeenCalledTimes(1)
    expect(window.URL.revokeObjectURL).toHaveBeenCalledTimes(1)

    expect(ele.download).toEqual('untitled')
    expect(ele.href.length).toBeGreaterThan(0)
    expect(ele.style.display).toEqual('none')
    expect(ele.click).toHaveBeenCalledTimes(1)
  })
})
