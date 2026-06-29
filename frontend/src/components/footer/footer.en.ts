export interface FooterText {
  tagline: string;
  navLabel: string;
  exploreHeading: string;
  allProducts: string;
  companyHeading: string;
  about: string;
  contacts: string;
  accountHeading: string;
  signIn: string;
  register: string;
  cart: string;
  stats: { value: string; label: string }[];
  copyright: string;
  privacy: string;
  imprint: string;
}

export const footerEn: FooterText = {
  tagline: 'Gear up for every route. Everything in one place.',
  navLabel: 'Footer navigation',
  exploreHeading: 'Explore',
  allProducts: 'All products',
  companyHeading: 'Company',
  about: 'About us',
  contacts: 'Contacts',
  accountHeading: 'Account',
  signIn: 'Sign in',
  register: 'Register',
  cart: 'Cart',
  stats: [
    { value: '2 000+', label: 'Products' },
    { value: '50+',    label: 'Brands' },
    { value: '120+',   label: 'Countries' },
    { value: '4.9★',   label: 'Rating' },
  ],
  copyright: 'All rights reserved.',
  privacy: 'Privacy',
  imprint: 'Imprint',
};
