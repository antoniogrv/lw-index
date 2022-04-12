const { Console } = require('console');
const fs = require('fs');
var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;

// ~__root: codebase/api

router.post('/', function (req, res, next) {
	res.set({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	});

	console.log('LW-Index > Accolgo la richiesta di computazione del grafico');

	const strings = req.body.strings;
	const algo = req.body.algo;

	const stringNames = [];

	const ENCODING = 'utf8';

	console.log(
		'LW-Index > Stringhe della richiesta [' + algo + ']: ' + strings
	);

	/*
		Trasformo le stringhe ottenute in formato FASTA
	*/

	var FASTA = '';
	var index = 1;

	strings.forEach((string) => {
		FASTA += '>' + index + '\n';
		FASTA += string.toUpperCase() + '\n';
		stringNames.push(string.toUpperCase());
		++index;
	});

	const __IN_FILE_NAME = algo + '-request-' + Date.now();
	const __IN_EXTENSION = '.fasta';
	const __IN_DIRECTORY = './algo/' + algo + '/lw-index/';

	const __OUT_FILE_NAME = Date.now();
	const __OUT_EXTENSION = '.fasta.out';
	const __OUT_DIRECTORY = './algo/' + algo + '/lw-index/result/';

	const __IN_FILE = __IN_DIRECTORY + __IN_FILE_NAME + __IN_EXTENSION;
	const __OUT_FILE = __OUT_DIRECTORY + __OUT_FILE_NAME + __OUT_EXTENSION;

	fs.writeFile(__IN_FILE, FASTA, function (err) {
		if (err) throw err;
	});

	/* 
		Avvio lo script di scMAW per generare il file FASTA corrispondente 
		es. ./algo/scMAW/sc-maw -a DNA -i ./data/3.fasta -o 2.fasta.out -k 2 -K 10
	*/

	fs.writeFile(__OUT_FILE, FASTA, function (err) {
		if (err) throw err;
	});

	console.log('LW-Index > __IN_FILE: ' + __IN_FILE);
	console.log('LW-Index > __OUT_FILE: ' + __OUT_FILE);

	var wsl = spawn('wsl');

	wsl.stdin.setEncoding(ENCODING);
	wsl.stdout.setEncoding(ENCODING);
	wsl.stderr.setEncoding(ENCODING);

	console.log('LW-Index > Esecuzione di ' + algo + '\n');

	wsl.stdin.write(
		'./algo/scMAW/sc-maw -a DNA -i ' +
			__IN_FILE +
			' -o ' +
			__OUT_FILE +
			' -k 2 -K 10'
	);

	wsl.stdin.end();

	/*
		Ottieni i risultati di esecuzione dello script
	*/

	wsl.stderr.on('data', (data) => console.log(data));

	wsl.on('exit', () => {
		console.log('LW-Index > Esecuzione di ' + algo + ' terminata');

		/* 
			Converto il file OUT elaborandolo in JSON 
		*/

		console.log('LW-Index > Conversione OUT-JSON');

		/* JSON Format
		
		{
			data: [
				{
					string: 'CCG'
					lw-1: 0.26
					lw-2: 0.9
					...
					lw-n: 1.6
				},

				{
					string: 'AAGGT'
					lw[n]: 2.1
				},
			]
		} */

		fs.readFile(__OUT_FILE, ENCODING, (err, data) => {
			if (err) throw err;

			var result = [];

			// Trasforma il file in righe in modo da poterle leggere comodamente

			const rows = data.split(/\r?\n/);

			// La prima e l'ultima riga sono inutili

			rows.shift();
			rows.pop();

			var j = 0;

			rows.forEach((row) => {
				console.log('LW-Index > Conversione riga ' + row);

				const splitData = row.split('\t');

				let string = stringNames[j++];
				let lw = [];

				splitData.shift();
				splitData.pop();
				splitData.forEach((data) => lw.push(data));

				result.push({
					string: string,
					lw: lw,
				});
			});

			/* Spedisco la risposta al client */

			console.log(result);
			res.json(result);
		});
	});
});

module.exports = router;
