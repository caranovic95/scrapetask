const puppeteer = require('puppeteer');


const scrape = async (url, pageNumber) => {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    let arr = {};
    for (let i = 1; i <= pageNumber; i++) {
        await page.goto(url + '?pageNumber=' + i);
        let scraperObject = await page.evaluate(() => {
            const productNames = document.querySelectorAll('h2[data-qa-id="product-name"]');
            const pzns = document.querySelectorAll('div[class="o-ProductPackageDetails"]');
            const prices = document.querySelectorAll('div[data-qa-id="entry-price"]');
            const imageLinks = document.querySelectorAll('div[class="m-ImageWithDiscountBadge"]');

            const productDetails = [];

            for (let i = 0; i < productNames.length; i++) {
                let productDetail = {};
                productDetail.position = i + 1;
                productDetail.name = productNames[i].innerHTML;
                let pzn = pzns[i].childNodes[1].textContent.split(':');
                productDetail.pzn = pzn[1].replace(/ /g, '');
                productDetail.price = prices[i + i].childNodes[0].innerHTML;
                productDetail.imageLink = imageLinks[i].querySelector('img[class="a-fullwidth-image"]').getAttribute('src');
                productDetails.push(productDetail);
            }

            return productDetails;
        })

        console.log(scraperObject);
        arr['page' + i] = scraperObject;


    }

    await browser.close();
    return arr;
};
module.exports.scrape = scrape;
