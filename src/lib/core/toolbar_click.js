const operateList = [
  {
    type: 'bold', // 加粗
    prefix: '**',
    suffix: '**',
    keys: ''
  }, {
    type: 'del', // 删除线
    prefix: '~~',
    suffix: '~~',
    keys: ''
  }, {
    type: 'underline', // 下划线
    prefix: '++',
    suffix: '++',
    keys: ''
  }, {
    type: 'italic', // 斜体
    prefix: '*',
    suffix: '*',
    keys: ''
  }, {
    type: 'quote', // 引用
    prefix: '\n> ',
    suffix: '',
    keys: ''
  }, {
    type: 'bookmark', // 标记
    prefix: '==',
    suffix: '==',
    keys: ''
  }, {
    type: 'superscript', // 上角标
    prefix: '^',
    suffix: '^',
    keys: ''
  }, {
    type: 'subscript', // 下角标
    prefix: '~',
    suffix: '~',
    keys: ''
  }, {
    type: 'h1', // 标题1
    prefix: '# ',
    suffix: '',
    keys: ''
  }, {
    type: 'h2', // 标题2
    prefix: '## ',
    suffix: '',
    keys: ''
  }, {
    type: 'h3', // 标题3
    prefix: '### ',
    suffix: '',
    keys: ''
  }, {
    type: 'h4', // 标题4
    prefix: '#### ',
    suffix: '',
    keys: ''
  }, {
    type: 'h5', // 标题5
    prefix: '##### ',
    suffix: '',
    keys: ''
  }, {
    type: 'h6', // 标题6
    prefix: '###### ',
    suffix: '',
    keys: ''
  }, {
    type: 'alignLeft', // 居左
    prefix: '\n::: le-left \n',
    suffix: '\n:::',
    keys: ''
  }, {
    type: 'alignCenter', // 居中
    prefix: '\n::: le-center \n',
    suffix: '\n:::',
    keys: ''
  }, {
    type: 'alignRight', // 居右
    prefix: '\n::: le-right \n',
    suffix: '\n:::',
    keys: ''
  }, {
    type: 'ol', // 有序列表
    prefix: '1. ',
    suffix: '',
    keys: ''
  }, {
    type: 'ul', // 无序列表
    prefix: '- ',
    suffix: '',
    keys: ''
  }, {
    type: 'hr', //  分割线
    prefix: '--- ',
    suffix: '',
    keys: ''
  }, {
    type: 'link', //  链接
    prefix: '[title](',
    suffix: ')',
    keys: ''
  }, {
    type: 'inlineCode', // 行内代码
    prefix: '`',
    suffix: '`',
    keys: ''
  }, {
    type: 'code', //  代码块
    prefix: '```\n',
    suffix: '\n```',
    keys: ''
  }, {
    type: 'image',
    prefix: '![test](',
    suffix: ')',
    keys: ''
  }
]

const table = {
  justify: '-------- |',
  left: ':------- |',
  center: ':------: |',
  right: '-------: |'
}

const IMAGE_PATTERN = /^!\[(.*)\]\((.*)\)$/;

// 存入图片
export const insertImg = ($vm, data, type = "markdown", val = -1) => {
  if (type === "imgTag") {
    let sizeStr = "";
    if (val === -1) {
      sizeStr = 'width="100" height="100"';
    } else {
      sizeStr = `style="zoom:${val}%"`;
    }
    insertText($vm, {
      type: 'imgTag',
      prefix: '<img src="',
      suffix: `${data.url}" alt="${data.title}" ${sizeStr} />`
    }, '')
  } else {
    insertText($vm, {
      type: 'image',
      prefix: '![',
      suffix: '](' + data.url + ')'
    }, data.title)
  }
}

// 放入表格
export const insertTable = ($vm, tableInfo) => {
  let tempStr = '\n'
  for (let i = 0; i <= tableInfo.rows + 1; i++) {
    for (let j = 1; j <= tableInfo.cols; j++) {
      if (i === 0) {
        tempStr += 'Header ' + j + ' |'
      } else if (i === 1) {
        tempStr += table[`${tableInfo.type}`]
      } else {
        tempStr += ('row ' + (i - 1) + ' col ' + j + ' |')
      }
    }
    tempStr += '\n'
  }
  insertText($vm, {
    type: 'table',
    prefix: tempStr,
    suffix: ''
  }, '')
}

export const simpleClick = ($vm, type) => {
  if (type === 'undo') {
    $vm.editor.undo()
  } else if (type === 'redo') {
    $vm.editor.redo()
  } else {
    for (const i in operateList) {
      if (operateList[i].type === type) {
        insertText($vm, operateList[i], $vm.placeholders[`${type}`])
        break
      }
    }
  }
  // if (type === 'undo' || type === 'redo') {
  //   // 这两个按键功能不屏蔽
  //   // if (type === 'undo') {
  //   //   $vm.historyPushFlag = false
  //   //   $vm.historyIndex = $vm.historyIndex >= 0 ? ($vm.historyIndex - 1) : -1
  //   //   // $vm.origin = $vm.historyIndex === -1 ? '' : $vm.history[$vm.historyIndex]
  //   //   $vm.editor.setValue($vm.historyIndex === -1 ? '' : $vm.history[$vm.historyIndex])
  //   // } else {
  //   //   $vm.historyPushFlag = false
  //   //   $vm.historyIndex = $vm.historyIndex === $vm.history.length - 1 ? $vm.historyIndex : ($vm.historyIndex + 1)
  //   //   // $vm.origin = $vm.history[$vm.historyIndex]
  //   //   $vm.editor.setValue($vm.history[$vm.historyIndex])
  //   // }
  // } else {
  //   for (const i in operateList) {
  //     if (operateList[i].type === type) {
  //       insertText($vm, operateList[i], $vm.placeholders[`${type}`])
  //       break
  //     }
  //   }
  // }
}

function insertText($vm, operate, placeholder) {
  const startPos = $vm.editor.getCursor('from')
  const endPos = $vm.editor.getCursor('to')
  const tmpStr = $vm.editor.getSelection()
  const prefix = operate.prefix
  const suffix = operate.suffix
  if (operate.type === 'imgTag') {
    let str = `${prefix}${suffix}\n`
    $vm.editor.replaceSelection(str)
    // $vm.editor.setSelection({line: startPos.line, ch: startPos.ch - prefix.length}, {
    //   line: endPos.line,
    //   ch: endPos.ch - (endPos.line === startPos.line ? str.length : 0)
    // })
  } else if (tmpStr === '' || operate.type === 'image' || operate.type === 'table') {
    // 直接插入
    $vm.editor.replaceSelection(prefix + placeholder + suffix)
    $vm.editor.setSelection({line: startPos.line, ch: startPos.ch + prefix.length}, {
      line: endPos.line,
      ch: endPos.ch + placeholder.length + (endPos.line === startPos.line ? prefix.length : 0)
    })
  } else {
    // 如果选中了文字
    const str = $vm.editor.getRange({line: startPos.line, ch: startPos.ch - prefix.length}, {
      line: endPos.line,
      ch: endPos.ch + suffix.length
    })
    if (str === prefix + tmpStr + suffix) {
      // 移除语法
      $vm.editor.setSelection({line: startPos.line, ch: startPos.ch - prefix.length}, {
        line: endPos.line,
        ch: endPos.ch + prefix.length
      })
      $vm.editor.replaceSelection(tmpStr)
      $vm.editor.setSelection({line: startPos.line, ch: startPos.ch - prefix.length}, {
        line: endPos.line,
        ch: endPos.ch - (endPos.line === startPos.line ? prefix.length : 0)
      })
    } else {
      // 添加语法
      $vm.editor.replaceSelection(prefix + tmpStr + suffix)
      $vm.editor.setSelection({line: startPos.line, ch: startPos.ch + prefix.length}, {
        line: endPos.line,
        ch: endPos.ch + (endPos.line === startPos.line ? prefix.length : 0)
      })
    }
  }
  $vm.editor.focus()
}

//
// // 编辑器中自带了 这边去除
// function insertText ($vm, operate, placeholder) {
//   const dom = document.querySelector('#my-textarea')
//   dom.focus()
//   if (typeof dom.selectionStart === 'number' && typeof dom.selectionEnd === 'number') {
//     const startPos = dom.selectionStart
//     const endPos = dom.selectionEnd
//     const tmpStr = dom.value
//     const prefix = operate.prefix
//     const suffix = operate.suffix
//     if (startPos === endPos || operate.type === 'image' || operate.type === 'table') {
//       // 直接插入
//       dom.value = tmpStr.substring(0, startPos) + prefix + placeholder + suffix + tmpStr.substring(endPos, tmpStr.length)
//       dom.selectionStart = startPos + prefix.length
//       dom.selectionEnd = startPos + prefix.length + placeholder.length
//     } else {
//       // 如果选中了文字
//       if (tmpStr.substring(startPos - prefix.length, startPos) === prefix && tmpStr.substring(endPos, endPos + suffix.length) === suffix) {
//         // 移除语法
//         dom.value = tmpStr.substring(0, startPos - prefix.length) + tmpStr.substring(startPos, endPos) + tmpStr.substring(endPos + suffix.length, tmpStr.length)
//         dom.selectionStart = startPos - prefix.length
//         dom.selectionEnd = endPos - prefix.length
//       } else {
//         // 添加语法
//         dom.value = tmpStr.substring(0, startPos) + prefix + tmpStr.substring(startPos, endPos) + suffix + tmpStr.substring(endPos, tmpStr.length)
//         dom.selectionStart = startPos + prefix.length
//         dom.selectionEnd = startPos + (endPos - startPos + prefix.length)
//       }
//     }
//   } else {
//     console.log('Browser does not support')
//   }
//   // 触发change事件
//   $vm.origin = dom.value
//   dom.focus()
// }
