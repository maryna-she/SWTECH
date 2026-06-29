export const splitRegisterName = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? '';
  const secondName = parts.slice(1).join(' ');

  return { firstName, secondName };
};
