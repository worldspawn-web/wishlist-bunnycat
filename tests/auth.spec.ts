import { test, expect, type Page } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const ROUTES = {
  home: BASE_URL,
  wishlist: `${BASE_URL}/wishlist`,
  authCat: `${BASE_URL}/auth/cat`,
  authBunny: `${BASE_URL}/auth/bunny`,
} as const;

const USERS = {
  cat: {
    name: 'Кот',
    correctPassword: '143514',
    wrongPassword: '143500',
  },
  bunny: {
    name: 'Зайка',
    correctPassword: '143500',
    wrongPassword: '143514',
  },
} as const;

const UI = {
  heading: 'Список желаний',
  loginButton: 'Войти',
  passwordPlaceholder: 'Введите пароль',
  errorMessage: 'Неверный пароль',
} as const;

// For Re-usage
async function attemptLogin(page: Page, username: keyof typeof USERS, password: string) {
  await page.getByRole('button', { name: USERS[username].name }).click();
  await expect(page).toHaveURL(username === 'cat' ? ROUTES.authCat : ROUTES.authBunny);
  await expect(page.getByRole('button', { name: UI.loginButton })).toBeVisible();
  await expect(page.getByPlaceholder(UI.passwordPlaceholder)).toBeEmpty();
  await page.getByPlaceholder(UI.passwordPlaceholder).click();
  await page.getByPlaceholder(UI.passwordPlaceholder).fill(password);
  await page.getByRole('button', { name: UI.loginButton }).click();
}

test.describe('Simple Auth System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.home);
  });

  test('Main Auth Page', async ({ page }) => {
    for (const user of Object.values(USERS)) {
      await expect(page.getByRole('button', { name: user.name })).toBeVisible();
    }
    await expect(page.getByRole('heading')).toContainText(UI.heading);
    await expect(page.getByRole('main')).toBeVisible(); // Animated Background
  });

  // Dynamic Success Auth
  for (const [username, user] of Object.entries(USERS)) {
    test(`${user.name} - Successful Login`, async ({ page }) => {
      await attemptLogin(page, username as keyof typeof USERS, user.correctPassword);
      await expect(page).toHaveURL(ROUTES.wishlist);
    });
  }

  // Dynamic Fail Auth
  for (const [username, user] of Object.entries(USERS)) {
    test(`${user.name} - Failed Login`, async ({ page }) => {
      await expect(page.getByRole('heading')).toContainText(UI.heading);
      await attemptLogin(page, username as keyof typeof USERS, user.wrongPassword);

      await expect(page.locator('li')).toBeVisible();
      await expect(page.locator('li')).toContainText(UI.errorMessage);
      await expect(page).not.toHaveURL(ROUTES.wishlist);
      await expect(page).toHaveURL(username === 'cat' ? ROUTES.authCat : ROUTES.authBunny);
    });
  }
});
