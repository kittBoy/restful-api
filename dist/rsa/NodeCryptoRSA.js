(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.NodeCryptoRSA = factory());
}(this, (function () { 'use strict';

    var NodeRSA = require('node-rsa');
    var NodeCryptoRSA = function () {
        function NodeCryptoRSA() {}
        NodeCryptoRSA.prototype.setPublicKey = function (str) {
            this.pubKey = new NodeRSA(str, { encryptionScheme: 'pkcs1' });
        };
        NodeCryptoRSA.prototype.setPrivateKey = function (str) {
            this.priKey = new NodeRSA(str, { encryptionScheme: 'pkcs1' });
        };
        NodeCryptoRSA.prototype.encrypt = function (str) {
            return this.pubKey.encrypt(str, 'base64');
        };
        NodeCryptoRSA.prototype.decrypt = function (str) {
            return this.priKey.decrypt(str, 'utf8');
        };
        return NodeCryptoRSA;
    }();

    return NodeCryptoRSA;

})));
