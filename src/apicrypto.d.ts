import CryptoAES from './aes/CryptoAES';
import CryptoRSA from './rsa/WebCryptoRSA';
declare const _default: {
    CryptoAES: typeof CryptoAES;
    CryptoRSA: typeof CryptoRSA;
    signature: (key: string, head?: {}, data?: {}) => string;
};
export default _default;
