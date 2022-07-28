'use strict';
window.onload=function(){

  /*
  const titletable=document.getElementById('gamename');
  let gntr=document.createElement('gntr');
    let gntd=document.createElement('gntd');
    gntr.appendChild(gntd);
    titletable.appendChild(gntr);
*/

  var timer1;
  var startTime, nowTime;
  Timer();

  // start
  function Timer(){
    // スタート時刻
    startTime = new Date();
    // タイマー開始
    startTimer();
  };

  // タイマー開始
  function startTimer(){
    timer1 = setInterval(showSecond, 1000);
  }

  // 秒数表示
  function showSecond(){
    nowTime = new Date();

    var elapsedTime = Math.floor((nowTime - startTime) / 1000);
    var str = '経過秒数: ' + elapsedTime + '秒';

    var re = document.getElementById('timer');
    re.innerHTML = str;
  }



  function Card(suit,num){
    this.suit=suit;
    this.num=num;
    this.front;
    if(suit=='s2'|| suit=='d2'|| suit=='h2'|| suit=='c2'){
      this.num = (num+7);
    }
    this.setFront=function(){
      if((suit=='s1'|| suit=='d1'|| suit=='h1'|| suit=='c1')){
      this.front=`${this.suit+'_'}${('0'+this.num).slice(-2)}.gif`;
    }
      else if((suit=='s2'|| suit=='d2'|| suit=='h2'|| suit=='c2')){
        this.front=`${this.suit+'_'}${('0'+this.num).slice(-2)}.gif`;
      }
    };
  }
  const cards=[];
  const suits=['s1','s2','d1','d2','h1','h2','c1','c2'];
  for(let i=0;i<suits.length;i++){
    for(let j=1;j<=6;j++){
      let card=new Card(suits[i],j);
      card.setFront();
      cards.push(card);
    }
  }

  function shuffle(){
    let i=cards.length;
    while(i){
      let index=Math.floor(Math.random()*i--);
      var temp=cards[index];
      cards[index]=cards[i];
      cards[i]=temp;
    }
  }
  shuffle();
  const table=document.getElementById('table');
  for(let i=0;i<suits.length;i++){
    let tr=document.createElement('tr');
    for(let j=0;j<6;j++){
      let td=document.createElement('td');
      let tempCard=cards[i*6+j];
      td.classList.add('card','back');
      td.onclick=flip;
      td.num=tempCard.num;
      td.style.backgroundImage=`url(images/${tempCard.front})`;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  let firstCard=null;
  let flipTimerId=NaN;
  function flip(e){
    let td=e.target;
    console.log(td.classList);

    if(!td.classList.contains('back') || flipTimerId){
      return;
    }
    td.classList.remove('back');
    if(firstCard===null){
      firstCard=td;
    }else{
      if(firstCard.num===td.num){
        console.log(firstCard.num);
        console.log(td.num);
        firstCard=null;
      }else{
        flipTimerId=setTimeout(function(){
          console.log(firstCard.num);
          console.log(td.num);
          firstCard.classList.add('back');
          td.classList.add('back');
          flipTimerId=NaN;
          firstCard=null;
        },1200);
      }
    }
  }

}