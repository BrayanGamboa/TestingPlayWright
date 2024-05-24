// @ts-check
const { test, expect } = require('@playwright/test');

test('Registro de usuario', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/register');
  
  // Llenar los campos del formulario
  await page.fill('#username', 'dr19');
  await page.fill('#firstName', 'Stiven');
  await page.fill('#lastName', 'Herrera');
  await page.fill('#password', 'Ab1235#');
  await page.fill('#confirmPassword', 'Ab1235#');
  
  // Hacer clic en el botón de registro
  await page.click('text=Register');
  
  // Esperar a que aparezca el mensaje de éxito
  await page.waitForSelector('.result');
  
  // Verificar que el mensaje de éxito contenga el texto esperado
  const mensajeExito = page.locator('.result');
  await expect(mensajeExito).toHaveText('Registration is successful');
});



// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
