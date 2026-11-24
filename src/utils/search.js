/**
 * Small, dependency-free fuzzy search used by the menu and product grids.
 * Handles typos ("burgger"), plurals and common ordering words
 * ("margherita" -> pizza, "juice" -> drinks).
 */

const aliases = {
  burguer: 'burger',
  burgar: 'burger',
  burgger: 'burger',
  burger: 'burger',
  burgers: 'burger',
  margherita: 'pizza',
  margarita: 'pizza',
  margerita: 'pizza',
  margreta: 'pizza',
  margrita: 'pizza',
  marghareta: 'pizza',
  margheritha: 'pizza',
  pizza: 'pizza',
  pizzas: 'pizza',
  juice: 'drink',
  juices: 'drink',
  juise: 'drink',
  juiece: 'drink',
  shake: 'drink',
  shakes: 'drink',
  coldcoffee: 'coffee',
  icecream: 'icecream',
  icecreams: 'icecream',
  gelato: 'icecream',
  piza: 'pizza',
  pizzza: 'pizza',
  roll: 'rolls',
  fries: 'fries',
  chips: 'fries',
  wrap: 'wrap',
  wraps: 'wrap',
  cake: 'cake',
  cakes: 'cake',
  dessert: 'dessert',
  desserts: 'dessert',
  drink: 'drink',
  drinks: 'drink',
}

const tokens = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

const singular = (word) => (word.length > 3 && word.endsWith('s') ? word.slice(0, -1) : word)

/**
 * If the word is a known alias/typo, use only its canonical form. Otherwise
 * keep the word and its singular. Returning alternatives (instead of adding
 * them) avoids false hits such as "juice" matching "juicy" burgers.
 */
const expand = (word) => {
  const alias = aliases[word] || aliases[singular(word)]
  if (alias) return [alias, singular(alias)]
  return [word, singular(word)]
}

function distance(a, b) {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i]
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    previous = current
  }
  return previous[b.length]
}

function close(a, b) {
  if (a === b) return true
  if (a.length < 3 || b.length < 3) return false
  if (a.includes(b) || b.includes(a)) return true
  const shorter = Math.min(a.length, b.length)
  const allowed = shorter <= 5 ? 1 : 2
  return distance(a, b) <= allowed
}

/** True when every (fuzzy-expanded) query word matches something in the item. */
export function matchesSearch(item, query) {
  const words = tokens(query)
  if (!words.length) return true

  const needle = words.map(expand)
  const haystack = tokens(
    `${item.name} ${item.category} ${item.description} ${item.tag || ''}`,
  ).flatMap(expand)

  // Each typed word needs at least one of its forms (typo / alias / plural) to hit.
  return needle.every((forms) => forms.some((word) => haystack.some((candidate) => close(word, candidate))))
}

export function filterByQuery(items, query) {
  return items.filter((item) => matchesSearch(item, query))
}
