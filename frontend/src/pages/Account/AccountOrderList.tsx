import type { AccountText } from './account.en';

interface AccountOrderListProps {
  text: AccountText;
}

const AccountOrderList = ({ text }: AccountOrderListProps) => (
  <section className="account-orders" aria-labelledby="account-orders-title">
    <div className="account-section-heading">
      <p>{text.ordersKicker}</p>
      <h2 id="account-orders-title">{text.ordersTitle}</h2>
    </div>
    <div className="account-order-list">
      {text.orders.map((order) => (
        <article key={order.id}>
          <div>
            <span>{order.id}</span>
            <strong>{order.title}</strong>
          </div>
          <p>{order.meta}</p>
          <em>{order.status}</em>
        </article>
      ))}
    </div>
  </section>
);

export default AccountOrderList;
