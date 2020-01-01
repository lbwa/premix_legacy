import { noop } from '@premix/shared'

export function throttle(fn = noop, period: number) {
  let last: number
  let timer: number // ensure last calling
  return function(this: any, ...rest: any[]) {
    const now = Date.now()
    timer && clearTimeout(timer)

    if (!last || now - last >= period) {
      fn.apply(this, rest)
      last = now
      return
    }

    timer = window.setTimeout(() => fn.apply(this, rest), period)
  }
}

export function debounce(fn = noop, delay: number, head = false) {
  let timer: number
  let hasHead = head
  return function(this: any, ...rest: any[]) {
    if (hasHead) {
      fn.apply(this, rest)
      hasHead = false
    }
    timer && clearTimeout(timer)
    timer = window.setTimeout(() => {
      fn.apply(this, rest)
      if (head) hasHead = head
    }, delay)
  }
}
