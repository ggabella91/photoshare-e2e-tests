const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    // ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--start-maximized'],
    ignoreHTTPSErrors: true,
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
  );

  await page.goto('https://photo-share.dev/', {});

  await page.type('[name=username]', 'giuliano_gabella');
  await page.type('[name=name]', 'Giuliano Gabella');
  await page.type('.sign-up-form > .group > [name=email]', 'test@test.com');
  await page.type('.sign-up-form > .group > [name=password]', 'password');
  await page.type('[name=passwordConfirm]', 'password');

  await page.click('.sign-up-form > .button > .submit-button');

  await Promise.all([
    page.waitForNavigation(),
    await page.click('.sign-up-form > .button > .submit-button'),
  ]);

  await Promise.all([
    page.waitForNavigation(),
    page.click('[href="/settings"]'),
  ]);

  await page.waitForSelector('input[type=file]', { timeout: 1000 });

  const inputUploadHandle = await page.$('input[type=file]');

  let fileToUpload = '../img/profile-photos/giuliano-profile-photo.jpg';

  inputUploadHandle.uploadFile(fileToUpload);

  await page.waitForSelector('.submit-button');
  await page.click('.submit-button');

  await page.click('#settings-page-tab-update-info');

  await page.type('[name=bio]', 'I am the captain now');

  await page.click('.submit-button.settings-button');

  await Promise.all([page.waitForNavigation(), page.click('[href="/post"]')]);

  // Upload posts

  const postPhotosFolder = '../img/post-photos/';

  fs.readdir(postPhotosFolder, (err, files) => {
    files.forEach(async (file) => {
      await page.waitForSelector('input[type=file]', { timeout: 1000 });

      const inputUploadHandle = await page.$('input[type=file]');

      inputUploadHandle.uploadFile(file);

      await page.waitForSelector('.submit-button');
      await page.click('.submit-button');
    });
  });

  // await browser.close();
})();
