type HomeHeaderIconName = 'heart' | 'bag' | 'search' | 'close';

interface HomeHeaderIconProps {
  name: HomeHeaderIconName;
}

const paths = {
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z',
  bag: 'M6 8h12l-1 13H7L6 8Zm3 0a3 3 0 0 1 6 0',
  search: 'M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z',
  close: 'M18 6L6 18M6 6l12 12',
} as const;

const HomeHeaderIcon = ({ name }: HomeHeaderIconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={paths[name]} />
  </svg>
);

export default HomeHeaderIcon;
