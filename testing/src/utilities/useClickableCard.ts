'use client'
import type { RefObject } from 'react'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'

type UseClickableCardType<T extends HTMLElement> = {
  card: {
    ref: RefObject<T | null>
  }
  link: {
    ref: RefObject<HTMLAnchorElement | null>
  }
}

interface Props {
  external?: boolean
  newTab?: boolean
  scroll?: boolean
}

/**
 * Enable a card element to behave like a clickable link, navigating on a quick click.
 *
 * When the user performs a quick click (mousedown then mouseup within ~250ms) on the card and a nested anchor ref has an `href`, this hook will trigger navigation either via the Next.js router or the browser.
 *
 * @param external - If `true`, open the link through the browser (window.open) instead of using the Next.js router.
 * @param newTab - When `external` is `true`, open the link in a new tab if `true`, otherwise reuse the same tab.
 * @param scroll - When using the Next.js router, control whether the navigation should scroll to the top (`true`) or preserve scroll (`false`).
 * @returns An object containing two refs: `card.ref` — attach to the clickable container element, and `link.ref` — attach to the anchor element inside the card.
 */
function useClickableCard<T extends HTMLElement>({
  external = false,
  newTab = false,
  scroll = true,
}: Props): UseClickableCardType<T> {
  const router = useRouter()
  const card = useRef<T>(null)
  const link = useRef<HTMLAnchorElement>(null)
  const timeDown = useRef<number>(0)
  const hasActiveParent = useRef<boolean>(false)
  const pressedButton = useRef<number>(0)

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.target) {
        const target = e.target as Element

        const timeNow = +new Date()
        const parent = target?.closest('a')

        pressedButton.current = e.button

        if (!parent) {
          hasActiveParent.current = false
          timeDown.current = timeNow
        } else {
          hasActiveParent.current = true
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, card, link, timeDown],
  )

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (link.current?.href) {
        const timeNow = +new Date()
        const difference = timeNow - timeDown.current

        if (link.current?.href && difference <= 250) {
          if (!hasActiveParent.current && pressedButton.current === 0 && !e.ctrlKey) {
            if (external) {
              const target = newTab ? '_blank' : '_self'
              window.open(link.current.href, target)
            } else {
              router.push(link.current.href, { scroll })
            }
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, card, link, timeDown],
  )

  useEffect(() => {
    const cardNode = card.current

    const abortController = new AbortController()

    if (cardNode) {
      cardNode.addEventListener('mousedown', handleMouseDown, {
        signal: abortController.signal,
      })
      cardNode.addEventListener('mouseup', handleMouseUp, {
        signal: abortController.signal,
      })
    }

    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card, link, router])

  return {
    card: {
      ref: card,
    },
    link: {
      ref: link,
    },
  }
}

export default useClickableCard