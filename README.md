# Playwright E2E Tests for Api and UI for https://testdev.pl

## Features

- UI and API tests for https://testdev.pl
- Login automation
- Product purchase and review flows
- API validation for products and reviews
- TypeScript, ESLint, Prettier integration
- Playwright HTML reports, screenshots, and video recording

## Project Structure

```
├── src/
│   ├── pages/           # Page Object Models (e.g., login.page.ts)
│   └── tests/
│       ├── api/         # API tests (*.api.spec.ts)
│       └── ui/          # UI tests (*.ui.spec.ts)
├── playwright.config.ts # Playwright configuration
├── package.json         # Scripts and dependencies
├── tsconfig.json        # TypeScript config
├── eslint.config.mjs    # ESLint config
```

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment variables:**
   - Create a `.env` file in the root directory:
     ```env
     USER=your_email@example.com
     PASSWORD=your_password
     ```

## Running Tests

- **All tests:**
  ```sh
  npm test
  ```
- **UI tests only:**
  ```sh
  npm run test:ui
  ```
- **API tests only:**
  ```sh
  npm run test:api
  ```
- **Show HTML report:**
  ```sh
  npm run test:report
  ```

## Scripts

- `npm test` - Run all tests
- `npm run test:ui` - Run UI tests
- `npm run test:api` - Run API tests
- `npm run format` - Format code with Prettier
- `npm run lint:fix` - Fix lint errors
- `npm run test:report` - Open Playwright HTML report

## Example Test Flows

- **Login:** Automated in UI tests using `LoginPage`
- **Shopping:** Add product to cart, checkout, and verify order
- **Reviews:** Prepare and verify customer reviews
- **API:** Auth via login, then validate products and reviews endpoints

## Linting & Formatting

- ESLint and Prettier are configured. Run `npm run format` and `npm run lint:fix` as needed.

## Author

Maksymilian Bahr
