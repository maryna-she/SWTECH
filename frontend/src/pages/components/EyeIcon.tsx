// Icon für sichtbares oder verstecktes Passwort.
const EyeIcon = ({ hidden }: { hidden: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <path d="M2.25 12s3.5-6.25 9.75-6.25S21.75 12 21.75 12s-3.5 6.25-9.75 6.25S2.25 12 2.25 12Z" />
    <circle cx="12" cy="12" r="2.7" />
    {hidden && <path className="eye-slash" d="M4.5 4.5 19.5 19.5" />}
  </svg>
);

export default EyeIcon;
