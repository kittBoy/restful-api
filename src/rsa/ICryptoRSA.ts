export default interface ICryptoRSA {


    setPublicKey(pubKey: string): void;

    setPrivateKey(priKey: string): void;

    encrypt(str: string): string | boolean;

    decrypt(str: string): string | boolean;
}