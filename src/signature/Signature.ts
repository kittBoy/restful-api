import MD5 from 'crypto-js/md5';

class Signature {
    private isObject(obj: any) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    }

    private json2str(json: object) {
        return JSON.stringify(json, (key, value) => String(value));
    }

    private sortByKey(obj: any) {
        const keys = Object.keys(obj).sort();
        const ret: any = {};
        for (const key of keys) {
            const val = obj[key];

            if (Array.isArray(val)) {
                ret[key] = val.map(y => this.isObject(y) ? this.sortByKey(y) : y);
                continue;
            }

            ret[key] = this.isObject(val) ? this.sortByKey(val) : val;
        }
        return ret;
    }

    public signature(key: string, head = {}, data = {}) {
        const signStr = key + this.json2str(this.sortByKey(head)) + this.json2str(this.sortByKey(data));
        return MD5(signStr).toString();
    }
}

const signature = new Signature();
export default (key: string, head = {}, data = {}) => {
    return signature.signature(key, head, data);
};

