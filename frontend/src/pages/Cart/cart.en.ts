export interface CartText {
  kicker: string;
  title: string;
  intro: string;
  emptyTitle: string;
  emptyText: string;
  backToProducts: string;
  quantityLabel: string;
  remove: string;
  subtotal: string;
  shipping: string;
  total: string;
  checkout: string;
  clear: string;
}

export const cartEn: CartText = {
  kicker: 'Cart',
  title: 'Your trip kit',
  intro: 'Review quantities before checkout.',
  emptyTitle: 'Your cart is empty',
  emptyText: 'Add gear from the shop to prepare your next route.',
  backToProducts: 'Back to products',
  quantityLabel: 'Quantity',
  remove: 'Remove',
  subtotal: 'Subtotal',
  shipping: 'Shipping',
  total: 'Total',
  checkout: 'Continue to checkout',
  clear: 'Clear cart',
};
