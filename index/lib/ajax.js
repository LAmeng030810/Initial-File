// ajax请求后端数据的公用js
// ajax请求后端数据的公用js
// 依赖axios和qs这两个第三方js库

// =====================================
// 保存服务器端的token信息
function saveToken(info) {
  // 如果应答信息存在token就保存到本地存储
  if (info && info.token) {
    localStorage.setItem('service_token_info', info.token);
  }
}

// 读取本地保存的token信息
function loadToken() {
  let token = localStorage.getItem('service_token_info');
  return token ? token : '';
}

//======================================

// 定义服务器基本地址信息
const SERVER_BASE = 'https://huhuiyu.top/teach_project_service';
// 1：请求地址，2：请求的参数（json）
// 3：请求的结果处理function，4：请求的方式
function ajax(url, params, callback, method) {
  // 补齐完整的请求地址信息
  url = SERVER_BASE + url;
  // 转换json请求参数为查询字符串格式
  // allowDots: true,表示支持多级json格式
  let info = Qs.stringify(params, {
    allowDots: true,
  });
  // 默认mothod参数可以不传入，为post
  method = method ? method : 'post';
  console.log('ajax请求信息：', url, info, method);
  // 发起ajax请求
  axios({
    // 请求地址
    url: url,
    // 请求的数据
    data: info,
    // 请求的方式
    method: method,
    // 请求的头信息(token使用头信息发送)
    headers: {
      // 发送本地保存的token
      token: loadToken(),
    },
  })
    .then((resp) => {
      // 保存服务器端的token信息
      saveToken(resp.data);
      // 正确应答的情况，传回服务器端应答数据给callback处理
      callback(resp.data);
    })
    .catch((err) => {
      console.error('ajax错误原因：', err);
      // 错误就伪造一个标准错误应答json信息回调
      callback({
        code: 500,
        success: false,
        message: '请求失败，请稍后重试...',
        error: err,
      });
    });
}

