export interface RegisterText {
  common: {
    email: string;
    password: string;
    name: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    passwordHideLabel: string;
    passwordShowLabel: string;
  };
  register: {
    ariaBrand: string;
    headerKicker: string;
    heading: string;
    description: string;
    confirmPassword: string;
    confirmPlaceholder: string;
    submit: string;
    loading: string;
    footer: string;
    footerLink: string;
    passwordLabels: string[];
    meterLabel: string;
    mismatchHint: string;
    mismatchError: string;
    shortPasswordError: string;
    conflictError: string;
    defaultError: string;
  };
}

export const registerEn: RegisterText = {
  common: {
    email: 'Email',
    password: 'Password',
    name: 'Name',
    emailPlaceholder: 'name@example.com',
    passwordPlaceholder: 'At least 8 characters',
    passwordHideLabel: 'Hide password',
    passwordShowLabel: 'Show password',
  },
  register: {
    ariaBrand: 'Roamly Travel Shop',
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
};
