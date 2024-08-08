import express from 'express';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

let get_home = (req, res) => {
    try {
        return res.render('home.ejs');
    }
    catch (e) {
        console.log("THE FUCKING ERROR IS " + e);
    }
}
const seenUrl = {};
const getUrl = (link) => {
    if (link.includes('http')) {
        return link;
    }
    else {
        return `http://localhost:3000/${link}`;
    }
}
const crawl = async (url) => {
    if (seenUrl[link]) return;
    console.log("crawling", url);
    seenUrl[url] = true;

    const response = await fetch(url);
    const html = await response.text();
    console.log("html", html);
    const $ = cheerio.load(html);
    const link = $('a').map((i, link) => link.attribs.href).get();

    const image = $('img').map((i, link) => link.attribs.href).get();
    console.log(link);
    link.forEach(link => {
        crawl({
            url: getUrl(link),
        })
    })
}

const home_controller = {
    get_home,
    crawl
};

export default home_controller;