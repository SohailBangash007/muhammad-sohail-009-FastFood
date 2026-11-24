import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Scroll-scrubbed rotation. Perfect for seals, orbits and ornamental rings —
 * gives that slow royal "ghoomna" instead of another boring zoom.
 */
export function useScrollSpin(
  scope,
  selector,
  { from = 0, to = 180, start = 'top bottom', end = 'bottom top', scrub = 1 } = {},
) {
  useLayoutEffect(() => {
    const root = scope?.current
    if (!root || prefersReduced()) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray(selector).forEach((element) => {
        gsap.fromTo(
          element,
          { rotate: from },
          {
            rotate: to,
            ease: 'none',
            scrollTrigger: { trigger: root, start, end, scrub },
          },
        )
      })
    }, scope)

    return () => ctx.revert()
  }, [scope, selector, from, to, start, end, scrub])
}

/**
 * Border-radius that morphs as you scroll — soft/pill shaped -> tailored card.
 * Combined with a tiny tilt so cards feel hand-crafted, not just scaled.
 */
export function useRoundedScroll(
  scope,
  selector,
  { from = 72, to = 24, rotate = -3, start = 'top 92%', end = 'top 40%', scrub = 1 } = {},
) {
  useLayoutEffect(() => {
    const root = scope?.current
    if (!root || prefersReduced()) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray(selector).forEach((element) => {
        gsap.fromTo(
          element,
          { borderRadius: from, rotate },
          {
            borderRadius: to,
            rotate: 0,
            ease: 'none',
            scrollTrigger: { trigger: element, start, end, scrub },
          },
        )
      })
    }, scope)

    return () => ctx.revert()
  }, [scope, selector, from, to, rotate, start, end, scrub])
}
