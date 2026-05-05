export type AuthLanguage = 'de' | 'en';

// Speichert die ausgewaehlte Sprache fuer die Auth-Seiten.
export const LANGUAGE_STORAGE_KEY = 'roamlyLanguage';

export const getInitialLanguage = (): AuthLanguage => {
  if (typeof window === 'undefined') return 'de';
  return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'de';
};

export const saveLanguage = (language: AuthLanguage) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

// Alle Texte fuer Login und Registrierung an einer Stelle.
export const authCopy = {
  de: {
    common: {
      brand: 'Roamly',
      languageLabel: 'Sprache wählen',
      german: 'Deutsch',
      english: 'English',
      email: 'E-Mail',
      password: 'Passwort',
      name: 'Name',
      emailPlaceholder: 'name@beispiel.de',
      passwordPlaceholder: 'Mindestens 8 Zeichen',
      passwordHideLabel: 'Passwort ausblenden',
      passwordShowLabel: 'Passwort anzeigen',
    },
    login: {
      ariaBrand: 'Roamly Travel Shop',
      kicker: 'Travel Shop',
      title: 'Willkommen zurück bei Roamly.',
      intro: 'Melde dich an und finde schnell alles für deine nächste Reise.',
      headerKicker: 'Dein Konto',
      heading: 'Anmelden',
      description: 'Mit deinem Konto kannst du weiter einkaufen und deine Bestellungen sehen.',
      submit: 'Anmelden',
      loading: 'Wird geladen...',
      footer: 'Noch kein Roamly Konto?',
      footerLink: 'Jetzt registrieren',
      error: 'E-Mail oder Passwort falsch.',
    },
    register: {
      ariaBrand: 'Roamly Travel Shop',
      kicker: 'Choose your adventure',
      title: 'Erstelle dein Roamly Konto.',
      intro: 'Entdecke Produkte für Hiking, Camping und Surfing.',
      headerKicker: 'Neues Konto',
      heading: 'Konto erstellen',
      description: 'Speichere deinen Warenkorb und behalte deine Bestellungen im Blick.',
      confirmPassword: 'Passwort bestätigen',
      confirmPlaceholder: 'Noch einmal eingeben',
      submit: 'Konto erstellen',
      loading: 'Wird registriert...',
      footer: 'Bereits ein Konto?',
      footerLink: 'Jetzt anmelden',
      passwordLabels: ['Noch leer', 'Basis', 'Solide', 'Gut', 'Sehr stark'],
      meterLabel: 'Passwortstärke',
      mismatchHint: 'Passwörter stimmen noch nicht überein.',
      mismatchError: 'Passwörter stimmen nicht überein.',
      shortPasswordError: 'Passwort muss mindestens 8 Zeichen lang sein.',
      conflictError: 'Diese E-Mail ist bereits registriert.',
      defaultError: 'Registrierung fehlgeschlagen. Bitte versuche es erneut.',
    },
  },
  en: {
    common: {
      brand: 'Roamly',
      languageLabel: 'Choose language',
      german: 'Deutsch',
      english: 'English',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      emailPlaceholder: 'name@example.com',
      passwordPlaceholder: 'At least 8 characters',
      passwordHideLabel: 'Hide password',
      passwordShowLabel: 'Show password',
    },
    login: {
      ariaBrand: 'Roamly Travel Shop',
      kicker: 'Travel shop',
      title: 'Welcome back to Roamly.',
      intro: 'Sign in and quickly find what you need for your next trip.',
      headerKicker: 'Your account',
      heading: 'Sign in',
      description: 'Use your account to keep shopping and see your orders.',
      submit: 'Sign in',
      loading: 'Signing in...',
      footer: 'No Roamly account yet?',
      footerLink: 'Create one now',
      error: 'Email or password is incorrect.',
    },
    register: {
      ariaBrand: 'Roamly Travel Shop',
      kicker: 'Choose your adventure',
      title: 'Create your Roamly account.',
      intro: 'Discover products for hiking, camping, and surfing.',
      headerKicker: 'New account',
      heading: 'Create account',
      description: 'Save your cart and keep your orders easy to find.',
      confirmPassword: 'Confirm password',
      confirmPlaceholder: 'Enter it again',
      submit: 'Create account',
      loading: 'Creating account...',
      footer: 'Already have an account?',
      footerLink: 'Sign in now',
      passwordLabels: ['Empty', 'Basic', 'Solid', 'Good', 'Very strong'],
      meterLabel: 'Password strength',
      mismatchHint: 'Passwords do not match yet.',
      mismatchError: 'Passwords do not match.',
      shortPasswordError: 'Password must be at least 8 characters long.',
      conflictError: 'This email is already registered.',
      defaultError: 'Registration failed. Please try again.',
    },
  },
} as const;
