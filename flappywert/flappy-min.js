bg=document.getElementById("bg");H=bg.clientHeight;W=bg.clientWidth;G=H/240;UP=H/35;SPEED_WALL=W/80;GAP=H/3;WERT_SIZE=GAP/3;WALL_WIDTH=WERT_SIZE;fg=document.getElementById("fg");fg.style.width=W+"px";fg.style.height=H+"px";score=document.getElementById("score");running=true;var txt=["","RECORTES","CATALUNYA","GOYA","ERASMUS","BECAS","FUGA CEREBROS","CEDRO","INTERNET","CEDRO","ENLACES",""];function Wert(a,b){this.div=document.getElementById("wert");this.face=document.getElementById("face");this.wings=document.getElementById("wings");this.maxY=a;this.maxX=b;this.x=b/3;this.y=a/3;this.speedY=0;this.div.style.width=(WERT_SIZE+10)+"px";this.div.style.height=(WERT_SIZE+10)+"px";this.numPass=0;this.speedX=0;this.limitX=this.x;this.lives=1;this.flap=1;this.div.style.left=this.x+"px";this.face.src="wert.png";this.setPos=function(c){this.y=c;this.div.style.top=c+"px"};this.moveDown=function(){if(this.speedY>0){this.div.className="rotdown"}this.y+=this.speedY;this.div.style.top=this.y+"px";this.speedY+=G;if(this.y+WERT_SIZE>=this.maxY){this.y=this.maxY-WERT_SIZE;this.speedY=-UP/2}this.x+=this.speedX;if(this.x>this.limitX){this.x=this.limitX;this.speedX=0;this.div.style.left=this.x+"px"}if(this.x<this.limitX){this.speedX+=G;this.div.style.left=this.x+"px"}this.moveWings()};this.moveUp=function(){this.div.className="rotup";this.speedY=-UP;this.moveDown()};this.hitLeft=function(){this.lives-=1;this.face.src="wert_golpe.png";this.speedX=-1.5*UP};this.hitUp=function(){this.lives-=1;this.face.src="wert_golpe.png";this.speedY=UP/4};this.hitDown=function(){this.lives-=1;this.face.src="wert_golpe.png";this.speedY=-UP/2};this.moveWings=function(){if(this.speedY>=UP/2&&this.flap==4){this.wings.src="wing4.png"}else{this.flap=this.flap%6+1;if(this.flap>4){flap=8-this.flap;this.wings.src="wing"+flap+".png"}else{this.wings.src="wing"+this.flap+".png"}}}}function Wall(b,a){this.x=b;this.gapTop=Math.random()*H;this.div=document.getElementById(a);this.div.style.height=H+"px";this.div.style.left=b+"px";this.wallUp=this.div.childNodes[0];this.wallDown=this.div.childNodes[1];this.width=WALL_WIDTH;this.renew=function(c){this.x=c;this.div.style.left=c+"px";this.div.style.width=this.width+"px";this.gapTop=0.5*GAP+Math.random()*(H-2*GAP);this.wallUp.style.height=this.gapTop+"px";this.wallUp.style.marginBottom=GAP+"px";this.wallDown.style.height=(H-GAP-this.gapTop)+"px";idx=Math.floor(Math.random()*(txt.length-1));mytxt="<span>"+txt[idx].split("").join("<br/>")+"</span>";this.wallUp.innerHTML=mytxt;this.wallDown.innerHTML=mytxt};this.setPos=function(c){this.x=c;this.div.style.left=c+"px"};this.moveLeft=function(){this.x-=SPEED_WALL;this.div.style.left=this.x+"px"};this.checkCrash=function(c){if((this.x+this.width)<=c.x){if(this.x+this.width+SPEED_WALL>c.x){c.numPass+=1;score.textContent=""+c.numPass}return false}if(c.x+WERT_SIZE+10<=this.x){return false}if(c.y>=this.gapTop&&(c.y+WERT_SIZE)<=this.gapTop+GAP){return false}if(c.x<=(this.x-WERT_SIZE/2)){c.x=this.x-WERT_SIZE;c.hitLeft()}else{if(c.y<this.gapTop){c.hitUp();c.y=this.gapTop}else{c.hitDown();c.y=this.gapTop+GAP-WERT_SIZE}}return true}}var wert;var walls;var intervalId;function startGame(){running=true;wert=new Wert(H,W);score.textContent=""+wert.numPass;wall1=new Wall(W,"wall1");wall2=new Wall(W,"wall2");wall3=new Wall(W,"wall3");walls=new Array();walls.push(wall1);walls.push(wall2);walls.push(wall3);var b;var a=W;for(b=0;b<walls.length;b++){walls[b].renew(a+b*W/(walls.length-1))}intervalId=setInterval(loop,70)}function touch(){if(running){wert.moveUp()}}function loop(){wert.moveDown();for(i=0;i<walls.length;i++){if(walls[i].checkCrash(wert)){if(wert.lives<0){running=false;window.clearInterval(intervalId);window.setTimeout(startGame,1500)}}walls[i].moveLeft();if(walls[i].x+walls[i].width<0){walls[i].renew(W+(walls.length-2)*W/(walls.length-1))}}}startGame();