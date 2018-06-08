const express = require('express');
const router = express.Router();
const model = require('../helpers/model');

router.get('/',
    async (req,res) => {
        try {
            let data = await model.News.find({});
            console.log(data);
            res.send(data);
        } catch (e) {
            res.send('API error');
        }
    });

router.post('/add',
    async (req, res) => {
        try {
            console.log(req.body);
            let tempNews = new model.News(req.body);
            tempNews.save()
                .then(() =>  res.send(req.body))
                .catch((err) => {res.send('error while adding to db')});
        } catch (e) {
            res.send('API error');
        }
    });

module.exports = router;