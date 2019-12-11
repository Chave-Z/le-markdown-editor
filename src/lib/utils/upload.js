export const uploadToServer = ($vm, file, fileName) => {
  $vm.loaderFlag = true
  // const item = {
  //   name: file.name,
  //   uploadPercentage: 0
  // }
  // $vm.files.push(item)
  const fd = new FormData()
  fd.append('file', file)
  const xhr = new XMLHttpRequest()
  xhr.open('POST', $vm.config.imageUploader.url + '?name=' + fileName, true)
  // xhr.upload.addEventListener('progress', function (e) {
  //   item.uploadPercentage = Math.round((e.loaded * 100) / e.total)
  // }, false)
  xhr.send(fd)
  // 返回
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let result = JSON.parse(xhr.responseText.toString())
      if(result.code === 0){
        $vm.insertImg(`${$vm.config.imageUploader.imagePrefix}/${fileName}`, fileName)
      }else{
        alert(result.msg)
      }
      $vm.loaderFlag = false
    }else{
      if($vm.loaderFlag){
        $vm.loaderFlag = false
        console.log(xhr.statusText)
      }
    }
  }
}

export const uploadToGithub = ($vm, file, fileName) => {
  $vm.loaderFlag = true
  const data = {
    message: fileName,
    content: file.substring(file.indexOf(',') + 1)
  }
  return window.fetch(`https://api.github.com/repos/${$vm.config.imageUploader.username}/${$vm.config.imageUploader.repo}/contents/${fileName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'token ' + $vm.config.imageUploader.token
    },
    body: JSON.stringify(data) || null,
    mode: 'cors'
  }).then(async res => {
      if (res.status >= 200 && res.status < 400) {
         let result = {
          status: res.status,
          data: await res.json()
        }
        if(result.status === 201){
          $vm.insertImg(`${$vm.config.imageUploader.imagePrefix}${$vm.config.imageUploader.username}/${$vm.config.imageUploader.repo}/${fileName}`, fileName)
        }
        $vm.loaderFlag = false
        return result
      } else {
        $vm.loaderFlag = false
        alert(res.statusText)
        return {
          status: res.status,
          data: null
        }
      }
    })
    .catch(e => e)
}
