export default interface ICryptoRSA {
    setPublicKey(pubKey: string): void;
    setPrivateKey(priKey: string): void;
    encrypt(str: string): any;
    decrypt(str: string): any;
}
