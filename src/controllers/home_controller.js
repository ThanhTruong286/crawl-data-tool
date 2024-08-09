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
    const browser = await puppeteer.launch({headless: true});//with headless = true means browser will not appear
    const page = await browser.newPage();//open in new page
    //enter browser
    await page.goto("https://store.steampowered.com/");

    //collect data from HTML with DOM
    const articles = await page.evaluate(()=>{
        //collect all object <a> inside h3 with class = klwfnwn-title
        let titlelinks = document.querySelectorAll('.focus > a');
        titlelinks = [...titlelinks];//change nodelist to array
        //use map with titlelinks array
        let articles = titlelinks.map(link => ({
            //collect title attribute and link attribute
            titlel: link.getAttribute('title'),
            url: link.getAttribute('href')
        }));

        //return result
        return articles;
    });
    //show result and close browser
    console.log(articles);
    await browser.close();
}

const home_controller = {
    get_home,
    crawlData
};

export default home_controller;