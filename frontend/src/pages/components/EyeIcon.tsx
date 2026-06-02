// Icon fuer sichtbares oder verstecktes Passwort.
const EyeIcon = ({ open }: { open: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    {open ? (
      <>
        <path d="M2.25 12s3.5-6.25 9.75-6.25S21.75 12 21.75 12s-3.5 6.25-9.75 6.25S2.25 12 2.25 12Z" />
        <circle cx="12" cy="12" r="2.7" />
      </>
    ) : (
      <>
        <path d="M4 13c2.1 1.9 4.78 2.85 8 2.85s5.9-.95 8-2.85" />
        <path className="eye-lash" d="M7.25 15.3 5.9 17.05" />
        <path className="eye-lash" d="M10.4 16.05 9.95 18.15" />
        <path className="eye-lash" d="M13.6 16.05 14.05 18.15" />
        <path className="eye-lash" d="M16.75 15.3 18.1 17.05" />
      </>
    )}
  </svg>
);

export default EyeIcon;
