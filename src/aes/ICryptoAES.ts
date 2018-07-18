
export default interface   IEncryptAES {

    encrypt(str: string , key: string, iv: string|null): string;

    decrypt(str: string, key: string, iv: string|null): string;
}