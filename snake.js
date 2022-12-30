let board = document.getElementsByClassName("board");
let tb = document.createElement("table");
tb.style.height = '95vh';
tb.style.width = '50vw';
let scr = document.getElementsByClassName("score");
let arr = [{x:1,y:1}];
let food = {x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)};
let sc=0;
let l=[];
for(let i=0 ; i<20 ; i++){
    let temp = [];
    let q = document.createElement("tr");
    for(let j=0 ; j<20 ; j++){
        let p = document.createElement("td");
        p.style.height = 'auto';
        p.style.width = 'auto';
        p.style.borderRadius = '50%';
        p.style.backgroundColor = 'blue';
        temp.push(p);
        q.appendChild(p);
    }
    tb.appendChild(q);
    l.push(temp);
}
board[0].appendChild(tb);

function tr(){
    for(let i=0 ; i<20 ; i++){
        for(let j=0 ; j<20 ; j++){
            l[i][j].style.backgroundColor = 'blue';
        }
    }
}

let highsc = 0;
function gameover(){
    alert(`game over \n Your Score is ${sc}`);
    tr();
    arr=[{x:1,y:1}];
    if(sc >= highsc){highsc = sc;}
    sc=0;
    scr[0].innerHTML = `Score : ${sc} <br> High Score : ${highsc}`;
    l[arr[0].x][arr[0].y].style.backgroundColor = 'greenyellow';
    food = {x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)};
    l[food.x][food.y].style.backgroundColor = 'red';
    clear();
}

function score(){
    if(arr[arr.length-1].x==food.x && arr[arr.length-1].y==food.y){
        arr.unshift(food);
        l[food.x][food.y].style.backgroundColor = 'blue';
        food = {x:Math.floor(Math.random()*20) , y:Math.floor(Math.random()*20)};
        l[food.x][food.y].style.backgroundColor = 'red';
        sc++;
        scr[0].innerHTML = `Score : ${sc} <br> High Score : ${highsc}`;
    }
    if(arr[arr.length-1].x > 19 || arr[arr.length-1].x < 0 || arr[arr.length-1].y > 19 || arr[arr.length-1].y < 0){
        gameover();
    }
}

l[food.x][food.y].style.backgroundColor = 'red';
l[arr[0].x][arr[0].y].style.backgroundColor = 'greenyellow';

let dir = {x : 0 , y : 0};

function clear(){
    for(i=0; i<10000; i++)
    {
        window.clearInterval(i);
    }
}

function move(){
    tr()
    l[food.x][food.y].style.backgroundColor = 'red';
    score();
    for(let i=0 ; i<arr.length ; i++){
        if(i==arr.length-1){
            l[arr[i].x][arr[i].y].style.backgroundColor = 'greenyellow';
        }
        else{l[arr[i].x][arr[i].y].style.backgroundColor = 'black';}
    }

    arr.push({x : arr[arr.length-1].x+dir.x ,y : arr[arr.length-1].y+dir.y})
    arr.shift();

    for(let i=0 ; i<arr.length-1 ; i++){
        if(arr[arr.length-1].x == arr[i].x && arr[arr.length-1].y == arr[i].y){
            gameover();
        }
    }
}

document.onkeydown = function (event) {
    switch (event.key) {
       case 'ArrowLeft':
        clear();
          dir.x = 0;
          dir.y = -1;
          break;
       case 'ArrowUp':
        clear();
          dir.x = -1;
          dir.y = 0;
          break;
       case 'ArrowRight':
        clear();
          dir.x = 0;
          dir.y = 1;
          break;
       case 'ArrowDown':
        clear();
          dir.x = 1;
          dir.y = 0;
          break;
    }
    window.setInterval(move,170);
}

