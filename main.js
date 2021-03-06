let menuBackground = document.getElementById('menu__background')
bgctx = menuBackground.getContext('2d');
screenWidth = window.innerWidth
ctxWidth = 0
bgGradient = bgctx.createLinearGradient(0, 0, ctxWidth - ctxWidth * 0.1, 0)
border = document.getElementById('menu__image-border')
brdrctx = border.getContext('2d')
borderHeight = border.height
borderWidth = border.width
menuNext = document.getElementById('menu__next-btn')
menuImage = document.getElementById('menu__image')
imagesCount = 1
imageIndex = 0
videoPlayState = true
videoControl = document.querySelector('.video__control')
video = document.getElementById('video')
testImage = document.querySelector('#testimonials__avatar')
testLeft = document.querySelector('#testimonials__left')
testRight = document.querySelector('#testimonials__right')
testName = document.querySelector('#testimonials__user-name')
testText = document.querySelector('#testimonials__text')
testHeadline = document.querySelector('#testimonials__headline')
testContent = document.querySelector('#testimonials__content')
testUsers = [{
    name: 'Abram',
    surName: 'Korsgaard',
    image: './images/testimonials-avatar.png',
    headline: 'Their services was best and friendly',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus tempor id faucibus quam lobortis.'
}]
testCurrentUser = 0;

function testSetUser(i) {
    testImage.style.backgroundImage = 'url("' + testUsers[i].image + '")';
    testName.innerHTML = testUsers[i].name + ' ' + testUsers[i].surName;
    testText.innerHTML = testUsers[i].text;
    testHeadline.innerHTML = testUsers[i].headline;
}

testLeft.addEventListener('click', function () {
    testContent.style.opacity = '0';
    setTimeout(function () {
        if (testCurrentUser === 0) {
            testCurrentUser = testUsers.length - 1;
            testSetUser(testCurrentUser)
            setTimeout(function () {
                testContent.style.opacity = '1';
            }, 300)
        } else {
            testCurrentUser--;
            testSetUser(testCurrentUser)
            testContent.style.opacity = '1';
        }
    }, 300)
})

testRight.addEventListener('click', function () {
    testContent.style.opacity = '0';
    testCurrentUser++;
    if (testCurrentUser === testUsers.length) {
        fetch('https://randomuser.me/api/')
            .then(res => {
                return res.json()
            })
            .then(data => {
                testImage.style.backgroundImage = 'url("' + data.results[0].picture.large + '")'
                testName.innerHTML = data.results[0].name.first + ' ' + data.results[0].name.last
                return data.results[0]
            })
            .then((user) => {
                let userItem = {
                    name: user.name.first,
                    surName: user.name.last,
                    image: user.picture.large
                }
                fetch('https://baconipsum.com/api/?type=meat-and-filter&sentences=2')
                    .then(res => {
                        return res.json()
                    })
                    .then(data => {
                        testText.innerHTML = data[0];
                        userItem.text = data[0];
                    })
                    .then(()=>{
                        fetch('https://baconipsum.com/api/?type=meat-and-filter&sentences=0.2')
                            .then (res => {
                                return res.json()
                            })
                            .then (data => {
                                testHeadline.innerHTML = data[0];
                                userItem.headline = data[0];
                                testUsers.push(userItem)
                                console.log(testUsers);
                                testContent.style.opacity = '1'
                            })
                    })
            })
    } else {
        setTimeout(function () {
            testSetUser(testCurrentUser);
            testContent.style.opacity = '1';
        }, 300)
    }
})

menuNext.addEventListener('click', function () {
    if (imageIndex < imagesCount) {
        imageIndex++
    } else {
        imageIndex = 0;
    }
    menuImage.style.animation = ''
    setTimeout(function () {
        menuImage.style.animation = 'slide 0.5s 1 ease-in forwards'
    }, 10)
    setTimeout(function () {
        menuImage.style.opacity = '0';
        menuImage.style.background = 'transparent url("./images/main-images/' + imageIndex + '.png") no-repeat center';
        menuImage.style.backgroundSize = 'contain';
        menuImage.style.animation = '';
        setTimeout(function () {
            menuImage.style.opacity = '1';
            menuImage.style.animation = 'slide 0.5s 1 reverse forwards'
        }, 10)
    }, 500)
})

brdrctx.fillStyle = 'rgba(238, 85, 20, 0.4)';
brdrctx.fillRect(0, 0, borderWidth, borderHeight);
brdrctx.clearRect(12, 12, borderWidth - 24, borderHeight - 24);
brdrctx.fillStyle = 'rgba(238, 85, 20, 0.1)';

for (let i = 1; i !== 9; i++) {
    for (let j = 1; j !== 9; j++) {
        brdrctx.beginPath();
        brdrctx.arc((12 + 5) * j, (12 + 5) * i, 5, 0, 2 * Math.PI);
        brdrctx.fill()
    }
}


bgGradient.addColorStop(0, "rgba(238, 85, 20, 1)");
bgGradient.addColorStop(1, "rgba(238, 85, 20, 0)");

function setupBg() {
    menuBackground.style.width = screenWidth - 20 + 'px';
    ctxWidth = menuBackground.width;
    bgGradient = bgctx.createLinearGradient(0, 0, ctxWidth, 0);
    bgGradient.addColorStop(0, "rgba(238, 85, 20, 1)");
    bgGradient.addColorStop(1, "rgba(238, 85, 20, 0)");
}

function drawBackground() {
    bgctx.fillStyle = bgGradient;
    bgctx.clearRect(0, 0, ctxWidth, menuBackground.height)
    bgctx.beginPath();
    bgctx.moveTo(0, 0);
    bgctx.lineTo(0, menuBackground.height);
    bgctx.lineTo(ctxWidth - ctxWidth * 0.4, menuBackground.height);
    bgctx.lineTo(ctxWidth - ctxWidth * 0.2, 0);
    bgctx.lineTo(0, 0);
    bgctx.fill();
    bgctx.beginPath()
}

// screen width tracker
window.addEventListener('resize', function () {
    screenWidth = window.innerWidth;
    setupBg();
    drawBackground();
})

window.addEventListener("scroll", () => {
    let scroll = this.scrollY;
    if (scroll >= 100) {
        document.querySelector('.header').style.background = 'rgba(254, 254, 254, 0.3)';
        document.querySelector('.header').style.backdropFilter = 'blur(10px)';
    } else {
        document.querySelector('.header').style.background = 'transparent';
        document.querySelector('.header').style.backdropFilter = '';
    }
});

videoControl.addEventListener('mouseenter', function () {
    if (!videoPlayState) {
        this.style.opacity = '1'
    }
})

videoControl.addEventListener('mouseout', function () {
    if (!videoPlayState) {
        this.style.opacity = '0'
    }
})

videoControl.addEventListener('click', function () {
    this.style.opacity = '1';
    if (videoPlayState) {
        document.getElementById('video').play();
        this.style.background = '#ffffff url(./images/pause.svg) no-repeat center'
        this.style.backgroundSize = '40px'
        setTimeout(function () {
            videoControl.style.opacity = '0'
        }, 200)
        videoPlayState = false;
    } else {
        document.getElementById('video').pause();
        this.style.background = '#ffffff url(./images/play.svg) no-repeat center'
        this.style.backgroundSize = '30px'
        videoPlayState = true;
    }
})

video.addEventListener('ended', function () {
    videoPlayState = true;
    videoControl.style.background = '#ffffff url(./images/play.svg) no-repeat center'
    videoControl.style.backgroundSize = '30px'
    videoControl.style.opacity = '1';
})

setupBg();
drawBackground()
