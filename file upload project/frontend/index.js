const dragZone = document.querySelector('.drop-zone')
const browseBtn = document.querySelector('.browseBtn')
const fileInput = document.querySelector('#inputFile')
const ProgressBox = document.querySelector('.progress-box')
const percentText = document.querySelector('#percent')
const progressBar = document.querySelector('.progress-bar')
const progressContainer = document.querySelector('.progress-container')
const linkContainer = document.querySelector('.link-container')
const inputLink = document.querySelector('.input-link')
const copyBtn = document.querySelector('#copyBtn')
const emailForm = document.querySelector('#email-form')
const toast = document.querySelector('.toast')


const host = "https://innshare.herokuapp.com/"
const uploadURL = `${host}api/files`
const emailURL = `${host}api/files/send`

maxAllowedSize = 100 * 1024 * 1024 // 100 MB


dragZone.addEventListener("dragover", (event) => {
    event.preventDefault()
    if (!dragZone.classList.contains('dragged'))
        dragZone.classList.add('dragged')

})

dragZone.addEventListener("dragleave", (event) => {
    dragZone.classList.remove('dragged')
})

dragZone.addEventListener("drop", (event) => {
    event.preventDefault()
    dragZone.classList.remove('dragged')
    let files = event.dataTransfer.files;
    if (files.length) {
        fileInput.files = files
        uploadFile()
    }
})

fileInput.addEventListener("change", () => {
    uploadFile()
})

browseBtn.addEventListener("click", () => {
    fileInput.click()
})

copyBtn.addEventListener("click", () => {
    inputLink.select();
    document.execCommand('copy')
    showToast("Link Copied")
})



const uploadFile = () => {

    if (fileInput.files.length > 1) {
        fileInput.value = ""
        showToast("Only 1 file is allowed")
        return
    }

    const file = fileInput.files[0]
    if (file.size > maxAllowedSize) {
        fileInput.value = ""
        showToast("Only less than 100mb file is allowed")
        return
    }

    progressContainer.style.display = "block"
    const formdata = new FormData()
    formdata.append("myfile", file)
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response);
            copyLink(JSON.parse(xhr.response))
        }
    }

    xhr.upload.onprogress = progressCalc;

    xhr.upload.onerror = () => {
        fileInput.value = "s"
        showToast(`Error in upload: ${xhr.statusText}`)
    }

    xhr.open("POST", uploadURL)
    xhr.send(formdata)
}

const progressCalc = (event) => {
    let percent = Math.round((event.loaded / event.total) * 100)
    ProgressBox.style.width = `${percent}%`
    percentText.innerText = `${percent}`
    progressBar.style.transform = `scaleX(${percent / 100})`
}

const copyLink = ({ file: url }) => {
    emailForm[2].removeAttribute("disabled")
    fileInput.value = ""
    progressContainer.style.display = "none"
    linkContainer.style.display = "block"
    inputLink.value = url
}

emailForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = inputLink.value;

    const formData = {
        uuid: url.split('/').splice(-1, 1)[0],
        emailTo: emailForm.elements['to-email'].value,
        emailFrom: emailForm.elements['from-email'].value
    }

    emailForm.setAttribute('disabled', "true")

    fetch(emailURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then((res) => res.json())
        .then(({ success }) => {
            if (success) {
                linkContainer.style.display = "none"
                showToast("Email sent")
            }
        })
})

let toastTimer;
const showToast = (msg) => {
    toast.innerText = msg
    toast.style.transform = `translateY(-10px)`
    clearInterval(toastTimer)
    toastTimer = setTimeout(() => {
        toast.style.transform = `translateY(60px)`
    }, 2000)
}