/*import signature from '../../dist/signature/Signature';*/
const signature = require('../../dist/signature/Signature');

const key = 'hi, xyz'
const header = {
    time: Date.now(),
    tt:'node'
}
const data = {
    ac: 1,
    aa: 2,
    bc: {ac:1, aa:2},
    ba: ['b','a', 1],
    cc: {a:[1,3],b:{a:1}}
}
console.log(signature(key, header, data))
console.log(signature(key, header, data) == signature(key, header, data))