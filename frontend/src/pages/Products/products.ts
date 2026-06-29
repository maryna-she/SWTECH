export type ProductCategory = 'hiking' | 'camping' | 'surfing';

export interface Product {
  id: string;
  category: ProductCategory;
  price: string;
  rating: string;
  accent: string;
  images: string[];
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
  /* ── Hiking ─────────────────────────────── */
  {
    id: 'trailhead-pack-38',
    category: 'hiking',
    price: '129 EUR',
    rating: '4.8',
    accent: '#2f6f4f',
    images: [
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Trailhead 38L Rucksack',
      en: 'Trailhead 38L Backpack',
    },
    shortText: {
      de: 'Leichter Tagesrucksack mit belüftetem Rücken und integrierter Regenhülle.',
      en: 'Lightweight day pack with ventilated back panel and built-in rain cover.',
    },
    description: {
      de: 'Der Trailhead kombiniert ein ausgereiftes Tragesystem mit cleverer Fächeraufteilung: Hauptfach mit Laptop-Sleeve, Seitentaschen für Wasserflaschen und ein gepolstertes Hüftflossen-System, das das Gewicht sicher auf die Hüfte überträgt.',
      en: 'The Trailhead pairs a refined suspension system with smart organisation: main compartment with laptop sleeve, bottle pockets on each side, and a padded hip-fin system that shifts weight onto your hips.',
    },
    details: {
      de: ['38 Liter Volumen', 'Gewicht: 1,1 kg', 'Integrierte Regenhülle', 'Hüftflossen-System', 'Laptop-Sleeve (bis 15")'],
      en: ['38-litre capacity', 'Weight: 1.1 kg', 'Built-in rain cover', 'Hip-fin suspension', 'Laptop sleeve (up to 15")'],
    },
  },
  {
    id: 'peak-shell-jacket',
    category: 'hiking',
    price: '219 EUR',
    rating: '4.9',
    accent: '#466b52',
    images: [
      'https://images.unsplash.com/photo-1531379296808-02421992e326?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Peak 3-Lagen Hardshelljacke',
      en: 'Peak 3-Layer Shell Jacket',
    },
    shortText: {
      de: 'Vollwasserdichte Hardshelljacke für anspruchsvolle Wetterbedingungen.',
      en: 'Fully waterproof hardshell for demanding mountain conditions.',
    },
    description: {
      de: 'Konstruiert aus einem 3-lagigen Membrangewebe mit 20.000 mm Wassersäule und 20.000 g/m²/24h Atmungsaktivität. Verschweißte Nähte, verstellbare Kapuze mit Helmdurchmesser und zwei belüftete Unterarmreißverschlüsse.',
      en: 'Built from a 3-layer membrane with a 20,000 mm waterhead and 20,000 g/m²/24h breathability. Welded seams, helmet-fit hood with single-hand adjustment, and underarm pit-zips for instant ventilation.',
    },
    details: {
      de: ['20.000 mm Wassersäule', 'Helmdurchmesser-Kapuze', 'Verschweißte Nähte', 'Unterarm-Belüftung', 'Packmaß: 1,2 L'],
      en: ['20,000 mm waterhead', 'Helmet-fit hood', 'Welded seams', 'Underarm pit-zips', 'Packed size: 1.2 L'],
    },
  },
  {
    id: 'merino-150-base',
    category: 'hiking',
    price: '79 EUR',
    rating: '4.7',
    accent: '#5a7a60',
    images: [
      'https://images.unsplash.com/Ds4TsdS095U?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Merino 150 Baselayer',
      en: 'Merino 150 Base Layer',
    },
    shortText: {
      de: '100 % Merinowolle — geruchshemmend, temperaturregulierend, für alle Jahreszeiten.',
      en: '100% merino wool — odour-resistant, temperature-regulating, year-round.',
    },
    description: {
      de: 'Das ultrafeine 150 g/m²-Merinogewebe transportiert Feuchtigkeit nach außen, ohne zu kratzen. Flache Nähte verhindern Scheuerstellen unter dem Rucksack, das schmale Schnittmuster passt als Second-Skin unter jede Schicht.',
      en: 'The 150 g/m² ultrafine merino moves moisture out without itching. Flatlock seams stop chafe under pack straps, and the slim cut sits like a second skin under any layer.',
    },
    details: {
      de: ['100 % Merinowolle', '150 g/m² Gewicht', 'Flache Nähte', 'Maschinenwaschbar', 'Slim Fit'],
      en: ['100% merino wool', '150 g/m² weight', 'Flatlock seams', 'Machine washable', 'Slim fit'],
    },
  },
  {
    id: 'granite-trail-shoes',
    category: 'hiking',
    price: '149 EUR',
    rating: '4.8',
    accent: '#3c6645',
    images: [
      'https://images.unsplash.com/photo-1456613820599-bfe244172af5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1632411316785-33d395035a3c?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Granite Trail Shoes',
      en: 'Granite Trail Shoes',
    },
    shortText: {
      de: 'Schnelle Trailrunning-Schuhe mit aggressivem Profil für nassen und felsigen Untergrund.',
      en: 'Fast trail shoes with aggressive lug pattern for wet rock and loose terrain.',
    },
    description: {
      de: 'Eine Gummizwischensohle mit 4 mm Lugs greift auf nassem Fels und Schotter sicher. Der wasserabweisende Mesh-Oberschuh hält leichten Regen draußen und trocknet schnell bei Überquerungen.',
      en: 'A sticky rubber outsole with 4 mm lugs grips wet rock and gravel confidently. The water-repellent mesh upper sheds light rain and dries fast after stream crossings.',
    },
    details: {
      de: ['4 mm Lug-Profil', 'Wasserabweisender Mesh', 'Schnellschnürsystem', 'Gewicht: 285 g/Stück', 'Drop: 6 mm'],
      en: ['4 mm lug pattern', 'Water-repellent mesh', 'Quick-lace system', 'Weight: 285 g each', '6 mm drop'],
    },
  },
  {
    id: 'carbon-trek-poles',
    category: 'hiking',
    price: '119 EUR',
    rating: '4.7',
    accent: '#2e5e40',
    images: [
      'https://images.unsplash.com/photo-1632411316785-33d395035a3c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Carbon Trail Stöcke',
      en: 'Carbon Trekking Poles',
    },
    shortText: {
      de: 'Ultraleichte Carbon-Stöcke mit Schnellverstellung — faltbar auf 38 cm.',
      en: 'Ultralight carbon poles with tool-free adjustment — fold to 38 cm.',
    },
    description: {
      de: 'Das Carbongeflechtsrohr absorbiert Vibrationen besser als Aluminium und spart je Stock etwa 80 g. Der Flick-Lock-Mechanismus lässt sich mit Handschuhen bedienen, die Korkgriffe halten auch bei feuchten Händen zuverlässig.',
      en: 'Carbon weave tubing absorbs vibration better than aluminium and shaves around 80 g per pole. The flick-lock mechanism works with gloves on; cork grips stay secure even when wet.',
    },
    details: {
      de: ['Vollcarbon-Schaft', 'Gewicht: 215 g/Stück', 'Länge: 100–130 cm', 'Korkgriffe', 'Faltbar auf 38 cm'],
      en: ['Full carbon shaft', 'Weight: 215 g each', 'Length: 100–130 cm', 'Cork grips', 'Folds to 38 cm'],
    },
  },

  /* ── Camping ────────────────────────────── */
  {
    id: 'ultralight-tent-2p',
    category: 'camping',
    price: '349 EUR',
    rating: '4.9',
    accent: '#c06b2f',
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558477280-1bfed08ea5db?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Ultralight 2-Personen Zelt',
      en: 'Ultralight 2-Person Tent',
    },
    shortText: {
      de: 'Vollfreistehendes 3-Jahreszeiten-Zelt — nur 1,4 kg Packgewicht.',
      en: 'Fully freestanding 3-season tent — just 1.4 kg packed.',
    },
    description: {
      de: 'Das Doppelwandsystem kombiniert ein atmungsaktives Innenzelt mit einem vollvernähten Außenzelt (3.000 mm Wassersäule). Zwei Apsiden bieten Platz für Schuhe und nasse Ausrüstung, die farbcodierten DAC-Stangen machen den Aufbau auch bei Dunkelheit einfach.',
      en: 'The double-wall system pairs a breathable inner with a fully seam-taped fly (3,000 mm waterhead). Two vestibules hold boots and wet gear; colour-coded DAC poles make setup easy in the dark.',
    },
    details: {
      de: ['Gewicht: 1,4 kg', '3.000 mm Wassersäule', 'Zwei Apsiden', 'DAC-Stangen', '3-Jahreszeiten'],
      en: ['Weight: 1.4 kg', '3,000 mm waterhead', 'Two vestibules', 'DAC poles', '3-season'],
    },
  },
  {
    id: 'sleeping-bag-minus5',
    category: 'camping',
    price: '189 EUR',
    rating: '4.8',
    accent: '#b85e2a',
    images: [
      'https://images.unsplash.com/photo-1558477280-1bfed08ea5db?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Daunenschlafsack −5 °C',
      en: 'Down Sleeping Bag −5 °C',
    },
    shortText: {
      de: 'Schlafsack mit 650-Fill-Daune — warm bis −5 °C, Packgröße einer Kokosnuss.',
      en: 'Sleeping bag with 650-fill down — warm to −5 °C, packs to the size of a coconut.',
    },
    description: {
      de: 'Hydrophob beschichtete 650-Fill-Daune behält ihre Wärmeleistung auch bei Feuchtigkeit. Der Mumienschnitt und der gepolsterte Kragenzug schließen Wärmeverluste am Hals. Das Packmaß von 4 L passt in jeden Rucksack.',
      en: 'Hydrophobic-treated 650-fill down holds loft even when damp. A mummy cut and padded collar cinch closes heat leaks at the neck. At 4 L packed, it fits inside any bag.',
    },
    details: {
      de: ['Komfortgrenze: −5 °C', '650-Fill Daune', 'Hydrophobe Beschichtung', 'Packmaß: 4 L', 'Gewicht: 920 g'],
      en: ['Comfort rating: −5 °C', '650-fill down', 'Hydrophobic coating', 'Packed size: 4 L', 'Weight: 920 g'],
    },
  },
  {
    id: 'jetboil-stove-kit',
    category: 'camping',
    price: '99 EUR',
    rating: '4.8',
    accent: '#cc7733',
    images: [
      'https://images.unsplash.com/N561DZ3NfVM?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1660876633753-975a18cf78da?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Flash Kochsystem',
      en: 'Flash Cooking System',
    },
    shortText: {
      de: 'Integriertes Kochsystem kocht 500 ml Wasser in unter 100 Sekunden.',
      en: 'Integrated cooking system boils 500 ml of water in under 100 seconds.',
    },
    description: {
      de: 'Das Thermoregulierventil sorgt auch auf über 3.000 m und bei kalten Temperaturen für eine konstante Flamme. Topf, Brenner und Gaskartusche (100 g) passen ineinander zusammen — weniger als 450 g Gesamtgewicht.',
      en: 'A pressure-regulating valve keeps a steady flame above 3,000 m and in cold conditions. Pot, burner, and a 100 g canister nest together into under 450 g total weight.',
    },
    details: {
      de: ['Kochzeit: < 100 Sek. / 500 ml', 'Druckregelventil', 'Kapazität: 1 Liter', 'Gewicht: 371 g (ohne Kartusche)', 'Piezo-Zündung'],
      en: ['Boil time: < 100 s / 500 ml', 'Pressure-regulating valve', 'Capacity: 1 litre', 'Weight: 371 g (no canister)', 'Piezo ignition'],
    },
  },
  {
    id: 'helinox-chair-one',
    category: 'camping',
    price: '139 EUR',
    rating: '4.7',
    accent: '#d4902e',
    images: [
      'https://images.unsplash.com/photo-1660876633753-975a18cf78da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/N561DZ3NfVM?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Ultralight Campingstuhl',
      en: 'Ultralight Camp Chair',
    },
    shortText: {
      de: 'Nur 890 g — zusammengefaltet kleiner als ein Wasserkocher.',
      en: 'Just 890 g — folds smaller than a water bottle.',
    },
    description: {
      de: 'Hochwanderndes Aluminiumgestell mit Y-Frame-Basis trägt bis 145 kg. Der dehnbare Textilenkorb sitzt tief und entspannt, die angespritzten Pole-Verbinder sind pfeilfest codiert und lassen sich in drei Minuten aufbauen.',
      en: 'A high-alloy aluminium frame with a Y-foot base supports up to 145 kg. The tensioned fabric seat sits low and relaxed; colour-coded pole connectors clip together in three minutes.',
    },
    details: {
      de: ['Gewicht: 890 g', 'Tragfähigkeit: 145 kg', 'Packmass: 35 × 10 cm', 'Aluminium-Gestell', 'Aufbauzeit: ~ 3 Min.'],
      en: ['Weight: 890 g', 'Max load: 145 kg', 'Packed: 35 × 10 cm', 'Aluminium frame', 'Setup time: ~3 min'],
    },
  },
  {
    id: 'trail-water-filter',
    category: 'camping',
    price: '69 EUR',
    rating: '4.9',
    accent: '#bf6020',
    images: [
      'https://images.unsplash.com/JxfqcLB9bo0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Trail Wasserfilter',
      en: 'Trail Water Filter',
    },
    shortText: {
      de: 'Filtert 99,9999 % aller Bakterien und 99,9 % aller Protozoen in Echtzeit.',
      en: 'Filters 99.9999% of bacteria and 99.9% of protozoa in real time.',
    },
    description: {
      de: 'Der Hohlfasermembranfilter mit 0,1-Mikron-Porengröße funktioniert ohne Chemikalien oder Wartezeit. Trinke direkt aus dem Filter, fülle Wasserflaschen oder hänge ihn als Schwerkraftfilter auf — ein einziger Filter hält bis zu 100.000 Liter.',
      en: 'A hollow-fibre membrane at 0.1 microns works without chemicals or wait times. Drink directly through the filter, fill bottles, or hang it as a gravity filter — one filter lasts up to 100,000 litres.',
    },
    details: {
      de: ['0,1 Mikron Membran', 'Haltbarkeit: 100.000 L', 'Gewicht: 57 g', 'Keine Chemikalien', 'Rückspülbar'],
      en: ['0.1 micron membrane', 'Lifespan: 100,000 L', 'Weight: 57 g', 'No chemicals needed', 'Backflushable'],
    },
  },

  /* ── Surfing ────────────────────────────── */
  {
    id: 'funshape-62',
    category: 'surfing',
    price: '489 EUR',
    rating: '4.8',
    accent: '#2a7a8a',
    images: [
      'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/stj-A6E6II8?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Fun Shape Surfboard 6\'2"',
      en: 'Fun Shape Surfboard 6\'2"',
    },
    shortText: {
      de: 'Vielseitiger Mid-Length für kleine bis mittelgroße Wellen — paddelt wie ein Longboard, surft wie ein Shortboard.',
      en: 'Versatile mid-length for waist-to-head-high surf — paddles like a long board, turns like a short.',
    },
    description: {
      de: 'Das breitere Nose-Template und der flachere Rocker sorgen für Auftrieb beim Paddeln. Im losen Tail mit Swallow-Ausschnitt und Futures-Tri-Fin-Setup liegt der Fokus dann auf Kontrolle und Wendigkeit.',
      en: 'A wider nose template and flatter rocker deliver paddle power in the flats. Then the loose swallow tail and Futures tri-fin setup shifts focus to control and snap off the lip.',
    },
    details: {
      de: ['Länge: 6\'2" (188 cm)', 'Epoxid-Konstruktion', 'Futures Tri-Fin-Box', 'Swallow Tail', 'Inklusive Fins'],
      en: ['Length: 6\'2" (188 cm)', 'Epoxy construction', 'Futures tri-fin box', 'Swallow tail', 'Fins included'],
    },
  },
  {
    id: 'steamer-43-wetsuit',
    category: 'surfing',
    price: '259 EUR',
    rating: '4.9',
    accent: '#1d6070',
    images: [
      'https://images.unsplash.com/photo-1526485641275-3b11a42acd44?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: '4/3 Steamer Wetsuit',
      en: '4/3 Steamer Wetsuit',
    },
    shortText: {
      de: '4/3-mm-Neopren mit brustseitigem Reißverschluss — warm in Wasser von 10–16 °C.',
      en: '4/3 mm neoprene with chest zip — warm in 10–16 °C water.',
    },
    description: {
      de: 'Das Stretch-Neopren bietet 500 % mehr Flexibilität als Standard-Schaum. Brustseitiger Reißverschluss minimiert Wärmeverlust gegenüber Rückenreißverschlüssen. Flachgenähte Innennähte und Keyhole-Halsausschnitt reduzieren Scheuerstellen nach langen Sessions.',
      en: 'Stretch neoprene gives 500% more flex than standard foam. The chest zip cuts heat loss compared to back-entry suits. Flatlock inner seams and a keyhole collar reduce chafe on long sessions.',
    },
    details: {
      de: ['4/3 mm Neopren', 'Brust-Reißverschluss', 'Stretch-Paneele', 'Flachnähte innen', 'Wassertemperatur: 10–16 °C'],
      en: ['4/3 mm neoprene', 'Chest-entry zip', 'Stretch panels', 'Flatlock inner seams', 'Water temp: 10–16 °C'],
    },
  },
  {
    id: 'classic-longboard-9',
    category: 'surfing',
    price: '699 EUR',
    rating: '4.7',
    accent: '#35828f',
    images: [
      'https://images.unsplash.com/stj-A6E6II8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526485641275-3b11a42acd44?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Classic Longboard 9\'0"',
      en: 'Classic Longboard 9\'0"',
    },
    shortText: {
      de: 'Traditioneller Single-Fin-Longboard für Noseriding und langsame, ausgedehnte Cutbacks.',
      en: 'Traditional single-fin longboard for noseriding and slow, drawn-out cutbacks.',
    },
    description: {
      de: 'Aus PU-Schaum mit Glasfasergewebe handgefertigt. Das runde Nose-Template und der Parallel-Rails-Outline maximieren den Auftrieb auf der Nase. Mittig platzierte Finbox passt zu allen 2+1-Setups.',
      en: 'Hand-shaped from PU foam with fibreglass cloth. A round nose template and parallel-rail outline maximise nose lift. Centre fin box accepts any 2+1 setup.',
    },
    details: {
      de: ['Länge: 9\'0" (274 cm)', 'PU-Schaum + Glasfaser', 'Rundnose-Template', 'Single-Fin-Box (2+1)', 'Handgefertigt'],
      en: ['Length: 9\'0" (274 cm)', 'PU foam + fibreglass', 'Round nose template', 'Single-fin box (2+1)', 'Hand-shaped'],
    },
  },
  {
    id: 'surf-dry-backpack',
    category: 'surfing',
    price: '89 EUR',
    rating: '4.7',
    accent: '#246878',
    images: [
      'https://images.unsplash.com/mfzdRsWsiRA?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Surf & Dry Rucksack 30L',
      en: 'Surf & Dry Backpack 30L',
    },
    shortText: {
      de: 'Wasserdichte Außenhaut mit isoliertem Neoprenfach — Board-Leash-Clip inklusive.',
      en: 'Waterproof shell with insulated wetsuit compartment — board leash clip included.',
    },
    description: {
      de: 'Das isolierte Fach fasst einen nassen 4/3-Anzug und hält ihn von trockener Kleidung getrennt. Gerollte Rolltop-Closure schützt den Hauptinhalt auch bei starkem Regen. Integrierter Helmnetzbeutel und seitliche Flaschenhalter runden die Ausstattung ab.',
      en: 'The insulated compartment fits a wet 4/3 suit and keeps it away from dry clothes. A rolled top closure protects the main contents in heavy rain. Built-in helmet net and side bottle holders round out the kit.',
    },
    details: {
      de: ['30 Liter Volumen', 'Rolltop-Verschluss', 'Neopren-Nassfach', 'Board-Leash-Clip', 'Gewicht: 780 g'],
      en: ['30-litre capacity', 'Roll-top closure', 'Neoprene wet compartment', 'Board leash clip', 'Weight: 780 g'],
    },
  },
  {
    id: 'surf-leash-pro',
    category: 'surfing',
    price: '39 EUR',
    rating: '4.6',
    accent: '#2e7282',
    images: [
      'https://images.unsplash.com/4rvc6HWITpY?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/mfzdRsWsiRA?auto=format&fit=crop&w=800&q=80',
    ],
    title: {
      de: 'Pro Surf Leine 6\'',
      en: 'Pro Surf Leash 6\'',
    },
    shortText: {
      de: 'Dünne 6-mm-Leine mit doppeltem Wirbel — minimaler Widerstand im Wasser.',
      en: '6 mm thin leash with double swivel — minimal drag in the water.',
    },
    description: {
      de: 'Das Polyurethanband mit 6 mm Durchmesser ist für Wellen bis 1,5 m ausgelegt. Zwei 360°-Wirbel verhindern Verdrillen; das weich gepolsterte Knöchelband sitzt komfortabel auch bei mehrstündigen Sessions.',
      en: 'The 6 mm polyurethane cord is rated for waves to 1.5 m. Two 360° swivels prevent tangling; the soft-padded ankle strap stays comfortable even on multi-hour sessions.',
    },
    details: {
      de: ['Länge: 6 Fuß (183 cm)', 'Stärke: 6 mm', 'Doppelter 360°-Wirbel', 'Klettverschluss-Knöchel', 'Für Wellen bis 1,5 m'],
      en: ['Length: 6 ft (183 cm)', 'Thickness: 6 mm', 'Double 360° swivel', 'Velcro ankle cuff', 'Rated for waves to 1.5 m'],
    },
  },
];

export const findProduct = (productId: string | undefined) =>
  products.find((product) => product.id === productId);
