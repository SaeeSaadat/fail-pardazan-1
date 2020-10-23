const sha256 = require('js-sha256');

const c = 40;
const s = sha256(`${c}`);
console.log(s);