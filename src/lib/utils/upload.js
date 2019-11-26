export const uploadToServer = ($vm, file, fileName) => {
  // const item = {
  //   name: file.name,
  //   uploadPercentage: 0
  // }
  // $vm.files.push(item)
  const fd = new FormData()
  fd.append('file', file)
  const xhr = new XMLHttpRequest()
  xhr.open('POST', $vm.config.imageUploader.url, true)
  // xhr.upload.addEventListener('progress', function (e) {
  //   item.uploadPercentage = Math.round((e.loaded * 100) / e.total)
  // }, false)
  xhr.send(fd)
  // 返回
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText)
      $vm.insertImg(`${$vm.config.imageUploader.imagePrefix}/${fileName}`, fileName)
    }
  }
}

export const uploadToGithub = ($vm, file, fileName) => {
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
  })
    .then(async res => {
      if (res.status >= 200 && res.status < 400) {
         let result = {
          status: res.status,
          data: await res.json()
        }
        if(result.status === 201){
          $vm.insertImg(`${$vm.config.imageUploader.imagePrefix}${$vm.config.imageUploader.username}/${$vm.config.imageUploader.repo}/${fileName}`, fileName)
        }
        return result
      } else {
        return {
          status: res.status,
          data: null
        }
      }
    })
    .catch(e => e)
}
