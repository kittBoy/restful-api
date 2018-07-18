import ICryptoRSA from './ICryptoRSA';
import JSEncrypt from '@xyz/jsencrypt';

export default class WebCryptoRSA implements ICryptoRSA {
    private JSEncrypt: JSEncrypt;

    constructor() {
        this.JSEncrypt = new JSEncrypt({});
    }

    public setPublicKey(str: string) {
        this.JSEncrypt.setPublicKey(str);
    }

    public setPrivateKey(str: string) {
        this.JSEncrypt.setPrivateKey(str);
    }

    public encrypt(str: string) {
        return this.JSEncrypt.encrypt(str);
    }

    public decrypt(str: string) {
        return this.JSEncrypt.decrypt(str);
    }
}