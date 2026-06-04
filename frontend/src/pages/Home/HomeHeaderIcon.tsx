type HomeHeaderIconName = 'heart' | 'bag';

interface HomeHeaderIconProps {
  name: HomeHeaderIconName;
}

const paths = {
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z',
  bag: 'M6 8h12l-1 13H7L6 8Zm3 0a3 3 0 0 1 6 0',
} as const;

const HomeHeaderIcon = ({ name }: HomeHeaderIconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={paths[name]} />
  </svg>
);

export default HomeHeaderIcon;
