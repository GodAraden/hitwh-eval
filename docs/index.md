## 代码本体

代码段右上角有复制按钮（终于想起来加上了）（没看见的话试着刷新下页面）

```javascript
function genRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function classAndBook() {
  const iDocument = document.querySelector('#iframename').contentDocument
  const queryform = iDocument.querySelector('#queryform')
  const allSelect = queryform.querySelectorAll('select')
  for (const select of allSelect) {
    switch (select.children[1].innerHTML) {
      case '很重要':
        select.value = select.children[genRandomInteger(1, 2)].value
        break
      case '努力也学不会':
        select.value = select.children[genRandomInteger(2, 4)].value
        break
      case '作业任务太多':
        select.value = select.children[genRandomInteger(2, 3)].value
        break
      case '很满意':
        select.value = select.children[genRandomInteger(1, 2)].value
        break
      default:
        alert('难道评教改版了？自己填吧😂')
    }
  }
}

function teachAndStudy() {
  const iDocument = document.querySelector('#iframename').contentDocument
  const queryform = iDocument.querySelector('#queryform')
  const allSelect = queryform.querySelectorAll('select')
  const allInput = queryform.querySelectorAll('textarea')
  const advantages = ['教的总体感觉挺好', '讲课生动形象', '认真负责', '老师学识渊博', '很注重方法论的讲解', '授人以渔', '幽默风趣']
  const disadvantage = '无'
  for (const select of allSelect) {
    switch (select.children[1].innerHTML) {
      case '5':
        select.value = select.children[genRandomInteger(1, 2)].value
        break
      default:
        alert('难道评教改版了？自己填吧😂')
    }
  }
  for (const input of allInput) {
    switch (input.name.slice(-4)) {
      case 'yxzc':
        input.value = advantages[genRandomInteger(0, advantages.length - 1)]
        break
      case 'bzzc':
        input.value = disadvantage
        break
      default:
        alert('难道评教改版了？自己填吧😂')
    }
  }
}

function evalTeacher() {
  const iDocument = document.querySelector('#iframename').contentDocument
  const queryform = iDocument.querySelector('#queryform')
  const allInput = queryform.querySelectorAll('input')
  const validInput = Array.from(allInput).filter(input => Number(input.value) <= 5 && input.type !== 'hidden')
  const inputGroup = []
  for (let i = 0; i < validInput.length / 5; i++) {
    const curRow = []
    for (let j = i * 5; j < i * 5 + 5; j++) {
      curRow.push(validInput[j])
    }
    inputGroup.push(curRow)
  }
  if (inputGroup.length === 0) return
  const select = new Array(inputGroup.length).fill(2)
  let choose = genRandomInteger(0, inputGroup.length - 1)

  const bestCnt = prompt('请输入你想要评出的 最优 数目：')
  for (let i = 0; i < Number(bestCnt); i++) {
    while (select[choose] !== 2) choose = genRandomInteger(0, inputGroup.length - 1)
    select[choose] = 0
  }

  const goodCnt = prompt('请输入你想要评出的 优 数目：')
  for (let i = 0; i < Number(goodCnt); i++) {
    while (select[choose] !== 2) choose = genRandomInteger(0, inputGroup.length - 1)
    select[choose] = 1
  }

  for (let i = 0; i < inputGroup.length; i++) {
    inputGroup[i][select[i]].click()
  }
}

function addBtns(strs = ['评课评教材', '评价教与学状态', '综合评价教师'], funcs = [classAndBook, teachAndStudy, evalTeacher]) {
  for (let i = 0; i < strs.length; i++) {
    const btn = document.createElement('button')
    btn.innerHTML = strs[i]
    btn.style.position = 'fixed'
    btn.style.width = '120px'
    btn.style.top = '24px'
    btn.style.left = `${i * 140 + 24}px`
    btn.addEventListener('click', funcs[i])
    document.body.appendChild(btn)
  }
}

addBtns(['评课评教材', '评价教与学状态', '综合评价教师'])
```

## 食用方法

打开教务系统网站，如：

- [校园网访问：http://172.26.64.16/loginCAS](http://172.26.64.16/loginCAS)
- [vpn 访问：http://172-26-64-16.ivpn.hitwh.edu.cn:8118/loginCAS](http://172-26-64-16.ivpn.hitwh.edu.cn:8118/loginCAS)

主题风格**使用原风格**（使用其他主体可能因为页面结构不同导致脚本失效）：

![主题风格使用原风格](/images/1.png)

F12 打开浏览器控制台，点击 Tab 栏中的控制台，粘贴代码：

![控制台粘贴代码](/images/2.png)

可以看到界面的左上角多了三个按钮，**进入按钮对应的评教界面**，点击按钮即可评教

![按钮](/images/3.png)

## 报错自查

这段脚本其实逻辑很简单，无非是拿到表单元素，模拟选中或填写。故报错翻来覆去也就这么两种：

### 1. 无法读取到 null 的 querySelectorAll 属性？

报错示例：

![无法读取到null的querySelectorAll属性报错](/images/error1.png)

解决方案：请检查是不是在首页直接点击的评教按钮，一定要**在按钮对应的评教表单页面**点击啊

### 2. 无法读取到 null 的 contentDocument 属性？

报错示例：

![无法读取到null的contentDocument属性报错](/images/error2.png)

解决方案：请检查是否使用**原色主题**，使用其他颜色主题会导致脚本获取不到容器元素从而报错

> 原色主题切换方法请上滑至[食用方法](#食用方法)第一步

### 3. 暂时没有了

目前收到的报错反馈就是这两种，另外感谢两位同学的报错截图

## 关于本脚本

作者是 20 级老东西，用这段代码水过了一年的评教，大四没课应该不评教了。因此以后如果教务系统更新（短期内这个可能性不大），本脚本不会随之更新，那时如果有同学写出了适合的脚本可以向本项目的 [github](https://github.com/GodAraden/hitwh-eval) 提 issue（或者直接接手这个项目也可以）
