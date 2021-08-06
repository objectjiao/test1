const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const code = 200 // 返回的状态码
const domain = 'http://192.168.1.108:8011/api'

// 定义请求链接，类型，还有返回数据

// 通过Mock.mock函数模拟post请求
Mock.mock(`${domain}/getgoodsList`, 'get', function (option) {
  // 这里的option是请求的相关参数
  return Mock.mock({
    status: 200,
     count: 1,
    message: '@cword(2)',
    'data|5': [{ // 5-10随机生成5~10个数据
        'id|+1': 0,
        name: '@cword(2,3)', // 生成中文汉字，word生成英文汉字
        price: 10,
        img: 'https://raw.githubusercontent.com/moon-ice/Typora-source/master/typora202005/15/163649-643563.png'
      }]
  })
})
