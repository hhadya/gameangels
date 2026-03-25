document .addEventListener ("DOMContentLoaded", function(){
 const moonIcon = document.querySelector('.moon');
    const sunIcon = document.querySelector('.sun');
    const morningBg = document.querySelector('.morning');
    const nightBg = document.querySelector('.night');
    
    let isNight = false;
    function switchToNight() {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        morningBg.style.display = 'none';
        nightBg.style.display = 'block';
        
        sunIcon.classList.add('rotate-animation');
        nightBg.classList.add('fade-animation');
        
        document.body.style.backgroundColor = '#2c3e50';
        isNight = true;
        
        setTimeout(() => {
            sunIcon.classList.remove('rotate-animation');
            nightBg.classList.remove('fade-animation');
        }, 500);
    }
    
    function switchToDay() {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        morningBg.style.display = 'block';
        nightBg.style.display = 'none';
        
        moonIcon.classList.add('rotate-animation-reverse');
        morningBg.classList.add('fade-animation');
        
        document.body.style.backgroundColor = '#AEC8E9';
        isNight = false;
        
        setTimeout(() => {
            moonIcon.classList.remove('rotate-animation-reverse');
            morningBg.classList.remove('fade-animation');
        }, 500);
    }
    
    moonIcon.addEventListener('click', function() {
        if (!isNight) switchToNight();
    });
    
    sunIcon.addEventListener('click', function() {
        if (isNight) switchToDay();
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .rotate-animation {
            animation: rotateIcon 0.5s ease-in-out;
        }
        
        .rotate-animation-reverse {
            animation: rotateIconReverse 0.5s ease-in-out;
        }
        
        .fade-animation {
            animation: fadeChange 0.5s ease-in-out;
        }
        
        @keyframes rotateIcon {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.2); }
            100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes rotateIconReverse {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(-180deg) scale(1.2); }
            100% { transform: rotate(-360deg) scale(1); }
        }
        
        @keyframes fadeChange {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        
        .moon:hover, .sun:hover {
            transform: scale(1.1);
            filter: drop-shadow(0 0 15px gold);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .fade-in {
            animation: fadeInAngel 0.5s ease-in-out;
        }
        
        @keyframes fadeInAngel {
            0% {
                opacity: 0;
                transform: scale(0.8) translateY(20px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        .btn-click {
            animation: btnPulse 0.3s ease-in-out;
        }
        
        @keyframes btnPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .odin.active, .dwa.active, .tri.active {
            filter: brightness(1.3) drop-shadow(0 0 10px gold);
            transform: scale(1.1);
        }
        .odin:hover, .dwa:hover, .tri:hover {
            transform: scale(1.1);
            filter: drop-shadow(0 0 8px white);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        @keyframes particleFly {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--tx), var(--ty)) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes angelParticleFly {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
                opacity: 0;
            }
        }
        
        body {
            transition: background-color 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    const textOne = document.querySelector('.text_one');
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
                if (nightBg.style.display === 'block') {
                    textOne.style.color = '#ecf0f1';
                    textOne.style.textShadow = '0 0 15px silver';
                } else {
                    textOne.style.color = 'white';
                    textOne.style.textShadow = '0 0 10px rgba(255,255,255,0.5)';
                }
            }
        });
    });
    
    observer.observe(nightBg, { attributes: true });
    observer.observe(morningBg, { attributes: true });
    
    function createParticles(type) {
        const container = document.querySelector('.divone');
        const icon = type === 'night' ? sunIcon : moonIcon;
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.borderRadius = '50%';
                particle.style.background = type === 'night' ? '#f1c40f' : '#ecf0f1';
                particle.style.boxShadow = `0 0 10px ${type === 'night' ? '#f1c40f' : '#ecf0f1'}`;
                particle.style.left = icon.offsetLeft + 40 + 'px';
                particle.style.top = icon.offsetTop + 40 + 'px';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1000';
                
                const angle = (i / 8) * Math.PI * 2;
                const distance = 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                particle.style.animation = `particleFly 0.8s ease-out forwards`;
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                
                container.appendChild(particle);
                
                setTimeout(() => particle.remove(), 800);
            }, i * 50);
        }
    }
    
    function createAngelParticles() {
        const container = document.querySelector('.divone');
        
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '8px';
                particle.style.height = '8px';
                particle.style.borderRadius = '50%';
                particle.style.background = `hsl(${Math.random() * 60 + 300}, 100%, 70%)`;
                particle.style.boxShadow = '0 0 10px currentColor';
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1000';
                
                const angle = (i / 6) * Math.PI * 2;
                const distance = 100;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                particle.style.animation = `angelParticleFly 0.8s ease-out forwards`;
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                
                container.appendChild(particle);
                
                setTimeout(() => particle.remove(), 800);
            }, i * 50);
        }
    }
    
    const originalSwitchToNight = switchToNight;
    const originalSwitchToDay = switchToDay;
    
    window.switchToNight = function() {
        originalSwitchToNight();
        createParticles('night');
    };
    
    window.switchToDay = function() {
        originalSwitchToDay();
        createParticles('day');
    };
    
    moonIcon.addEventListener('click', function() {
        if (!isNight) {
            window.switchToNight();
        }
    });
    
    sunIcon.addEventListener('click', function() {
        if (isNight) {
            window.switchToDay();
        }
    });
    
    const angelOne = document.querySelector('.one');
    const angelTwo = document.querySelector('.two');
    const angelThree = document.querySelector('.three');
    const angelFour = document.querySelector('.four');
    const angelFive = document.querySelector('.five');
    const angelSix = document.querySelector('.six');
    
    const btnOdin = document.querySelector('.odin');
    const btnDwa = document.querySelector('.dwa');
    const btnTri = document.querySelector('.tri');
    
    let currentPair = 1;
    
    function hideAllAngels() {
        angelOne.style.display = 'none';
        angelTwo.style.display = 'none';
        angelThree.style.display = 'none';
        angelFour.style.display = 'none';
        angelFive.style.display = 'none';
        angelSix.style.display = 'none';
    }
    
    function showPairOne() {
        hideAllAngels();
        angelOne.style.display = 'block';
        angelTwo.style.display = 'block';
        
        angelOne.classList.add('fade-in');
        angelTwo.classList.add('fade-in');
        
        setTimeout(() => {
            angelOne.classList.remove('fade-in');
            angelTwo.classList.remove('fade-in');
        }, 500);
        
        currentPair = 1;
    }
    
    function showPairTwo() {
        hideAllAngels();
        angelThree.style.display = 'block';
        angelFour.style.display = 'block';
        
        angelThree.classList.add('fade-in');
        angelFour.classList.add('fade-in');
        
        setTimeout(() => {
            angelThree.classList.remove('fade-in');
            angelFour.classList.remove('fade-in');
        }, 500);
        
        currentPair = 2;
    }
    
    function showPairThree() {
        hideAllAngels();
        angelFive.style.display = 'block';
        angelSix.style.display = 'block';
        
        angelFive.classList.add('fade-in');
        angelSix.classList.add('fade-in');
        
        setTimeout(() => {
            angelFive.classList.remove('fade-in');
            angelSix.classList.remove('fade-in');
        }, 500);
        
        currentPair = 3;
    }
    
    function highlightActiveButton(pairNumber) {
        btnOdin.classList.remove('active');
        btnDwa.classList.remove('active');
        btnTri.classList.remove('active');
        
        if (pairNumber === 1) {
            btnOdin.classList.add('active');
        } else if (pairNumber === 2) {
            btnDwa.classList.add('active');
        } else if (pairNumber === 3) {
            btnTri.classList.add('active');
        }
    }
    
    function animateButton(button) {
        button.classList.add('btn-click');
        setTimeout(() => {
            button.classList.remove('btn-click');
        }, 300);
    }
    
    const originalShowPairOne = showPairOne;
    const originalShowPairTwo = showPairTwo;
    const originalShowPairThree = showPairThree;
    
    window.showPairOne = function() {
        originalShowPairOne();
    };
    
    window.showPairTwo = function() {
        originalShowPairTwo();
    };
    
    window.showPairThree = function() {
        originalShowPairThree();
    };
    
    btnOdin.addEventListener('click', function() {
        if (currentPair !== 1) {
            animateButton(this);
            window.showPairOne();
            highlightActiveButton(1);
        }
    });
    
    btnDwa.addEventListener('click', function() {
        if (currentPair !== 2) {
            animateButton(this);
            window.showPairTwo();
            highlightActiveButton(2);
        }
    });
    
    btnTri.addEventListener('click', function() {
        if (currentPair !== 3) {
            animateButton(this);
            window.showPairThree();
            highlightActiveButton(3);
        }
    });
    showPairOne();
    highlightActiveButton(1);



   const angelSelectors = {
    one: document.querySelector('.one'),
    two: document.querySelector('.two'),
    three: document.querySelector('.three'),
    four: document.querySelector('.four'),
    five: document.querySelector('.five'),
    six: document.querySelector('.six')
};

const chooseBtn = document.querySelector('.choose');
const mainIcon = document.querySelector('.main_icon');


const iconMap = {
    one: document.querySelector('.iconone'),
    two: document.querySelector('.icontwo'),
    three: document.querySelector('.iconthree'),
    four: document.querySelector('.iconfour'),
    five: document.querySelector('.iconfive'),
    six: document.querySelector('.iconsix')
};

let selectedAngel = null;

function hideAllIcons() {
    mainIcon.style.display = 'none';
    
    Object.values(iconMap).forEach(icon => {
        if (icon) {
            icon.style.display = 'none';
        }
    });
}


function showSelectedIcon(angelKey) {
    hideAllIcons();
    
    const targetIcon = iconMap[angelKey];
    if (targetIcon) {
        targetIcon.style.display = 'block';
    }
}

function removeAllHighlights() {
    Object.values(angelSelectors).forEach(angel => {
        angel.classList.remove('selected-angel');
        angel.style.filter = 'none';
        angel.style.transform = 'scale(1)';
    });
}

const selectionStyle = document.createElement('style');
selectionStyle.textContent = `
    .selected-angel {
        filter: drop-shadow(0 0 20px gold) brightness(1.3) !important;
        transform: scale(1.05) !important;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .one, .two, .three, .four, .five, .six {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .one:hover, .two:hover, .three:hover, .four:hover, .five:hover, .six:hover {
        filter: drop-shadow(0 0 15px white);
        transform: scale(1.02);
    }
    
    .choose {
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .choose:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 0 15px gold);
    }
    
    .choose:active {
        transform: scale(0.95);
    }
    
    @keyframes confirmPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); filter: drop-shadow(0 0 30px gold); }
        100% { transform: scale(1); }
    }
    
    .confirm-animation {
        animation: confirmPulse 0.5s ease-in-out;
    }
`;
document.head.appendChild(selectionStyle);


Object.keys(angelSelectors).forEach(key => {
    angelSelectors[key].addEventListener('click', function() {
        
        removeAllHighlights();
        
        
        this.classList.add('selected-angel');
        
     
        selectedAngel = key;
        
        console.log(`Выбран ангелочек: ${key}`);
    });
});


chooseBtn.addEventListener('click', function() {
   
    if (!selectedAngel) {
        alert('выберите ангелочка!');
        return;
    }
    
    
    localStorage.setItem('selectedAngel', selectedAngel);
    
    showSelectedIcon(selectedAngel);
    
    
    const targetIcon = iconMap[selectedAngel];
    if (targetIcon) {
        targetIcon.classList.add('confirm-animation');
        setTimeout(() => {
            targetIcon.classList.remove('confirm-animation');
        }, 500);
    }
    
    
    this.classList.add('confirm-animation');
    setTimeout(() => {
        this.classList.remove('confirm-animation');
    }, 500);
    
    
    removeAllHighlights();
    
    console.log(`Main icon заменен на icon${selectedAngel}`);
    
    setTimeout(() => {
        updateFifthSection();
    }, 100);
    
    selectedAngel = null;
});


mainIcon.addEventListener('click', function() {
    
    hideAllIcons();
    mainIcon.style.display = 'block';
    
    
    removeAllHighlights();
    selectedAngel = null;
});


Object.values(angelSelectors).forEach(angel => {
    angel.addEventListener('mouseenter', function() {
        if (!this.classList.contains('selected-angel')) {
            this.style.filter = 'drop-shadow(0 0 15px white)';
        }
    });
    
    angel.addEventListener('mouseleave', function() {
        if (!this.classList.contains('selected-angel')) {
            this.style.filter = 'none';
        }
    });
});

const nameElement = document.querySelector('.name');


nameElement.addEventListener('click', function() {
    this.style.display = 'none';
    
   
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'name-input';
    input.placeholder = 'введи имя';
    input.maxLength = 20;
    
   
    input.style.position = 'absolute';
    input.style.fontFamily = '"EpilepsySans", sans-serif';
    input.style.fontSize = '2vw';
    input.style.color = '#A6B2FC';
    input.style.width = '15.5vw';
    input.style.height = '3vw';
    input.style.marginTop = '52vw';
    input.style.marginLeft = '47vw';
    input.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    input.style.border = '2px solid #A6B2FC';
    input.style.borderRadius = '10px';
    input.style.padding = '0 10px';
    input.style.outline = 'none';
    input.style.zIndex = '1000';
    
    
    this.parentNode.insertBefore(input, this.nextSibling);
    
    
    setTimeout(() => input.focus(), 100);
    
   
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const newName = this.value;
            if (newName.trim() !== '') {
                nameElement.textContent = newName;
                localStorage.setItem('userName', newName);
            } else {
                nameElement.textContent = 'введи имя';
            }
            this.remove();
            nameElement.style.display = 'block';
            
            
            setTimeout(() => {
                updateFifthSection();
            }, 100);
        }
    });
    
    
    input.addEventListener('blur', function() {
        setTimeout(() => {
            if (document.body.contains(this)) {
                const newName = this.value;
                if (newName.trim() !== '') {
                    nameElement.textContent = newName;
                    
                    localStorage.setItem('userName', newName);
                } else {
                    nameElement.textContent = 'введи имя';
                }
                this.remove();
                nameElement.style.display = 'block';
                
                
                setTimeout(() => {
                    updateFifthSection();
                }, 100);
            }
        }, 200);
    });
});

const squareIcon = document.querySelector('.sqaure');
const triangleIcon = document.querySelector('.triangle');
const roundIcon = document.querySelector('.round');

const iconPaths = {
    sqaure: './images/sqaure.png',
    triangle: './images/triangle.png',
    round: './images/round.png'
};


function getRandomIcon(current) {
    const icons = ['sqaure', 'triangle', 'round'];
    const available = icons.filter(icon => icon !== current);
    return available[Math.floor(Math.random() * available.length)];
}


squareIcon.addEventListener('click', function() {
    let currentClass = 'sqaure';
    if (this.classList.contains('triangle')) currentClass = 'triangle';
    if (this.classList.contains('round')) currentClass = 'round';
    
    
    const newClass = getRandomIcon(currentClass);
    
    
    this.classList.remove('sqaure', 'triangle', 'round');
    this.classList.add(newClass);
    
    
    this.src = iconPaths[newClass];
});


triangleIcon.addEventListener('click', function() {
    let currentClass = 'triangle';
    if (this.classList.contains('sqaure')) currentClass = 'sqaure';
    if (this.classList.contains('round')) currentClass = 'round';
    
    const newClass = getRandomIcon(currentClass);
    
    this.classList.remove('sqaure', 'triangle', 'round');
    this.classList.add(newClass);
    this.src = iconPaths[newClass];
});


roundIcon.addEventListener('click', function() {
    let currentClass = 'round';
    if (this.classList.contains('sqaure')) currentClass = 'sqaure';
    if (this.classList.contains('triangle')) currentClass = 'triangle';
    
    const newClass = getRandomIcon(currentClass);
    
    this.classList.remove('sqaure', 'triangle', 'round');
    this.classList.add(newClass);
    this.src = iconPaths[newClass];
});


[squareIcon, triangleIcon, roundIcon].forEach(icon => {
    icon.style.transition = 'all 0.3s ease';
    icon.style.cursor = 'pointer';
    
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(10deg)';
        this.style.filter = 'drop-shadow(0 0 15px gold)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.filter = 'none';
    });
});

const coins = [
    { visible: '.zheton', hidden: '.zheton1' },
    { visible: '.zhetontwo', hidden: '.zheton2' },
    { visible: '.zhetonthree', hidden: '.zheton3' },
    { visible: '.zhetonfour', hidden: '.zheton4' },
    { visible: '.zhetonfive', hidden: '.zheton5' },
    { visible: '.zhetonsix', hidden: '.zheton6' }
];


const st = document.createElement('style');
st.textContent = `
    @keyframes flip {
        0% { transform: rotateY(0) scale(1); }
        50% { transform: rotateY(180deg) scale(1.1); }
        100% { transform: rotateY(360deg) scale(1); }
    }
    .flip-animation { animation: flip 0.6s ease-in-out; }

    .zheton, .zhetontwo, .zhetonthree, .zhetonfour, .zhetonfive, .zhetonsix,
    .zheton1, .zheton2, .zheton3, .zheton4, .zheton5, .zheton6 {
        cursor: pointer;
    }
    
`;
document.head.appendChild(st);


coins.forEach(coin => {
    const visibleCoin = document.querySelector(coin.visible);
    const hiddenCoin = document.querySelector(coin.hidden);
    
    visibleCoin.addEventListener('mouseenter', () => flip(visibleCoin, hiddenCoin, true));
    hiddenCoin.addEventListener('mouseleave', () => flip(hiddenCoin, visibleCoin, false));
});

function flip(from, to, showHidden) {
    from.classList.add('flip-animation');
    
    setTimeout(() => {
        from.style.display = 'none';
        to.style.display = 'block';
        to.classList.add('flip-animation');
    }, 300);
    
    setTimeout(() => {
        from.classList.remove('flip-animation');
        to.classList.remove('flip-animation');
    }, 600);
}



const miniArena = document.querySelector('.miniarena');
const miniGard = document.querySelector('.minigard');
const miniDom = document.querySelector('.minidom');

const arena = document.querySelector('.arena');
const garderob = document.querySelector('.garderob');
const dom = document.querySelector('.dom');

const textFora = document.querySelector('.text_fora');
const textForr = document.querySelector('.text_forr');
const textFord = document.querySelector('.text_ford');

const saveBtn = document.querySelector('.save');
const plashka = document.querySelector('.plashka');


let currentHover = 'arena';
let selectedPlace = 'arena';


function initState() {
   
    arena.style.display = 'block';
    garderob.style.display = 'none';
    dom.style.display = 'none';
    
    
    textFora.style.display = 'block';
    textForr.style.display = 'none';
    textFord.style.display = 'none';
    
    
    miniArena.style.marginTop = '10vw';
    miniGard.style.marginTop = '15vw';
    miniDom.style.marginTop = '15vw';
    
    miniArena.style.animation = 'float 2s ease-in-out infinite';
    
   
    plashka.style.display = 'none';
}


function resetAllPositions() {
    miniArena.style.marginTop = '15vw';
    miniGard.style.marginTop = '15vw';
    miniDom.style.marginTop = '15vw';
    
    
    miniArena.style.animation = 'none';
    miniGard.style.animation = 'none';
    miniDom.style.animation = 'none';
    
    
    textFora.style.display = 'none';
    textForr.style.display = 'none';
    textFord.style.display = 'none';
}


function showArena() {
    resetAllPositions();
    
    arena.style.display = 'block';
    garderob.style.display = 'none';
    dom.style.display = 'none';
    
    miniArena.style.marginTop = '10vw';
    miniArena.style.animation = 'float 2s ease-in-out infinite';
    textFora.style.display = 'block';
    
    currentHover = 'arena';
}


function showGarderob() {
    resetAllPositions();
    
    arena.style.display = 'none';
    garderob.style.display = 'block';
    dom.style.display = 'none';
    
    miniGard.style.marginTop = '10vw';
    miniGard.style.animation = 'float 2s ease-in-out infinite';
    textForr.style.display = 'block';
    
    currentHover = 'garderob';
}


function showDom() {
    resetAllPositions();
    
    arena.style.display = 'none';
    garderob.style.display = 'none';
    dom.style.display = 'block';
    
    miniDom.style.marginTop = '10vw';
    miniDom.style.animation = 'float 2s ease-in-out infinite';
    textFord.style.display = 'block';
    
    currentHover = 'dom';
}


const placeStyle = document.createElement('style');
placeStyle.textContent = `
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    
 
    .miniarena, .minigard, .minidom {
        transition: margin-top 0.3s ease, transform 0.3s ease;
        cursor: pointer;
    }
    

    .miniarena:hover, .minigard:hover, .minidom:hover {
        filter: drop-shadow(0 0 15px gold);
        transform: scale(1.02);
    }
    
 
    .save {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .save:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 0 15px gold);
    }
    
    .save:active {
        transform: scale(0.95);
    }
    
    @keyframes appear {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
    
    .plashka {
        animation: appear 0.5s ease-out;
        z-index: 1000;
        cursor: pointer;
    }
    
    .plashka.hide {
        animation: disappear 0.3s ease-in forwards;
    }
`;
document.head.appendChild(placeStyle);


initState();


miniArena.addEventListener('mouseenter', () => showArena());
miniGard.addEventListener('mouseenter', () => showGarderob());
miniDom.addEventListener('mouseenter', () => showDom());


saveBtn.addEventListener('click', () => {
    if (selectedPlace) {
        plashka.style.display = 'block';
        plashka.classList.remove('hide');
        
        console.log(`Место сохранено: ${selectedPlace}`);
    }
});


plashka.addEventListener('click', function() {
    this.classList.add('hide');
    
   
    setTimeout(() => {
        this.style.display = 'none';
        this.classList.remove('hide');
    }, 300);
});


miniArena.addEventListener('click', () => {
    selectedPlace = 'arena';
    console.log('Выбрана арена');
    

    localStorage.setItem('selectedPlace', selectedPlace);
    
    
    miniArena.style.filter = 'none';
    miniGard.style.filter = 'none';
    miniDom.style.filter = 'none';
    
    
    miniArena.style.filter = 'drop-shadow(0 0 15px #DD507A) drop-shadow(0 0 30px #DD507A)';
    
    
    miniArena.style.transform = 'scale(1.1)';
    setTimeout(() => {
        miniArena.style.transform = 'scale(1)';
    }, 200);
    
  
    setTimeout(() => {
        updateFifthSection();
    }, 100);
});

miniGard.addEventListener('click', () => {
    selectedPlace = 'garderob';
    console.log('Выбран гардероб');
    
  
    localStorage.setItem('selectedPlace', selectedPlace);
    
    
    miniArena.style.filter = 'none';
    miniGard.style.filter = 'none';
    miniDom.style.filter = 'none';
    
   
    miniGard.style.filter = 'drop-shadow(0 0 15px #DD507A) drop-shadow(0 0 30px #DD507A)';
    
    miniGard.style.transform = 'scale(1.1)';
    setTimeout(() => {
        miniGard.style.transform = 'scale(1)';
    }, 200);
    
   
    setTimeout(() => {
        updateFifthSection();
    }, 100);
});

miniDom.addEventListener('click', () => {
    selectedPlace = 'dom';
    console.log('Выбран дом');
    
  
    localStorage.setItem('selectedPlace', selectedPlace);
    
    
    miniArena.style.filter = 'none';
    miniGard.style.filter = 'none';
    miniDom.style.filter = 'none';
    
   
    miniDom.style.filter = 'drop-shadow(0 0 15px #DD507A) drop-shadow(0 0 30px #DD507A)';
    
    miniDom.style.transform = 'scale(1.1)';
    setTimeout(() => {
        miniDom.style.transform = 'scale(1)';
    }, 200);
    
    
    setTimeout(() => {
        updateFifthSection();
    }, 100);
});


miniArena.addEventListener('mouseenter', () => {
    if (selectedPlace !== 'arena') {
        miniArena.style.filter = 'drop-shadow(0 0 15px gold)';
    }
});

miniGard.addEventListener('mouseenter', () => {
    if (selectedPlace !== 'garderob') {
        miniGard.style.filter = 'drop-shadow(0 0 15px gold)';
    }
});

miniDom.addEventListener('mouseenter', () => {
    if (selectedPlace !== 'dom') {
        miniDom.style.filter = 'drop-shadow(0 0 15px gold)';
    }
});


miniArena.addEventListener('mouseleave', () => {
    if (selectedPlace === 'arena') {
        miniArena.style.filter = 'drop-shadow(0 0 15px #DD507A) drop-shadow(0 0 30px #DD507A)';
    } else {
        miniArena.style.filter = 'none';
    }
});

miniGard.addEventListener('mouseleave', () => {
    if (selectedPlace === 'garderob') {
        miniGard.style.filter = 'drop-shadow(0 0 15px #DD507A) drop-shadow(0 0 30px #DD507A)';
    } else {
        miniGard.style.filter = 'none';
    }
});

miniDom.addEventListener('mouseleave', () => {
    if (selectedPlace === 'dom') {
        miniDom.style.filter = 'drop-shadow(0 0 15px #DD507A) drop-shadow(0 0 30px #DD507A)';
    } else {
        miniDom.style.filter = 'none';
    }
});


function showArena() {
    resetAllPositions();
    
    arena.style.display = 'block';
    garderob.style.display = 'none';
    dom.style.display = 'none';
    
    miniArena.style.marginTop = '10vw';
    miniArena.style.animation = 'float 2s ease-in-out infinite';
    textFora.style.display = 'block';
    
    currentHover = 'arena';
}


function showGarderob() {
    resetAllPositions();
    
    arena.style.display = 'none';
    garderob.style.display = 'block';
    dom.style.display = 'none';
    
    miniGard.style.marginTop = '10vw';
    miniGard.style.animation = 'float 2s ease-in-out infinite';
    textForr.style.display = 'block';
    
    currentHover = 'garderob';
}


function showDom() {
    resetAllPositions();
    
    arena.style.display = 'none';
    garderob.style.display = 'none';
    dom.style.display = 'block';
    
    miniDom.style.marginTop = '10vw';
    miniDom.style.animation = 'float 2s ease-in-out infinite';
    textFord.style.display = 'block';
    
    currentHover = 'dom';
}


function resetAllPositions() {
    miniArena.style.marginTop = '15vw';
    miniGard.style.marginTop = '15vw';
    miniDom.style.marginTop = '15vw';
    
    miniArena.style.animation = 'none';
    miniGard.style.animation = 'none';
    miniDom.style.animation = 'none';
    
    textFora.style.display = 'none';
    textForr.style.display = 'none';
    textFord.style.display = 'none';
    
    if (selectedPlace === 'arena') {
        miniArena.style.filter = 'drop-shadow(0 0 15px #DD507A) drop-shadow(0 0 30px #DD507A)';
    } else if (selectedPlace === 'garderob') {
        miniGard.style.filter = 'drop-shadow(0 0 15px #DD507A) drop-shadow(0 0 30px #DD507A)';
    } else if (selectedPlace === 'dom') {
        miniDom.style.filter = 'drop-shadow(0 0 15px #DD507A) drop-shadow(0 0 30px #DD507A)';
    }
}


const knopka = document.querySelector('.knopka');
const kran = document.querySelector('.kran');
const kranBottom = document.querySelector('.kran_bottom');
const counterElement = document.querySelector('.counter');


const toys = [
    { name: 'kot', element: document.querySelector('.kot'), plashka: document.querySelector('.plashka_1') },
    { name: 'vozduh_kot', element: document.querySelector('.vozduh_kot'), plashka: document.querySelector('.plashka_2') },
    { name: 'tamagochi', element: document.querySelector('.tamagochi'), plashka: document.querySelector('.plashka_3') },
    { name: 'perchatka', element: document.querySelector('.perchatka'), plashka: document.querySelector('.plashka_4') },
    { name: 'wand', element: document.querySelector('.wand'), plashka: document.querySelector('.plashka_5') },
    { name: 'shield', element: document.querySelector('.shield'), plashka: document.querySelector('.plashka_6') }
];


let gameCounter = 0;
let isGameActive = false;
let canPlay = true;
const MAX_PLAYS = 9;
let currentToy = null;
let animationTimeout = null;
let plashkaTimeout = null;


const buttonStyle = document.createElement('style');
buttonStyle.textContent = `
    .knopka {
        transition: all 0.3s ease;
        cursor: pointer;
        animation: buttonGlow 1.5s ease-in-out infinite;
    }
    
    @keyframes buttonGlow {
        0%, 100% {
            filter: drop-shadow(0 0 5px gold);
            transform: scale(1);
        }
        50% {
            filter: drop-shadow(0 0 20px gold) drop-shadow(0 0 30px #DD507A);
            transform: scale(1.1);
        }
    }
    
    .knopka:active {
        transform: scale(0.95);
    }
    
    .knopka.inactive {
        animation: none;
        filter: brightness(0.7);
        cursor: not-allowed;
        opacity: 0.7;
    }
    
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease-out forwards;
    }
`;
document.head.appendChild(buttonStyle);


function hideAllToys() {
    toys.forEach(toy => {
        if (toy.element) {
            toy.element.style.display = 'none';
            toy.element.classList.remove('fade-in');
        }
        if (toy.plashka) {
            toy.plashka.style.display = 'none';
            toy.plashka.classList.remove('fade-in');
        }
    });
}


function resetCrane() {
    kran.style.display = 'block';
    kranBottom.style.display = 'none';
    kran.style.marginLeft = '21vw';
    kran.style.transition = 'margin-left 1s ease-in-out';
}


function updateCounter() {
    counterElement.textContent = gameCounter;
}


function showPlashkaWithAnimation(selectedToy) {
    if (selectedToy && selectedToy.plashka) {
        selectedToy.plashka.style.display = 'block';
        selectedToy.plashka.classList.add('fade-in');
        
        selectedToy.plashka.addEventListener('click', function closePlashka() {
            this.style.display = 'none';
            this.classList.remove('fade-in');
            
            gameCounter++;
            updateCounter();
            
            if (gameCounter >= MAX_PLAYS) {
                gameCounter = 0;
                updateCounter();
            }
            
            isGameActive = false;
            canPlay = true;
            
            knopka.classList.remove('inactive');
            
            this.removeEventListener('click', closePlashka);
            
            console.log('Плашка закрыта, можно играть снова');
        }, { once: true });
    }
}


function animateCrane() {
    if (!canPlay || isGameActive || gameCounter >= MAX_PLAYS) return;
    
    isGameActive = true;
    canPlay = false;
    
    knopka.classList.add('inactive');
    
    if (animationTimeout) clearTimeout(animationTimeout);
    if (plashkaTimeout) clearTimeout(plashkaTimeout);
    
    hideAllToys();
    
    kran.style.display = 'block';
    kranBottom.style.display = 'none';
    
    kran.style.transition = 'margin-left 2s ease-in-out';
    kran.style.marginLeft = '37vw';
    
    animationTimeout = setTimeout(() => {
        kran.style.display = 'none';
        kranBottom.style.display = 'block';
        
        const randomIndex = Math.floor(Math.random() * toys.length);
        currentToy = toys[randomIndex];
        
        animationTimeout = setTimeout(() => {
            kranBottom.style.display = 'none';
            kran.style.display = 'block';
            kran.style.marginLeft = '37vw';
            
            if (currentToy && currentToy.element) {
                currentToy.element.style.display = 'block';
                currentToy.element.classList.add('fade-in');
            }
            
            plashkaTimeout = setTimeout(() => {
                showPlashkaWithAnimation(currentToy);
            }, 2000);
            
        }, 1000);
        
    }, 2000);
}


knopka.addEventListener('click', () => {
    if (!isGameActive && canPlay && gameCounter < MAX_PLAYS) {
        animateCrane();
    } else if (gameCounter >= MAX_PLAYS) {
        console.log('Достигнут максимум попыток');
    } else if (!canPlay) {
        console.log('Подождите, идет процесс...');
    }
});


hideAllToys();
resetCrane();
updateCounter();


const stamp = document.querySelector('.stamp');
const konvert = document.querySelector('.konvert');
const konvert1 = document.querySelector('.konvert_1');
const ticket = document.querySelector('.ticket');
const partKonvert = document.querySelector('.part_konvert');
const plashka7 = document.querySelector('.plashka_7');
const ticket1 = document.querySelector('.ticket_1');
const ticket2 = document.querySelector('.ticket_2');


let isStampBroken = false;
let isKonvertOpen = false;
let isTicketPulled = false;
let isTicketFlipped = false;
let isDragging = false;
let startY = 0;
let currentMarginTop = 10;


function initKonvertGame() {
    stamp.style.display = 'block';
    konvert.style.display = 'block';
    konvert1.style.display = 'none';
    ticket.style.display = 'none';
    partKonvert.style.display = 'none';
    plashka7.style.display = 'none';
    ticket1.style.display = 'none';
    ticket2.style.display = 'none';
    
    ticket.style.marginTop = '10vw';
}


const konvertStyle = document.createElement('style');
konvertStyle.textContent = `
    @keyframes crack {
        0% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 10px red);
        }
        25% {
            transform: scale(1.2) rotate(5deg);
            filter: drop-shadow(0 0 20px red) brightness(1.5);
        }
        50% {
            transform: scale(0.8) rotate(-5deg);
            filter: drop-shadow(0 0 30px orange) brightness(2);
        }
        75% {
            transform: scale(1.1) rotate(3deg);
            filter: drop-shadow(0 0 40px yellow) brightness(1.8);
        }
        100% {
            transform: scale(0) rotate(360deg);
            filter: drop-shadow(0 0 50px gold) brightness(2);
            opacity: 0;
        }
    }
    
    .stamp-crack {
        animation: crack 1s ease-in-out forwards;
    }
    
    @keyframes appear {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .appear {
        animation: appear 0.8s ease-out forwards;
    }
    
    @keyframes flip {
        0% {
            transform: rotateY(0deg) scale(1);
        }
        50% {
            transform: rotateY(180deg) scale(1.1);
        }
        100% {
            transform: rotateY(360deg) scale(1);
        }
    }
    
    .flip-animation {
        animation: flip 0.6s ease-in-out;
    }
    
    .ticket {
        cursor: grab;
        transition: margin-top 0.1s linear;
    }
    
    .ticket:active {
        cursor: grabbing;
    }
    
    .stamp, .konvert {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .stamp:hover, .konvert:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 0 15px gold);
    }
    
    .ticket_1, .ticket_2, .plashka_7 {
        cursor: pointer;
    }
`;
document.head.appendChild(konvertStyle);


initKonvertGame();


stamp.addEventListener('click', () => {
    if (!isStampBroken) {
        isStampBroken = true;
        
        stamp.classList.add('stamp-crack');
        
        setTimeout(() => {
            stamp.style.display = 'none';
            stamp.classList.remove('stamp-crack');
        }, 1000);
    }
});


konvert.addEventListener('click', () => {
    if (isStampBroken && !isKonvertOpen) {
        isKonvertOpen = true;
        
        konvert.style.display = 'none';
        
        konvert1.style.display = 'block';
        ticket.style.display = 'block';
        partKonvert.style.display = 'block';
        
        konvert1.classList.add('appear');
        ticket.classList.add('appear');
        partKonvert.classList.add('appear');
        
        setTimeout(() => {
            konvert1.classList.remove('appear');
            ticket.classList.remove('appear');
            partKonvert.classList.remove('appear');
        }, 800);
    }
});


function updateTicketPosition(clientY) {
    if (!isDragging || !ticket) return;
    
    const deltaY = startY - clientY;
    const newMarginTop = currentMarginTop - (deltaY / 10);
    
    if (newMarginTop >= 4 && newMarginTop <= 10) {
        ticket.style.marginTop = newMarginTop + 'vw';
        
        if (newMarginTop <= 4.1 && !isTicketPulled) {
            isTicketPulled = true;
            
            plashka7.style.display = 'block';
            ticket1.style.display = 'block';
            
            plashka7.classList.add('appear');
            ticket1.classList.add('appear');
            
            setTimeout(() => {
                plashka7.classList.remove('appear');
                ticket1.classList.remove('appear');
            }, 800);
        }
    }
}


ticket.addEventListener('mousedown', (e) => {
    if (!isKonvertOpen || isTicketPulled) return;
    
    isDragging = true;
    startY = e.clientY;
    currentMarginTop = parseFloat(ticket.style.marginTop) || 10;
    
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateTicketPosition(e.clientY);
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        
        if (!isTicketPulled && ticket) {
            ticket.style.marginTop = '10vw';
        }
    }
});


ticket1.addEventListener('click', () => {
    if (!isTicketPulled) return;
    
    ticket1.classList.add('flip-animation');
    ticket2.classList.add('flip-animation');
    
    setTimeout(() => {
        if (!isTicketFlipped) {
            ticket1.style.display = 'none';
            ticket2.style.display = 'block';
            isTicketFlipped = true;
        } else {
            ticket2.style.display = 'none';
            ticket1.style.display = 'block';
            isTicketFlipped = false;
        }
        
        ticket1.classList.remove('flip-animation');
        ticket2.classList.remove('flip-animation');
    }, 300);
});

ticket2.addEventListener('click', () => {
    if (!isTicketPulled) return;
    
    ticket1.classList.add('flip-animation');
    ticket2.classList.add('flip-animation');
    
    setTimeout(() => {
        if (isTicketFlipped) {
            ticket2.style.display = 'none';
            ticket1.style.display = 'block';
            isTicketFlipped = false;
        } else {
            ticket1.style.display = 'none';
            ticket2.style.display = 'block';
            isTicketFlipped = true;
        }
        
        ticket1.classList.remove('flip-animation');
        ticket2.classList.remove('flip-animation');
    }, 300);
});


plashka7.addEventListener('click', () => {
    plashka7.style.display = 'none';
    ticket1.style.display = 'none';
    ticket2.style.display = 'none';
    
    isTicketPulled = false;
    isTicketFlipped = false;
    
    ticket.style.marginTop = '10vw';
});


ticket.addEventListener('touchstart', (e) => {
    if (!isKonvertOpen || isTicketPulled) return;
    
    isDragging = true;
    startY = e.touches[0].clientY;
    currentMarginTop = parseFloat(ticket.style.marginTop) || 10;
    
    e.preventDefault();
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateTicketPosition(e.touches[0].clientY);
    e.preventDefault();
});

document.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        
        if (!isTicketPulled && ticket) {
            ticket.style.marginTop = '10vw';
        }
    }
});




const iconForekran = document.querySelector('.icon_forekran');
const place1 = document.querySelector('.place_1');
const place2 = document.querySelector('.place_2');
const place3 = document.querySelector('.place_3');
const textFormonolog = document.querySelector('.text_formonolog');
const nextBtn = document.querySelector('.next');
const miniIkon = document.querySelector('.mini_ikon');
const mini1 = document.querySelector('.mini_1');
const mini2 = document.querySelector('.mini_2');
const mini3 = document.querySelector('.mini_3');
const mini4 = document.querySelector('.mini_4');
const mini5 = document.querySelector('.mini_5');
const mini6 = document.querySelector('.mini_6');
const angel1 = document.querySelector('.angel_1');
const angel2 = document.querySelector('.angel_2');
const angel3 = document.querySelector('.angel_3');
const angel4 = document.querySelector('.angel_4');
const angel5 = document.querySelector('.angel_5');
const angel6 = document.querySelector('.angel_6');
const nameText = document.querySelector('.name_text');
const geroi = document.querySelector('.geroi');
const mesto = document.querySelector('.mesto');
const issledovanie = document.querySelector('.issledovanie');
const arrow = document.querySelector('.arrow');


const arenaTexts = [
    document.querySelector('.arena_1'),
    document.querySelector('.arena_2'),
    document.querySelector('.arena_3'),
    document.querySelector('.arena_4'),
    document.querySelector('.arena_5')
];

const garderobTexts = [
    document.querySelector('.garderob_1'),
    document.querySelector('.garderob_2'),
    document.querySelector('.garderob_3'),
    document.querySelector('.garderob_4')
];

const domTexts = [
    document.querySelector('.dom_1'),
    document.querySelector('.dom_2'),
    document.querySelector('.dom_3'),
    document.querySelector('.dom_4')
];


let currentPlace = null;
let currentTextIndex = 0;
let currentTexts = [];
let isTyping = false;
let typingTimeout = null;


function hideAllAngelsAndMinis() {
    if (angel1) angel1.style.display = 'none';
    if (angel2) angel2.style.display = 'none';
    if (angel3) angel3.style.display = 'none';
    if (angel4) angel4.style.display = 'none';
    if (angel5) angel5.style.display = 'none';
    if (angel6) angel6.style.display = 'none';
    
    if (mini1) mini1.style.display = 'none';
    if (mini2) mini2.style.display = 'none';
    if (mini3) mini3.style.display = 'none';
    if (mini4) mini4.style.display = 'none';
    if (mini5) mini5.style.display = 'none';
    if (mini6) mini6.style.display = 'none';
}


function hideAllMonologs() {
    arenaTexts.forEach(text => {
        if (text) text.style.display = 'none';
    });
    garderobTexts.forEach(text => {
        if (text) text.style.display = 'none';
    });
    domTexts.forEach(text => {
        if (text) text.style.display = 'none';
    });
}


function addFloatingAnimation() {
    if (iconForekran) {
        iconForekran.style.animation = 'floatPlace 2s ease-in-out infinite';
    }
}


function typeText(element, text, callback) {
    if (typingTimeout) clearTimeout(typingTimeout);
    isTyping = true;
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            typingTimeout = setTimeout(type, 50);
        } else {
            isTyping = false;
            if (nextBtn) {
                nextBtn.style.animation = 'blinkNext 1s ease-in-out infinite';
            }
            if (callback) callback();
        }
    }
    
    type();
}


function stopBlinking() {
    if (nextBtn) {
        nextBtn.style.animation = 'none';
    }
}


function loadPlaceTexts(place) {
    if (textFormonolog) {
        textFormonolog.style.display = 'none';
    }
    
    hideAllMonologs();
    stopBlinking();
    
    if (place === 'arena') {
        currentTexts = arenaTexts;
    } else if (place === 'garderob') {
        currentTexts = garderobTexts;
    } else if (place === 'dom') {
        currentTexts = domTexts;
    }
    currentTextIndex = 0;
    
    if (currentTexts.length > 0 && currentTexts[0]) {
        const textElement = currentTexts[currentTextIndex];
        textElement.style.display = 'block';
        typeText(textElement, textElement.textContent, null);
    }
}


function nextText() {
    if (isTyping) return;
    
    if (currentTexts[currentTextIndex]) {
        currentTexts[currentTextIndex].style.display = 'none';
    }
    
    currentTextIndex++;
    
    if (currentTextIndex < currentTexts.length && currentTexts[currentTextIndex]) {
        const textElement = currentTexts[currentTextIndex];
        textElement.style.display = 'block';
        stopBlinking();
        typeText(textElement, textElement.textContent, null);
    } else {
        stopBlinking();
    }
}


function updateFifthSection() {
    console.log('updateFifthSection вызван');
    
   
    const savedPlace = localStorage.getItem('selectedPlace');
    console.log('Сохраненное место:', savedPlace);
    
   
    if (iconForekran) iconForekran.style.display = 'none';
    if (place1) place1.style.display = 'none';
    if (place2) place2.style.display = 'none';
    if (place3) place3.style.display = 'none';
    if (textFormonolog) textFormonolog.style.display = 'none';
    
    if (savedPlace === 'arena') {
        if (place1) place1.style.display = 'block';
        loadPlaceTexts('arena');
        console.log('Загружена арена');
    } else if (savedPlace === 'garderob') {
        if (place2) place2.style.display = 'block';
        loadPlaceTexts('garderob');
        console.log('Загружен гардероб');
    } else if (savedPlace === 'dom') {
        if (place3) place3.style.display = 'block';
        loadPlaceTexts('dom');
        console.log('Загружен дом');
    } else {
        
        if (iconForekran) {
            iconForekran.style.display = 'block';
            addFloatingAnimation();
        }
        
        if (textFormonolog) {
            textFormonolog.style.display = 'block';
        }
        hideAllMonologs();
        stopBlinking();
    }
    
    
    const savedAngel = localStorage.getItem('selectedAngel');
    console.log('Сохраненный ангелочек:', savedAngel);
    
    
    if (miniIkon) miniIkon.style.display = 'none';
    
    
    hideAllAngelsAndMinis();
    
    if (savedAngel === 'one') {
        if (mini1) mini1.style.display = 'block';
        if (angel1) angel1.style.display = 'block';
        console.log('Показан ангел 1');
    } else if (savedAngel === 'two') {
        if (mini2) mini2.style.display = 'block';
        if (angel2) angel2.style.display = 'block';
        console.log('Показан ангел 2');
    } else if (savedAngel === 'three') {
        if (mini3) mini3.style.display = 'block';
        if (angel3) angel3.style.display = 'block';
        console.log('Показан ангел 3');
    } else if (savedAngel === 'four') {
        if (mini4) mini4.style.display = 'block';
        if (angel4) angel4.style.display = 'block';
        console.log('Показан ангел 4');
    } else if (savedAngel === 'five') {
        if (mini5) mini5.style.display = 'block';
        if (angel5) angel5.style.display = 'block';
        console.log('Показан ангел 5');
    } else if (savedAngel === 'six') {
        if (mini6) mini6.style.display = 'block';
        if (angel6) angel6.style.display = 'block';
        console.log('Показан ангел 6');
    } else {
        
        if (miniIkon) miniIkon.style.display = 'block';
        console.log('Ангел не выбран, показан mini_ikon');
    }
    
   
    const savedName = localStorage.getItem('userName');
    if (savedName && nameText) {
        nameText.textContent = savedName;
        console.log('Загружено имя:', savedName);
    }
}


function initFifthSection() {
    console.log('сброс в начальное состояние');
    
    hideAllAngelsAndMinis();
    
    if (iconForekran) {
        iconForekran.style.display = 'block';
        addFloatingAnimation();
    }
    if (place1) place1.style.display = 'none';
    if (place2) place2.style.display = 'none';
    if (place3) place3.style.display = 'none';
    
    if (textFormonolog) {
        textFormonolog.style.display = 'block';
    }
    
    hideAllMonologs();
    
    if (miniIkon) miniIkon.style.display = 'block';
    
    if (nameText) nameText.textContent = 'имя';
    
    currentTextIndex = 0;
    currentTexts = [];
    stopBlinking();
    
    console.log('сброшена');
}


const fifthSectionStyle = document.createElement('style');
fifthSectionStyle.textContent = `
    @keyframes floatPlace {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    
    @keyframes blinkNext {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
    }
    
    .icon_forekran {
        animation: floatPlace 2s ease-in-out infinite;
    }
    
    .next {
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .next:hover {
        transform: scale(1.1);
    }
    
    .arrow {
        transition: margin-top 0.3s ease;
    }
    
    .geroi, .mesto, .issledovanie {
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .geroi:hover, .mesto:hover, .issledovanie:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 0 10px gold);
    }
`;
document.head.appendChild(fifthSectionStyle);


if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextText();
    });
}

if (geroi) {
    geroi.addEventListener('mouseenter', () => {
        if (arrow) arrow.style.marginTop = '40vw';
    });
    geroi.addEventListener('click', () => {
        const firstSection = document.querySelector('.section_two');
        if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

if (mesto) {
    mesto.addEventListener('mouseenter', () => {
        if (arrow) arrow.style.marginTop = '46vw';
    });
    mesto.addEventListener('click', () => {
        const thirdSection = document.querySelector('.section_three');
        if (thirdSection) {
            thirdSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

if (issledovanie) {
    issledovanie.addEventListener('mouseenter', () => {
        if (arrow) arrow.style.marginTop = '52vw';
    });
    issledovanie.addEventListener('click', () => {
        window.open('https://hsedesign.ru/designer/hadidzha-godzhaeva-34385f9d06ba414a9f30f5c79fef7cdd', '_blank');
    });
}



localStorage.removeItem('selectedPlace');
localStorage.removeItem('selectedAngel');
localStorage.removeItem('userName');


initFifthSection();
console.log('все ок');

const kralo = document.querySelector('.kralo');
const last = document.querySelector('.last');

let isKraloVisible = true;

setInterval(function() {
    if (isKraloVisible) {
        kralo.style.display = 'none';
        last.style.display = 'block';
        isKraloVisible = false;
    } else {
        last.style.display = 'none';
        kralo.style.display = 'block';
        isKraloVisible = true;
    }
}, 500);

const krest = document.querySelector('.krest');
const mainPlashka = document.querySelector('.main_plashka');
const loadbar = document.querySelector('.load_bar');
const loading = document.querySelector('.loading');


function closeAll() {
    if (mainPlashka) mainPlashka.style.display = 'none';
    if (loadbar) loadbar.style.display = 'none';
    if (loading) loading.style.display = 'none';
    if (krest) krest.style.display = 'none'; 
    console.log('ура, закрыли');
}

if (krest) {
    krest.addEventListener('click', closeAll);
    krest.style.cursor = 'pointer'; 
}


});