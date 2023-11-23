const { $fetch } = require('ofetch');
module.exports = async function () {
	const USERNAME = 'maxim.kalinin@sborkaproject.com';
	const PASSWORD = '.fRuQPYfahg3wbF';
	const API_URL = 'http://kalininmax.temp.swtest.ru/api/query';

	const headers = {
		Authorization:
			'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64'),
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};

	const response = await $fetch(API_URL, {
		method: 'post',
		body: {
			query: 'page("notes").children.sortBy("date", "desc")',
			select: {
				title: true,
				text: 'page.text.toBlocks.toHtml',
				slug: true,
				date: 'page.date.toDate("d.m.Y")',
				cover: {
					query: 'page.images.first',
					select: ['url'],
				},
				tags: {
					query: 'page.content.tags',
				},
			},
		},
		headers,
	});

	return response.result;
};
