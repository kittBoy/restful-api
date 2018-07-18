import ICryptoAES from './ICryptoAES'
import CryptoJS from 'crypto-js';


export default class CryptoAES implements ICryptoAES {
    DEFAULT_IV = CryptoJS.enc.Hex.parse(this.stringToHex('0000000000000000'));

    public stringToHex(str: string) {
        var val = "";
        for (var i = 0; i < str.length; i++) {
            if (val == "")
                val = str.charCodeAt(i).toString(16);
            else
                val += str.charCodeAt(i).toString(16);
        }
        return val;
    }


    public encrypt(str: string, key: string, iv = this.DEFAULT_IV) {
        key = CryptoJS.enc.Hex.parse(this.stringToHex(CryptoJS.MD5(key).toString().slice(8, 24)))
        return CryptoJS.AES.encrypt(str, key, {iv}).toString();
    };

    public decrypt(str: string, key: string, iv = this.DEFAULT_IV) {
        key = CryptoJS.enc.Hex.parse(this.stringToHex(CryptoJS.MD5(key).toString().slice(8, 24)))
        return CryptoJS.AES.decrypt(str, key, {iv}).toString(CryptoJS.enc.Utf8);
    };
}