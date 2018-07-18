## api接口规范

## 一报文格式
content-type: application/json

## 二协议
如果有可能建议尽量用https。

## 三URL路径命名

**1.域名**

方式一： api.example.cn (推荐)

方式二： example.cn/api/

**2.版本控制**

方式一：api.example.cn/v{n}/（推荐）

方式二： 放入http头中

**3.api路径规则**

路径又称"终点"（endpoint），表示API的具体网址。

在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词。一般来说，数据库中的表都是同种记录的"集合"（collection），所以API中的名词也应该使用复数。


举例来说，有一个API提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样。

    api.example.com/v1/products
    api.example.com/v1/users
    api.example.com/v1/employee…

**4.http请求方式**

对于资源的具体操作类型，由HTTP动词表示。

常用的HTTP动词有下面四个）。

GET：从服务器取出资源（一项或多项）。

POST：在服务器新建一个资源。

PUT：在服务器更新资源（客户端提供改变后的完整资源）。

DELETE：从服务器删除资源。

下面是一些例子

    GET /product：列出所有商品
    POST /product：新建一个商品
    GET /product/ID：获取某个指定商品的信息
    PUT /product/ID：更新某个指定商品的信息
    DELETE /product/ID：删除某个商品
    GET /product/ID/purchase ：列出某个指定商品的所有投资者
    get /product/ID/purchase/ID：获取某个指定商品的指定投资者信息


**5.过滤信息**

如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。

下面是一些常见的参数。

    ?limit=10：指定返回记录的数量
    ?offset=10：指定返回记录的开始位置。
    ?page=2&per_page=100：指定第几页，以及每页的记录数。
    ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
    ?producy_type=1：指定筛选条件

**6.请求入参**

分4种类型：

    地址栏参数
    * restful 地址栏参数 /api/v1/product/122 122为产品编号，获取产品为122的信息
    * get方式的查询字串 见过滤信息小节
    请求body数据
    cookie
    request header

cookie和header 一般都是用于认证， 业务相关数据放入body， 地址栏参数应为资源路径以及查询相关条件。

**7，请求出参**

只要api接口成功接到请求，就不能返回200以外的HTTP状态。

为了保障前后端的数据交互的顺畅，建议规范数据的返回，并采用固定的数据格式封装。

接口返回模板：

    {
    status:0, //详细见状态码
    data:{}||[],
    msg:’’ //当status!=0 都应该有错误信息
    }

**8.组合api**

实际开发中，我们可能需要一次获取多个数据源，比如前端投保页首次渲染。

方式一: api/v1/get-apply-data 返回投保页用到的所有数据.

方式二： 把当前用户需要在第一时间内容加载的多个接口合并成一个请求发送到服务端，服务端根据请求内容，一次性把所有数据合并返回,相比于页面级api，具备更高的灵活性，同时又能很容易的实现页面级的api功能。

规范

地址：api/v1/batApi

传入参数：

    data:[
    {url:'api1',type:'get',data:{...}},
    {url:'api2',type:'get',data:{...}},
    {url:'api3',type:'get',data:{...}},
    {url:'api4',type:'get',data:{...}}
    ]


返回数据

    {status:0,msg:'',
    data:[
    {status:0,msg:'',data:[]},
    {status:-1,msg:'',data:{}},
    {status:1,msg:'',data:{}},
    {status:0,msg:'',data:[]},
    ]
    }

可以视我们团队前端同学对后端业务的掌握程度选择方式一或方式二进行。


## 四状态码
    //请求成功
    0  => 成功

    //1开头的为服务器端错误
    1* => 服务端错误
       10* => 服务端系统错误

          100* => 服务端系统错误（通用）
            1000: 'Unknown error' //未知错误
            1001： 'Service temporarily unavailable' //后端服务暂时不可用
            1002:  'Unsupported openapi method api',//api接口不被支持
            1003:  'Api request limit reached',//应用对api接口的调用请求数达到上限
            1004:   'Unauthorized client IP address:%s open api',//open api调用端的IP未被授权
            1005: 'Interface request too much', //接口请求太过频繁

          101* => 服务端系统错误（自定义）

        11* => 服务端业务错误
          110* => 服务端业务错误（通用）
            1100 => 'Update Failed',//修改失败
            1101 => 'Delete Failed',//删除失败
            1102 => 'Add Failed',//添加失败
            1103 => 'Get Failed', //查询失败
            1104 => 'User name or password error',//用户名或密码错误
            1105 => 'The user does not exist',//用户名不存在
            1106 => 'Mobile phone number is empty',//手机号码为空
            1107 => 'The operate parameters are empty when the mobile phone is sent',//发送手机验证码时操作参数为空
            1108 => 'Registered verification code has expired',//注册验证码已过期
            1109 => 'Verification code error',//验证码错误
            11010 => 'Password is empty',//用户密码为空
            11011 => 'The user name already exists',//该用户名已经存在
            11012 => 'User registration failure',//用户注册失败
            11013 => 'Send Message Failed', //发送信息失败
            11014 => 'No payment password set', //用户未设置支付密码
            11015 => 'payment password error', //用户支付密码错误
            11016 => 'Exceeding the maximum number of cash in times',//超出每日最大提现次数
            11017 => 'balance is not enough',//用户余额不足

          111* => 服务端业务错误（自定义）

    //2开头的为客户端错误
    2* => 客户端错误
        200 : 'Invalid parameter'//参数无效或缺失
        201：  'Invalid token',//token无效
        202：  'Forbidden',// 用户无权限访问该资源，请求失败
        203： 'Incorrect signature',//签名无效

## 五 鉴权

**1.鉴权方式**

token生成以及传递方式上次已讨论。

**2.token防窃取**

服务端做token和key的映射校验（非强制）

## 六 安全

**1.敏感数据加密**

使用AES加解密，AES/CBC/PKCS7Padding，密钥长度256，向量默认16个0

密钥生成步骤：

1. 终端随机生成256位长度AES密钥，记为KEY（byte[]）；

2. 终端使用预埋的RSA公钥加密第1步生成的KEY，发送给服务端（Base64）；

3. 服务端使用RSA私钥，解密得到KEY；



KEY作为AES加解密的秘钥。

注意事项：

AES 加密后的数据需要 Base64 后传输；

需要URL编码的参数如果是 Base64 后的，需要将“+”替换为%2B后，再进行URL编码传输，否则“+”在服务端会被解码成空格。

**2.数据防篡改、防重放攻击**

*1.全局请求头*

字段	描述

imei	设备唯一Id

tt	终端类型，Android、iOS、Web

vc	终端版本号，2.1.2

ts	终端时间戳，UNIX毫秒


*2.sign	终端请求参数、头信息等排序之后，Hash生成的校验值*

URL签名 - sign
公式：sign=MD5(key/head/body)


sign生成步骤

对各个参数名做字典排序。如foo=1, bar=2, baz=3 排序后为bar=2, baz=3, foo=1，拼成字符串bar=2&baz=3&foo=1，记为body；

对请求头做字典排序，记为head；


使用MD5算法对 prefix/head/body 做哈希，生成sign值。


## apicrypto使用文档

### 一. 兼容性
IE7以上，node, rn.

###  引入方式


```
方式一:

<script src="lib/apicrypto.js"></script>
<script>
var CryptoRSA = apicrypto.CryptoRSA,
    CryptoAES = apicrypto.CryptoAES,
    signature = apicrypto.signature;
</script>

方式二

const {CryptoRSA, CryptoAES, signature} = require('@xyz/apicrypto');

//or

import {CryptoRSA, CryptoAES, signature} from '@xyz/apicrypto'

//支持typescript
```

### 二. 使用方式

#### CryptoRSA


```
export default interface ICryptoRSA {

    // 设置公钥
    setPublicKey(pubKey: string): void;

   // 设置私钥
    setPrivateKey(priKey: string): void;

   //加密
    encrypt(str: string): string | boolean;
   //解密
    decrypt(str: string): string | boolean;
}
```


```
import {CryptoRSA} from '@xyz/apicrypto'

//首先创建对象

const cryptoRSA = new CryptoRSA();

//加密

cryptoRSA.setPublicKey(publicKey);
encrypted = cryptoRSA.encrypt(string)

//解密

cryptoRSA.setPrivateKey(priKey)
uncrypted = cryptoRSA.decrypt(encrypted)
```

#### CryptoAES

```
export default interface   IEncryptAES {

    encrypt(str: string , key: string, iv: string|null): string;

    decrypt(str: string, key: string, iv: string|null): string;
}
```


```
import {CryptoAES} from '@xyz/apicrypto'

//首先创建对象

const cryptoAES = new CryptoAES();

//加密

const encrypted = cryptoAES.encrypt(str, key);

//解密

cryptoAES.decrypt(encrypted, key)
```

#### 签名


```
public signature(key: string, head = {}, data = {}):string
```

```
import {signature} from '@xyz/apicrypto'

signature(key, head, data)
```


### 三. demo


```
//客户端

<script src="lib/reqwest.js"></script>
<!--[if IE ]>
<script src="lib/hack.js"></script>
<![endif]-->
<script src="lib/apicrypto.js"></script>

var AES_KEY = "hello xyz";//生成环境key应随机生成。
var header = {
    time: Date.now(),
    tt: 'any'
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

    var encrypt = new CryptoRSA()
    encrypt.setPublicKey(pubKey)
    var encrypted = encrypt.encrypt(AES_KEY)

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



// 服务器端

const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()
const {CryptoRSA, CryptoAES, signature} = require('@xyz/apicrypto');

const cryptoRSA = new CryptoRSA();
const cryptoAES = new CryptoAES();

const pubKey = "-----BEGIN PUBLIC KEY-----\n" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtKrsFSnzYl19m5wTwYdu\n" +
    "/r1UVZJV+zkAFud6+XTInAy8HbCR9n59H9+54P+Af/fUE6rvEPc4H09Z63vQzIGM\n" +
    "iL6GlqzMmptv/KRDIhj7Mk3MXomvEVfUsXrz5IpO0lf6NSeGhz4PGZUkHZ30VRx3\n" +
    "Jd/a0KIhgftZHxzmMsh8iB/n781B18pCP2eOPTF+5gRCaW+0fVPBlb/mBlg8MJrd\n" +
    "ScGCAReQ9NfTq8slJ0aO1NWaaRRANPQcCMljnTIK1ssyXBaSHKfoWeGx141mWMRx\n" +
    "/LxyZ13Zc3lqgmICiKFqMrQl5UeV1IUXYpj5hO9f60LGpZVHDqqo/JdF3+VAheaf\n" +
    "QwIDAQAB\n" +
    "-----END PUBLIC KEY-----"
const prikey = "-----BEGIN RSA PRIVATE KEY-----\n" +
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
let AES_KEY = '';

const app = new Koa();

app.use(static(path.join(__dirname)));
app.use(bodyParser());
// Add Koa Router
app.use(router.routes())
    .use(router.allowedMethods());

router.post('/rsa', (ctx, next) => {
    const question = ctx.request.body.encrypted
    cryptoRSA.setPrivateKey(prikey)
    const uncrypted = cryptoRSA.decrypt(question)
    AES_KEY = uncrypted;
    const answer = 'hi client, msg is : ' + uncrypted
    cryptoRSA.setPublicKey(pubKey)
    const encrypted = cryptoRSA.encrypt(answer);

    console.info('RSA收到客户端解密前数据:', question)
    console.info('RSA收到客户端解密后数据:', uncrypted)
    console.info('RSA返回客户端加密前数据:', answer)
    console.info('RSA返回客户端加密后数据', encrypted)

    ctx.body = encrypted;
});

router.post('/aes', (ctx, next) => {
    const question = ctx.request.body.encrypted;
    const uncrypted = cryptoAES.decrypt(question, AES_KEY)
    const answer = 'hi client, msg is : ' + uncrypted
    const encrypted = cryptoAES.encrypt(answer, AES_KEY)

    console.info('RSA收到客户端解密前数据:', question)
    console.info('RSA收到客户端解密后数据:', uncrypted)
    console.info('RSA返回客户端加密前数据:', answer)
    console.info('RSA返回客户端加密后数据', encrypted)

    ctx.body = encrypted
});

router.post('/sign', async (ctx, next) => {
    let data = ctx.request.body
    ctx.body = {isOk: ctx.request.query.q == signature(AES_KEY, data.header, data.data)}
});

app.listen(5003);


```

