const Btn = document.getElementById("btn");
const images = [];
function preload() {
    for (let i = 0; i < arguments.length; i++){
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}
preload(
    "img/1.png",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/open.png"
)
Btn.onclick = function go() {

    Btn.style.display = 'none';
    const imgArr = [
        {
            name: '1',
            img: 'img/1.png'
        },
        {
            name: '2',
            img: 'img/2.png'
        },
        {
            name: '3',
            img: 'img/3.png'
        },
        {
            name: '4',
            img: 'img/4.png'
        },
        {
            name: '5',
            img: 'img/5.png'
        },
        {
            name: '6',
            img: 'img/6.png'
        },
        {
            name: '1',
            img: 'img/1.png'
        },
        {
            name: '2',
            img: 'img/2.png'
        },
        {
            name: '3',
            img: 'img/3.png'
        },
        {
            name: '4',
            img: 'img/4.png'
        },
        {
            name: '5',
            img: 'img/5.png'
        },
        {
            name: '6',
            img: 'img/6.png'
        }
    ]
    imgArr.sort(function () { return 0.5 - Math.random(); });
    const img = document.getElementsByTagName('img');
    const Memorybox = document.getElementById('Memorybox');
    let Score = document.getElementsByTagName('i')[0];

    let scoreNum = 0;

    let cardId = [];
    let cardArr = [];
    let imgIdArr = [];
    let addNum = 0;
    Memorybox.className = 'Memorybox';
    function detect() {
        // var cards = document.querySelectorAll('img');
        const cardArrOne = imgIdArr[0];
        const cardArrTwo = imgIdArr[1];
        console.log(cardArrOne);
        console.log(cardArrTwo);
        if (cardArrOne == cardArrTwo) {
            cardArr[0].setAttribute('src', 'img/close.png');
            cardArr[1].setAttribute('src', 'img/close.png');
        } else if (cardId[0] === cardId[1]) {
            addNum += 1;
            cardArr[0].setAttribute('src', 'img/open.png');
            cardArr[1].setAttribute('src', 'img/open.png');
            cardArr[0].setAttribute('style', 'pointer-events:none')
            cardArr[1].setAttribute('style', 'pointer-events:none')
            if (addNum == 6) {
                document.querySelector('h1').style.display = 'block';
                Btn.innerHTML = "重新开始"
                Btn.style.display = 'block';
                clearInterval(scoreTime);
            }
            console.log(cardArr[0]);
            console.log(cardArr[1]);
        } else {
            cardArr[0].setAttribute('src', 'img/close.png');
            cardArr[1].setAttribute('src', 'img/close.png');

        }
        // 重置
        cardArr = []
        cardId = []
        imgIdArr = []
    }
    for (let i = 0; i < img.length; i++) {
        console.log(imgArr[i]);
        img[i].addEventListener('click', flipCard);
        function flipCard() {

            img[i].setAttribute('src', imgArr[i].img)
            img[i].index = i;
            imgIdArr.push(this.index);
            cardArr.push(img[i]);
            cardId.push(imgArr[i].name);
            if (cardId.length === 2) {
                setTimeout(detect, 300);
            }
        }
    }
    // 成绩
    let scoreTime = setInterval(() => {
        scoreNum++;
        Score.innerHTML = scoreNum;
    }, 1000);
    document.getElementById("btn").onclick = function () {
        window.location.reload();
    }
}