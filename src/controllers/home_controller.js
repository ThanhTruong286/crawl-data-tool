import puppeteer from 'puppeteer';

let get_home = (req, res) => {
    try {
        return res.render('home.ejs');
    }
    catch (e) {
        console.log("THE FUCKING ERROR IS " + e);
    }
}

let crawlData = async () => {
    //open browser
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    //enter browser
    await page.goto("https://kenh14.vn/");

    const articles = await page.evaluate(()=>{
        let titlelinks = document.querySelectorAll('h3.klwfnswn-title > a');
        titlelinks = [...titlelinks];
        let articles = titlelinks.map(link => ({
            titlel: link.getAttribute('title'),
            url: link.getAttribute('href')
        }));

        return articles;
    });
    console.log(articles);
    await browser.close();
}

const home_controller = {
    get_home,
    crawlData
};

export default home_controller;