const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
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

  await page.type(
    '.sign-in-form > .group > [name=email]',
    'chasechronicles@test.com'
  );
  await page.type('.sign-in-form > .group > [name=password]', 'password');

  await Promise.all([
    page.waitForNavigation(),
    await page.click('.sign-in-form > .button > .submit-button'),
  ]);

  await page.waitForSelector('.feed-post-container');

  let containerArray = await page.$$('.feed-post-container');

  // Scroll to bottom feed-post-container component currently
  // on page to activate lazy loading of more such components

  await containerArray[containerArray.length - 1].hover();

  // Reset container array with new total amount of containers

  await page.waitForSelector('.feed-post-container');

  containerArray = await page.$$('.feed-post-container');

  await containerArray[containerArray.length - 1].hover();

  // React on posts in feed page from bottom up

  // Save necessary element arrays to interact with

  const textInputArray = await page.$$('[name=comment]');
  const submitCommentButtonArray = await page.$$('.submit-comment-button');
  const likeButtonArray = await page.$$('.like-button');

  // First (bottom) post

  await textInputArray[textInputArray.length - 1].type('Dope selfie brotha!');

  await submitCommentButtonArray[submitCommentButtonArray.length - 1].click();

  await likeButtonArray[likeButtonArray.length - 1].click();

  // Second post (multiple comments)

  await textInputArray[textInputArray.length - 2].type('Siiick shot yo!!');

  await submitCommentButtonArray[submitCommentButtonArray.length - 2].click();

  await textInputArray[textInputArray.length - 2].type(
    'Reminds me of the beginning of James Bond movies'
  );

  await submitCommentButtonArray[submitCommentButtonArray.length - 2].click();

  await textInputArray[textInputArray.length - 2].type(
    'I keep waiting for 007 to appear but he never does...lol'
  );

  await submitCommentButtonArray[submitCommentButtonArray.length - 2].click();

  await likeButtonArray[likeButtonArray.length - 2].click();

  // Third post (multiple comments)

  await textInputArray[textInputArray.length - 3].type(
    'Dude!! I love Tame Impala!!!'
  );

  await submitCommentButtonArray[submitCommentButtonArray.length - 3].click();

  await textInputArray[textInputArray.length - 3].type(
    'So envious you got to see them again!!!'
  );

  await submitCommentButtonArray[submitCommentButtonArray.length - 3].click();

  await textInputArray[textInputArray.length - 3].type(
    'I remember my first time seeing them, back in Coachella 2015...what a mind-blowing experience...'
  );

  await submitCommentButtonArray[submitCommentButtonArray.length - 3].click();

  await likeButtonArray[likeButtonArray.length - 3].click();

  // Fourth post (multiple comments)

  await textInputArray[textInputArray.length - 4].type('Sick night shot dude');

  await submitCommentButtonArray[submitCommentButtonArray.length - 4].click();

  await textInputArray[textInputArray.length - 4].type(
    'Man, that looked like a fun weekend overall!'
  );

  await submitCommentButtonArray[submitCommentButtonArray.length - 4].click();

  await textInputArray[textInputArray.length - 4].type(
    'That spiral tower is dope, and the Ferris wheel is classic'
  );

  await submitCommentButtonArray[submitCommentButtonArray.length - 4].click();

  await likeButtonArray[likeButtonArray.length - 4].click();
})();
