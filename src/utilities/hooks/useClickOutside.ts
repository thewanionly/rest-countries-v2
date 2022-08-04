import { RefObject, useEffect } from 'react'

/**
 * Detects if the user clicks outside the specified ref/element.
 */
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event?: MouseEvent) => void
): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const el = ref?.current

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [ref, handler])
}

export default useOnClickOutside
