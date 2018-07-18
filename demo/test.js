const JSEncrypt = require('../dist/rsa/WebEncryptRSA');


const data = "hell";

const pubKey = "-----BEGIN PUBLIC KEY-----\n" +
    "MCwwDQYJKoZIhvcNAQEBBQADGwAwGAIRAMfE82X6tlpNK7Bxbhg6nEECAwEAAQ==\n" +
    "-----END PUBLIC KEY-----";
const prikey = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MGMCAQACEQDHxPNl+rZaTSuwcW4YOpxBAgMBAAECEQCqk6mhsmpyv17fK1dPeD3h\n" +
    "AgkA9Lo1aGRom0sCCQDQ+JpqE6KDIwIJAKstyIfBnA3rAggOsWwqCTdkAQIIOP95\n" +
    "RV9y2iQ=\n" +
    "-----END RSA PRIVATE KEY-----\n";

console.info('加密前数据:', data)

const encrypt = new JSEncrypt();
encrypt.setPublicKey(pubKey)
const encrypted = encrypt.encrypt(data);

console.info('加密后数据:', encrypted)


encrypt.setPrivateKey(prikey)
const uncrypted = encrypt.decrypt(encrypted)

console.info('解密后数据:', uncrypted)