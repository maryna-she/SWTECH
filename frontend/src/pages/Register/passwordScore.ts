export const getPasswordScore = (password: string) => {
  // Zählt einfache Regeln für die Passwort-Stärke.
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  return checks.filter(Boolean).length;
};
