var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;

// root: codebase/api

router.get('/', function(req, res, next) {
    var wsl = spawn('wsl');

    wsl.stdin.setEncoding('utf8');
    wsl.stdout.setEncoding('utf8');
    wsl.stderr.setEncoding('utf8');

    // ./algo/scMAW/sc-maw -a DNA -i ./data/3.fasta -o 2.fasta.out -k 2 -K 10
    wsl.stdin.write("./algo/scMAW/sc-maw -a DNA -i ./algo/scMAW/data/2.fasta -o ./algo/scMAW/2.fasta.out -k 2 -K 10");
    wsl.stdin.end();

    wsl.stdout.on('data', data => console.log(data));
    wsl.stderr.on('data', data => console.log(data));

    res.send('API is working properly');
});

module.exports = router;