import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * GSAP + ScrollTrigger stagger reveal for a card grid.
 * Add data-card to every card inside the scope element.
 *
 * @param {React.RefObject} scope - ref of the grid wrapper
 * @param {object} options - start, stagger, y and deps (re-run when deps change)
 */
export function useGsapCards(
  scope,
  { start = 'top 82%', stagger = 0.12, y = 70, rotate = 3, deps = [] } = {},
) {
  useLayoutEffect(() => {
    if (!scope.current) return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-card]')
      if (!cards.length) return

      gsap.from(cards, {
        // Keep cards visible until the trigger actually runs — otherwise a
        // missed trigger leaves them at opacity 0 and unclickable-looking.
        immediateRender: false,
        opacity: 0,
        y,
        scale: 0.94,
        rotateX: -8,
        rotate: (i) => (i % 2 === 0 ? -rotate : rotate),
        borderRadius: 42,
        transformOrigin: 'center bottom',
        duration: 0.95,
        ease: 'power3.out',
        stagger,
        clearProps: 'transform,opacity,borderRadius',
        scrollTrigger: {
          trigger: scope.current,
          start,
          once: true,
        },
      })
    }, scope)

    return () => ctx.revert()
  }, [scope, start, stagger, y, rotate, ...deps])
}
