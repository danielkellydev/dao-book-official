# Dao Book

Dao Book is clinic management software built for Traditional Chinese Medicine (TCM) practitioners. This is the front end application written in Vite.

Visit the live site [here](https://daobook.com.au/).

## Tech Stack

**Client:** Vite, React, React Router, TailwindCSS.

**Server:** Node, Express, Mongo, Mongoose ([repo here](https://github.com/danwillcoder/dao-book_Backend))

## Libraries

- [Vite](https://vitejs.dev/) as its bundler, test runner, and configuration layer.
- [React](https://react.dev/) for UI, state management, interactivity.
- [React Router](https://reactrouter.com/) for frontend routing.
- [Axios](https://axios-http.com/docs/intro) for data fetching.
- [ClassNames](https://www.npmjs.com/package/classnames) for easy conditional classes.

Additional libraries include Vitest, Playwright, ESLint and Prettier.

## Installation

Install with pnpm

```bash
  git clone https://github.com/danwillcoder/dao-book_frontend
  cd my-project
  pnpm install
  # set up your env with correct values
  pnpm run dev
```

Other installation may be possible with `npm`. EG:

```bash
  # ... as above
  npm install
  npm run dev
```

## Testing

This project is unit & integration tested with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). To run unit tests, install as above, then run the below.

```bash
pnpm test
```

This project is E2E tested with [Playwright](https://playwright.dev/). To run end-to-end tests, install as above, then run the below. You will be prompted if you need to install appropriate testing browsers.

```bash
  # install browsers
  # pnpm playwright install
  pnpm playwright test
```

From a production perspective, User Acceptance Testing is [visible here](https://docs.google.com/spreadsheets/d/1JDwJLKfkn5uXa9DviFwJtHzDniG6cr_RBlf2fVp00dQ/edit?usp=sharing).

## Authors

- [@willr42](https://www.github.com/willr42)
- [@danielkellydev](https://github.com/danielkellydev)
