export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export const defaultReviews: Record<string, Review[]> = {
  'trailhead-pack-38': [
    { id: 'd1', author: 'Thomas M.', rating: 5, text: 'Perfect for multi-day hikes. The hip-fin system really takes the load off your back. Rain cover saved me twice already.', date: '2025-04-12' },
    { id: 'd2', author: 'Sarah K.', rating: 5, text: 'Great ventilation on hot days. Fits my 15" laptop perfectly. Only minor note: the side pockets could be a bit wider.', date: '2025-03-28' },
    { id: 'd3', author: 'Lukas B.', rating: 4, text: 'Solid build quality, comfortable even after 8+ hours on trail. Would love one more internal pocket.', date: '2025-02-15' },
  ],
  'peak-shell-jacket': [
    { id: 'd4', author: 'Julia R.', rating: 5, text: 'Wore this through a full Scottish downpour — completely dry inside. The pit-zips are a lifesaver when climbing.', date: '2025-05-02' },
    { id: 'd5', author: 'Marco V.', rating: 5, text: 'Best hardshell I have owned. Packable, breathable, and the hood adjusts with one hand.', date: '2025-04-18' },
  ],
  'granite-trail-shoes': [
    { id: 'd6', author: 'Nina F.', rating: 5, text: 'Incredible grip on wet rock. Ran 30 km through muddy trails and my feet stayed dry the whole time.', date: '2025-03-10' },
    { id: 'd7', author: 'Erik H.', rating: 4, text: 'Light and fast. Sizing runs slightly narrow so I went half a size up. Very happy with them.', date: '2025-02-22' },
  ],
  'ultralight-tent-2p': [
    { id: 'd8', author: 'Anya S.', rating: 5, text: 'Set up in under 5 minutes even in the dark thanks to the colour-coded poles. Survived 3 nights of heavy rain without a drop inside.', date: '2025-04-30' },
    { id: 'd9', author: 'David L.', rating: 5, text: 'Incredible weight for a freestanding tent. The two vestibules make a huge difference — gear stays outside and dry.', date: '2025-03-14' },
    { id: 'd10', author: 'Marta P.', rating: 4, text: 'Very well thought-out design. The inner is a bit narrow for two tall people but perfect for one with storage.', date: '2025-02-08' },
  ],
  'funshape-62': [
    { id: 'd11', author: 'Jake O.', rating: 5, text: 'Catches every wave. The swallow tail gives so much control on the lip. Paddled out in overhead surf without any issues.', date: '2025-05-05' },
    { id: 'd12', author: 'Priya N.', rating: 4, text: 'Great beginner-to-intermediate board. Very stable but still responsive. The epoxy construction feels durable.', date: '2025-04-01' },
  ],
  'steamer-43-wetsuit': [
    { id: 'd13', author: 'Carlos M.', rating: 5, text: 'Warmest 4/3 I have tried. The chest zip is a game changer — zero water flush. Used it down to 11°C and stayed comfortable.', date: '2025-03-20' },
    { id: 'd14', author: 'Lena W.', rating: 5, text: 'The stretch panels give incredible freedom of movement. No chafe after 3-hour sessions. Fit is spot on.', date: '2025-02-27' },
  ],
};

const STORAGE_KEY = 'roamly_reviews';

export function loadReviews(productId: string): Review[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const all: Record<string, Review[]> = stored ? JSON.parse(stored) : {};
    const defaults = defaultReviews[productId] ?? [];
    const user = all[productId] ?? [];
    return [...defaults, ...user];
  } catch {
    return defaultReviews[productId] ?? [];
  }
}

export function saveReview(productId: string, review: Omit<Review, 'id' | 'date'>): Review {
  const newReview: Review = {
    ...review,
    id: `u_${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
  };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const all: Record<string, Review[]> = stored ? JSON.parse(stored) : {};
    all[productId] = [...(all[productId] ?? []), newReview];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch { /* ignore */ }
  return newReview;
}
