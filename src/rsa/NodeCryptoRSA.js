var NodeRSA = require('node-rsa');
var NodeCryptoRSA = /** @class */ (function () {
    function NodeCryptoRSA() {
    }
    NodeCryptoRSA.prototype.setPublicKey = function (str) {
        this.pubKey = new NodeRSA(str, { encryptionScheme: 'pkcs1' });
    };
    NodeCryptoRSA.prototype.setPrivateKey = function (str) {
        this.priKey = new NodeRSA(str, { encryptionScheme: 'pkcs1' });
    };
    NodeCryptoRSA.prototype.encrypt = function (str) {
        return this.pubKey.encrypt(str, 'base64');
    };
    NodeCryptoRSA.prototype.decrypt = function (str) {
        return this.priKey.decrypt(str, 'utf8');
    };
    return NodeCryptoRSA;
}());
export default NodeCryptoRSA;
//# sourceMappingURL=NodeCryptoRSA.js.map