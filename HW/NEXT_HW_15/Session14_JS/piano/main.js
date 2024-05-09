function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`li[data-key="${e.keyCode}"]`);

    if (audio) {
        audio.currentTime = 0;
        audio.play();
        if (key) {
            key.classList.add('playing');
        }
    }
}

function pauseSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`li[data-key="${e.keyCode}"]`);

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        if (key) {
            key.classList.remove('playing');
        }
    }
}

window.addEventListener('keydown', playSound);

window.addEventListener('keyup', pauseSound);
