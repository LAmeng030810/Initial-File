// 传入时间信息和格式化字符，计算结果
// 例如传入当前时间和'yyyy-mm-dd hh:mm'
// 返回的结果是2022-11-2 8:8
// 或者格式'hh时mm分ss秒'8时10分56秒

// function的括号里面是定义要传入的参数
function formatDate(date, format) {
  // console.log(date, format);
  // 获取分段的时间
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minture = date.getMinutes();
  let second = date.getSeconds();

  // 三元表达式，逻辑表达式?为真执行这里:为假执行这里
  // 判定月是不是小于10，是就加0，否就不变
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minture = minture < 10 ? '0' + minture : minture;
  second = second < 10 ? '0' + second : second;

  // console.log(year, month, day, hour, minture, second);

  // 替换字符串内容（要注意：替换只会替换匹配的字符串的第一个）
  let str = 'aa&&&bb&&&aa';
  let rstr = str.replace('&&&', '==');
  // console.log(str, rstr);
  // 替换格式化字符串中的信息为时间信息
  let result = format.replace('hh', hour);
  result = result.replace('mm', minture);
  result = result.replace('ss', second);
  result = result.replace('yyyy', year);
  result = result.replace('MM', month);
  result = result.replace('dd', day);

  // console.log(result);
  // return 值;表示调用function的地方可以获取到值
  return result;
}

// 格式化时间戳(是数字)
function formatTimestamp(timestamp, format) {
  // 转换时间戳为日期类型
  let date = new Date();
  date.setTime(timestamp);
  // 调用格式化方法
  return formatDate(date, format);
}

// 复制文本的方法
function copyText(info) {
    // 复制指令只能针对input元素，所有需要创建input元素来完成操作
    let input = document.createElement('input');
    // input的值设置成要复制的文本信息
    input.setAttribute('value', info);
    // 添加到页面上
    document.body.append(input);
    // 选中input的中的全部内容
    input.select();
    // 执行复制的动作
    document.execCommand('copy');
    // 完成复制之后删除input元素
    input.remove();
}
