## 代码本体

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
        return -1
    }
  }

  return 0
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
        return -1
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
        return -1
    }
  }

  return 0
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

  return 0
}

function addBtns() {
  const entries = [
    [0, '评课评教材', classAndBook],
    [1, '评价教与学状态', teachAndStudy],
    [2, '综合评价教师', evalTeacher]
  ]

  for (const [index, text, func] of entries) {
    const btn = document.createElement('button')
    btn.innerHTML = text
    btn.style.position = 'fixed'
    btn.style.width = '120px'
    btn.style.top = '24px'
    btn.style.left = `${index * 140 + 24}px`
    btn.addEventListener('click', () => {
      try {
        const result = func()
        if (result === -1) {
          alert('评教失败，可能系统改版，烦请手动填写🙏')
        }
      } catch (e) {
        alert('啊哦，出错了，请参照文档检查是否在正确的页面点击按钮🙌')
      }
    })
    document.body.appendChild(btn)
  }
}

addBtns()
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

## 关于本脚本

作者是 20 级老东西，用这段代码水过了一年的评教，大四没课应该不评教了。因此以后如果教务系统更新（短期内这个可能性不大），本脚本不会随之更新，那时如果有同学写出了适合的脚本可以向本项目的 [github](https://github.com/GodAraden/hitwh-eval) 提 issue（或者直接接手这个项目也可以）
