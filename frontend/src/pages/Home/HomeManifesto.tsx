const items = [
  'Hiking', 'Camping', 'Surfing',
  'Alpine Trail', 'Basecamp', 'Coast Kit',
  'Mountain Gear', 'Night Setup', 'Roamly',
];

const track = [...items, ...items];

const HomeManifesto = () => (
  <div className="home-marquee" aria-hidden="true">
    <div className="home-marquee__track">
      {track.map((item, i) => (
        <span key={i} className="home-marquee__item">
          {item}
          <span className="home-marquee__dot" />
        </span>
      ))}
    </div>
  </div>
);

export default HomeManifesto;
