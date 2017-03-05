var express = require('express'),
	router = express.Router();
var getPage = require('./controllers/getPage');
var fsSearch = require('./controllers/fsSearch');
var _lang = 'ru';



router.get('/page/:alias', getPage.page);
router.get('/search', fsSearch.liveSearch);
router.post('/search/str', fsSearch.postSearch);

router.get('/', function(req, res) {
	res.redirect('/page/main');
});

module.exports = router;
