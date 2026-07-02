export interface AboutText {
  kicker: string;
  title: string;
  intro: string;
  note: string;
  storyLabel: string;
  storyTitle: string;
  story: string[];
  imageTitle: string;
  imageText: string;
  valuesLabel: string;
  values: { title: string; text: string }[];
  ctaKicker: string;
  ctaTitle: string;
  ctaLink: string;
}

export const aboutEn: AboutText = {
  kicker: 'Roamly / since 2024',
  title: 'ABOUT US',
  intro:
    'Roamly was created with a clear purpose: to make every journey lighter, calmer, and easier to remember.',
  note:
    'We curate outdoor essentials for travelers who want reliable gear without the noise of endless choice.',
  storyLabel: 'Our story',
  storyTitle: 'We provide premium travel preparation with a personal touch.',
  story: [
    'The idea started after a rainy Alpine trip where three friends packed too much and still forgot the one layer they needed. Roamly grew from that small frustration into a shop built around practical routes.',
    'Every product group is chosen for a real moment outside: a cold morning trail, a dark campsite, a windy coast, or a quick weekend bag that has to work without overthinking.',
  ],
  imageTitle: 'Why we choose carefully',
  imageText:
    'A smaller collection helps travelers compare faster, pack smarter, and trust that every item has a reason to be there.',
  valuesLabel: 'What guides us',
  values: [
    {
      title: 'Accessibility',
      text: 'Clear product information, readable layouts, and simple decisions for every traveler.',
    },
    {
      title: 'Carefully selected gear',
      text: 'Useful essentials for hiking, camping, and surfing, chosen for real routes instead of trends.',
    },
    {
      title: 'Our team',
      text: 'A small group that tests ideas through packing lists, weekend trips, and honest feedback.',
    },
  ],
  ctaKicker: 'Start your route',
  ctaTitle:
    'We make every trip a harmonious blend of comfort and discovery. Start your adventure with Roamly.',
  ctaLink: 'Shop now',
};
