type AccountStatLabel = 'savedTripsLabel' | 'activeOrdersLabel' | 'bonusPointsLabel';
type AccountActionTitle = 'cartTitle' | 'shopTitle' | 'supportTitle';
type AccountActionText = 'cartText' | 'shopText' | 'supportText';
type AccountActionLink = 'cartLink' | 'shopLink' | 'supportLink';

export interface AccountStat {
  value: string;
  label: AccountStatLabel;
}

export interface AccountAction {
  title: AccountActionTitle;
  text: AccountActionText;
  link: AccountActionLink;
  to: string;
}

export const accountStats: AccountStat[] = [
  { value: '3', label: 'savedTripsLabel' },
  { value: '2', label: 'activeOrdersLabel' },
  { value: '14', label: 'bonusPointsLabel' },
];

export const accountActions: AccountAction[] = [
  {
    title: 'cartTitle',
    text: 'cartText',
    link: 'cartLink',
    to: '/cart',
  },
  {
    title: 'shopTitle',
    text: 'shopText',
    link: 'shopLink',
    to: '/products',
  },
  {
    title: 'supportTitle',
    text: 'supportText',
    link: 'supportLink',
    to: '/contacts',
  },
];
