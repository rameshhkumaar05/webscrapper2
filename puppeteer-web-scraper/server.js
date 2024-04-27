const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/scrape', async (req, res) => {
    console.log(req.body)
    const { url, selector, filter } = JSON.parse(req.body);

    try {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        console.log(url)
        await page.goto(url);
        

        const data = await page.evaluate((selector, filter) => {
            const elements = document.querySelectorAll(selector);
            const results = [];
            elements.forEach(element => {
                const text = element.innerText.trim();
                if (!filter || text.toLowerCase().includes(filter.toLowerCase())) {
                    results.push(text);
                }
            });
            return results;
        }, selector, filter);

        await browser.close();

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'An error occurred while scraping the website' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("server connected");
});


