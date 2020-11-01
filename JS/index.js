const express = require('express');
const sha256 = require('js-sha256');
const nthline = require('nthline');

const app = express();
app.use(express.static('public'));
app.use(express.json());

app.listen(3000, () => console.log('Node backend is Running! Waiting for your command sir!'));

app.post('/nodejs/sha256', (req, res) => {
    console.log("POST request for nodejs/sha256 received: \n" + `${req.body.a} , ${req.body.b}`);
    const data = req.body;
    const a = data.a;
    const b = data.b;
    if (!a || !b) {
        return res.status(400).send({message: "Wrong arguments inside the response body!"});
    }
    if (!(!isNaN(a) && !isNaN(b))) {
        res.status(400).send({message: "user inputs must be numbers"});
        return;
    }
    const c = a + b;
    res.json({
        c: sha256(`${c}`)
    });
    res.send();
})

app.get('/nodejs/write', (req, res) => {
    console.log("GET request for nodejs/write received :\n" + `${req.query.line}`);
    const line = req.query.line;
    console.log("1 -------- ");
    if (!line) {
        return res.status(400).send({message: 'Wrong arguments inside the response body! missing {line}'})
    }
    console.log("2 -------");
    if (isNaN(line) || Number(line) < 1 || Number(line) > 100) {
        return res.status(400).send({message: 'line must be a number between 1 - 100'});
    }
    console.log("3 ------");
    nthline(line - 1, '../file.txt').then((text) => {
        console.log("4 ----- OK ----");
        return res.json(text).status(200).send();
    }).catch((error) => {
        console.error(error);
        return res.status(500).send({message: "couldn't read the line!"});
     res.end();
    })
})
