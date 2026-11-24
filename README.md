# Sohail's Food House — Restaurant Website

A complete, responsive restaurant website built with **React + Vite**, **Tailwind CSS v4**, **Framer Motion** and **GSAP (ScrollTrigger)**.

Brand: **SOHAIL** · Loader text: **ROCKY** · Phone: **0312 9939906**

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

For production build:

```bash
npm run build
npm run preview
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, menu, signature, features, reviews, reservation |
| `/about` | About — story, journey timeline, values, meet the team, gallery + CTA |
| `/menu` | Menu — full filterable food menu + signature dish + CTA |
| `/products` | **Product list page** — search, category chips, sorting and a full product grid (replaces the Reviews nav link) |
| `/product/:id` | **Product detail page** — dish image, price, quantity, add to cart, related products |
| `/contact` | Contact — reservation form, contact details + CTA |
| `*` | Animated 404 page |

Every food card on the menu (and the related-product cards) links to its own `/product/:id` page.

## What's included

- **Dark / light theme toggle** in the navbar — choice saved in `localStorage`
- Intro loader animation showing **ROCKY** on first load + smooth page transitions
- Multi-page routing with React Router
- Sticky, scroll-aware navbar with animated mobile menu and cart badge
- Updated hero: Ken Burns image motion, rotating shimmer text, floating food emojis, call button, today's special card
- **Many animation types, not just zoom:**
  - **GSAP** — scroll parallax, line reveals, clip-path reveals, staggered cards, counters, scrolling marquee, timeline draw
  - **Framer Motion** — magnetic buttons that follow the cursor, rolling number counters, left-to-right clip wipes on headings, cursor-following card glow, 3D tilt + spring cards, drag-to-swipe testimonials, animated add-to-cart toast, layout/filter transitions, page slide-in
- Cinematic full-bleed food cards (`FoodCard.jsx`): hover detail slide-up, gold price pill, editorial index, 3D tilt, cursor glow — shared by Menu and Products pages
- Filterable food menu with Framer Motion layout animations
- Product detail pages with GSAP image reveal, quantity picker and related dishes
- Working shopping cart drawer: add/remove items, quantity controls, subtotal, delivery and order confirmation
- Testimonial carousel with autoplay, manual controls and swipe/drag support
- Reservation form with success state and click-to-call phone number
- Footer with newsletter signup, scroll progress bar and back-to-top button
- Fully responsive (mobile / tablet / desktop) with reduced-motion support

## Customise it

| What | Where |
| --- | --- |
| Restaurant name, logo text | `src/components/Navbar.jsx`, `src/components/Footer.jsx` |
| Loader text (ROCKY) | `src/App.jsx` (`IntroLoader`) |
| Phone number | `src/components/Hero.jsx`, `Reservation.jsx`, `Footer.jsx`, `ProductPage.jsx` |
| Contact details, address, hours | `src/components/Reservation.jsx`, `src/components/Footer.jsx` |
| Menu items, prices, categories, images | `src/data/site.js` |
| Timeline, team, gallery & images | `src/data/site.js` |
| Theme colours (dark + light) | `src/index.css` (`@theme`, `html[data-theme="light"]`, `.force-dark`) |
| Routes & product route | `src/App.jsx` |
| Delivery fee / free delivery limit | `src/context/CartContext.jsx` (Rs. 1,500) and `src/components/CartDrawer.jsx` |

Images are loaded from Unsplash with an automatic emoji fallback if a link fails.

## Tech notes

- Tailwind v4 is wired through the `@tailwindcss/vite` plugin (no `tailwind.config.js` needed).
- Light mode works by swapping CSS colour variables; cinematic sections keep their dark palette via `.force-dark`.
- GSAP handles scroll-linked effects; Framer Motion handles component/UI animation.
- No backend — the cart, booking and newsletter are front-end demos. Connect them to your API when ready.
