const CryptoJS = require("crypto-js");
const { env } = require("../config.js");


function encrypt(plainText)
{
    return CryptoJS.AES.encrypt(plainText, env.PASSWORD_SECRET_KEY).toString();
}

function decrypt (encrypted)
{
    return CryptoJS.AES.decrypt(encrypted, env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
}

module.exports = {
    encrypt,
    decrypt,
}