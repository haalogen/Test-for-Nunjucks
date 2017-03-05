var fs = require('fs');

exports.postSearch = function(req, res) {
	let lang = ((req.cookies['lang'] == 'ru') || (req.cookies['lang'] == undefined)) ? 'ru' : 'en';
	let data = getData(req);
	let result = [];


	for (let i = 0; i < data.length; i++) {
		if (data[i].text.toLowerCase().indexOf(req.body.words.toLowerCase()) != -1 || data[i].title.toLowerCase().indexOf(req.body.words.toLowerCase()) != -1)
			result.push(data[i]);
	}

	res.render('search_' + lang + '.html', {
		data: result
	});
}

exports.liveSearch = function(req, res) {
	res.send(getData(req));
}

function getData(req) {
	let result = [];
	let config = JSON.parse(fs.readFileSync('src/data/config.json', 'utf8'));
	let lang = ((req.cookies['lang'] == 'ru') || (req.cookies['lang'] == undefined)) ? 'ru' : 'en';

	for (let i = 0; i <= config.pages.length; i++) {
		try {
			let object = {};
			let alias = config.pages[i]['alias'];
			object.text = fs.readFileSync('src/' + alias + '_' + lang + '.html', 'utf8')
				.replace(/<\/?[^>]+>/g, '')
				.replace(/   /g, '')
				.replace(/\n/g, '');
			object.title = lang == 'ru' ? config.pages[i]['title_ru'] : config.pages[i]['title_en'];
			object.alias = config.pages[i]['alias'];
			result.push(object);
		} catch (err) {
			continue;
		}
	}

	return result;
}
