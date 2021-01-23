let num = Math.round(Math.random() * 100);
console.log("数字：" + num);
let result = document.getElementById("result");
let btn = document.getElementById("btn");
let startGameBtn = document.getElementById("startGameBtn");
let prompt = document.getElementsByTagName("i");
let spanP = document.getElementById("spanP")
let promptNum = document.getElementById("prompt");
let banNum = 10;
let arrNum = new Array();

btn.addEventListener("click", function () {
    let enterNum = document.getElementById("enterNum").value;
    banNum -= 1;
    if (num == enterNum) {
        result.innerHTML = "You win!";
        result.style.backgroundColor = "rgb(25,96,139)";
        promptFun(enterNum);
        banNum = 100;
    } else {
        result.innerHTML = "You wrong!"
        result.style.backgroundColor = "rgb(246, 76, 76)";
        arrNum.push(enterNum);
        prompt[0].innerHTML = arrNum;
        promptFun(enterNum);

    }
    console.log(enterNum);
});
function promptFun(enterNum) {
    if (num == enterNum) {
        promptNum.innerHTML = "";
    } else {
        promptNum.innerHTML = enterNum > num ? "猜高了" : "猜低了"
        spanP.innerHTML = banNum;
    }
}

btn.onclick = function () {
    document.getElementById("enterNum").value = null;
    if (banNum <= 0) {
        let enterNum = document.getElementById("enterNum").disabled = true;
        btn.disabled = true;
        startGameBtn.style.display = "inline";
        result.innerHTML = "你输了比赛请按开始游戏重新开始！"
    } else if (banNum === 100) {
        let enterNum = document.getElementById("enterNum").disabled = true;
        btn.disabled = true;
        startGameBtn.style.display = "inline";
        result.innerHTML = "你赢了比赛请按开始游戏重新开始！"
    }
}
startGameBtn.addEventListener("click", function () {
    banNum = 10;
    let enterNum = document.getElementById("enterNum").disabled = false;
    btn.disabled = false;
    startGameBtn.style.display = "none";
    arrNum.splice(0, arrNum.length);
    spanP.innerHTML = "";
    prompt[0].innerHTML = "";
    result.innerHTML = "";
    result.style.backgroundColor = "white";
    promptNum.innerHTML = "";
    num = Math.round(Math.random() * 100);
    console.log("数字：" + num);
})