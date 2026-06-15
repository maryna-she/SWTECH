export interface NotFoundText {
  imageAlt: string;
  kicker: string;
  title: string;
  text: string;
  backHome: string;
}

export const notFoundEn: NotFoundText = {
  imageAlt: '404 page not found',
  kicker: 'Error 404',
  title: 'Page not found',
  text: 'The page you are looking for does not exist or has been moved.',
  backHome: 'Back to home',
};
