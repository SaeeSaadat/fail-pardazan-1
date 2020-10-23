const express = require('express');
const sha256 = require('js-sha256');
const app = express();
app.use(express.static('public'));
app.use(express.json());

app.listen(3000, () => console.log('Node backend is Running! Waiting for your command sir!'));

app.post('/sha256', (req, res) => {
    const data = req.body;
    const a = data.a;
    const b = data.b;
    const c = a + b;
    res.json({
        c: sha256(`${c}`)
    });
})