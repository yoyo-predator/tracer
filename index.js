const express = require('express');
var app = express();
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
var bodyParser = require('body-parser');

app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, './view1/')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port:- ${PORT}`));

function executeCMD(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            else if (stderr) {
                resolve(stderr);
            } else {
                resolve(stdout);
            }
        })
    });
}

function readDirectory(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

function writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve('Saved');
            }
        })
    });
}

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

app.post('/api/grammar', (req, res) => {
    let grammarFile = null;
    let num = 0;
    readDirectory(path.join(__dirname, '/files/grammars/'))
        .then((data) => {
            num = Number(data[data.length - 1][7]);
            ++num;
            grammarFile = path.join(__dirname, '/files/grammars/', `grammar${num}.pegjs`);
            return writeFile(grammarFile, req.body)
        })
        .then((data) => {
            if (data == 'Saved') {
                let fileName = path.join(__dirname, '/files/parsers/', `parser${num}.js`);
                return executeCMD(`pegjs --trace -o ${fileName} ${grammarFile}`)
            } else {
                res.send('there is a problem in saving the grammar');
            }
        })
        .then((data) => {
            res.send(data);
        })
        .catch(err => res.status(500).send(err));
});

app.post('', (req, res) => {

});

app.post('', (req, res) => {

});

app.post('', (req, res) => {

});

app.get('/api/allGrammar', (req, res) => {
    readDirectory(path.join(__dirname, '/files/grammars/'))
        .then((data) => {
            res.send(data);
        })
        .catch(err => res.status(500).send(err));
});

app.get('', (req, res) => {

});

app.get('', (req, res) => {

});

app.get('', (req, res) => {

});