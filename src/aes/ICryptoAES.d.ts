export default interface IEncryptRSA {
    encrypt(str: string, key: string, iv: string | null): string;
    decrypt(str: string, key: string, iv: string | null): string;
}
