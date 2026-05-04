export type AuthLanguage = 'de' | 'en';

export const LANGUAGE_STORAGE_KEY = 'shopLanguage';

export const getInitialLanguage = (): AuthLanguage => {
  if (typeof window === 'undefined') return 'de';
  return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'de';
};

export const saveLanguage = (language: AuthLanguage) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

export const authCopy = {
  de: {
    common: {
      brand: 'SW Shop',
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
      ariaBrand: 'Online-Shop',
      kicker: 'Online-Shop',
      title: 'Willkommen zurück in deinem Shop.',
      intro: 'Melde dich an, um deinen Warenkorb, Bestellungen und Rücksendungen zu verwalten.',
      headerKicker: 'Kundenkonto',
      heading: 'Anmelden',
      description: 'Nutze deine E-Mail und dein Passwort, um weiter einzukaufen.',
      submit: 'Anmelden',
      loading: 'Wird geladen...',
      footer: 'Noch kein Kundenkonto?',
      footerLink: 'Jetzt registrieren',
      error: 'E-Mail oder Passwort falsch.',
    },
    register: {
      ariaBrand: 'Online-Shop',
      kicker: 'Online-Shop',
      title: 'Erstelle dein Kundenkonto für den Shop.',
      intro: 'Registriere dich, lege Produkte in den Warenkorb und behalte deine Bestellungen im Blick.',
      headerKicker: 'Neues Kundenkonto',
      heading: 'Konto erstellen',
      description: 'Wähle eine E-Mail und ein sicheres Passwort für deinen Shop-Zugang.',
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
      brand: 'SW Shop',
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
      ariaBrand: 'Online shop',
      kicker: 'Online shop',
      title: 'Welcome back to your shop.',
      intro: 'Sign in to manage your cart, orders, and return requests.',
      headerKicker: 'Customer account',
      heading: 'Sign in',
      description: 'Use your email and password to continue shopping.',
      submit: 'Sign in',
      loading: 'Signing in...',
      footer: 'No customer account yet?',
      footerLink: 'Create one now',
      error: 'Email or password is incorrect.',
    },
    register: {
      ariaBrand: 'Online shop',
      kicker: 'Online shop',
      title: 'Create your customer account for the shop.',
      intro: 'Register to add products to your cart and keep your orders in view.',
      headerKicker: 'New customer account',
      heading: 'Create account',
      description: 'Choose an email and a secure password for your shop access.',
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
