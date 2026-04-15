const ap = new APlayer({
    container: document.getElementById('aplayer'),
    listFolded: false, // Плейлист сразу открыт
    listMaxHeight: 'none', // Чтобы плейлист не растягивал экран на телефоне
    order: 'list', // Последовательное проигрывание
    theme: '#d4af37', // Золотой цвет прогресс-бара
    autoplay: false,
    audio: [
        {
            name: 'У трех дорог (пролог)',
            artist: 'Алхимики',
            url: 'audio/track1.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Тени (интерлюдия)',
            artist: 'Алхимики',
            url: 'audio/track2.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Пустой мир (соло Гадеса)',
            artist: 'Алхимики',
            url: 'audio/track3.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Взгляд (интерлюдия)',
            artist: 'Алхимики',
            url: 'audio/track4.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Похищение Коры',
            artist: 'Алхимики',
            url: 'audio/track5.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Эхо матери (интерлюдия)',
            artist: 'Алхимики',
            url: 'audio/track6.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Плач Деметры',
            artist: 'Алхимики',
            url: 'audio/track7.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Две стороны (интерлюдия)',
            artist: 'Алхимики',
            url: 'audio/track8.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Гранат',
            artist: 'Алхимики',
            url: 'audio/track9.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Пробуждение (интерлюдия)',
            artist: 'Алхимики',
            url: 'audio/track10.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Я выбираю (становление Персефоны)',
            artist: 'Алхимики',
            url: 'audio/track11.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Учитель (интерлюдия)',
            artist: 'Алхимики',
            url: 'audio/track12.mp3',
            cover: 'images/cover.jpg'
        },
        {
            name: 'Алхимия (эпилог)',
            artist: 'Алхимики',
            url: 'audio/track13.mp3',
            cover: 'images/cover.jpg'
        },
    ]
});

// Летающие созвездия
particlesJS("particles-js", {
    particles: {
        number: { value: 50 },
        color: { value: "#d4af37" },
        size: { value: 2 },
        move: { speed: 1 }
    }
});

// Анимация смены трека
ap.on('listswitch', function () {
    const img = document.querySelector('.aplayer-pic img');
    if (!img) return;

    img.classList.add('fade');

    setTimeout(() => {
        img.classList.remove('fade');
    }, 300);
});


// Визуализатор музыки снизу
const audio = ap.audio;
const ctx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = ctx.createAnalyser();

const source = ctx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(ctx.destination);

analyser.fftSize = 64;

const canvas = document.getElementById('visualizer');
const c = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function draw() {
    requestAnimationFrame(draw);

    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);

    c.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / data.length;

    for (let i = 0; i < data.length; i++) {
        const height = data[i] / 2;

        c.fillStyle = '#d4af37';
        c.fillRect(i * barWidth, canvas.height - height, barWidth - 2, height);
    }
}

audio.onplay = () => {
    ctx.resume();
    draw();
};