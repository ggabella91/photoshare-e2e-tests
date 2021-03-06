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
  await page.click('.submit-button', { delay: 100 });

  await page.click('#settings-page-tab-update-info');

  await page.type('[name=bio]', 'I am the captain now');

  await page.click('.submit-button.settings-button', { delay: 100 });

  // Upload posts

  await Promise.all([page.waitForNavigation(), page.click('[href="/post"]')]);

  // First post

  await page.waitForSelector('input[type=file]', { timeout: 1000 });

  const inputUploadHandle2 = await page.$('input[type=file]');

  await inputUploadHandle2.uploadFile(
    '../img/post-photos/selfie-with-astronaut.jpg'
  );

  await page.waitForSelector('.submit-button');
  await page.click('.submit-button', { delay: 100 });

  // Second post

  await Promise.all([
    page.waitForSelector('.placeholder-text'),
    page.waitForSelector('input[type=file]', { timeout: 1000 }),
  ]);

  const inputUploadHandle3 = await page.$('input[type=file]');

  await inputUploadHandle3.uploadFile('../img/post-photos/under-a-tee-pee.jpg');

  await page.waitForSelector('.submit-button');
  await page.click('.submit-button', { delay: 100 });

  // Third post

  await Promise.all([
    page.waitForSelector('.placeholder-text'),
    page.waitForSelector('input[type=file]', { timeout: 1000 }),
  ]);

  const inputUploadHandle4 = await page.$('input[type=file]');

  await inputUploadHandle4.uploadFile('../img/post-photos/tame-impala.jpg');

  await page.waitForSelector('.submit-button');
  await page.click('.submit-button', { delay: 100 });

  // Fourth post

  await Promise.all([
    page.waitForSelector('.placeholder-text'),
    page.waitForSelector('input[type=file]', { timeout: 1000 }),
  ]);

  const inputUploadHandle5 = await page.$('input[type=file]');

  await inputUploadHandle5.uploadFile(
    '../img/post-photos/spectra-ferris-wheel-sahara-tent-nighttime.jpg'
  );

  await Promise.all([
    page.waitForSelector('.submit-button'),
    page.click('.submit-button', { delay: 1000 }),
  ]);

  await new Promise((resolve, reject) => setTimeout(resolve, 1000));

  // Navigate to my-profile-page

  await Promise.all([
    page.waitForNavigation(),
    page.click('[href="/giuliano_gabella"]'),
  ]);

  await page.waitForSelector('.post-tile-image');

  const postTiles = await page.$$('.post-tile-image');

  // Edit posts to add caption and location for each

  // First post

  const firstImage = postTiles[3];

  await firstImage.hover();

  const imageOverlays = await page.$$('.image-overlay');

  const firstImageOverlay = imageOverlays[3];
  await firstImageOverlay.evaluate((div) => div.click());

  await Promise.all([
    page.waitForSelector('.edit-post'),
    page.click('.edit-post'),
  ]);

  await page.type(
    '[name=caption]',
    'Awesome times at #Coachella 2019 #music #festival'
  );
  await page.type('[name=location]', 'Indio, California');

  await page.click('.edit-post-button', { delay: 50 });

  await page.click('.close', { delay: 50 });

  // Second post

  const secondImage = postTiles[2];

  await secondImage.hover();

  const secondImageOverlay = imageOverlays[2];
  await secondImageOverlay.evaluate((div) => div.click());

  await Promise.all([
    page.waitForSelector('.edit-post'),
    page.click('.edit-post'),
  ]);

  await page.type(
    '[name=caption]',
    'Cool capture under a tee-pee #photography #asbtract #coachella'
  );
  await page.type('[name=location]', 'Indio, California');

  await page.click('.edit-post-button', { delay: 50 });

  await page.click('.close', { delay: 50 });

  // Third post

  const thirdImage = postTiles[1];

  await thirdImage.hover();

  const thirdImageOverlay = imageOverlays[1];
  await thirdImageOverlay.evaluate((div) => div.click());

  await Promise.all([
    page.waitForSelector('.edit-post'),
    page.click('.edit-post'),
  ]);

  await page.type(
    '[name=caption]',
    'Tame Impala was amazing, yet again #tameimpala #coachella #music #festival'
  );
  await page.type('[name=location]', 'Indio, California');

  await page.click('.edit-post-button', { delay: 50 });

  await page.click('.likes-icon');

  await page.click('.close', { delay: 50 });

  // Fourth post

  const fourthImage = postTiles[0];

  await fourthImage.hover();

  const fourthImageOverlay = imageOverlays[0];
  await fourthImageOverlay.evaluate((div) => div.click());

  await Promise.all([
    page.waitForSelector('.edit-post'),
    page.click('.edit-post'),
  ]);

  await page.type(
    '[name=caption]',
    "Last night at 'chella #nightphotography #coachella"
  );
  await page.type('[name=location]', 'Indio, California');

  await page.click('.edit-post-button', { delay: 50 });

  await page.click('.close', { delay: 50 });

  await browser.close();
})();
