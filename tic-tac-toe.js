const val = [null,null,null,null,null,null,null,null,null];
let turn = 0;



window.addEventListener('DOMContentLoaded', (event) => {
    main();
});

function main(){

    let button = document.getElementsByClassName("btn")[0];
    button.setAttribute("onclick","startGame();");



}





function startGame(){

    let m = document.getElementsByTagName('div');
    for (let n = 3; n <12; n++){
    let ndm = n - 3;
    m[n].setAttribute("class","square");
    m[n].setAttribute("id", "b"+ ndm); 
    }
    for(let n = 3; n < 12; n++){
        m[n].addEventListener("click",function(){choose(this.getAttribute("id"));});
    }

}

function choose(box){

    box = parseInt(box[1],10);
    let k = box;
    box += 3;
    if(turn < 9 && val[k] == null){
      turn++;
      if(turn % 2 == 0){
        val[k] = "O";
        document.getElementsByTagName('div')[box].classList.add("hover");
        document.getElementsByTagName('div')[box].classList.add("0");
        document.getElementsByTagName('div')[box].innerHTML = "O";
      }else {
        val[k] = "X";
        document.getElementsByTagName('div')[box].classList.add("hover");
        document.getElementsByTagName('div')[box].classList.add("X");
        document.getElementsByTagName('div')[box].innerHTML = "X";
      }
  
      let results = tal();
      results.forEach((el) =>{
        if(el === "X" || el === "O"){ winner(el);}
     })
  
  
      if(turn === 9){
        tal();
  
        if(results[0] === "no match" && results[0] === results[1]  && results[1] === results[2]){
        stat = document.getElementById("status").innerHTML = "It's a Draw!";}
  
        endGame();
  
      }
  
    }
  
  }
  





function winner(winer){
    let stat = document.getElementById("status");
    stat.classList.add("you-won");
  
    winer === "X" ? stat.innerHTML = "Congratulations! X is the Winner" : stat.innerHTML = "Congratulations! O is the Winner";
    endGame();
}



function endGame(){
    let button = document.getElementsByTagName("button")[0];
    button.innerHTML= "Start Over";
    button.setAttribute("onclick","restart();");
}

function restart(){

    resetLayout();
  
    resetButton();
  
    resetVal();
  
    turn = 0;
  
}


function HOP(list,start,end,increment,pointer,baseCondition){
    let base = 0;
    for(let n = start; n < end; n+= increment){
      if (baseCondition) base = n;
      if(list[n] === list[n + pointer - base] && list[n + pointer - base] === list[n + pointer + pointer - base - base]){
        return list[n];
      }
  
    }
  
    return "no match";
}

function tal(){


    let col = HOP(val,0,3,1,3,false);
    let row = HOP(val,0,9,3,1,false);
    let dia = HOP(val,0,3,2,4,true);
  
    return [col,row,dia];
  
}

function resetButton(){
    document.getElementsByTagName("button")[0].innerHTML= "New game";
    document.getElementsByTagName("button")[0].setAttribute("onclick","startGame()");
  
}

function resetVal(){
    for(let n = 0; n < val.length; n++){
      val[n] = null;
    }
}

function resetLayout(){
    let m = document.getElementsByTagName('div');
  
  
    for (let n = 3; n <12; n++){
      m[n].innerHTML === "X" ? m[n].classList.remove("X") : m[n].classList.remove("O");
      m[n].innerHTML = "";
      m[n].setAttribute("id", "");
      m[n].classList.remove("square");
      m[n].classList.remove("hover");
  
    }
  
    let stat = document.getElementById("status");
    stat.innerHTML = "Move your mouse over a square and click to play an X or an O.";
    stat.classList.remove("you-won");
  
  
}