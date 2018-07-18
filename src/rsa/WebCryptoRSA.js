import JSEncrypt from 'jsencrypt';
var WebCryptoRSA = /** @class */ (function () {
    function WebCryptoRSA() {
        this.JSEncrypt = new JSEncrypt({});
    }
    WebCryptoRSA.prototype.setPublicKey = function (str) {
        this.JSEncrypt.setPublicKey(str);
    };
    WebCryptoRSA.prototype.setPrivateKey = function (str) {
        this.JSEncrypt.setPrivateKey(str);
    };
    WebCryptoRSA.prototype.encrypt = function (str) {
        return this.JSEncrypt.encrypt(str);
    };
    WebCryptoRSA.prototype.decrypt = function (str) {
        return this.JSEncrypt.decrypt(str);
    };
    return WebCryptoRSA;
}());
export default WebCryptoRSA;
//# sourceMappingURL=WebCryptoRSA.js.map