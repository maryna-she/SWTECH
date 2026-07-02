export interface ContactsText {
  kicker: string;
  title: string;
  intro: string;
  emailLabel: string;
  phoneLabel: string;
  addressLabel: string;
  address: string;
  hoursLabel: string;
  hours: string[];
  formTitle: string;
  formIntro: string;
  nameLabel: string;
  namePlaceholder: string;
  mailLabel: string;
  mailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  sentTitle: string;
  sentText: string;
  supportTitle: string;
  supportItems: { title: string; text: string }[];
}

export const contactsEn: ContactsText = {
  kicker: 'Contact',
  title: 'Contact Roamly',
  intro:
    'Need help with gear, orders, or a route-ready packing list? Send us a note and the Roamly team will answer with practical advice.',
  emailLabel: 'Email',
  phoneLabel: 'Phone',
  addressLabel: 'Studio',
  address: 'Roamly Travel Studio, Bergstraße 18, 10115 Berlin',
  hoursLabel: 'Opening hours',
  hours: ['Mon-Fri 09:00-18:00', 'Sat 10:00-14:00'],
  formTitle: 'Write to us',
  formIntro: 'Share your question and we will get back to you as soon as possible.',
  nameLabel: 'Name',
  namePlaceholder: 'Your name',
  mailLabel: 'Email',
  mailPlaceholder: 'you@example.com',
  messageLabel: 'Message',
  messagePlaceholder: 'What can we help you with?',
  submit: 'Send message',
  sentTitle: 'Message prepared',
  sentText: 'Thanks. Your request is ready for the Roamly team.',
  supportTitle: 'We can help with',
  supportItems: [
    { title: 'Product advice', text: 'Choose the right pack, layer, tent, or surf essential.' },
    { title: 'Orders', text: 'Questions about carts, checkout, deliveries, and returns.' },
    { title: 'Travel setup', text: 'Simple packing recommendations for your next route.' },
  ],
};
