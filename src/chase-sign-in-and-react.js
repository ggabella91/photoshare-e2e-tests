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

  const delay = 3000;
  let preCount = 0;
  let postCount = 0;

  do {
    preCount = await getCount(page);
    console.log('preCount: ', preCount);
    await scrollDown(page);
    await page.waitForTimeout(delay);
    postCount = await getCount(page);
  } while (postCount > preCount);

  await page.scrollBy(0, 100);

  await page.waitForTimeout(delay);
})();

const getCount = async (page) => {
  const containerArray = await page.$$('.feed-post-container');

  return containerArray.length;
};

const scrollDown = async (page) => {
  const lastContainer = await page.$('.feed-post-container');

  lastContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'end',
  });
};
