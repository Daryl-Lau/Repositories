const crypto = require('crypto');

const secret = 'a@#$dHJG%$sd^@ds12GDE23';

module.exports = {
    md5(buffer){
        const hash = crypto.createHash('md5');
        // update会把值拼接起来
        hash.update(buffer);
        hash.update(secret);
        return hash.digest('hex')
    },
};