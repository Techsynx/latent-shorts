// script.js
const audio = document.getElementById('audio')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const shuffleBtn = document.getElementById('shuffle')
const repeatBtn = document.getElementById('repeat')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const cover = document.getElementById('cover')
const progressContainer = document.querySelector('.progress-container')
const progress = document.getElementById('progress')
const volumeSlider = document.getElementById('volume')

const songs = [
    {
        title: 'Song 1',
        artist: 'Artist 1',
        cover: 'cover1.jpg',
        src: 'song1.mp3'
    },
    {
        title: 'Song 2',
        artist: 'Artist 2',
        cover: 'cover2.jpg',
        src: 'song2.mp3'
    },
    {
        title: 'Song 3',
        artist: 'Artist 3',
        cover: 'cover3.jpg',
        src: 'song3.mp3'
    }
]

let currentSongIndex = 0
let isPlaying = false
let isShuffling = false
let isRepeating = false

function loadSong(song) {
    title.textContent = song.title
    artist.textContent = song.artist
    cover.src = song.cover
    audio.src = song.src
}

function playSong() {
    audio.play()
    playBtn.textContent = 'Pause'
    isPlaying = true
}

function pauseSong() {
    audio.pause()
    playBtn.textContent = 'Play'
    isPlaying = false
}

function updateProgress() {
    const { duration, currentTime } = audio
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length
    loadSong(songs[currentSongIndex])
    playSong()
})

nextBtn.addEventListener('click', () => {
    if (isShuffling) {
        currentSongIndex = Math.floor(Math.random() * songs.length)
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length
    }
    loadSong(songs[currentSongIndex])
    playSong()
})

shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling
    shuffleBtn.classList.toggle('active')
})

repeatBtn.addEventListener('click', () => {
    isRepeating = !isRepeating
    repeatBtn.classList.toggle('active')
    audio.loop = isRepeating
})

audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value
})

audio.addEventListener('ended', () => {
    if (isRepeating) {
        playSong()
    } else {
        nextBtn.click()
    }
})

loadSong(songs[currentSongIndex])
