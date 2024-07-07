let gameSeq = [];
let userSeq = [];

let btns = ["green", "yellow", "red", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;

        levelUp();
    }
})

function flash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 3);
    let ranCol = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranCol}`);
    gameSeq.push(ranCol);
    flash(ranBtn);
} 

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. <br> Press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "black";
        }, 300);
        reset();
    }
}

function btnPress() {
    let btn = this;
    flash(btn);

    let userCol = btn.getAttribute("id");
    userSeq.push(userCol);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}