import MD5 from 'crypto-js/md5';
var Signature = /** @class */ (function () {
    function Signature() {
    }
    Signature.prototype.isObject = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    };
    Signature.prototype.json2str = function (json) {
        return JSON.stringify(json, function (key, value) { return String(value); });
    };
    Signature.prototype.sortByKey = function (obj) {
        var _this = this;
        var keys = Object.keys(obj).sort();
        var ret = {};
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var val = obj[key];
            if (Array.isArray(val)) {
                ret[key] = val.map(function (y) { return _this.isObject(y) ? _this.sortByKey(y) : y; });
                continue;
            }
            ret[key] = this.isObject(val) ? this.sortByKey(val) : val;
        }
        return ret;
    };
    Signature.prototype.signature = function (key, head, data) {
        if (head === void 0) { head = {}; }
        if (data === void 0) { data = {}; }
        var signStr = key + this.json2str(this.sortByKey(head)) + this.json2str(this.sortByKey(data));
        return MD5(signStr).toString();
    };
    return Signature;
}());
var signature = new Signature();
export default (function (key, head, data) {
    if (head === void 0) { head = {}; }
    if (data === void 0) { data = {}; }
    return signature.signature(key, head, data);
});
//# sourceMappingURL=Signature.js.map