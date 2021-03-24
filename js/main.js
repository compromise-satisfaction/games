enchant();

function Game_load(width,height){

  var game = new Game(width,height);
  game.fps = 100;
  game.onload = function(){

    var Start_Menu_Scene = function(){
      var scene = new Scene();

      var Background = new Sprite();
      Background._element = document.createElement("img");
      Background._element.src = "../image/メニュー背景.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      function zyunbi(i){
        switch (Button[i]._element.value) {
          case "準備中":
            Button[i]._element.value = "準備中 もうちょっと待ってね";
            break;
          case "準備中 もうちょっと待ってね":
            Button[i]._element.value = "待ってってば！";
            break;
          case "待ってってば！":
            Button[i]._element.value = "しつこいですね…";
            break;
          case "…":
          case "しつこいですね…":
            Button[i]._element.value = "…";
            break;
          default:
            Button[i]._element.value = "準備中";
            break;
        }
        return
      }

      function Buttons(x,y,w,h,v,i){
        Button[i] = new Entity();
        Button[i].moveTo(x,y);
        Button[i].width = w;
        Button[i].height = h;
        Button[i]._element = document.createElement("input");
        Button[i]._element.type = "submit";
        Button[i]._element.value = v;
        Button[i].backgroundColor = "buttonface";
        //Button[i]._element.font.size = "30px";
        Button[i]._element.onclick = function(e){
          switch(i){
            case 0:
              game.fps = 30;
              game.replaceScene(Brain_Training_Scene("メニュー"));
              return;
              break;
            case 1:
            case 2:
              zyunbi(i);
              return;
              break;
            case 3:
            game.fps = 100;
            game.pushScene(Loading_Scene("読み込み"));
            fetch
            (
              "https://script.google.com/macros/s/AKfycbwbxBARHidLzHA52cznZ2VI_x9hdNtW2RHnk5bV_dm1QU7A2eI/exec",
              {
                method: "POST"
              }
            ).then(res => res.json()).then(result => {
               Game_Datas = result;
               SE = [];
               var SE_Number = 0;
               for (var i = 0; i < result.length; i++) {
                 if(result[i].Data.match(/\(音:.+?\)/)){
                   result[i].Data = result[i].Data.substring(3,result[i].Data.length-1);
                   SE[SE_Number] = document.createElement("audio");
                   SE[SE_Number].src = result[i].Data.split(",")[0];
                   SE[SE_Number].type = result[i].Data.split(",")[1];
                   SE[SE_Number].title = result[i].Number;
                   SE_Number++;
                 }
               }
               game.popScene();
               game.replaceScene(Novel_MainScene("(ボタン:スタート,0,0,405,600,スタート)"));
               return;
              },);
              return;
              break;
          }
          return;
        };
        scene.addChild(Button[i]);
      }

      var Button = [];

      Buttons(width/4,60,width/2,height/10,"脳トレ",0);
      Buttons(width/4,180,width/2,height/10,"リバーシ",1);
      Buttons(width/4,300,width/2,height/10,"ブロック崩し",2);
      Buttons(width/4,420,width/2,height/10,"ノベルゲーム",3);

      return scene;
    };
    game.replaceScene(Start_Menu_Scene());

  }
  game.start();
}
