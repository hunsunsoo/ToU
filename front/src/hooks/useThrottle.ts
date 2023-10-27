import { useEffect } from 'react'

export const useThrottle = (callback: Function, interval = 0) => {
  let isPassedInterval = true
  let timerId: ReturnType<typeof setTimeout> | number = 0

  const execute = (...args: any) => {
    if (isPassedInterval) {
      callback(args)
      isPassedInterval = false
      timerId = setTimeout(() => {
        isPassedInterval = true
      }, interval)
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return execute
}
