const u = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const categories = [
  'All',
  'Burgers',
  'Pizza',
  'Fast Food',
  'Drinks',
  'Desserts',
]

export const menu = [
  {
    id: 1,
    name: 'Smash Cheese Burger',
    category: 'Burgers',
    description:
      'Double smashed beef patty, melted cheddar, pickles and our secret house sauce in a toasted brioche bun.',
    price: 649,
    image: u('1568901346375-23c9450c58cd'),
    tag: 'Bestseller',
    rating: 4.9,
    spicy: false,
  },
  {
    id: 2,
    name: 'Double Beast Burger',
    category: 'Burgers',
    description:
      'Two juicy patties, crispy bacon, jalapeños, smoky BBQ and a layer of gooey mozzarella. Eat with both hands.',
    price: 849,
    image: u('1550547660-d9450f859349'),
    tag: 'Fan Favourite',
    rating: 4.8,
    spicy: true,
  },
  {
    id: 3,
    name: 'Crispy Chicken Burger',
    category: 'Burgers',
    description:
      'Golden buttermilk fried chicken, crunchy slaw, spicy mayo and a soft potato bun. Pure crunch in every bite.',
    price: 599,
    image: u('1606755962773-d324e0a13086'),
    tag: 'Spicy',
    rating: 4.7,
    spicy: true,
  },
  {
    id: 4,
    name: 'Classic BBQ Burger',
    category: 'Burgers',
    description:
      'Flame-grilled beef, caramelised onions, cheddar and slow-cooked BBQ glaze. A timeless classic done right.',
    price: 699,
    image: u('1571091718767-18b5b1457add'),
    tag: '',
    rating: 4.6,
    spicy: false,
  },
  {
    id: 5,
    name: 'Margherita Pizza',
    category: 'Pizza',
    description:
      'Hand-stretched dough, sweet tomato sauce, fresh mozzarella and basil, baked in our stone oven until golden.',
    price: 749,
    image: u('1574071318508-1cdbab80d002'),
    tag: 'Bestseller',
    rating: 5.0,
    spicy: false,
  },
  {
    id: 6,
    name: 'Chicken Tikka Pizza',
    category: 'Pizza',
    description:
      'Tandoori chicken tikka, red onions, green peppers and a drizzle of spicy mayo on a crisp cornmeal base.',
    price: 999,
    image: u('1593560708920-61dd98c46a4e'),
    tag: 'Chef’s Pick',
    rating: 4.9,
    spicy: true,
  },
  {
    id: 7,
    name: 'Veggie Supreme Pizza',
    category: 'Pizza',
    description:
      'Mushrooms, peppers, sweet corn, olives and mozzarella on a tangy tomato base. Loaded with the good stuff.',
    price: 549,
    image: u('1571407970349-bc81e7e96d47'),
    tag: '',
    rating: 4.6,
    spicy: false,
  },
  {
    id: 8,
    name: 'Four Cheese Pizza',
    category: 'Pizza',
    description:
      'Mozzarella, cheddar, parmesan and ricotta melted together over a garlicky white sauce. A cheese lover’s dream.',
    price: 499,
    image: u('1604382355076-af4b0eb60143'),
    tag: '',
    rating: 4.5,
    spicy: false,
  },
  {
    id: 9,
    name: 'Loaded Cheese Fries',
    category: 'Fast Food',
    description:
      'Crispy skin-on fries drowned in melted cheese sauce, jalapeños, spring onions and a dusting of paprika.',
    price: 399,
    image: u('1573080496219-bb080dd4f877'),
    tag: 'Bestseller',
    rating: 4.8,
    spicy: false,
  },
  {
    id: 10,
    name: 'Crispy Fried Chicken',
    category: 'Fast Food',
    description:
      'Four pieces of juicy, hand-breaded chicken fried to a deep golden crunch. Served with our fiery dip.',
    price: 699,
    image: u('1562967914-608f82629710'),
    tag: 'Spicy',
    rating: 4.9,
    spicy: true,
  },
  {
    id: 11,
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    description:
      'Hand-stretched dough, tangy tomato base, loads of pepperoni and bubbling mozzarella from a stone oven.',
    price: 899,
    image: u('1513104890138-7c749659a591'),
    tag: '',
    rating: 4.7,
    spicy: false,
  },
  {
    id: 12,
    name: 'Chicken Wrap',
    category: 'Fast Food',
    description:
      'Grilled chicken strips, crunchy veggies, garlic sauce and fresh herbs rolled in a warm flatbread.',
    price: 449,
    image: u('1539252554453-80ab65ce3586'),
    tag: 'New',
    rating: 4.5,
    spicy: false,
  },
  {
    id: 13,
    name: 'Mango Mania Shake',
    category: 'Drinks',
    description:
      'Thick, creamy mango shake blended with real fruit and finished with a swirl of whipped cream.',
    price: 299,
    // Old Unsplash ID was an abstract gradient wallpaper, not a mango shake.
    image: 'https://images.pexels.com/photos/6493405/pexels-photo-6493405.jpeg?auto=compress&cs=tinysrgb&w=900',
    tag: 'New',
    rating: 4.8,
    spicy: false,
  },
  {
    id: 14,
    name: 'Iced Cold Coffee',
    category: 'Drinks',
    description:
      'Bold espresso, chilled milk and ice, shaken to perfection. The perfect partner for a spicy pizza.',
    price: 279,
    image: u('1461023058943-07fcbe16d735'),
    tag: '',
    rating: 4.6,
    spicy: false,
  },
  {
    id: 15,
    name: 'Choco Lava Cake',
    category: 'Desserts',
    description:
      'Warm chocolate sponge with a molten centre, served with a scoop of vanilla ice cream. Pure indulgence.',
    price: 349,
    image: u('1606313564200-e75d5e30476c'),
    tag: 'Bestseller',
    rating: 4.9,
    spicy: false,
  },
  {
    id: 16,
    name: 'Vanilla Bean Ice Cream',
    category: 'Desserts',
    description:
      'Slow-churned vanilla bean ice cream, smooth and rich. A simple, perfect way to end your meal.',
    price: 249,
    image: u('1563805042-7684c019e1cb'),
    tag: '',
    rating: 4.5,
    spicy: false,
  },
  {
    id: 17,
    name: 'Chicken Rolls',
    category: 'Fast Food',
    description:
      'Soft flatbread rolled around juicy grilled chicken, crunchy salad and our garlicky mayo, then toasted till golden.',
    price: 399,
    // Chicken shawarma-style wrap, not a generic abstract photo.
    image:
      'https://images.pexels.com/photos/29306505/pexels-photo-29306505.jpeg?auto=compress&cs=tinysrgb&w=900',
    tag: 'New',
    rating: 4.7,
    spicy: false,
  },
  {
    id: 18,
    name: 'Pizza Chicken Rolls',
    category: 'Pizza',
    description:
      'Our pizza dough rolled around spiced chicken, mozzarella and tomato sauce, then baked until bubbling and crisp.',
    price: 549,
    image:
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=900',
    tag: 'New',
    rating: 4.8,
    spicy: true,
  },
]

export const testimonials = [
  {
    name: 'Ayesha Khan',
    role: 'Food Blogger',
    quote:
      'Honestly the best pizza I have had in this city. That wood-fired crust hits you before the first bite — and the burger? Absolutely addictive.',
    rating: 5,
    image: u('1494790108377-be9c29b29330', 200),
  },
  {
    name: 'Bilal Ahmed',
    role: 'Regular Customer',
    quote:
      'Zaika is our Friday night tradition. Consistent taste, generous portions and the friendliest staff around. The Double Beast is a monster — in the best way.',
    rating: 5,
    image: u('1500648767791-00dcc994a43e', 200),
  },
  {
    name: 'Sara Mahmood',
    role: 'Instagram Creator',
    quote:
      'From the loaded fries to the choco lava cake, everything is made with real care. Beautiful packaging, quick delivery and zero compromises on flavour.',
    rating: 5,
    image: u('1534528741775-53994a69daeb', 200),
  },
]

export const images = {
  hero: u('1568901346375-23c9450c58cd', 1800),
  interior: u('1517248135467-4c7edcad34c4', 1200),
  chef: u('1577219491135-ce391730fb2c', 900),
  signature: u('1574071318508-1cdbab80d002', 1400),
  team: u('1552566626-52f8b828add9', 1200),
  kitchen: u('1577219491135-ce391730fb2c', 1400),
}

export const team = [
  {
    name: 'Chef Imran',
    role: 'Head Chef & Founder',
    // Male chef in apron — the old photo was a generic kitchen shot.
    image: 'https://images.pexels.com/photos/6605423/pexels-photo-6605423.jpeg?auto=compress&cs=tinysrgb&w=700',
    bio: 'The man behind the fire. Imran started Zaika with one grill and a very stubborn idea about flavour.',
  },
  {
    name: 'Chef Nadia',
    role: 'Pizza Specialist',
    // Female chef in uniform — the old ID showed the wrong person.
    image: 'https://images.pexels.com/photos/30515754/pexels-photo-30515754.jpeg?auto=compress&cs=tinysrgb&w=700',
    bio: 'Knows every secret of the dough. Nadia makes sure every pizza comes out crisp, chewy and perfectly golden.',
  },
  {
    name: 'Bilal',
    role: 'Front of House',
    // Male front-of-house portrait — the old ID showed a woman.
    image: 'https://images.pexels.com/photos/12158312/pexels-photo-12158312.jpeg?auto=compress&cs=tinysrgb&w=700',
    bio: 'The smiling face that makes you feel at home. Ask him for a recommendation — he never misses.',
  },
]

export const gallery = [
  {
    image: u('1568901346375-23c9450c58cd', 900),
    label: 'The smash',
    span: 'lg:col-span-2 lg:row-span-2',
    to: '/product/1',
  },
  { image: u('1565299624946-b28f40a0ae38', 800), label: 'Margherita pizza', to: '/product/5' },
  { image: u('1573080496219-bb080dd4f877', 800), label: 'Loaded fries', to: '/product/9' },
  { image: u('1606313564200-e75d5e30476c', 800), label: 'Choco lava', to: '/product/15' },
  { image: u('1517248135467-4c7edcad34c4', 900), label: 'Our dining room', to: '/products' },
]

export const timeline = [
  {
    year: '2010',
    title: 'One grill, big dreams',
    text: 'Zaika opened as a tiny corner grill with a hand-written menu and two tables. The first smash burger sold out in an hour.',
  },
  {
    year: '2014',
    title: 'The pizza arrives',
    text: 'After years of experiments, our stone-oven pizza recipe was finally perfected — and instantly became the most-ordered dish.',
  },
  {
    year: '2018',
    title: 'A bigger home',
    text: 'We moved to Food Street, doubled the kitchen and hired the crew that still runs the pass today.',
  },
  {
    year: '2022',
    title: 'Delivered to your door',
    text: 'Hot-pack packaging and our own delivery fleet meant the full Zaika experience could travel across the city.',
  },
  {
    year: '2026',
    title: 'Still obsessed with flavour',
    text: 'New dishes, same obsession. More than 15,000 happy foodies later, we are only just getting started.',
  },
]

export const values = [
  {
    number: '01',
    title: 'Real ingredients',
    text: 'No shortcuts, no mystery sauces. We buy good meat, fresh vegetables and whole spices — and let them do the talking.',
    icon: 'leaf',
  },
  {
    number: '02',
    title: 'Respect the recipe',
    text: 'Some things take time. Our pizza dough rests for two hours before it hits the stone oven because that is how it should be done. No rushing.',
    icon: 'flame',
  },
  {
    number: '03',
    title: 'Serve like family',
    text: 'Whether it is your first visit or your fiftieth, you get the same warmth, the same care and the same extra napkins.',
    icon: 'heart',
  },
]
