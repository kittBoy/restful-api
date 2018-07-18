var CryptoJS = require("../../dist/aes/CryptoAES");

var cryptoJS = new CryptoJS()
// Encrypt
var ciphertext = cryptoJS.encrypt('my message', 'secret key 12312secret key 12312secret key 12312');

console.log(ciphertext)

// Decrypt
var plaintext  = cryptoJS.decrypt(ciphertext, 'secret key 12312secret key 12312secret key 12312');


console.log(plaintext);