var AES_KEY = "hello xyz";
var header = {
    time: Date.now(),
    tt: 'node'
}
var data = {
    ac: 1,
    aa: 2,
    bc: {ac: 1, aa: 2},
    ba: ['b', 'a', 1],
    cc: {a: [1, 3], b: {a: 1}}
}

var pubKey = "-----BEGIN PUBLIC KEY-----\n" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtKrsFSnzYl19m5wTwYdu\n" +
    "/r1UVZJV+zkAFud6+XTInAy8HbCR9n59H9+54P+Af/fUE6rvEPc4H09Z63vQzIGM\n" +
    "iL6GlqzMmptv/KRDIhj7Mk3MXomvEVfUsXrz5IpO0lf6NSeGhz4PGZUkHZ30VRx3\n" +
    "Jd/a0KIhgftZHxzmMsh8iB/n781B18pCP2eOPTF+5gRCaW+0fVPBlb/mBlg8MJrd\n" +
    "ScGCAReQ9NfTq8slJ0aO1NWaaRRANPQcCMljnTIK1ssyXBaSHKfoWeGx141mWMRx\n" +
    "/LxyZ13Zc3lqgmICiKFqMrQl5UeV1IUXYpj5hO9f60LGpZVHDqqo/JdF3+VAheaf\n" +
    "QwIDAQAB\n" +
    "-----END PUBLIC KEY-----"
var prikey = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIEpAIBAAKCAQEAtKrsFSnzYl19m5wTwYdu/r1UVZJV+zkAFud6+XTInAy8HbCR\n" +
    "9n59H9+54P+Af/fUE6rvEPc4H09Z63vQzIGMiL6GlqzMmptv/KRDIhj7Mk3MXomv\n" +
    "EVfUsXrz5IpO0lf6NSeGhz4PGZUkHZ30VRx3Jd/a0KIhgftZHxzmMsh8iB/n781B\n" +
    "18pCP2eOPTF+5gRCaW+0fVPBlb/mBlg8MJrdScGCAReQ9NfTq8slJ0aO1NWaaRRA\n" +
    "NPQcCMljnTIK1ssyXBaSHKfoWeGx141mWMRx/LxyZ13Zc3lqgmICiKFqMrQl5UeV\n" +
    "1IUXYpj5hO9f60LGpZVHDqqo/JdF3+VAheafQwIDAQABAoIBAQCS/++PWM7bXk5x\n" +
    "apD4ioXZZ5tS9PpYqoxUFoyMpGUF86asUZqyAUE1ygen9rxLYw5/4jkaiMx1TU9Q\n" +
    "tzGw9Eewi7Veq8LemVKJMe4dtE3PJFYBJe34IorAzdXcQlzX8RV4YmynZetLWXpF\n" +
    "Ttwa1Ept2rJjx0eURzrAgfcbot0Qs+c8bB0qnGC67PoL3DyYg8vX5PDmiiA2VZMG\n" +
    "EylVQS09toJn5ReaKCtjxJb/XFQjBeSP0xLjvZZftGDJgpwmmi7Sy/zAZoF4+7wf\n" +
    "8nihXk4ZfYC+beBj5U9pcUcs6LdNobUofWFRLSjueseRQBI0sKUslr3Ye4zhkrWM\n" +
    "CDnsSxBhAoGBANi0spS/Mc6xH1189mR7dJV9gy7KkGxheAstwCJr7WzbXqglhFm2\n" +
    "SvY9hrpE9OYWir5EqX6jM6VipSobTn0RpCsYUC/J1ISMyEA5UkPLP4jHQw6UUDN2\n" +
    "1fNAXffEyuju5ShP9Mk2unZstlUweKlFF7d1k7YAzWDIKnF6bOL06YC9AoGBANVt\n" +
    "XM4OH0zw8M97W04WwYGoa5s1Y5JYc4RMV200cr3iONVfLZgSP8thP1qPuoMM3OJg\n" +
    "Bqe6MRmo/VXhgVvpke04ZJ83LSz/SoqfVRNwxuCHqp3beJQPxrAp1d/L7Ey7f41U\n" +
    "QBE8pibFb8bbgOTUW5iyZbg7lLS8nghsn+BqYp//AoGBAJO/574o+YGOG+92wttR\n" +
    "nPRLhgSCEaQDdIBSqhwN7+v3SXtlUO6FrmhjHJelaj/yAJinYdS42v6Y2jlyMrpt\n" +
    "K7xCMHHUrzPMdL/tFRyp1+Ce0yZ+kov0Kv1V1nuWzi2wq8cndKM30Dvr9QjyKmJm\n" +
    "fDwWSyadN2oUL3P9X34CM64VAoGAbajAW1skN/tAL8r48dl9WWo4x8mZvJLX36z9\n" +
    "6q1dGzVF8FPz8EPIJW51B8n7keQlBedC5CElo0KRz/OK7LfI87La+Hd4LbuKCEmv\n" +
    "g8qZVLpALtWaUbD9bHxCWLfFVPOtqOcV+AVKdXdSZEFaK7j0yzM2Un/Ce07CgB+X\n" +
    "0c23mO8CgYAOqnUR/uPIzkvj/eIbO7pnhHoKZ4Ji2TrIBqjskzaFd0Tox9i3SWKa\n" +
    "cRdQciRIT1wkMdywnHFrJT1rwYXxcgfQXAku/vnYqAfvIzY7TyoL3pWX55O0Zrs7\n" +
    "05R9mA5TZmzUU9m/PzUrRjasOGYSKkCz4Y2qGlrKI3H0aE+p+R56kQ==\n" +
    "-----END RSA PRIVATE KEY-----\n"

var CryptoRSA = apicrypto.CryptoRSA,
    CryptoAES = apicrypto.CryptoAES,
    signature = apicrypto.signature;


//RSA加解密测试
(function TestRsa() {
    console.info('------------------RSA加解密测试-----------------------')

    var encrypt = new CryptoRSA();
    encrypt.setPublicKey(pubKey)
    var encrypted = encrypt.encrypt(AES_KEY);

    reqwest({
        url: '/rsa',
        data: {encrypted: encrypted},
        method: 'POST',
        success: function (res) {
            encrypt.setPrivateKey(prikey)
            var uncrypted = encrypt.decrypt(res)
            console.info('RSA客户端加密前数据：', AES_KEY)
            console.info('RSA客户端加密后数据：', encrypted)
            console.info('RSA收到服务器端解密前数据：', res)
            console.info('RSA收到服务器端解密后数据：', uncrypted)
            TestAes()
        }
    })
})()


//AES加解密测试
function TestAes() {
    console.info('------------------AES加解密测试-----------------------')

    var aes = new CryptoAES();
    var encrypted = aes.encrypt('hi, server', AES_KEY)

    reqwest({
        url: '/aes',
        data: {encrypted: encrypted},
        method: 'POST',
        success: function (res) {
            var uncrypted = aes.decrypt(res, AES_KEY)
            console.info('aes客户端加密前数据：', 'hi, server')
            console.info('aes客户端加密后数据：', encrypted)
            console.info('aes服务器端解密前数据：', res)
            console.info('aes服务器端解密后数据：', uncrypted)
            TestSign()
        }
    })
}


//签名测试
function TestSign() {
    console.info('------------------签名测试-----------------------')

    var sign = signature(AES_KEY, header, data)
    reqwest({
        url: '/sign?q=' + sign,
        data: {header: header, data: data},
        method: 'POST',
        success: function (res) {
            console.info('客户端签名和字符串:', sign)
            console.info('服务器签名验证是否成功', res.isOk)
        }
    })
}

