if (!navigator.mediaDevices) {
    document.querySelector('#js-unsupported').classList.add('is-show')
}

if (window.BarcodeDetector == undefined) {
    console.log('Text Detection unsupported');
    document.querySelector('#js-unsupported').classList.add('is-show')
}

const video = document.querySelector('#js-video')
const textBox = document.querySelector('#js-text')

const checkImage = () => {
    const textDetector = new TextDetector()
    textDetector.detect(video)
        .then(texts => {
            if ( texts.length > 0 ) {
                for (let text of texts){
                    textBox.innerText = text.rawValue
                }
            }
        }).catch((e) => {
            console.error("Text Detection failed, boo.");
        })
}

navigator.mediaDevices
    .getUserMedia({
        audio: false,
        video: {
            facingMode: {
                exact: 'environment'
            }
        }
    })
    .then(function(stream) {
        video.srcObject = stream
        video.onloadedmetadata = function(e) {
            video.play()
            setInterval(checkImage, 1000)
        }
    })
    .catch(function(err) {
        alert('Error!!')
    })



