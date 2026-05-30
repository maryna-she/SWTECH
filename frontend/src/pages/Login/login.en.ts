export interface LoginText {
  common: {
    email: string;
    password: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    passwordHideLabel: string;
    passwordShowLabel: string;
  };
  login: {
    ariaBrand: string;
    headerKicker: string;
    heading: string;
    description: string;
    googleButton: string;
    submit: string;
    loading: string;
    footer: string;
    footerLink: string;
    error: string;
  };
}

export const loginEn: LoginText = {
  common: {
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'name@example.com',
    passwordPlaceholder: 'At least 8 characters',
    passwordHideLabel: 'Hide password',
    passwordShowLabel: 'Show password',
  },
  login: {
    ariaBrand: 'Roamly Travel Shop',
    headerKicker: 'Your account',
    heading: 'Sign in',
    description: 'Use your account to keep shopping and see your orders.',
    googleButton: 'Continue with Google',
    submit: 'Sign in',
    loading: 'Signing in...',
    footer: 'No Roamly account yet?',
    footerLink: 'Create one now',
    error: 'Email or password is incorrect.',
  },
};
