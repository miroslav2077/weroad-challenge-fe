import { expect, test } from '@nuxt/test-utils/playwright';

test('rendering test', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  await expect(page.getByText('WeRoad')).toBeVisible();
});

test('trip detail is loaded correctly', async ({ page, goto }) => {
  await goto('/trips/united-arab-emirates', { waitUntil: 'hydration' });
  await expect(page.getByText('United Arab Emirates')).toBeVisible();
});

test('reservation works correctly', async ({ page, goto }) => {
  await goto('/trips/united-arab-emirates', { waitUntil: 'hydration' });
  const currentAvailability = (await page.getByTestId('availability').textContent()) || '0';

  await expect(page.getByTestId('traveler-amount')).toContainText('1');
  await page.getByTestId('travelerEmail').fill('example@mail.com');
  await page.getByTestId('book-now').click();
  await goto('/trips/united-arab-emirates', { waitUntil: 'hydration' });
  await expect(page.getByTestId('availability')).toContainText((parseInt(currentAvailability) - 1).toString());
});

test('payment works correctly', async ({ page, goto }) => {
  await goto('/trips/united-arab-emirates', { waitUntil: 'hydration' });
  const currentAvailability = (await page.getByTestId('availability').textContent()) || '0';

  await expect(page.getByTestId('traveler-amount')).toContainText('1');
  await page.getByTestId('travelerEmail').fill('example@mail.com');
  await page.getByTestId('book-now').click();

  // payment page
  await expect(page.getByTestId('timer')).toHaveText(/^14/); // timer starts at 15:00 and quickly goes to 14:59 depending on rendering time/hydration
  await page.getByTestId('card-number').fill('2222 9909 0525 7051');
  await page.getByTestId('expiration-date').fill('10/28');
  await page.getByTestId('cvc').fill('028');
  await page.getByTestId('pay').click();

  await expect(page.getByText('Get ready!')).toBeVisible();
});

test('when no seats are available, reservation form should be blocked and "SOLD OUT" should be shown to user', async ({ page, goto }) => {
  await goto('/trips/united-arab-emirates', { waitUntil: 'hydration' });
  const currentAvailability = parseInt(await page.getByTestId('availability').textContent() || '0');

  if (currentAvailability === 0) {
    await expect(page.getByTestId('sold-out')).toBeVisible();
    await expect(page.getByTestId('book-now')).toHaveCount(0);
  } else {
    // reserving all seats available
    await expect(page.getByTestId('traveler-amount')).toContainText('1');
    await page.getByTestId('travelerEmail').fill('example@mail.com');
    // click multiple times to add travelers
    const nClick = [...Array(currentAvailability - 1).keys()];
    for (const n of nClick) {
      await page.getByTestId('add-traveler').click();
    }
    
    await expect(page.getByTestId('traveler-amount')).toContainText(currentAvailability+'');
    await page.getByTestId('book-now').click();
  }
  
  await page.goto('/trips/united-arab-emirates');
  await expect(page.getByTestId('sold-out')).toBeVisible();
  await expect(page.getByTestId('book-now')).toHaveCount(0);
});



