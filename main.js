
// TODO: Зробити плеєр ui + fucntional
let audioControl = document.querySelector('#audio')
let startBtn =document.querySelector('#start')


// ! TIMER
let playerDuration = document.querySelector('#playerDuration')
let playerCTime = document.querySelector('#playerCTime')
audioControl.addEventListener('loadedmetadata',()=>{
    playerDuration.innerText = toMinutesSec(audioControl.duration)
})
audioControl.addEventListener('timeupdate',()=>{
    playerCTime.innerText = toMinutesSecCT(audioControl.currentTime)
})
let toMinutesSec = sec =>{
    return `${Math.trunc(sec/60)}:${Math.trunc(sec%60)}`
}
let toMinutesSecCT = sec =>{
    if((sec%60) < 10) return `${Math.trunc(sec/60)}:0${Math.trunc(sec%60)}`
    else return `${Math.trunc(sec/60)}:${Math.trunc(sec%60)}`
}

if (audioControl.duration) {
    doSomething();
} else {
    audioControl.onloadedmetadata = doSomething;
}
let durationTry 
function doSomething(event) {
    playerDuration.innerText = toMinutesSec(audioControl.duration)
    playerCTime.innerText = toMinutesSecCT(audioControl.currentTime)
}

// ! Range
let rangeAudio = document.querySelector('#rangeAudio')
let durationRange = Math.trunc(audioControl.duration)
rangeAudio.max = durationTry
console.log(audioControl.duration);




// ! BTN
startBtn.onclick = () => {
    let inter,trigerControl
    if(audioControl.paused) {
        rangeAudio.addEventListener('input',()=>{
            audioControl.currentTime = rangeAudio.value
        })
        startBtn.innerHTML = `Pause`
        audioControl.play()
        inter = setInterval(()=>{
            rangeAudio.value = audioControl.currentTime
        },100)


    }
    else {
        startBtn.innerHTML = `Play`
        audioControl.pause()
        rangeAudio.value = audioControl.currentTime
        clearInterval(inter)
        rangeAudio.addEventListener('input',()=>{
            console.log(rangeAudio.value);
            rangeAudio.value = trigerControl
            
        })
    }
}


// ! SOUND
let rangeVolume = document.querySelector('#rangeVolume')

if(rangeVolume.value == 0) audioControl.volume = 0
rangeVolume.addEventListener('input',()=>{
    audioControl.volume = rangeVolume.value
})
// Video

