import ICryptoAES from './ICryptoAES';
export default class CryptoAES implements ICryptoAES {
    DEFAULT_IV: any;
    stringToHex(str: string): string;
    encrypt(str: string, key: string, iv?: any): string;
    decrypt(str: string, key: string, iv?: any): string;
}
