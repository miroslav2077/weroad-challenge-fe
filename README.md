# WeRoad TypeScript challenge (frontend) 🛫

<p align="center">
  <img src="https://theme.zdassets.com/theme_assets/9115960/ef5800cc529889d180b05b57e40dd50e5c7adb73.png" width="200" alt="WeRoad Logo" />
</p>

### Use case
Implement a checkout process for WeRoad users to buy a Travel where:
- the user can select a travel to book;
- the user inputs an email and the number of seats to reserve;
- the user pays the total amount to confirm the booking (FAKE payment step);

### Requirements
- A Travel has a max capacity of 5 seats;
- After confirming the number of seats to reserve the availability should be granted for 15 minutes before the cart expires;

### Reasoning behind decisions
- I mostly adhered to nuxt's structure and UI pattern as it's a very convenient and reusable way of developing.
- I used emoji instead of icons just for fast prototyping design and basic tailwind with a little bit of customization.
- I didn't really feel the need to further refactor sections of code into new components as I appreciate low overhead during early phases of development, though this definitely is not a good approach as app complexity increases.
- Testing was done using Playwright (e2e) as time was limited, and business logic was mostly based on GraphQL queries.

### Challenge based on the following stack:
- [MySql](https://github.com/mysql/mysql-server)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Nest](https://github.com/nestjs/nest)
- [GraphQL](https://github.com/graphql)
- [Nuxt 3](https://github.com/nuxt/nuxt)
- [Tailwind](https://tailwindcss.com/)

Have a great trip! 👩‍✈️

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Running the app 🖥️

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Running tests 🔍

```bash
# e2e tests
$ npm run test
```

### Author
Mirko Grasso
grasso.mirko@gmail.com