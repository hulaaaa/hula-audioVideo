let audioControl = document.querySelector('#audio');
let startBtn = document.querySelector('#start');
let playerDuration = document.querySelector('#playerDuration');
let playerCTime = document.querySelector('#playerCTime');
let rangeAudio = document.querySelector('#rangeAudio');
let rangeVolume = document.querySelector('#rangeVolume');
let durationTry;

let arraySong = [
  {
    title: 'Something in The Way',
    artist: 'Nirvana',
    album: 'Nevermind',
    src: './audio/1.mp3',
    img: './img/1.jpeg'
  },
  {
    title: 'Blitzkrieg Bop',
    artist: 'Ramones',
    album: 'Ramones',
    src: './audio/2.mp3',
    img: './img/3.jpeg'
  },
  {
    title: 'Stayin\' Alive',
    artist: 'The Bee Gees',
    album: 'How You Can Mend A Broken Heart',
    src: './audio/3.mp3',
    img: './img/2.jpeg'
  }
];

audioControl.addEventListener('loadedmetadata', () => {
  durationTry = Math.trunc(audioControl.duration);
  rangeAudio.max = durationTry;
  playerDuration.innerText = toMinutesSec(audioControl.duration);
  createParagraphs();
});

audioControl.addEventListener('timeupdate', () => {
  let progress = (audioControl.currentTime / audioControl.duration) * 100;
  rangeAudio.style.backgroundSize = `${progress}% 100%`;
  playerCTime.innerText = toMinutesSecCT(audioControl.currentTime);
});

let toMinutesSec = (sec) => {
  return `${Math.trunc(sec / 60)}:${Math.trunc(sec % 60)}`;
};

let toMinutesSecCT = (sec) => {
  if (sec % 60 < 10) return `${Math.trunc(sec / 60)}:0${Math.trunc(sec % 60)}`;
  else return `${Math.trunc(sec / 60)}:${Math.trunc(sec % 60)}`;
};

if (audioControl.duration) {
  doSomething();
} else {
  audioControl.onloadedmetadata = doSomething;
}

function doSomething(event) {
  playerDuration.innerText = toMinutesSec(audioControl.duration);
  playerCTime.innerText = toMinutesSecCT(audioControl.currentTime);
}

rangeAudio.addEventListener('input', () => {
  let value = (rangeAudio.value - rangeAudio.min) / (rangeAudio.max - rangeAudio.min) * 100;
  rangeAudio.style.backgroundSize = `${value}% 100%`;
  audioControl.currentTime = rangeAudio.value;
});

rangeAudio.max = durationTry;

// ! BTN PLAY
startBtn.onclick = () => {
  let inter;
  if (audioControl.paused) {
    document.querySelector('#classBtnStart').className = 'fa-solid fa-pause';
    audioControl.play();
    inter = setInterval(() => {
      rangeAudio.value = audioControl.currentTime;
    }, 100);
  } else {
    document.querySelector('#classBtnStart').className = 'fa-solid fa-play';
    audioControl.pause();
    clearInterval(inter);
  }
};

// ! Range Volume
if (rangeVolume.value == 0) audioControl.volume = 0;
rangeVolume.addEventListener('input', () => {
  let value = rangeVolume.value * 100;
  rangeVolume.style.backgroundSize = `${value}% 100%`;

  audioControl.volume = value / 100;
});

rangeVolume.style.display = 'none';
let likeBtnVolume = document.querySelector('#likeBtnVolume');
let boolVolumeBtn = false;
likeBtnVolume.addEventListener('click', () => {
  if (boolVolumeBtn) {
    rangeVolume.style.display = 'none';
    boolVolumeBtn = false;
    document.querySelector('.volume').style.width = 'auto';
  } else {
    rangeVolume.style.display = 'block';
    boolVolumeBtn = true;
    document.querySelector('.volume').style.width = 'auto';
  }
});

const createParagraphs = () => {
  const container = document.querySelector('.containerSong');
  container.innerHTML = ''; 
  for (let obj of arraySong) {
    let dSong = document.createElement('div');
    dSong.className = 'dSong';
    dSong.innerHTML = `
      <img src="${obj.img}" alt="img" style="width: 50px;
        height: 50px;
        flex-shrink: 0;
        border-radius: 8px;
        background: lightgray 50% / cover no-repeat;">
      <div class="discSong">
        <h1 style="color: #FFF;
          font-size: 16px;
          font-family: Source Sans 3;
          font-weight: 600;">${obj.title}</h1>
        <p style="color: rgba(255, 255, 255, 0.40);
          font-size: 14px;
          font-family: Source Sans 3;
          font-weight: 600;">${obj.artist}</p>
      </div>`;

    dSong.addEventListener('click', () => {
      playTrack(obj);
      document.querySelector('#imgSong').src = `${obj.img}`
      document.querySelector('#titleSong').innerHTML = `${obj.title}`
      document.querySelector('#artistSong').innerHTML = `${obj.artist}  &#x2022;  ${obj.album}`
    });

    container.appendChild(dSong);
  }
};
  
const playTrack = (track) => {
  audioControl.src = track.src;
  audioControl.play();
  playerDuration.innerText = toMinutesSec(audioControl.duration);
  playerCTime.innerText = toMinutesSecCT(audioControl.currentTime);
};
