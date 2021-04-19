const express = require('express')

const scraper = require('./dataScraper')

const app = express();


app.get('/scrape', (req, res) => {
    scraper.scrape(req.query.url, req.query.pageNumber)
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send(err);
        });
});

app.listen(process.env.PORT || 3000, () =>
    console.log('Listening on port!'),
);