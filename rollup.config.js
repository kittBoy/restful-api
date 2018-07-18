import typescript from 'rollup-plugin-typescript';
import nodeResolve  from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const plugins =  [
    typescript(),
    nodeResolve({jsnext : true}),
    commonjs(),
    babel({
        runtimeHelpers: true,
        exclude:'node_modules/**'
    })
]

export default [
    {
        entry: 'src/apicrypto.ts',
        output:{
            format: 'umd',
            name: 'apicrypto',
            file: 'dist/apicrypto.js'
        },
        plugins
    },
    /*{
        entry: 'src/rsa/NodeCryptoRSA.ts',
        output:{
            format: 'umd',
            name: 'NodeCryptoRSA',
            file: 'dist/rsa/NodeCryptoRSA.js'
        },
        plugins
    },
    {
        entry: 'src/rsa/WebCryptoRSA.ts',
        output:{
            format: 'umd',
            name: 'WebCryptoRSA',
            file: 'dist/rsa/WebCryptoRSA.js'
        },
        plugins
    },
    {
        entry: 'src/signature/Signature.ts',
        output:{
            format: 'umd',
            name: 'signature',
            file: 'dist/signature/Signature.js'
        },
        plugins:[
            typescript(),
            nodeResolve({jsnext : true}),
            commonjs(),
            babel({
                runtimeHelpers: true
            }),
            uglify()
        ]
    },
    {
        entry: 'src/aes/CryptoAES.ts',
        output:{
            format: 'umd',
            name: 'CryptoAES',
            file: 'dist/aes/CryptoAES.js'
        },
        plugins:[
            typescript(),
            nodeResolve({jsnext : true}),
            commonjs(),
            babel({
                runtimeHelpers: true
            }),
            uglify()
        ]
    },*/
];