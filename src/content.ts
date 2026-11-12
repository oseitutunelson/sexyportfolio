// ---- Fashion collections ---------------------------------------------------
// Images live in /public/designs (rendered from the Illustrator .ai files).
export type Design = {
  slug: string
  title: string
  collection: string
  blurb: string
  image: string
  accent: string
  tags: string[]
  credit?: string
}

export type Collection = {
  slug: string
  title: string
  status: 'live' | 'soon'
  emoji: string
  blurb: string
}

export const collections: Collection[] = [
  { slug: 'football-kits', title: 'Football Kits', status: 'live', emoji: '⚽', blurb: 'Concept kits, tracksuits and jackets for clubs around the world, designed in Adobe Illustrator.' },
  { slug: 'street-wear', title: 'Street Wear', status: 'live', emoji: '🧢', blurb: 'Hoodies, tees and denim with a graphic, everyday edge, drawn in Adobe Illustrator.' },
  { slug: 'leather', title: 'Leather', status: 'live', emoji: '🧥', blurb: 'Leather and faux-leather jackets, tops, trousers and shorts, with lace and gold hardware details.' },
  { slug: 'womenswear', title: "Women's Wear", status: 'soon', emoji: '👗', blurb: 'Dresses, sets and everyday pieces for women.' },
  { slug: 'swimwear', title: 'Swimwear', status: 'soon', emoji: '👙', blurb: 'Swimsuits, bikinis and beach-ready looks.' },
]

// TODO: edit the titles and blurbs below to match how you want each piece described.
export const designs: Design[] = [
  { slug: 'sponsored-jersey', title: 'Sexy Sponsored Jersey', collection: 'football-kits', accent: '#FF2E93', tags: ['Jersey', 'Front & back'], blurb: 'A black pinstripe jersey with red sponsor lettering, a retro V-neck and a hand-drawn number 10 on the back.', image: '/designs/sponsored-jersey.webp' },
  { slug: 'juventus', title: 'Juventus Bianconeri Kit', collection: 'football-kits', accent: '#FFC83D', tags: ['Polo kit', 'Concept'], blurb: 'A polo-collar Juventus concept in black with a "Bianconeri" chest panel and a bold number 5 on the back.', image: '/designs/juventus.webp' },
  { slug: 'kotoko-mobile', title: 'Asante Kotoko Kit', collection: 'football-kits', accent: '#FF6B4A', tags: ['Jersey', 'Concept'], blurb: 'A bright red Asante Kotoko concept with clean seam lines, the club badge on the chest and a number 10 on the back.', image: '/designs/kotoko-mobile.webp' },
  { slug: 'luton-town', title: 'Luton Town Kit', collection: 'football-kits', accent: '#3DB8FF', tags: ['Home kit', 'Shirt & shorts'], blurb: 'A white and navy Luton Town home kit with a matching shirt front, back and shorts.', image: '/designs/luton-town.webp' },
  { slug: 'man-united-tracksuit', title: 'Manchester United Track Suit', collection: 'football-kits', accent: '#FF2E93', tags: ['Tracksuit', 'Jacket & pants'], blurb: 'A black and red zip-up track jacket with wide pants, built around sweeping panel lines.', image: '/designs/man-united-tracksuit.webp' },
  { slug: 'palace-ios', title: 'Crystal Palace Tracksuit', collection: 'football-kits', accent: '#7B4DFF', tags: ['Tracksuit', 'Jacket & pants'], blurb: 'A black Crystal Palace tracksuit with red and blue flame-style panels running down the jacket and pants.', image: '/designs/palace-ios.webp' },
  { slug: 'inter-milan-jacket', title: 'Inter Milan Jacket', collection: 'football-kits', accent: '#3DB8FF', tags: ['Jacket', 'Jacket & pants'], blurb: 'A minimal black Inter Milan track jacket with subtle blue pinstripes and matching wide-leg pants.', image: '/designs/inter-milan-jacket.webp' },
  { slug: 'panathinaikos', title: 'Panathinaikos Kit', collection: 'football-kits', accent: '#2EE6A6', tags: ['Home kit', 'Concept'], blurb: 'A crisp white and green Panathinaikos home kit with a green-trimmed back and number 13.', image: '/designs/panathinaikos.webp' },
  { slug: 'atalanta', title: 'Atalanta Long-sleeve Kit', collection: 'football-kits', accent: '#7B4DFF', tags: ['Long sleeve', 'Front & back'], blurb: 'A long-sleeve Atalanta concept in blue and black stripes with dark side panels.', image: '/designs/atalanta.webp' },
  // ---- Street Wear (TODO: edit titles and blurbs) ----
  { slug: 'omnee-hoodie', title: 'Omnee Hoodie', collection: 'street-wear', accent: '#2EE6A6', tags: ['Hoodie', 'Front & back'], blurb: 'An oversized teal hoodie with script lettering on the chest and down both sleeves, and a soft faded patch on the back.', image: '/designs/omnee-hoodie.webp' },
  { slug: 'denim-jorts', title: 'Denim Jorts', collection: 'street-wear', accent: '#3DB8FF', tags: ['Jorts', 'Front, back & side'], blurb: 'Wide-leg washed denim jorts with panelled seams, contrast stitching and flap back pockets.', image: '/designs/denim-jorts.webp' },
  { slug: 'but-why-man-tee', title: 'Megaleios Tee', collection: 'street-wear', accent: '#7B4DFF', tags: ['Layered tee', 'Front & back'], blurb: 'A white tee layered over black sleeves with script lettering, a dragon mark on the chest and a short poem on the back.', image: '/designs/but-why-man-tee.webp' },
  { slug: 'no-receipts-tee', title: 'No Receipts Tee', collection: 'street-wear', accent: '#FF6B4A', tags: ['Graphic tee', 'Front & back'], blurb: 'A black boxy tee with a quiet "No Receipts" chest print and a full receipt graphic on the back.', image: '/designs/no-receipts-tee.webp' },
  { slug: 'wanted-tees', title: 'Wanted & No Sleep Tees', collection: 'street-wear', accent: '#FF2E93', tags: ['Graphic tees', 'Two designs'], blurb: 'Two white graphic tees: a red "Wanted" poster print and a bold "No Sleep. Just Motion." back print.', image: '/designs/wanted-tees.webp' },
  { slug: 'megaleios-polo', title: 'Megaleios Polo Top', collection: 'street-wear', accent: '#3DB8FF', tags: ['Polo', 'Front & back'], credit: 'Sketched by @whyemmann', blurb: 'A navy polo with contrast black trim, the number 6 and 7 on the sleeves, a dragon mark and "Megaleios" script on the chest, and "Never Dying Average" along the back hem.', image: '/designs/megaleios-polo.webp' },
  { slug: 'street-is-the-office', title: 'Street Is The Office Tee', collection: 'street-wear', accent: '#FF6B4A', tags: ['Graphic tee', 'Front & back'], blurb: 'A black oversized tee with a collaged street scene on the chest and subtle print details on the back.', image: '/designs/street-is-the-office.webp' },
  { slug: 'bank-of-streets', title: 'Bank of Streets Graphic', collection: 'street-wear', accent: '#FF2E93', tags: ['Print artwork', 'Graphic'], blurb: 'The "Bank of Streets" ₵50 note artwork: hand-lettered numerals, a looping line drawing and serial-number type used as a print graphic.', image: '/designs/bank-of-streets.webp' },
  { slug: 'sexy-skull-caps', title: 'Sexy Skull Caps', collection: 'street-wear', accent: '#FFC83D', tags: ['Beanies', 'Front, back & side'], blurb: 'Black skull caps with "sexy.since the 90\'s" script, a small "SXY" mark and a gold round SEXY badge on the cuff.', image: '/designs/sexy-skull-caps.webp' },
  // ---- Leather (TODO: edit titles and blurbs) ----
  { slug: 'leather-top-pants', title: 'Leather Top & Pants', collection: 'leather', accent: '#FFC83D', tags: ['Co-ord set', 'Top, pants & jacket'], blurb: 'A brown leather co-ord: a sleeveless high-neck top with straight trousers, plus a cropped boxy jacket and mini skirt.', image: '/designs/leather-top-pants.webp' },
  { slug: 'leather-jacket-ladies', title: "Ladies' Leather Jacket Set", collection: 'leather', accent: '#7B4DFF', tags: ['Jacket', 'Set with briefs & belt'], blurb: 'A fitted black jacket with lace panels and gold zip details, styled with matching briefs and a studded leather belt.', image: '/designs/leather-jacket-ladies.webp' },
  { slug: 'leather-blouse-skirt', title: 'Leather Blouse & Skirt', collection: 'leather', accent: '#FF6B4A', tags: ['Top & skirt', 'Co-ord set'], blurb: 'A brown leather corset-style top with a black lace centre panel and tie sides, paired with a draped wrap skirt with stitched seams and snap tabs.', image: '/designs/leather-blouse-skirt.webp' },
  { slug: 'lace-jacket-skirt-belt', title: 'Lace-up Jacket, Skirt & Belt', collection: 'leather', accent: '#7B4DFF', tags: ['Jacket, skirt & belt', 'Co-ord set'], blurb: 'A black off-shoulder jacket with criss-cross lacing down the front and on the cuffs, a long skirt with an open lace-up side, and a brown studded belt with a scalloped gold buckle.', image: '/designs/lace-jacket-skirt-belt.webp' },
  { slug: 'pink-blouse-belt-skirt', title: 'Pink Blouse, Belt & Skirt', collection: 'leather', accent: '#FF2E93', tags: ['Top, belt & skirt', 'Co-ord set'], blurb: 'A strapless tube top with gold pentagon clasps down the centre, in pink and black, with a distressed brown leather belt and a pleated rust skirt.', image: '/designs/pink-blouse-belt-skirt.webp' },
  { slug: 'leather-bodycon-dress', title: 'Show-parts Leather Set', collection: 'leather', accent: '#FFC83D', tags: ['Corset, shorts & chain', 'Front & back'], blurb: 'A dark brown leather corset with gold eyelets and criss-cross lacing, a draped gold chain on the back and matching lace-side shorts.', image: '/designs/leather-bodycon-dress.webp' },
  { slug: 'faux-leather-lace-shorts', title: 'Faux Leather Lace Shorts', collection: 'leather', accent: '#FF2E93', tags: ['Shorts', 'Front & back'], blurb: 'Low-rise faux leather booty shorts with a lace-trimmed hem and a centre zip at the back.', image: '/designs/faux-leather-lace-shorts.webp' },
]

// ---- Code projects ---------------------------------------------------------
export type Project = {
  slug: string
  title: string
  summary: string
  stack: string[]
  url?: string
  repo?: string
}

export const projects: Project[] = [
  { slug: 'github', title: 'Open source on GitHub', summary: 'Full-stack and Solidity work lives on my GitHub. The list below is pulled live from my public repositories.', stack: ['Solidity', 'JavaScript', 'React'], repo: 'https://github.com/oseitutunelson' },
  // TODO: add your best 3 projects here, e.g.
  // { slug: 'my-dapp', title: 'My dApp', summary: '…', stack: ['Solidity','React'], url: 'https://…', repo: 'https://github.com/oseitutunelson/…' },
]

export const skills = [
  { name: 'Solidity', color: '#7B4DFF' },
  { name: 'JavaScript', color: '#FFC83D' },
  { name: 'React', color: '#3DB8FF' },
  { name: 'Node / Full-stack', color: '#2EE6A6' },
  { name: 'Adobe Illustrator', color: '#FF6B4A' },
  { name: 'Fashion design', color: '#FF2E93' },
]

export const rooms = [
  { path: '/about', label: 'About', theme: 'about' },
  { path: '/gallery', label: 'The Gallery', theme: 'gallery' },
  { path: '/studio', label: 'The Studio', theme: 'studio' },
  { path: '/contact', label: 'Contact', theme: 'contact' },
] as const
