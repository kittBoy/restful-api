import CryptoJS from 'crypto-js';
var CryptoAES = /** @class */ (function () {
    function CryptoAES() {
        this.DEFAULT_IV = CryptoJS.enc.Hex.parse(this.stringToHex('0000000000000000'));
    }
    CryptoAES.prototype.stringToHex = function (str) {
        var val = "";
        for (var i = 0; i < str.length; i++) {
            if (val == "")
                val = str.charCodeAt(i).toString(16);
            else
                val += str.charCodeAt(i).toString(16);
        }
        return val;
    };
    CryptoAES.prototype.encrypt = function (str, key, iv) {
        if (iv === void 0) { iv = this.DEFAULT_IV; }
        key = CryptoJS.enc.Hex.parse(this.stringToHex(CryptoJS.MD5(key).toString().slice(8, 24)));
        return CryptoJS.AES.encrypt(str, key, { iv: iv }).toString();
    };
    ;
    CryptoAES.prototype.decrypt = function (str, key, iv) {
        if (iv === void 0) { iv = this.DEFAULT_IV; }
        key = CryptoJS.enc.Hex.parse(this.stringToHex(CryptoJS.MD5(key).toString().slice(8, 24)));
        return CryptoJS.AES.decrypt(str, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
    };
    ;
    return CryptoAES;
}());
export default CryptoAES;
//# sourceMappingURL=CryptoAES.js.map