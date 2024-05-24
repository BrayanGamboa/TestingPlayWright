const { test, expect } = require('@playwright/test');

const url = 'https://buggy.justtestit.org'
const password = 'Bsgv2003#';
const newPassword = 'Bsgv2004#'
const userName = 'xasw219';


test('Registro de usuario', async ({ page }) => {
  await page.goto(`${url}/register`);

  await page.fill('#username', userName);
  await page.fill('#firstName', 'Stiven');
  await page.fill('#lastName', 'Herrera');
  await page.fill('#password', password);
  await page.fill('#confirmPassword', password);

  const registerButton = page.locator('button', { hasText: 'Register' });
  await expect(registerButton).toBeVisible();
  await expect(registerButton).toBeEnabled();

  await registerButton.click();

  // Esperar a que aparezca el mensaje de éxito o error
  const successMessage = page.locator('.result.alert.alert-success');
  const errorMessage = page.locator('.result.alert.alert-danger');

  // Esperar que uno de los mensajes esté visible
  await expect(successMessage.or(errorMessage)).toBeVisible({ timeout: 10000 });

  // Verificar si el mensaje de éxito contiene el texto esperado
  if (await successMessage.isVisible()) {
    await expect(successMessage).toHaveText('Registration is successful');
  } else if (await errorMessage.isVisible()) {
    const errorText = await errorMessage.textContent();
    console.log(`Error de registro: ${errorText}`);
  }
});

test('Actualizar perfil de usuario', async ({ page }) => {
  await page.goto(url);

  await page.fill('input[name="login"]', userName);
  await page.fill('input[name="password"]', password);

  await page.click('button[type="submit"]');

  const profileLink = page.locator('a.nav-link[href="/profile"]');
  await expect(profileLink).toBeVisible({ timeout: 10000 });

  await profileLink.click();

  await expect(page).toHaveURL(`${url}/profile`);

  const basicHeader = page.locator('div.card h3.card-header:has-text("Basic")');
  await expect(basicHeader).toBeVisible();

  await page.fill('#firstName', 'Jose');
  await page.fill('#lastName', 'Rincón');
  await page.fill('#age', '19');
  await page.fill('#address', "Nice site,  I think I'll take it. < script > alert('Error de Seguridad')</script > Here we go!");
  await page.fill('#phone', '123456789');
  await page.selectOption('select[formcontrolname="hobby"]', { label: 'Learning' });
  await page.fill('#currentPassword', password);
  await page.fill('#newPassword', newPassword);
  await page.fill('#newPasswordConfirmation', newPassword);

  await page.click('button[type="submit"]');


  const successMessage = page.locator('.result.alert.alert-success.hidden-md-down');
  const errorMessage = page.locator('.result.alert.alert-danger.hidden-md-down');

  // Esperar que uno de los mensajes esté visible
  await expect(successMessage.or(errorMessage)).toBeVisible({ timeout: 10000 });

  // Verificar si el mensaje de éxito contiene el texto esperado
  if (await successMessage.isVisible()) {
    await expect(successMessage).toHaveText('The profile has been saved successful');
  } else if (await errorMessage.isVisible()) {
    const errorText = await errorMessage.textContent();
    console.log(`Error de registro: ${errorText}`);
  }
});


test('Votar por autos', async ({ page }) => {

  const modelCarr = '/model/ckl2phsabijs71623vk0|ckl2phsabijs71623vqg';

  await page.goto(url);

  await page.fill('input[name="login"]', userName);
  await page.fill('input[name="password"]', password);

  await page.click('button[type="submit"]');

  await page.waitForSelector('div.row a[href="/overall"]');

  await page.click('div.row a[href="/overall"]');

  await expect(page).toHaveURL(`${url}/overall`);

  await page.waitForSelector(`div.container a[href="${modelCarr}"]`);

  await page.click(`div.container a[href="${modelCarr}"]`);

  await page.fill('#comment', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.');
  await page.click('div.card .btn.btn-success');

  const successMessage = page.locator('div.card .card-block .card-text');
  await expect(successMessage).toBeVisible({ timeout: 10000 });

  if (await successMessage.isVisible())
    await expect(successMessage).toHaveText('Thank you for your vote!');

});
