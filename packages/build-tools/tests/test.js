#! /usr/bin/env node
console.log("===================== TEST =====================");
const core = require('../lib/index');

const data = {
  "id": "demo1",
  "name": "Preset1",
  "container": {
    // "name": "container",
    "display": "grid",
    "gridTemplateRows": "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    "gridTemplateColumns": "3fr 4fr 3fr",
    "gridRowGap": "30px",
    "gridColumnGap": "30px"
  },
  "item": [
    {
      "id": "1-1-4-1",
      "name": "item1",
      "rowStart": 1,
      "columnStart": 1,
      "rowSpan": 4,
      "columnSpan": 1,
      "zIndex": 0,
      "component": "ITEM1"
    },
    {
      "id": "5-1-4-1",
      "rowStart": 5,
      "columnStart": 1,
      "rowSpan": 4,
      "columnSpan": 1
    },
    {
      "id": "1-2-5-1",
      "rowStart": 1,
      "columnStart": 2,
      "rowSpan": 5,
      "columnSpan": 1
    },
    {
      "id": "6-2-3-1",
      "rowStart": 6,
      "columnStart": 2,
      "rowSpan": 3,
      "columnSpan": 1
    },
    {
      "id": "1-3-4-1",
      "rowStart": 1,
      "columnStart": 3,
      "rowSpan": 4,
      "columnSpan": 1
    },
    {
      "id": "5-3-4-1",
      "rowStart": 5,
      "columnStart": 3,
      "rowSpan": 4,
      "columnSpan": 1
    }
  ],
  "containerStyle": {},
  "itemStyle": {
    "border": "1px #888 dashed",
    "borderRadius": "16px"
  }
};

const styles = core.style(data);
console.log(styles);
// console.log(core.getClassName(styles));
// console.log(core.getStyles(styles));
const str = core.create(data, false, true);
console.log(str);
// // console.log(str.substring(0,180));
// const fs = require("fs");
//
// // 1.打开文件, 没有就创建, 以什么样的形式来打开文件 w:写 r:读
// let fd = fs.openSync('1.txt', 'w');
//
// // 2.写入文件,如果要写入文件必须要用 w 方式打开
// const formatter = require('html-formatter');
// const result = formatter.render(str);
// console.log(result);
// fs.writeFileSync(fd, result);
//
// // 3.关闭文件资源
// fs.closeSync(fd);

console.log("===================== TEST =====================");
