const KEY_CODE = {
  F12: 123,
  B: 66,
  C: 67,
  D: 68,
  F: 70,
  H: 72,
  I: 73,
  U: 85,
  L: 76,
  M: 77,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  Y: 89,
  Z: 90,
  DELETE: 8,
  TAB: 9,
  ENTER: 13,
  ONE: 97,
  TWO: 98,
  THREE: 99,
  FOUR: 100,
  FIVE: 101,
  SIX: 102,
  F1: 49,
  F2: 50,
  F3: 51,
  F4: 52,
  F5: 53,
  F6: 54
}

export const keydownListener = ($vm) => {
  document.onkeydown = (e) => {
    if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
      switch (e.keyCode) {
        case KEY_CODE.B: {
          $vm.toolbarClick('bold')
          break
        }
        case KEY_CODE.I: {
          e.preventDefault()
          $vm.toolbarClick('italic')
          break
        }
        case KEY_CODE.U: {
          e.preventDefault()
          $vm.toolbarClick('underline')
          break
        }
        case KEY_CODE.D: {
          e.preventDefault()
          $vm.toolbarClick('del')
          break
        }
        case KEY_CODE.M: {
          e.preventDefault()
          $vm.toolbarClick('bookmark')
          break
        }
        case KEY_CODE.Q: {
          e.preventDefault()
          $vm.toolbarClick('quote')
          break
        }
        case KEY_CODE.L: {
          e.preventDefault()
          $vm.toolbarClick('link')
          break
        }
        case KEY_CODE.S: {
          e.preventDefault()
          $vm.save()
          break
        }
        // case KEY_CODE.Z: {
        //   e.preventDefault()
        //   $vm.toolbarClick('undo')
        //   break
        // }
        // case KEY_CODE.Y: {
        //   e.preventDefault()
        //   $vm.toolbarClick('redo')
        //   break
        // }
        case KEY_CODE.ONE: {
          e.preventDefault()
          $vm.toolbarClick('h1')
          break
        }
        case KEY_CODE.TWO: {
          e.preventDefault()
          $vm.toolbarClick('h2')
          break
        }
        case KEY_CODE.THREE: {
          e.preventDefault()
          $vm.toolbarClick('h3')
          break
        }
        case KEY_CODE.FOUR: {
          e.preventDefault()
          $vm.toolbarClick('h4')
          break
        }
        case KEY_CODE.FIVE: {
          e.preventDefault()
          $vm.toolbarClick('h5')
          break
        }
        case KEY_CODE.SIX: {
          e.preventDefault()
          $vm.toolbarClick('h6')
          break
        }
        case KEY_CODE.F1: {
          e.preventDefault()
          $vm.toolbarClick('h1')
          break
        }
        case KEY_CODE.F2: {
          e.preventDefault()
          $vm.toolbarClick('h2')
          break
        }
        case KEY_CODE.F3: {
          e.preventDefault()
          $vm.toolbarClick('h3')
          break
        }
        case KEY_CODE.F4: {
          e.preventDefault()
          $vm.toolbarClick('h4')
          break
        }
        case KEY_CODE.F5: {
          e.preventDefault()
          $vm.toolbarClick('h5')
          break
        }
        case KEY_CODE.F6: {
          e.preventDefault()
          $vm.toolbarClick('h6')
          break
        }
      }
    } else if ((e.ctrlKey || e.metaKey) && e.altKey) {
      switch (e.keyCode) {
        case KEY_CODE.S: {
          $vm.toolbarClick('superscript')
          break
        }
        case KEY_CODE.B: {
          e.preventDefault()
          $vm.toolbarClick('subscript')
          break
        }
        case KEY_CODE.L: {
          e.preventDefault()
          $vm.toolbarClick('alignLeft')
          break
        }
        case KEY_CODE.C: {
          e.preventDefault()
          $vm.toolbarClick('alignCenter')
          break
        }
        case KEY_CODE.R: {
          e.preventDefault()
          $vm.toolbarClick('alignRight')
          break
        }
        case KEY_CODE.H: {
          e.preventDefault()
          $vm.toolbarClick('hr')
          break
        }
        case KEY_CODE.O: {
          e.preventDefault()
          $vm.toolbarClick('ol')
          break
        }
        case KEY_CODE.U: {
          e.preventDefault()
          $vm.toolbarClick('ul')
          break
        }
        case KEY_CODE.I: {
          e.preventDefault()
          $vm.toolbarClick('inlineCode')
          break
        }
        case KEY_CODE.D: {
          e.preventDefault()
          $vm.toolbarClick('code')
          break
        }
        case KEY_CODE.P: {
          e.preventDefault()
          $vm.preview()
          break
        }
        case KEY_CODE.F: {
          e.preventDefault()
          $vm.fullScreen()
        }
      }
    }
  }
}
