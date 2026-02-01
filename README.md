# Nawy DemoBlaze E2E Test Automation

Playwright TypeScript end-to-end automation tests for [demoblaze.com](https://www.demoblaze.com/) using Page Object Model (POM) design pattern.

## 🎯 Test Scenarios

| Scenario | Description |
|----------|-------------|
| **Scenario 1** | The user can register with valid data |
| **Scenario 2** | The user can log in with valid email and password |
| **Scenario 3** | The user can log out |
| **Scenario 4** | Successfully create an order for an Apple monitor 24 |

## 📁 Project Structure

```
nawy-demoblaze-e2e-tests/
├── tests/
│   ├── pages/                    # Page Object Model classes
│   │   ├── SignUpPage.ts         # Sign Up page object
│   │   ├── LoginPage.ts          # Login page object
│   │   ├── ProductPage.ts        # Product browsing page object
│   │   ├── CartPage.ts           # Cart & Checkout page object
│   │   └── index.ts              # Page exports
│   └── specs/
│       └── e2e.spec.ts           # End-to-end test specifications
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Project dependencies
├── .gitignore                    # Git ignore rules
└── .github/
    └── workflows/
        └── playwright.yml        # GitHub Actions CI/CD pipeline
```

## 🔧 Design Pattern

This project implements the **Page Object Model (POM)** design pattern:

- **SignUpPage**: Handles user registration functionality
- **LoginPage**: Manages login/logout operations
- **ProductPage**: Controls product browsing and selection
- **CartPage**: Manages cart operations and checkout process

## ⚙️ Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbdelrahmanRawag/Automation_Task-.git
   cd Automation_Task-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 🏃 Running Tests

**Run all tests:**
```bash
npx playwright test
```

**Run tests with UI mode (interactive):**
```bash
npx playwright test --ui
```

**Run tests in headed mode (see browser):**
```bash
npx playwright test --headed
```

**Run specific test file:**
```bash
npx playwright test tests/specs/e2e.spec.ts
```

**View HTML report after tests:**
```bash
npx playwright show-report
```

## 📊 Test Report

After running tests, an HTML report is generated. View it with:
```bash
npx playwright show-report
```

## 🔄 CI/CD

This project includes GitHub Actions workflow for continuous integration. Tests automatically run on:
- Push to `main` branch
- Pull requests to `main` branch

## 📝 Test Flow

The main E2E test follows this complete user journey:

1. **Registration** → Register a new user with unique credentials
2. **Login** → Login with the registered credentials
3. **Order Creation** → Browse monitors, select Apple monitor 24, add to cart, complete checkout
4. **Logout** → Successfully logout from the application

## 🛠️ Technologies Used

- **Playwright** - Modern web testing framework
- **TypeScript** - Type-safe JavaScript
- **Page Object Model** - Design pattern for maintainable tests
- **GitHub Actions** - CI/CD automation

## 👤 Author

**Abdelrahman Rawag**

---

