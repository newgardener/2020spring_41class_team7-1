const puppeteer = require('puppeteer');
const fs = require('fs');
const productSelector = '#OpenMarketMallListDiv > .diff_item';
const productProperty = {
    cost: '.prc_c',
    site_name: '.d_mall>a>img',
};

const pcode = ["11258460"]; // crawling할 item_id 정보(danawa의 pcode)

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    try {
        await Promise.all(pcode.map(item_id => crawl(item_id, browser.newPage())));
    }
    finally {
        await browser.close();
    }
})();

async function crawl(item_id, p_page) {
    const page = await p_page;
    await page.goto(`http://prod.danawa.com/info/?pcode=${item_id}`); // danawa 사이트로부터 crawling
    const productElements = await page.$$(productSelector);
    let products = await Promise.all(productElements.map(async (productElement) => {
        const cost = await productElement.$eval(productProperty.cost, el => el.textContent);
        const site_name = await productElement.$eval(productProperty.site_name, el => el.alt);
        const product_code = await page.evaluate(e => e.dataset['linkproduct'], productElement);
        const [site_id, product_id] = product_code.split('_');

        let site_url="";
        switch (site_id) {
            case "ED910": //인터파크
                site_url = "http://shopping.interpark.com/product/productInfo.do?prdNo=" + product_id;
                break;  
            case "EE128": //G마켓
                site_url = "http://item.gmarket.co.kr/Item?goodscode=" + product_id;
                break;
            case "EE715": //옥션
                site_url = "http://itempage3.auction.co.kr/DetailView.aspx?ItemNo=" + product_id;
                break;
            case "TH201": //11번가
                site_url = "http://www.11st.co.kr/product/siteProductDetail.tmall?method=getsiteProductDetail&prdNo=" + product_id;
                break;
            case "TP40F": //쿠팡
                site_url = "https://www.coupang.com/vp/products/" + product_id.substr(1);
                break;
            default:
                break;
        }
        ;

        return {
            cost, item_id, site_name, site_url
        };
    }));
    fs.writeFileSync(`${pcode}.json`, JSON.stringify(products));
}
;
