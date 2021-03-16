enchant();

var BGM = document.createElement("audio");
BGM.addEventListener("ended",function(e){
  BGM.currentTime = BGM.id*1;
  BGM.play();
});

function rand(n){
  return Math.floor(Math.random() * (n));
}

function iro(){
  var Values = [
    ["red","あか"],
    ["blue","あお"],
    ["black","くろ"],
    ["yellow","きいろ"]
  ];
  var aaa = rand(Values.length);
  var Values2 = [];
  var k = 0;
  for (var i = 0; i < Values.length; i++) {
    if(i != aaa){
      Values2[k] = Values[i];
      k++;
    }
  }
  var bbb = rand(Values2.length);
  return([Values[aaa][1],Values2[bbb][0]]);
}

function Game_load(width,height){

  var Setting_Flag = {
    人物ページ:0,
    アイテムページ:0,
    BGM音量:5,
    音声音量:5,
    効果音音量:5,
    自由:"自由",
    名前:"名前",
    苗字:"苗字",
    性別:"未設定",
    一人称:"一人称",
    二人称:"二人称",
    オートセーブ:true,
    演出スキップ:false,
    シーンナンバー:"スタート"
  };

  var game = new Game(width,height);
  game.fps = 100;
  game.onload = function(){
    var Start_Menu_Scene = function(){
      var scene = new Scene();

      function Buttons(x,y,w,h,v,i){
        Button[i] = new Entity();
        Button[i].moveTo(x,y);
        Button[i].width = w;
        Button[i].height = h;
        Button[i]._element = document.createElement("input");
        Button[i]._element.type = "submit";
        Button[i]._element.value = v;
        Button[i].backgroundColor = "buttonface";
        Button[i]._element.onclick = function(e){
          switch(i){
            case 0:
              game.replaceScene(Brain_Training_Scene(0));
              return;
              break;
            case 1:
              game.replaceScene(Start_Menu_Scene());
              return;
              break;
            case 2:
              game.replaceScene(Start_Menu_Scene());
              return;
              break;
            case 3:
              game.replaceScene(Start_Menu_Scene());
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
    var Brain_Training_Scene = function(Type){

      switch(Type){
        case 0:
          var scene = new Scene();                                // 新しいシーンを作る

          var T_I = "red";
          var S_T = 0;
          var Numbers = 60;
          var Start_text = "ルール:              ";
          Start_text += "文字の色をタッチしよう。      ";
          Start_text += "時間内の正解数から不正回数を    ";
          Start_text += "引いた数を競います。　　 　  　　";
          Start_text += "上級は色か文字かを　　　　    　";
          Start_text += "タッチする指示が出て　　　   　　";
          Start_text += "連続正解した分ポイントになります。 ";
          Start_text += "不正解は-10ポイントです。";

          function Texts(a){
            if(i%18==0) Numbers += 24;
            Text[i] = new Sprite();
            Text[i]._element = document.createElement("innerHTML");
            Text[i]._style.font  = "24px monospace";
            Text[i]._element.textContent = a;
            Text[i].x = 24 * (i%18);
            Text[i].y = Numbers;
            scene.addChild(Text[i]);
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
            Button[i]._element.onclick = function(e){
              switch(i){
                case 0:
                  game.replaceScene(Brain_Training_Scene(1));
                  return;
                  break;
                case 1:
                  game.replaceScene(Brain_Training_Scene(2));
                  return;
                  break;
              }
              return;
            };
            scene.addChild(Button[i]);
          }

          for (var i = 0; i < Start_text.length; i++) {
            Texts(Start_text[i]);
          }

          var Button = [];

          Buttons(width/4,Numbers+60,width/2,height/10,"ゲームスタート",0);
          Buttons(width/4,Numbers+180,width/2,height/10,"上級ゲームスタート",1);

          Text[21].addEventListener("enterframe",function(){
            S_T++;
            if(S_T%10!=0) return;
            switch (T_I) {
              case "red":
                T_I = "blue";
                break;
              case "blue":
               T_I = "yellow";
               break;
              case "yellow":
                 T_I = "red";
                 break;
              default:
                T_I = "black";
                break;
            }
            this._style.color = T_I;
          })

          return scene;
          break;
        case 1:
        case 2:
          var scene = new Scene();                                // 新しいシーンを作る

          if(Type==1) var Difficulty = false;
          else var Difficulty = true;

          var Time = 1000;
          var iros = iro();
          var seikai = null;

          var Label1 = new Label();
          Label1.font  = "90px monospace";
          Label1.y = 150;
          Label1.width = 300;
          Label1.height = 300;
          Label1.text = iros[0];
          Label1.color = iros[1];
          Label1.x = width/2 - Label1.text.length * 45;
          scene.addChild(Label1);

          var Label2 = new Label();
          Label2.font  = "20px monospace";
          Label2.x = 0;
          Label2.y = 150;
          Label2.width = 600;
          Label2.height = 20;
          Label2.text = "ポイント:0";
          scene.addChild(Label2);

          var Label3 = new Label();
          Label3.font  = "20px monospace";
          Label3.x = 0;
          Label3.y = 180;
          Label3.width = 600;
          Label3.height = 20;
          Label3.text = "残り時間:" + Time;
          scene.addChild(Label3);

          var P_P = 1;

          if(Difficulty){

            var Touch = rand(2);
            if(Touch==0) Touch = "色";
            if(Touch==1) Touch = "字";

            var Label4 = new Label();
            Label4.font  = "40px monospace";
            Label4.x = 250;
            Label4.y = 100;
            Label4.width = 300;
            Label4.height = 300;
            Label4.text = Touch + "をタッチ！";
            scene.addChild(Label4);
          }

          if(Difficulty){
            ddd();
            if(Touch=="字") seikai = iros[0];
            else seikai = iros[1];
          }
          else seikai = iros[1];

          switch (seikai) {
            case "red":
            case "あか":
              seikai = "赤";
              break;
            case "くろ":
            case "black":
              seikai = "黒";
              break;
            case "あお":
            case "blue":
              seikai = "青";
              break;
            case "きいろ":
            case "yellow":
              seikai = "黄色";
              break;
            default:
              console.log(seikai);
              break;
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
            Button[i]._element.onclick = function(e){
              switch(i){
                case 0:
                  if(seikai=="赤") View(true);
                  else View(false);
                  return;
                  break;
                case 1:
                  if(seikai=="黒") View(true);
                  else View(false);
                  return;
                  break;
                case 2:
                  if(seikai=="青") View(true);
                  else View(false);
                  return;
                  break;
                case 3:
                  if(seikai=="黄") View(true);
                  else View(false);
                  return;
                  break;
              }
              return;
            };
            scene.addChild(Button[i]);
          }

          var Button = [];

          Buttons(0,500,150,150,"赤",0);
          Buttons(150,500,150,100,"黒",1);
          Buttons(300,500,150,150,"青",2);
          Buttons(450,500,150,150,"黄",3);
          Buttons(450,50,50,100,"中断",4);


          var Judgment = new Label();
          Judgment.font  = "20px monospace";
          Judgment.x = 0;
          Judgment.y = 0;
          Judgment.width = 20;
          Judgment.height = 20;
          Judgment.text = "";
          scene.addChild(Judgment);

          var Point = 0;

          function View(aaaa){
            if(aaaa){
              Point += P_P;
              if(Difficulty) P_P++;
              Judgment.text = "○";
            }
            else{
              if(Difficulty) Point -= 10;
              else Point --;
              if(Point<0) Point = 0;
              P_P = 1;
              Judgment.text = "×";
            }
            var old_iros1 = iros[0]
            var old_iros2 = iros[1];
            iros = iro();
            while (old_iros1==iros[0] && old_iros2==iros[1]) {
              iros = iro();
            }
            Label2.text = "ポイント:" + Point;
            Label1.text = iros[0];
            Label1.color = iros[1];
            Label1.x = width/2 - Label1.text.length * 45;
            if(Difficulty){
              ddd();
              if(Touch=="字") seikai = iros[0];
              else seikai = iros[1];
            }
            else seikai = iros[1];

            switch (seikai) {
              case "red":
              case "あか":
                seikai = "赤";
                break;
              case "くろ":
              case "black":
                seikai = "黒";
                break;
              case "あお":
              case "blue":
                seikai = "青";
                break;
              case "きいろ":
              case "yellow":
                seikai = "黄色";
                break;
              default:
                console.log(seikai);
                break;
            }
            return;
          }

          function ddd(){
              Touch = rand(2);
              if(Touch==0) Touch = "色";
              if(Touch==1) Touch = "字";
              Label4.text = Touch + "をタッチ！";
          }

          Label3.addEventListener("enterframe",function(){
            Time--;
            if(Time==0) core.replaceScene(ENDScene(Point,Difficulty,Name));
            Label3.text = "残り時間:" + Time;
          })

          Label5.addEventListener("touchstart",function(){
            core.pushScene(StopScene(Point,Difficulty,Name));
            return;
          })

          return scene;
          break;
      }

    };
    var ID = window.localStorage.getItem("ID");
    if(!ID){
      var Codes = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
      "1","2","3","4","5","6","7","8","9"];
      ID = "";
      for (var i = 0; i < 10; i++) {
        ID += Codes[rand(Codes.length)];
      }
      window.localStorage.setItem("ID",ID);
    }
    game.replaceScene(Start_Menu_Scene());
  }
  game.start();
}
