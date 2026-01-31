# Demoblaze Automation Tests

Playwright TypeScript automation tests for [demoblaze.com](https://www.demoblaze.com/)

## Test Scenario

**Scenario 1:** The user can register with valid data.

## Project Structure

```
Automation_Task/
├── tests/
│   ├── pages/
│   │   ├── SignUpPage.ts    # Page Object Model for Sign Up
│   │   └── index.ts         # Page exports
│   └── specs/
│       └── registration.spec.ts  # Registration test cases
├── playwright.config.ts     # Playwright configuration
├── package.json
└── .github/workflows/playwright.yml  # CI/CD pipeline
```

## Prerequisites

- Node.js (v16 or higher)
- npm

## Setup Instructions

1. **Extract the zip file** and navigate to the project folder:
   ```bash
   cd Automation_Task
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Running Tests

**Run all tests:**
```bash
npx playwright test
```

**Run tests with UI mode:**
```bash
npx playwright test --ui
```

**Run tests in headed mode (see browser):**
```bash
npx playwright test --headed
```

**Run specific test file:**
```bash
npx playwright test tests/specs/registration.spec.ts
```

**View HTML report after tests:**
```bash
npx playwright show-report
```

## Test Cases Included

| Test | Description |
|------|-------------|
| User can register with valid data | Registers with unique username/password, verifies success alert |
| Verify sign up modal opens correctly | Checks all modal elements are visible |
| Verify modal can be closed | Tests close button functionality |
| Registration fails with empty username | Validates empty username error |
| Registration fails with empty password | Validates empty password error |
| Registration fails with existing username | Validates duplicate user error |

## Notes

- Tests generate unique usernames using timestamps to avoid "user already exists" errors
- The site uses JavaScript alerts for feedback messages
- Tests are configured to run on Chromium by default
