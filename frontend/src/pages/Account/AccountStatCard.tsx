import type { AccountText } from './account.en';
import type { AccountStat } from './accountContent';

interface AccountStatCardProps {
  stat: AccountStat;
  text: AccountText;
}

const AccountStatCard = ({ stat, text }: AccountStatCardProps) => (
  <article className="account-stat">
    <strong>{stat.value}</strong>
    <span>{text[stat.label]}</span>
  </article>
);

export default AccountStatCard;
