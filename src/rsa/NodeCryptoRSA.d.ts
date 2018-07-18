import ICryptoRSA from './ICryptoRSA';
export default class NodeCryptoRSA implements ICryptoRSA {
    private pubKey;
    private priKey;
    setPublicKey(str: string): void;
    setPrivateKey(str: string): void;
    encrypt(str: string): any;
    decrypt(str: string): any;
}
