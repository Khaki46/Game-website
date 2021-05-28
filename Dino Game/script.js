const img = new Image();
function preload(url) {
    img.src = url;
}
preload('img/offline-sprite-1x.png');

document.getElementById("btn").onclick = function () {
    
    document.getElementById("btn").style.display = "none";

    const dino = document.getElementById("dino");
    const dinoImg = dino.querySelector('div');
    const cactus = document.getElementById("cactus");
    const cactusImg = cactus.querySelector("img");
    // const bird = document.getElementById('bird');
    // const birdImg = bird.querySelector('img');

    let Score = document.getElementsByTagName("i")[0];
    let scoreNum = 0;
    let dinoDownTF = false;
    let dinoJumpTF = false;
    let dinoTF=true;
    let dinoCanLive = true;
    function jump() {
        if (dino.classList != "jump") {
            dino.classList.add("jump");
            setTimeout(() => {
                dino.classList.remove("jump");
            }, 500);
        }
    }
    function down() {
        dinoTF = false;
        dinoDownTF = true;
        dinoImg.setAttribute("src", "img/dinoDown1.png");

        document.addEventListener("keyup", control1);
        function control1() {
            dinoTF = true;
            dinoDownTF = false;
            dinoImg.setAttribute("src", "img/dino.png");
        }
    }
    function control(e) {
        if (e.keyCode === 32 || e.keyCode === 38) {
            // jump code
            jump();
        } else if (e.keyCode === 40) {
            down();
        }
    }
    // 成绩
    let scoreTime = setInterval(() => {
        scoreNum++;
        Score.innerHTML = scoreNum;
    }, 1000);

    let dinoAlive = setInterval(() => {
        // 获得恐龙高度距离
        let dinoTop = parseInt(
            window.getComputedStyle(dino).getPropertyValue("top")
        );
        // 获得仙人掌宽度距离
        let cactusLeft = parseInt(
            window.getComputedStyle(cactus).getPropertyValue("left")
        );
        // 获得鸟的宽度距离
        let birdLeft = parseInt(
            window.getComputedStyle(bird).getPropertyValue("left")
        );
        if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 100) {
            dinoImg.setAttribute("src", "img/dinoDie.png");
            alert("you die!");
            window.location.reload();
        }
        if (dinoTop <= 76 || dinoDownTF == true) {
            dinoCanLive = true;
        } else {
            dinoCanLive = false;
        }
        if (birdLeft < 40 && birdLeft > 0 && dinoCanLive == false) {
            dinoImg.setAttribute("src", "img/dinoDie.png");
            alert("you die!");
            window.location.reload();
        }
        if (dinoTop < 140) {
            // dinoImg.setAttribute("src", "img/dino.png");
        }
    }, 10);
    document.addEventListener("keydown", control);

    function dinoGoFun1(){
        if(dinoTF){
            dinoImg.className = "dinoImg iconDinoGo1";
        }else{
            dinoImg.className = "dinoDownImg iconDinoDown1";
        }
    }
    function dinoGoFun2(){
        if(dinoTF){
            dinoImg.className = "dinoImg iconDinoGo2";
        }else{
            dinoImg.className = "dinoDownImg iconDinoDown2";
        }
    }
        setInterval(dinoGoFun1, 100);
        setInterval(dinoGoFun2, 200);

    // 更换仙人掌图片
    setInterval(() => {
        let num = Math.floor(Math.random() * 10);
        console.log(num);
        if (num <= 3) {
            cactusImg.setAttribute("src", "img/cactus2.png");
        } else if (3 < num <= 6) {
            cactusImg.setAttribute("src", "img/cactus3.png");
        } else if (6 < num <= 10) {
            cactusImg.setAttribute("src", "img/cactus4.png");
        }
    }, 2000);
    // 鸟和仙人掌出现
    setInterval(() => {
        let ShowTime = Math.floor(Math.random() * 10);
        if (ShowTime < 5) {
            cactus.classList.add("cactusShow");
            bird.classList.remove("birdShow");
        } else if (ShowTime >= 5) {
            bird.classList.add("birdShow");
            cactus.classList.remove("cactusShow");
        }
    }, 6000);
};
//   取消上下键滑动
document.onkeydown = function (e) {
    if(e.key == "ArrowUp" || e.key == "ArrowDown"){
    if(e.preventDefault){
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}
}