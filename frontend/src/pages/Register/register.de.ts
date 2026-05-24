import type { RegisterText } from './register.en';

export const registerDe: RegisterText = {
  common: {
    email: 'E-Mail',
    password: 'Passwort',
    name: 'Name',
    emailPlaceholder: 'name@beispiel.de',
    passwordPlaceholder: 'Mindestens 8 Zeichen',
    passwordHideLabel: 'Passwort ausblenden',
    passwordShowLabel: 'Passwort anzeigen',
  },
  register: {
    ariaBrand: 'Roamly Travel Shop',
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
};
