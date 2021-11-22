const crypto = require('crypto');

const randomValueHex = (len) => {
    return crypto.randomBytes(len).toString('hex');
}

module.exports = {
    randomValueHex,
};
