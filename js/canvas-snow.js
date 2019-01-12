var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
//變數
let snowNumber = 1000,
    snows = [];

//----設定畫布----
let screenW ;
let screenH ;
function render() {
      //抓視窗/body大小
      screenW = $('.content').width()
      screenH = $('.content').height()
      // 設置canvas
      canvas.setAttribute('width', screenW); //setAttribute():如果此屬性已存在，則僅設定or更改值
      canvas.setAttribute('height', screenH);
      
      canvas.width = screenW;
      canvas.height = screenH;
      window.addEventListener('resize', render); //addEventListener("event", function)
  }

//----snow前置作業----因為與typing.js的window.onload相沖，所以註解掉，整合到html內
// window.onload = function (){
//   render();
  
//   for( var i = 0; i < snowNumber ; i++){
//     let x = Math.round(Math.random() * screenW)  //在畫面中隨意的x位置,Math.round四捨五入整數.小數點後一位
//     let y = Math.round(Math.random() * screenH)
//     let r = 1 + Math.random() *4  //設定隨機圓半徑
//     let opacity = Math.random()

//     let snow = new Snow(x,y,r,opacity)  //建立snow(變數屬性) 
//     snows.push(snow) //一堆snow丟進去snows陣列
//   }
//   setInterval(draw, 30);
// }

//----建構snow----
function Snow(x,y,r,opacity){
  this.x = parseInt(x);
  this.y = parseInt(y);
  this.r = parseInt(r);
  this.opacity = opacity;
  this.factor = 1;  //opacity正負條件
  this.increment = Math.random() * 0.03;  //opacity緩慢增加的值
}

//----繪製snow----
Snow.prototype.draw = function(ctx){
  ctx.save();
  ctx.translate(this.x, this.y);
  
  if (this.opacity > 1) {
    this.factor = -1;
  }else if( this.opacity <= 0){
    this.factor = 1;
    this.x = Math.round(Math.random() * screenW);
    this.y = Math.round(Math.random() * screenH);
  }
  this.opacity += this.increment * this.factor;
  
  ctx.beginPath()  //開始畫圓
  ctx.arc(this.x,this.y,this.r,0,360)  //(中心點x,中心點y,半徑,起始點,結束點)
  ctx.fillStyle = 'rgba( 168,190,218,' + this.opacity + ')'
  ctx.fill()
  ctx.restore()
}

//----snow印在畫布上----
function draw() {
     ctx.clearRect(0, 0, screenW, screenH);
     for (let i = 0; i < snows.length; i++) {
          snows[i].draw(ctx);
     }
  }





