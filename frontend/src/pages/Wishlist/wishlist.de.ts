import type { WishlistText } from './wishlist.en';

export const wishlistDe: WishlistText = {
  kicker: 'Deine Wunschliste',
  title: 'Für später gespeichert.',
  intro: 'Produkte, zu denen du zurückkehren möchtest.',
  emptyTitle: 'Noch nichts gespeichert',
  emptyText: 'Stöbere im Shop und tippe auf das Herz bei einem Produkt, um es hier zu speichern.',
  backToProducts: 'Produkte entdecken',
  remove: 'Entfernen',
  addToCart: 'In den Warenkorb',
  clearAll: 'Alle entfernen',
  itemCount: (count) => `${count} ${count === 1 ? 'Artikel' : 'Artikel'} gespeichert`,
  bannerTitle: 'Wunschliste sichern',
  bannerText: 'Deine gespeicherten Artikel sind nur in diesem Browser verfügbar. Erstelle einen Account, um sie auf allen Geräten zu behalten.',
  bannerRegister: 'Account erstellen',
  bannerLoginPrefix: 'Hast du bereits einen Account?',
  bannerLogin: 'Anmelden',
};
