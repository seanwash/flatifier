// JSON example:
// [
// 	{
// 		"class": "flaticon stroke grid-1", // for using font via class
// 		"set": "stroke", // for generating urls and whatnot
// 		"name": "grid-1", // for generating urls and whatnot
// 		"unicode": "\\e3e8", // for using font directly
// 		"tags": "grid-1 grid" // for searching
// 	}
// ]

var fs = require('fs'),
	async = require('async'),
	child_process = require('child_process'),
	fontGenerator = require('./fontGenerator.js');

function exportJson() {
	var currentUnicode = parseInt('f0ff', 16), //fontcustom starts at f100, start one down from actual first number of f100
		svgsFolder = process.env['HOME'] + '/Downloads/flatified/svg',
		setName = global.setname,
		finalJson = [];

	fs.readdir(svgsFolder, function(err, files) {
		if (err) throw err;

		async.eachSeries(files, function(fileNameWithExt, cb) {
			if (!(/\.svg$/).test(fileNameWithExt)) {
				// we only care about SVG files
				cb();
			}

			var fileName = fileNameWithExt.substr(0, fileNameWithExt.lastIndexOf('.svg')),
				dasherizedFileName = fileName.replace(/ /g, '-');

			finalJson.push({
				"class": 'flaticon ' + setName + ' ' + dasherizedFileName,
				"set": setName,
				"name": dasherizedFileName,
				"unicode": '\\' + (++currentUnicode).toString(16),
				"tags": setName + ' ' + dasherizedFileName.toLowerCase()
			});

			cb();
		}, function(err) {
			if (err) throw err;

			fs.writeFileSync(process.env['HOME'] + '/Downloads/flatified/' + setName + '.json', JSON.stringify(finalJson));

			fontGenerator.generateFont(setName);
		});
	});
}

module.exports.exportJson = exportJson;
