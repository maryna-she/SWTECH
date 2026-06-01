export type ProductCategory = 'hiking' | 'camping' | 'surfing';

export interface Product {
  id: string;
  category: ProductCategory;
  price: string;
  rating: string;
  accent: string;
  title: {
    de: string;
    en: string;
  };
  shortText: {
    de: string;
    en: string;
  };
  description: {
    de: string;
    en: string;
  };
  details: {
    de: string[];
    en: string[];
  };
}

export const products: Product[] = [
  {
    id: 'alpine-pack',
    category: 'hiking',
    price: '129 EUR',
    rating: '4.8',
    accent: '#2f6f4f',
    title: {
      de: 'Alpine Trail Rucksack',
      en: 'Alpine Trail Backpack',
    },
    shortText: {
      de: 'Leichter 38-Liter-Rucksack für Tages- und Wochenendtouren.',
      en: 'Light 38-liter backpack for day hikes and weekend routes.',
    },
    description: {
      de: 'Ein stabiler Trekking-Rucksack mit belüftetem Rücken, Regenhülle und schneller Seitentasche für Flasche oder Karte.',
      en: 'A stable trekking backpack with a ventilated back panel, rain cover, and quick side pocket for a bottle or map.',
    },
    details: {
      de: ['38 Liter Volumen', 'Wasserabweisende Außenhaut', 'Verstellbarer Hüftgurt'],
      en: ['38 liter capacity', 'Water-resistant shell', 'Adjustable hip belt'],
    },
  },
  {
    id: 'summit-shell',
    category: 'hiking',
    price: '189 EUR',
    rating: '4.7',
    accent: '#58715f',
    title: {
      de: 'Summit Shell Jacke',
      en: 'Summit Shell Jacket',
    },
    shortText: {
      de: 'Atmungsaktive Wetterschicht für Wind, Regen und wechselnde Höhenlagen.',
      en: 'Breathable weather layer for wind, rain, and changing elevation.',
    },
    description: {
      de: 'Die Shell-Jacke lässt sich klein packen, schützt vor Regen und bleibt bei langen Anstiegen angenehm leicht.',
      en: 'This shell packs down small, protects against rain, and stays comfortable on long climbs.',
    },
    details: {
      de: ['Versiegelte Nähte', 'Helmkompatible Kapuze', 'Zweiwege-Belüftung'],
      en: ['Sealed seams', 'Helmet-ready hood', 'Two-way ventilation'],
    },
  },
  {
    id: 'basecamp-tent',
    category: 'camping',
    price: '249 EUR',
    rating: '4.9',
    accent: '#bf6f33',
    title: {
      de: 'Basecamp Zwei-Personen-Zelt',
      en: 'Basecamp Two-Person Tent',
    },
    shortText: {
      de: 'Robustes Zelt mit schneller Montage für Wochenenden draußen.',
      en: 'Durable tent with fast setup for weekends outside.',
    },
    description: {
      de: 'Das freistehende Zelt bietet Platz für zwei Personen, gute Belüftung und eine Apsis für nasse Ausrüstung.',
      en: 'The freestanding tent fits two people, keeps air moving, and adds a vestibule for wet gear.',
    },
    details: {
      de: ['3-Jahreszeiten-Aufbau', 'Apsis für Gepäck', 'Farbcodierte Stangen'],
      en: ['3-season build', 'Vestibule for gear', 'Color-coded poles'],
    },
  },
  {
    id: 'camp-light',
    category: 'camping',
    price: '49 EUR',
    rating: '4.6',
    accent: '#d4a340',
    title: {
      de: 'Orbit Camp Laterne',
      en: 'Orbit Camp Lantern',
    },
    shortText: {
      de: 'Kompakte Laterne mit warmem Licht und USB-C-Ladung.',
      en: 'Compact lantern with warm light and USB-C charging.',
    },
    description: {
      de: 'Die dimmbare Laterne leuchtet den Campingtisch aus und hängt bei Bedarf direkt im Zelt.',
      en: 'The dimmable lantern lights the camp table and can hang directly inside the tent.',
    },
    details: {
      de: ['Bis 38 Stunden Laufzeit', 'Spritzwasserschutz', 'Magnetischer Fuß'],
      en: ['Up to 38 hours runtime', 'Splash resistant', 'Magnetic base'],
    },
  },
  {
    id: 'coast-board',
    category: 'surfing',
    price: '399 EUR',
    rating: '4.8',
    accent: '#347b88',
    title: {
      de: 'Coastline Softboard',
      en: 'Coastline Softboard',
    },
    shortText: {
      de: 'Fehlerverzeihendes Board für kleine Wellen und sichere Sessions.',
      en: 'Forgiving board for small waves and confident sessions.',
    },
    description: {
      de: 'Das Softboard kombiniert stabilen Auftrieb mit griffigem Deck und eignet sich für Einsteiger sowie entspannte Reisetage.',
      en: 'This softboard combines stable float with a grippy deck for beginners and easy travel days.',
    },
    details: {
      de: ['7 Fuß Länge', 'Inklusive Finnen', 'Rutschfestes Softdeck'],
      en: ['7 foot length', 'Fins included', 'Non-slip soft deck'],
    },
  },
  {
    id: 'reef-wetsuit',
    category: 'surfing',
    price: '159 EUR',
    rating: '4.7',
    accent: '#1f5362',
    title: {
      de: 'Reef 3/2 Wetsuit',
      en: 'Reef 3/2 Wetsuit',
    },
    shortText: {
      de: 'Flexibler Neoprenanzug für kühle Morgen am Wasser.',
      en: 'Flexible wetsuit for cool mornings by the water.',
    },
    description: {
      de: 'Der 3/2-Anzug hält warm, bleibt beweglich und nutzt glatte Manschetten gegen Wassereintritt.',
      en: 'The 3/2 suit keeps warmth in, stays flexible, and uses smooth cuffs to limit water entry.',
    },
    details: {
      de: ['3/2 mm Neopren', 'Brust-Reißverschluss', 'Verstärkte Knie'],
      en: ['3/2 mm neoprene', 'Chest zip', 'Reinforced knees'],
    },
  },
];

export const findProduct = (productId: string | undefined) =>
  products.find((product) => product.id === productId);
