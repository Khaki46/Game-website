function preload(url) {
    const img = new Image();
    img.src = url;
}
preload('img/offline-sprite-1x.png');

document.getElementById("btn").onclick = function () {
    
    document.getElementById("btn").style.display = "none";

    const dino = document.getElementById("dino");
    const dinoImg = dino.querySelector('div');
    const cactus = document.getElementById("cactus");
    const cactusImg = cactus.querySelector('div');
    const groundImg = document.getElementById("ground").querySelector('div');
    const cloud = document.getElementById("cloud");

    const btnJump = document.getElementById("btnAll").querySelectorAll('button')[0];
    groundImg.classList.add("groundShow");
    cloud.classList.add("cloudShow");

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

        document.addEventListener("keyup", control1);
        function control1() {
            dinoTF = true;
            dinoDownTF = false;
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
        btnJump.onclick = function () {
            jump();
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
            dinoImg.style.cssText = "background-position: -854px 0px;";
            alert("you die!");
            window.location.reload();
        }
        if (dinoTop <= 76 || dinoDownTF == true) {
            dinoCanLive = true;
        } else {
            dinoCanLive = false;
        }
        if (birdLeft < 40 && birdLeft > 0 && dinoCanLive == false) {
            dinoImg.style.cssText = "background-position: -854px 0px;";
            alert("you die!");
            window.location.reload();
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
        // console.log(num);
        if (num <= 3) {
            cactusImg.classList.remove('cactusImg2');
            cactusImg.classList.remove('cactusImg3');
            cactusImg.classList.add('cactusImg1');
        } else if (3 < num <= 6) {
            cactusImg.classList.remove('cactusImg1');
            cactusImg.classList.remove('cactusImg3');
            cactusImg.classList.add('cactusImg2');
        } else if (6 < num <= 10) {
            cactusImg.classList.remove('cactusImg1');
            cactusImg.classList.remove('cactusImg2');
            cactusImg.classList.add('cactusImg3');
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
    }, 4000);
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