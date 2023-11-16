/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const path = require('path');
const Image = require('@11ty/eleventy-img');
const PATH = require('../../paths');

async function imageShortcode(src, alt, subFolder, sizes) {
	const metadata = await Image(src, {
		urlPath: '/assets/images/' + subFolder,
		outputDir: PATH.build.images + subFolder,
		widths: ['480', '960', 'auto'],
		formats: ['avif', 'webp', 'jpeg'],
		filenameFormat: function (id, src, width, format, options) {
			const extension = path.extname(src);
			const name = path.basename(src, extension);
			return `${name}-${width}w.${format}`;
		},
	});

	const imageAttributes = {
		alt,
		sizes,
		decoding: 'async',
	};
	return Image.generateHTML(metadata, imageAttributes);
}

module.exports = imageShortcode;
