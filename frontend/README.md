# Roamly Frontend

Roamly is a travel shop for people who like simple, practical products for trips and outdoor activities.

The frontend should feel clean, warm, and easy to use. The visual style is minimal travel/outdoor, not a busy adventure poster.

## Brand

Name: `Roamly`

Meaning: from "to roam", to travel or explore freely.

## Logo

Main logo file:

`src/assets/shop-logo.svg`

Favicon:

`public/favicon.svg`

Logo rules:
- Use the full `Roamly` wordmark on login and register screens.
- Use the compass mark for favicon or small icon usage.
- Keep the logo flat: no gradients, no shadows, no blurred background.

Compass parts in `shop-logo.svg`:

## Colors

Main palette:

- Forest green: `#1F3D2B`
- Sand: `#E8DCC5`
- Black: `#0F120E`
- Orange accent: `#D87532`

Supporting colors:

- Light surface: `#FFFAF1`
- Input surface: `#FFFDF7`
- Border sand: `#CFC1A6`
- Muted text: `#596152`

Rules:
- Sand should be the main page background.
- Forest green should be used for buttons, logo, active states, and small accents.
- Orange should be used only as an accent, not as a main background.
- Black should be used for headings and important text.
- Avoid large dark green blocks on auth screens; they reduce the calm feeling.

Color variables are defined in:

`src/index.css`

## Auth Screens

Shared auth styles live in:

`src/pages/Auth.css`

Copy lives in:

`src/pages/authCopy.ts`

Login page:

`src/pages/Login/LoginPage.tsx`

Register page:

`src/pages/Register/RegisterPage.tsx`
## Development

Install dependencies:

`npm install`

Run locally:

`npm run dev`

Build:

`npm run build`
