import { Link } from 'react-router-dom';
import type { AccountText } from './account.en';
import type { AccountAction } from './accountContent';

interface AccountActionCardProps {
  action: AccountAction;
  text: AccountText;
}

const AccountActionCard = ({ action, text }: AccountActionCardProps) => (
  <article>
    <div>
      <h2>{text[action.title]}</h2>
      <p>{text[action.text]}</p>
    </div>
    <Link to={action.to}>{text[action.link]}</Link>
  </article>
);

export default AccountActionCard;
