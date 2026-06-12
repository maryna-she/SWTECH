export interface AccountText {
  kicker: string;
  title: string;
  intro: string;
  profileLabel: string;
  nameLabel: string;
  emailLabel: string;
  roleLabel: string;
  fallbackName: string;
  fallbackEmail: string;
  actionsLabel: string;
  savedTripsLabel: string;
  activeOrdersLabel: string;
  bonusPointsLabel: string;
  cartTitle: string;
  cartText: string;
  cartLink: string;
  shopTitle: string;
  shopText: string;
  shopLink: string;
  supportTitle: string;
  supportText: string;
  supportLink: string;
  tripKicker: string;
  tripTitle: string;
  tripText: string;
  tripDateLabel: string;
  tripDate: string;
  tripGearLabel: string;
  tripGear: string;
  tripRouteLabel: string;
  tripRoute: string;
  ordersKicker: string;
  ordersTitle: string;
  orders: { id: string; title: string; meta: string; status: string }[];
  logout: string;
}

export const accountEn: AccountText = {
  kicker: 'Personal account',
  title: 'Your Roamly space',
  intro: 'Keep your profile, cart, and future orders in one place.',
  profileLabel: 'Profile details',
  nameLabel: 'Name',
  emailLabel: 'Email',
  roleLabel: 'Account type',
  fallbackName: 'Roamly customer',
  fallbackEmail: 'No email saved',
  actionsLabel: 'Account actions',
  savedTripsLabel: 'Saved trips',
  activeOrdersLabel: 'Active orders',
  bonusPointsLabel: 'Roamly points',
  cartTitle: 'Cart',
  cartText: 'Review the gear you saved for your next trip.',
  cartLink: 'Open cart',
  shopTitle: 'Shop',
  shopText: 'Continue browsing hiking, camping, and surfing essentials.',
  shopLink: 'Browse products',
  supportTitle: 'Support',
  supportText: 'Ask a question about your account, delivery, or returns.',
  supportLink: 'Contact us',
  tripKicker: 'Next trip plan',
  tripTitle: 'Weekend mountain route',
  tripText: 'A compact plan for a two-day hike with light camping gear and weather-ready layers.',
  tripDateLabel: 'Date',
  tripDate: 'June 28 - 29',
  tripGearLabel: 'Gear focus',
  tripGear: 'Backpack, shell jacket, camp light',
  tripRouteLabel: 'Route',
  tripRoute: 'Alpine trail and lake camp',
  ordersKicker: 'Recent activity',
  ordersTitle: 'Orders and saved plans',
  orders: [
    {
      id: 'RM-2048',
      title: 'Alpine Trail Backpack',
      meta: 'Reserved in your cart',
      status: 'Waiting',
    },
    {
      id: 'RM-2031',
      title: 'Basecamp setup',
      meta: 'Camping collection saved',
      status: 'Saved',
    },
    {
      id: 'RM-1984',
      title: 'Coast kit checklist',
      meta: 'Surfing gear list',
      status: 'Planned',
    },
  ],
  logout: 'Log out',
};
