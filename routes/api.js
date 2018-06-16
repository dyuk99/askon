const express = require('express');
const router = express.Router();
const model = require('../helpers/model');
const dateFormat = require('dateformat');


let recompileName = (name) => {
    return name.replace(/([а-яё])|([\s_-])|([^a-z\d])/gi,
        function (all, ch, space, words, i) {
            if (space || words) {
                return space ? '-' : '';
            }
            var code = ch.charCodeAt(0),
                index = code == 1025 || code == 1105 ? 0 :
                    code > 1071 ? code - 1071 : code - 1039,
                t = ['yo', 'a', 'b', 'v', 'g', 'd', 'e', 'zh',
                    'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p',
                    'r', 's', 't', 'u', 'f', 'h', 'c', 'ch', 'sh',
                    'shch', '', 'y', '', 'e', 'yu', 'ya'
                ];
            return t[index];
        }
    );
}

let changeSelectName = (name) => {
    switch(name) {
        case 'Новости':
            return 'news';
        case 'Мероприятия':
            return 'events';
        case 'Специальные предложения':
            return 'special';
        case 'Заказчики':
            return 'clients';
    }
}

router.post('/add',
    async (req, res) => {
        try {
            let news = req.body;
            let tempNews = new model.News(Object.assign({}, news, {tagName: recompileName(news.name)}, {type: changeSelectName(news.type)}, {date: dateFormat(new Date(), "dd-mm-yy")}));
            tempNews.save()
                .then(() =>  res.send(news))
                .catch((err) => {res.send('error while adding to db')});
        } catch (e) {
            res.send('API error');
        }
    });

router.post('/remove',
    async (req, res) => {
        try {
            let data = await model.News.findOneAndRemove({'tagName': req.body.tagName});
            res.send('OK');
        } catch (e) {
            res.send('API error');
        }
    });

router.get('/:news_type([_a-zA-Z]+)',
    async (req,res) => {
        try {
            let type = req.params.news_type;
            if (type != 'news' && type != 'special' && type != 'clients' && type != 'events')
                res.send('page not found');
            let data = await model.News.find({'type': type});
            res.send(data);
        } catch (e) {
            res.send('API error');
        }
    });

module.exports = router;