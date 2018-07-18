import ICryptoRSA from './ICryptoRSA';
export default class WebCryptoRSA implements ICryptoRSA {
    private JSEncrypt;
    constructor();
    setPublicKey(str: string): void;
    setPrivateKey(str: string): void;
    encrypt(str: string): string | false;
    decrypt(str: string): string | false;
}
