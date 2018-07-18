import ICryptoRSA from './ICryptoRSA'
const NodeRSA = require('node-rsa');

export default class NodeCryptoRSA implements ICryptoRSA {

    private pubKey: any;
    private priKey: any;

    public setPublicKey(str: string) {
        this.pubKey = new NodeRSA(str, {encryptionScheme: 'pkcs1'})
    }

    public setPrivateKey(str: string) {
        this.priKey = new NodeRSA(str, {encryptionScheme: 'pkcs1'})
    }

    public encrypt(str: string) {
        return this.pubKey.encrypt(str, 'base64')

    }

    public decrypt(str: string) {
        return this.priKey.decrypt(str, 'utf8');
    }
}