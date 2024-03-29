enchant();

if(window.localStorage.getItem("ID")){
  var ID = window.localStorage.getItem("ID");
  var BGM_volume = window.localStorage.getItem("BGM_volume");
  var Voice_volume = window.localStorage.getItem("Voice_volume");
  var Sound_effect_volume = window.localStorage.getItem("Sound_effect_volume");
  var Spread_sheet_ID = window.localStorage.getItem("Spread_sheet_ID");
}
else{
  window.localStorage.clear();
  var Codes = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "1","2","3","4","5","6","7","8","9"];
  var ID = "";
  for (var i = 0; i < 10; i++) {
    ID += Codes[rand(Codes.length)];
  }
  var BGM_volume = 5;
  var Voice_volume = 5;
  var Sound_effect_volume = 5;
  var Spread_sheet_ID = "";
  window.localStorage.setItem("ID",ID);
  window.localStorage.setItem("BGM_volume",BGM_volume);
  window.localStorage.setItem("Voice_volume",Voice_volume);
  window.localStorage.setItem("Sound_effect_volume",Sound_effect_volume);
  window.localStorage.setItem("Spread_sheet_ID",Spread_sheet_ID);
}
console.log(ID);

var BGM = document.createElement("audio");
BGM.addEventListener("ended",function(e){
  BGM.currentTime = BGM.id*1;
  BGM.play();
});
var BGM_Change = 0;
var BGM_Volume = 0;

function Game_load(width,height){

  var Use = null;
  var Update = 1;
  var Flag = [];
  var Flag1 = [];
  var Flag2 = [];
  var Flag3 = [];
  var Flag4 = [];
  var Flag5 = [];
  var Flag6 = [];
  var Flag7 = [];
  var Flag8 = [];
  var Flag_Number = [];
  var Save_Datas = {
    シーンナンバー1:"スタート",
    シーンナンバー2:"スタート",
    シーンナンバー3:"スタート",
    シーンナンバー4:"スタート",
    シーンナンバー5:"スタート",
    シーンナンバー6:"スタート",
    シーンナンバー7:"スタート",
    シーンナンバー8:"スタート"
  };
  function rand(n){
    return Math.floor(Math.random() * (n));
  }
  function Sound_branch(a){
      if(a=="無し") return;
      for (var i = 0; i < SE.length; i++) {
        if(SE[i].title == a) break;
      }
      switch(SE[i].type){
        case "音声":
          var Volume = Voice_volume;
          break;
        case "効果音":
          var Volume = Sound_effect_volume;
          break;
        default:
          var Volume = BGM_volume;
          break;
      }
      if(Volume){
        Volume /= 10;
        SE[i].volume = Volume;
        if(SE[i].paused) SE[i].play();
        else SE[i].currentTime = 0;
      }
      else{
        if(SE[i].paused==false) SE[i].pause();
        SE[i].currentTime = 0;
      }
      return;
    }
  function BGM_ON(BGM_Name){
      switch(BGM_Name){
        case "無し":
          if(BGM.paused==false) BGM.pause();
          BGM.title = BGM_Name;
          break;
        case "オン":
          BGM_Volume = 0;
          BGM_Change = 0.005;
          break;
        case "消音":
          BGM_Change = - 0.005;
          BGM_Volume = BGM_volume/10;
          break;
        default:
          if(BGM.title == BGM_Name && BGM.paused == false) return;
          if(BGM.paused==false) BGM.pause();
          for (var i = 0; i < SE.length; i++) {
            if(SE[i].title == BGM_Name) break;
          }
          BGM.src = SE[i].src;
          BGM.currentTime = 0;
          BGM.volume = BGM_volume/10;
          BGM.play();
          BGM.title = BGM_Name;
          BGM.id = SE[i].type;
          break;
      }
      return;
    }

  var game = new Game(width,height);
  game.fps = 100;
  game.preload("../image/白.png");
  game.preload("../image/Main.png");
  game.preload("../image/Hand.png");
  game.preload("../image/stone.png");
  game.preload("../image/V_or_D.png");
  game.preload("../image/Number.png");
  game.preload("../image/Number青.png");
  game.preload("../image/Number赤.png");
  game.preload("../image/Number紫.png");
  game.preload("../image/Number緑.png");
  game.preload("../image/Reversi.png");
  game.preload("../image/Set_button.png");
  game.onload = function(){

    var Start_Menu_Scene = function(){
      var scene = new Scene();

      var Background = new Sprite();
      Background._element = document.createElement("img");
      Background._element.src = "../image/メニュー背景.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      var Ui_Button = [];

      function Buttons(x,y,w,h,v,i){
        Ui_Button[i] = new Button(v,"light",w,h);
        Ui_Button[i].moveTo(x,y);
        Ui_Button[i]._style["font-size"] = h/2.2;
        Ui_Button[i].addEventListener("touchend",function(e){
          switch(i){
            case 0:
              game.fps = 30;
              game.replaceScene(Brain_Training_Scene("メニュー"));
              return;
              break;
            case 1:
              game.fps = 10;
              game.replaceScene(R_Main_Scene());
              return;
            case 2:
              game.fps = 100;
              game.replaceScene(S_Main_Scene());
              return;
            case 3:
              game.fps = 100;
              game.pushScene(Novel_Game_load_Scene());
              return;
              break;
            case 4:
              window.localStorage.clear();
              break;
          }
          return;
        });
        scene.addChild(Ui_Button[i]);
      }

      Buttons(width/4,60,width/2,height/10,"脳トレ",0);
      Buttons(width/4,180,width/2,height/10,"リバーシ",1);
      Buttons(width/4,300,width/2,height/10,"数独解答",2);
      Buttons(width/4,420,width/2,height/10,"線つなぎ",5);
      Buttons(width/4,540,width/2,height/20,"データ消去",4);

      return scene;
    };
    var Brain_Training_Scene = function(Type,Difficulty,Point){

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

      var Ui_Button = [];

      function Buttons(x,y,w,h,v,i){
          Ui_Button[i] = new Button(v,"light",w,h);
          Ui_Button[i].moveTo(x,y);
          Ui_Button[i]._style["font-size"] = w/(v.length+2);
          Ui_Button[i].addEventListener("touchend",function(e){
          switch(i){
            case 0:
              game.replaceScene(Brain_Training_Scene("メイン",false));
              game.pushScene(Brain_Training_Scene("COUNTDOWN"));
              return;
              break;
            case 1:
              game.replaceScene(Brain_Training_Scene("メイン",true));
              game.pushScene(Brain_Training_Scene("COUNTDOWN"));
              return;
              break;
            case 2:
              if(seikai=="赤") View(true);
              else View(false);
              return;
              break;
            case 3:
              if(seikai=="黒") View(true);
              else View(false);
              return;
              break;
            case 4:
              if(seikai=="青") View(true);
              else View(false);
              return;
              break;
            case 5:
              if(seikai=="黄") View(true);
              else View(false);
              return;
              break;
            case 6:
              game.pushScene(Brain_Training_Scene("STOP",Difficulty,Point));
              return;
              break;
            case 7:
              game.replaceScene(Brain_Training_Scene("COUNTDOWN"));
              return;
            case 8:
              game.popScene();
              game.replaceScene(Brain_Training_Scene("END",Difficulty,Point));
              return;
              break;
            case 9:
            case 10:
              game.replaceScene(Brain_Training_Scene("ランキング",Difficulty,Point-1));
              break;
            case 11:
            case 12:
              game.replaceScene(Brain_Training_Scene("ランキング",Difficulty,Point+1));
              break;
            case 13:
              game.popScene();
              return;
              break;
          }
          return;
        });
        scene.addChild(Ui_Button[i]);
      }

      switch(Type){
        case "メニュー":
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

          for (var i = 0; i < Start_text.length; i++) {
            Texts(Start_text[i]);
          }

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
        case "メイン":
          var scene = new Scene();                                // 新しいシーンを作る

          var Time = 1000;
          var iros = iro();
          var seikai = null;

          var Label1 = new Label();
          Label1.font = "90px monospace";
          Label1.y = 250;
          Label1.width = width;
          Label1.height = 300;
          Label1.text = iros[0];
          Label1.color = iros[1];
          Label1.x = width/2 - Label1.text.length * 45;
          scene.addChild(Label1);

          var Label2 = new Label();
          Label2.font  = "20px monospace";
          Label2.x = 0;
          Label2.y = 200;
          Label2.width = 600;
          Label2.height = 20;
          Label2.text = "ポイント:0";
          scene.addChild(Label2);

          var Label3 = new Label();
          Label3.font  = "20px monospace";
          Label3.x = 0;
          Label3.y = 220;
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
            Label4.x = 160;
            Label4.y = 200;
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
              seikai = "黄";
              break;
            default:
              console.log(seikai);
              break;
          }

          Buttons(0,500,width/4,width/4,"赤",2);
          Buttons(width/4,500,width/4,width/4,"黒",3);
          Buttons(width/2,500,width/4,width/4,"青",4);
          Buttons(width/4*3,500,width/4,width/4,"黄",5);
          Buttons(width/4*3,50,width/4,width/4,"中断",6);


          var Judgment = new Label();
          Judgment.font  = "100px monospace";
          Judgment.x = 0;
          Judgment.y = 50;
          Judgment.text = "";
          scene.addChild(Judgment);

          var Point = 0;

          function View(aaaa){
            if(aaaa){
              Point += P_P;
              if(Difficulty) P_P++;
              Judgment.color = "red";
              Judgment.text = "○";
            }
            else{
              if(Difficulty) Point -= 10;
              else Point --;
              if(Point<0) Point = 0;
              P_P = 1;
              Judgment.color = "blue";
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
                seikai = "黄";
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
            Label3.text = "残り時間:" + Time;
            if(Time==0) game.replaceScene(Brain_Training_Scene("END",Difficulty,Point));
          })

          return scene;
          break;
        case "END":

          var Name = window.localStorage.getItem("Name");
          if(!Name) Name = "ニックネーム";

          var scene = new Scene();                                // 新しいシーンを作る

          var Label1 = new Label();
          Label1.font  = "30px monospace";
          Label1.x = width/4;
          Label1.y = 50;
          Label1.text = Point + "ポイント獲得！";
          scene.addChild(Label1);

          var S_Input1 = new Entity();
          S_Input1.moveTo(width/4,100);
          S_Input1.width = width/2;
          S_Input1.height = 30;
          S_Input1._element = document.createElement('input');
          S_Input1._element.type = "text";
          S_Input1._element.name = "myText";
          S_Input1._element.value = Name;
          S_Input1._element.placeholder = "ニックネームを入力";
          scene.addChild(S_Input1);

          var S_Input2 = new Button("","light",width/2,30);
          S_Input2.moveTo(width/4,150);
          scene.addChild(S_Input2);

          var S_Input3 = new Button("ポイントコード発行","light",width/2,30);
          S_Input3.moveTo(width/4,200);
          if(Point>0) scene.addChild(S_Input3);

          var S_Input4 = new Entity();
          S_Input4.moveTo(width/4,250);
          S_Input4.width = width/2;
          S_Input4.height = 30;
          S_Input4._element = document.createElement('input');
          S_Input4._element.type = "text";
          S_Input4._element.name = "myText";
          S_Input4._element.placeholder = "ワンタイムパスワード";

          var S_Input5 = new Button("もう一度","light",width/2,30);
          S_Input5.moveTo(width/4,300);
          scene.addChild(S_Input5);

          var S_Input6 = new Button("メニューに戻る","light",width/2,30);
          S_Input6.moveTo(width/4,350);
          scene.addChild(S_Input6);

          var S_Input7 = new Button("ランキングを見る","light",width/2,30);
          S_Input7.moveTo(width/4,400);
          if(Point>0){
            S_Input2.text = "ランキング登録";
            scene.addChild(S_Input7);
          }
          else S_Input2.text = "ランキングを見る";

          var hakkou = false;
          var Code = "";
          if(HTML=="Tanakake"){
            if(Difficulty) var Rank = "田植";
            else var Rank = "田中";
          }
          else{
            if(Difficulty) var Rank = "上級";
            else var Rank = "通常";
          }

          S_Input2.addEventListener("touchend",function(e){
            if(S_Input1._element.value.length>6){
              Label1.text = "名前は六文字以下です。";
              return;
            }
            Name = S_Input1._element.value;
            window.localStorage.setItem("Name",Name);
            if(this.text == "ランキングを見る"){
              game.pushScene(Loading_Scene("読み込み"));
              fetch
              (
                "https://script.google.com/macros/s/AKfycbxmC5AscixoTM6P1eAPeQwQrNn-vbP_B8Aovhant0tDl8r2_C0/exec",
                {
                  method: "POST",
                  body: Rank + "ランキングデータロード"
                }
              ).then(res => res.json()).then(result => {
                 game.replaceScene(Brain_Training_Scene("ランキング",result,0));
                 return;
                },);
                return;
            }
            game.pushScene(Loading_Scene("保存"));
            fetch
            (
              "https://script.google.com/macros/s/AKfycbxmC5AscixoTM6P1eAPeQwQrNn-vbP_B8Aovhant0tDl8r2_C0/exec",
              {
                method: 'POST',
                body: Rank + Point + "(改行)" + Name + "(改行)" + ID
              }
            ).then(res => res.json()).then(result => {
               game.popScene();
               this.text = "ランキングを見る";
               scene.removeChild(S_Input7);
               return;
              },);
            return;
          });

          S_Input3.addEventListener("touchend",function(e){
            if(hakkou){
              S_Input4._element.value = Code;
              return;
            }

            var Codes = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
            "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
            "1","2","3","4","5","6","7","8","9"];

            for (var i = 0; i < 12; i++) {
              Code += Codes[rand(Codes.length)];
            }

            S_Input4._element.value = Code;
            scene.addChild(S_Input4);
            hakkou = true;
            fetch
            (
              "https://script.google.com/macros/s/AKfycbxmC5AscixoTM6P1eAPeQwQrNn-vbP_B8Aovhant0tDl8r2_C0/exec",
              {
                method: 'POST',
                body: "発行" + Code + Point
              }
            )
            return;
          });

          S_Input5.addEventListener("touchend",function(e){
            game.replaceScene(Brain_Training_Scene("メイン",Difficulty));
            game.pushScene(Brain_Training_Scene("COUNTDOWN"));
            return;
          });

          S_Input6.addEventListener("touchend",function(e){
            game.replaceScene(Start_Menu_Scene());
            return;
          });

          S_Input7.addEventListener("touchend",function(e){
            game.pushScene(Loading_Scene("読み込み"));
            fetch
            (
              "https://script.google.com/macros/s/AKfycbxmC5AscixoTM6P1eAPeQwQrNn-vbP_B8Aovhant0tDl8r2_C0/exec",
              {
                method: "POST",
                body: Rank + "ランキングデータロード"
              }
            ).then(res => res.json()).then(result => {
               game.replaceScene(Brain_Training_Scene("ランキング",result,0));
               return;
              },);
            return;
          });

          return scene;
          break;
        case "STOP":
          var scene = new Scene();                                // 新しいシーンを作る

          var Background = new Sprite();
          Background._element = document.createElement("img");
          Background._element.src = "../image/半透明黒.png";
          Background.x = 0;
          Background.y = 0;
          Background.width = width;
          Background.height = height;
          scene.addChild(Background);

          Buttons((width-300)/2,150,300,100,"続ける",7);
          Buttons((width-300)/2,300,300,100,"やめる",8);

          return scene;
          break;
        case "COUNTDOWN":
          var scene = new Scene();                                // 新しいシーンを作る

          var Background = new Sprite();
          Background._element = document.createElement("img");
          Background._element.src = "../image/半透明黒.png";
          Background.width = width;
          Background.height = height;
          scene.addChild(Background);

          var COUNTDOWN_Button = new Button("四","light",100,100);
          COUNTDOWN_Button.moveTo((width-100)/2,(height-100)/2);
          COUNTDOWN_Button._style["font-size"] = 20;
          scene.addChild(COUNTDOWN_Button);

          var Meter = new Sprite();
          Meter._element = document.createElement("img");
          Meter._element.src = "../image/透明.png";
          Meter.y = (height - width) / 2;
          Meter.width = width;
          Meter.height = width;
          scene.addChild(Meter);

          game.fps = 1;

          COUNTDOWN_Button.addEventListener("enterframe",function(){
            switch (COUNTDOWN_Button.text) {
              case "四":
                Meter._element.src = "../image/メーター.gif";
                COUNTDOWN_Button.text = "三";
                break;
              case "三":
                COUNTDOWN_Button.text = "二";
                break;
              case "二":
                COUNTDOWN_Button.text = "一";
                break;
              case "一":
                COUNTDOWN_Button._style["font-size"] = 10;
                COUNTDOWN_Button.text = "スタート！";
                scene.removeChild(Meter);
                break;
              case "スタート！":
                game.popScene();
                game.fps = 30;
                break;
            }
          })

          return scene;
          break;
        case "ランキング":
          var scene = new Scene();                                // 新しいシーンを作る

          var Background = new Sprite();
          Background._element = document.createElement("img");
          Background._element.src = "../image/メニュー背景.png";
          Background.width = width;
          Background.height = height;
          scene.addChild(Background);

          Buttons(20,420,80,80,"↑",9);
          Buttons(305,420,80,80,"↑",10);
          Buttons(20,500,80,80,"↓",11);
          Buttons(305,500,80,80,"↓",12);
          Buttons(100,420,205,160,"戻る",13);

          if(Point <= 0){
            scene.removeChild(Ui_Button[9]);
            scene.removeChild(Ui_Button[10]);
          }

          if(Difficulty.length <= Point + 10){
            scene.removeChild(Ui_Button[11]);
            scene.removeChild(Ui_Button[12]);
          }

          var Numbers = 40;

          function R_Texts(a,b){
            R_Text[i] = new Sprite();
            R_Text[i]._element = document.createElement("innerHTML");
            R_Text[i]._style.font  = "20px monospace";
            R_Text[i]._element.textContent = a;
            R_Text[i].x = b;
            R_Text[i].y = Numbers;
            scene.addChild(R_Text[i]);
          }

          var Result = [];
          var k = 0;
          var R_X = null;
          var R_Text = [];

          for (var i = Point; i < Point + 10; i++) {
            if(Difficulty.length <= i) break;
            Result[k] = Difficulty[i];
            k++;
          }

          for (var i = 0; i < Result.length; i++) {
            R_X = 40;
            if(Result[i].順位 < 10) R_X += 10;
            if(Result[i].順位 < 100) R_X += 10;
            if(Result[i].順位 < 1000) R_X += 10;
            if(Result[i].順位 < 10000) R_X += 10;
            if(Result[i].順位 < 100000) R_X += 10;
            R_Texts(Result[i].順位+"位",R_X);
            R_X = 130;
            if(Result[i].ポイント < 10) R_X += 10;
            if(Result[i].ポイント < 100) R_X += 10;
            if(Result[i].ポイント < 1000) R_X += 10;
            if(Result[i].ポイント < 10000) R_X += 10;
            R_Texts(Result[i].ポイント+"ポイント",R_X);
            R_X = 270;
            R_Texts(Result[i].名前,R_X);
            Numbers += 35;
          }

          return scene;

          break;
      }

    };
    var Novel_Main_Scene = function(Data,SceneNumber){

      var scene = new Scene();                                // 新しいシーンを作る

      if(!Data){
        Data  = "(画像:無し,../image/黒.png,0,0,405,227.8125:画像)(文字情報:20,black,無し,40:文字情報)";
        Data += "(ボタン:戻る,40,350,325,100,無し,保存箇所:ボタン)(名前:"+SceneNumber+":名前)";
        Data += "(待機時間:5:待機時間)シーンデータの中身がありません。";
        SceneNumber = Save_Datas.シーンナンバー;
      }
      console.log(Data);

      var Now = new Date();
      var Year = Now.getFullYear();
      var Month = Now.getMonth()+1;
      var Dates = Now.getDate();
      var Hour = Now.getHours();
      var Minute = Now.getMinutes();
      var Seconds = Now.getSeconds();
      var Day = Now.getDay();
      if(Month<10) Month = "0" + Month;
      if(Dates<10) Dates = "0" + Dates;
      if(Hour<10) Hour = "0" + Hour;
      if(Minute<10) Minute = "0" + Minute;
      if(Seconds<10) Seconds = "0" + Seconds;
      Day = "日月火水木金土"[Day];
      Now = "(文字間隔:10:文字間隔)" + Year + "(文字間隔:20:文字間隔)年(文字間隔:10:文字間隔)";
      Now += Month + "(文字間隔:20:文字間隔)月(文字間隔:10:文字間隔)";
      Now += Dates + "(文字間隔:20:文字間隔)日(文字間隔:10:文字間隔) ((文字間隔:20:文字間隔)" + Day + "(文字間隔:10:文字間隔)) ";
      Now += Hour + "(文字間隔:20:文字間隔)時(文字間隔:10:文字間隔)";
      Now += Minute + "(文字間隔:20:文字間隔)分(文字間隔:10:文字間隔)" + Seconds + "(文字間隔:20:文字間隔)秒";

      Data = Data.replace(/\(変換:現在時間:変換\)/g,Now);
      if(BGM_volume < 10) Data = Data.replace(/\(BGM音量\)/g,"0"+BGM_volume);
      else Data = Data.replace(/\(BGM音量\)/g,BGM_volume);
      if(Voice_volume < 10) Data = Data.replace(/\(音声音量\)/g,"0"+Voice_volume);
      else Data = Data.replace(/\(音声音量\)/g,Voice_volume);
      if(Sound_effect_volume < 10) Data = Data.replace(/\(効果音音量\)/g,"0"+Sound_effect_volume);
      else Data = Data.replace(/\(効果音音量\)/g,Sound_effect_volume);

      console.log(Update);
      if(Update==1) Save_Datas.シーンナンバー = SceneNumber;

      var Flags_small_Display = Data.match(/\(フラグ小表示:.+?:フラグ小表示\)/g);

      if(Flags_small_Display){
        Flags_small_Display = Flags_small_Display[0].substring(8,Flags_small_Display[0].length-8);
        for(var i = 0; i < Flag_Number.length; i++){
          if(Flag_Number[i].split(":")[0]==Flags_small_Display){
            var F_S_N = Flag_Number[i].split(":")[1];
            break;
          }
        }
        var k = 0;
        for (var i = 0; i < Flag.length; i++) {
          if(Flag[i].split(":")[0]==Flags_small_Display){
            if(k==F_S_N) break;
            k++;
          }
        }
        for (var k = 0; k < Game_Datas.length; k++) {
          if(Game_Datas[k].Number==Flag[i].split(":")[1].split("==")[0]) break;
        }
        for (var j = 0; j < Game_Datas.length; j++) {
          if(Game_Datas[j].Number==Game_Datas[k].Data.split(",")[2]) break;
        }
        Use = Flag[i].split("==")[0];
        Data = Data.replace(/\(フラグ小表示:.+?:フラグ小表示\)/g,Game_Datas[j].Data);
      }

      var Image = [];

      function Images(a){
        a = a.split(",");
        Image[i] = new Sprite();
        Image[i]._element = document.createElement("img");
        Image[i]._element.src = "../image/透明.png";
        Image[i].name = a[0];
        Image[i].imageurl = a[1];
        Image[i].x = a[2]*1;
        Image[i].y = a[3]*1;
        Image[i].width = a[4]*1;
        Image[i].height = a[5]*1;
        Image[i].fade = false;
        if(a[6]){
          if(a[6].substring(0,4)=="fade"){
            Image[i].fade = a[6].substring(4);
          }
          else{
            Image[i].addEventListener("touchend",function(e){
              if(Pointer_Button){
                Sound_branch(Pointer_Button.sound);
                if(a[6]=="remove"){
                  Pointer_Button.View = true;
                  scene.removeChild(Pointer_Button);
                }
                else{
                  Pointer_Button.button_sound = a[6];
                  Pointer_Button.シーンナンバー = a[7];
                  Pointer_Button.text = a[8];
                  Pointer_Button._style["font-size"] = a[9];
                  if(Pointer_Button.View){
                    Pointer_Button.View = false;
                    scene.addChild(Pointer_Button);
                  }
                }
              }
              else{
                Sound_branch(a[6]);
                Scene_load(a[7]);
              }
              return;
            });
          }
        }
        return;
      }

      function Map_Images(a){
        a = a.split(",");
        Map_scale = a[1];
        Map_Image_array[i] = new Sprite(a[2]*Map_scale,a[3]*Map_scale);
        Map_Image_array[i]._element = document.createElement("img");
        Map_Image_array[i]._element.src = a[0];
        Map_Image[i] = new Sprite(a[2]*Map_scale,a[3]*Map_scale);
        Map_Image[i].image = Map_Image_array[i];
        Map_Image[i].originX = 0;
        Map_Image[i].originY = 0;
        Map_Image[i].scaleX = 27/Map_scale;
        Map_Image[i].scaleY = 27/Map_scale;
        for (var k = 0; k < Flag.length; k++) {
          if(Flag[k].split("==")[0]=="マップX") Map_Image[i].x = Flag[k].split("==")[1]*-27;
          if(Flag[k].split("==")[0]=="マップY") Map_Image[i].y = Flag[k].split("==")[1]*-27;
        }
        return;
      }

      var Map_Image = [];
      var Map_Image_array = [];

      var Map_Images_Data = Data.match(/\(マップ画像:.+?:マップ画像\)/g);

      if(Map_Images_Data){
        var Map_Image_Number = 0;
        for (var i = 0; i < Map_Images_Data.length; i++) {
          Map_Images_Data[i] = Map_Images_Data[i].substring(7,Map_Images_Data[i].length-7);
          Map_Images(Map_Images_Data[i]);
        }
        Data = Data.replace(/\(マップ画像:.+?:マップ画像\)/g,"(変換:マップ画像)(画像:白背景,../image/白.png,-100,227.8125,605,600:画像)");
      }

      var Videos_Data = Data.match(/\(動画:.+?:動画\)/g);

      if(Videos_Data){
        var Video_Number = 0;
        for (var i = 0; i < Videos_Data.length; i++) {
          Videos_Data[i] = Videos_Data[i].substring(4,Videos_Data[i].length-4);
          Videos_Data[i] = new Sprite(100,100);
          Videos_Data[i] = document.createElement("video");
          Videos_Data[i].src = "../image/透明.png";
          console.log(Videos_Data[i]);
          scene.addChild(Videos_Data[i]);
        }
        Data = Data.replace(/\(動画:.+?:動画\)/g,"");
      }

      var Youtube = [];

      function Youtubes(a){
        a = a.split(",");
        a[0]  = '<iframe src="https://www.youtube.com/embed/' + a[0];
        a[0] += '?enablejsapi=1&controls=0&showinfo=0&autoplay=0&rel=0&vq=small"  width="' + a[3];
        a[0] += '" height="' + a[4];
        a[0] += '" frameborder="0" id="player"></iframe>';
        Youtube[i] = new Entity()
        Youtube[i].visible =  true;
        Youtube[i]._element = document.createElement('div');
        Youtube[i].x = a[1];
        Youtube[i].y = a[2];
        Youtube[i]._element.innerHTML = a[0];
        return;
      }

      var Text_Area = [];
      var Ui_Button = [];
      var Button_fontSize = 15;
      var Button_color = "buttonface";

      function Scene_load(Scene_Name){
        game.input.up = false;
        game.input.down = false;
        game.input.left = false;
        game.input.right = false;
        for (var i = 0; i < Text_Area.length; i++) {
          Flag_get(Text_Area[i]._element.name+"=="+Text_Area[i]._element.value.replace(/,/g,"(変換:カンマ:変換)"))
        }
        var Push = false;
        var Do_Save = false;
        switch(Scene_Name.split("→")[0]){
          case "使用":
            Scene_Name = Save_Datas.シーンナンバー + "で" + Use + "を使用";
            for (var i = 0; i < Game_Datas.length; i++) {
              if(Game_Datas[i].Number==Scene_Name) break;
            }
            if(i==Game_Datas.length) Scene_Name = Save_Datas.シーンナンバー + "で" + Use.split(":")[0] + "を使用";
            for (var i = 0; i < Game_Datas.length; i++) {
              if(Game_Datas[i].Number==Scene_Name) break;
            }
            if(i==Game_Datas.length) Scene_Name = Save_Datas.シーンナンバー +  "でフラグを使用";
            for (var i = 0; i < Game_Datas.length; i++) {
              if(Game_Datas[i].Number==Scene_Name) break;
            }
            if(i==Game_Datas.length) Scene_Name = Use + "を使用";
            for (var i = 0; i < Game_Datas.length; i++) {
              if(Game_Datas[i].Number==Scene_Name) break;
            }
            if(i==Game_Datas.length) Scene_Name = Use.split(":")[0] + "を使用";
            for (var i = 0; i < Game_Datas.length; i++) {
              if(Game_Datas[i].Number==Scene_Name) break;
            }
            if(i==Game_Datas.length) Scene_Name = "フラグを使用";
            break;
          case "popScene":
            Update--;
            game.popScene();
            Scene_Name = Scene_Name.substring(9);
            if(Scene_Name=="") return;
            break;
          case "pushScene":
            Update++;
            Push = true;
            Scene_Name = Scene_Name.substring(10);
            break;
          case "セーブする":
            Do_Save = true;
            switch (Scene_Name.split("→")[1]*1) {
              case 1:
                Flag1 = [];
                for (var i = 0; i < Flag.length; i++) {
                  if(Flag[i].split("==")[0]=="セーブ時間") Flag1[i] = "セーブ時間==" + Now;
                  else Flag1[i] = Flag[i];
                }
                Save_Datas.シーンナンバー1 = Save_Datas.シーンナンバー;
                break;
              case 2:
                Flag2 = [];
                for (var i = 0; i < Flag.length; i++) {
                  if(Flag[i].split("==")[0]=="セーブ時間") Flag2[i] = "セーブ時間==" + Now;
                  else Flag2[i] = Flag[i];
                }
                Save_Datas.シーンナンバー2 = Save_Datas.シーンナンバー;
                break;
              case 3:
                Flag3 = [];
                for (var i = 0; i < Flag.length; i++) {
                  if(Flag[i].split("==")[0]=="セーブ時間") Flag3[i] = "セーブ時間==" + Now;
                  else Flag3[i] = Flag[i];
                }
                Save_Datas.シーンナンバー3 = Save_Datas.シーンナンバー;
                break;
              case 4:
                Flag4 = [];
                for (var i = 0; i < Flag.length; i++) {
                  if(Flag[i].split("==")[0]=="セーブ時間") Flag4[i] = "セーブ時間==" + Now;
                  else Flag4[i] = Flag[i];
                }
                Save_Datas.シーンナンバー4 = Save_Datas.シーンナンバー;
                break;
              case 5:
                Flag5 = [];
                for (var i = 0; i < Flag.length; i++) {
                  if(Flag[i].split("==")[0]=="セーブ時間") Flag5[i] = "セーブ時間==" + Now;
                  else Flag5[i] = Flag[i];
                }
                Save_Datas.シーンナンバー5 = Save_Datas.シーンナンバー;
                break;
              case 6:
                Flag6 = [];
                for (var i = 0; i < Flag.length; i++) {
                  if(Flag[i].split("==")[0]=="セーブ時間") Flag6[i] = "セーブ時間==" + Now;
                  else Flag6[i] = Flag[i];
                }
                Save_Datas.シーンナンバー6 = Save_Datas.シーンナンバー;
                break;
              case 7:
                Flag7 = [];
                for (var i = 0; i < Flag.length; i++) {
                  if(Flag[i].split("==")[0]=="セーブ時間") Flag7[i] = "セーブ時間==" + Now;
                  else Flag7[i] = Flag[i];
                }
                Save_Datas.シーンナンバー7 = Save_Datas.シーンナンバー;
                break;
              case 8:
                Flag8 = [];
                for (var i = 0; i < Flag.length; i++) {
                  if(Flag[i].split("==")[0]=="セーブ時間") Flag8[i] = "セーブ時間==" + Now;
                  else Flag8[i] = Flag[i];
                }
                Save_Datas.シーンナンバー8 = Save_Datas.シーンナンバー;
                break;
            }
            Scene_Name = Scene_Name.split("→")[2];
            break;
          case "セーブ読み込み":
            switch (Scene_Name.split("→")[1]*1) {
              case 1:
                Flag = [];
                for (var i = 0; i < Flag1.length; i++) {
                  Flag[i] = Flag1[i];
                }
                Scene_Name = Save_Datas.シーンナンバー1;
                break;
              case 2:
                Flag = [];
                for (var i = 0; i < Flag2.length; i++) {
                  Flag[i] = Flag2[i];
                }
                Scene_Name = Save_Datas.シーンナンバー2;
                break;
              case 3:
                Flag = [];
                for (var i = 0; i < Flag3.length; i++) {
                  Flag[i] = Flag3[i];
                }
                Scene_Name = Save_Datas.シーンナンバー3;
                break;
              case 4:
                Flag = [];
                for (var i = 0; i < Flag4.length; i++) {
                  Flag[i] = Flag4[i];
                }
                Scene_Name = Save_Datas.シーンナンバー4;
                break;
              case 5:
                Flag = [];
                for (var i = 0; i < Flag5.length; i++) {
                  Flag[i] = Flag5[i];
                }
                Scene_Name = Save_Datas.シーンナンバー5;
                break;
              case 6:
                Flag = [];
                for (var i = 0; i < Flag6.length; i++) {
                  Flag[i] = Flag6[i];
                }
                Scene_Name = Save_Datas.シーンナンバー6;
                break;
              case 7:
                Flag = [];
                for (var i = 0; i < Flag7.length; i++) {
                  Flag[i] = Flag7[i];
                }
                Scene_Name = Save_Datas.シーンナンバー7;
                break;
              case 8:
                Flag = [];
                for (var i = 0; i < Flag8.length; i++) {
                  Flag[i] = Flag8[i];
                }
                Scene_Name = Save_Datas.シーンナンバー8;
                break;
            }
            Scene_Name = Scene_Name.split("→")[0];
            break;
        }
        switch(Scene_Name){
          case "保存箇所":
            Scene_Name = Save_Datas.シーンナンバー;
            break;
        }
        Scene_Name += "";
        if(Scene_Name.match(/表示\+\+.+?\+\+表示/g)){
          Scene_Name = Scene_Name.substring(4,Scene_Name.length-4);
          for(var i = 0; i < Flag_Number.length; i++){
            if(Flag_Number[i].split(":")[0]==Scene_Name){
              Flag_Number[i] = Flag_Number[i].split(":")[0] + ":" + (Flag_Number[i].split(":")[1]*1+9);
              break;
            }
          }
          var F_S_N = 0;
          for(var j = 0; j < Flag.length; j++){
            if(Flag[j].split(":")[0]==Scene_Name){
              F_S_N++;
            }
          }
          if(Flag_Number[i].split(":")[1]*1 >= F_S_N){
            Flag_Number[i] = Flag_Number[i].split(":")[0] + ":0";
          }
        }
        if(Scene_Name.match(/表示--.+?--表示/g)){
          Scene_Name = Scene_Name.substring(4,Scene_Name.length-4);
          for(var i = 0; i < Flag_Number.length; i++){
            if(Flag_Number[i].split(":")[0]==Scene_Name){
              Flag_Number[i] = Flag_Number[i].split(":")[0] + ":" + (Flag_Number[i].split(":")[1]*1-9);
              if(Flag_Number[i].split(":")[1]*1 < 0){
                var F_S_N = -1;
                for(var j = 0; j < Flag.length; j++){
                  if(Flag[j].split(":")[0]==Scene_Name){
                    F_S_N++;
                  }
                }
                Flag_Number[i] = Flag_Number[i].split(":")[0] + ":" + F_S_N;
              }
              break;
            }
          }
        }
        if(Scene_Name.match(/表示\+.+?\+表示/g)){
          Scene_Name = Scene_Name.substring(3,Scene_Name.length-3);
          for(var i = 0; i < Flag_Number.length; i++){
            if(Flag_Number[i].split(":")[0]==Scene_Name){
              Flag_Number[i] = Flag_Number[i].split(":")[0] + ":" + (Flag_Number[i].split(":")[1]*1+1);
              break;
            }
          }
          var F_S_N = 0;
          for(var j = 0; j < Flag.length; j++){
            if(Flag[j].split(":")[0]==Scene_Name){
              F_S_N++;
            }
          }
          if(Flag_Number[i].split(":")[1]*1 >= F_S_N){
            Flag_Number[i] = Flag_Number[i].split(":")[0] + ":0";
          }
          Scene_Name = "表示" + Scene_Name + "表示";
        }
        if(Scene_Name.match(/表示-.+?-表示/g)){
          Scene_Name = Scene_Name.substring(3,Scene_Name.length-3);
          for(var i = 0; i < Flag_Number.length; i++){
            if(Flag_Number[i].split(":")[0]==Scene_Name){
              Flag_Number[i] = Flag_Number[i].split(":")[0] + ":" + (Flag_Number[i].split(":")[1]*1-1);
              if(Flag_Number[i].split(":")[1]*1 < 0){
                var F_S_N = -1;
                for(var j = 0; j < Flag.length; j++){
                  if(Flag[j].split(":")[0]==Scene_Name){
                    F_S_N++;
                  }
                }
                Flag_Number[i] = Flag_Number[i].split(":")[0] + ":" + F_S_N;
              }
              break;
            }
          }
          Scene_Name = "表示" + Scene_Name + "表示";
        }
        if(Scene_Name.match(/表示.+?:\d+?表示/g)){
          Scene_Name = Scene_Name.substring(2,Scene_Name.length-2);
          for(var i = 0; i < Flag_Number.length; i++){
            if(Flag_Number[i].split(":")[0]==Scene_Name.split(":")[0]){
              Flag_Number[i] = Flag_Number[i].split(":")[0] + ":" + Scene_Name.split(":")[1];
              break;
            }
          }
          Scene_Name = "表示" + Scene_Name.split(":")[0] + "表示";
        }
        for (var i = 0; i < Game_Datas.length; i++) {
          if(Game_Datas[i].Number==Scene_Name) break;
        }
        if(i < Game_Datas.length){
          if(Push) game.pushScene(Novel_Main_Scene(Game_Datas[i].Data,Game_Datas[i].Number));
          else game.replaceScene(Novel_Main_Scene(Game_Datas[i].Data,Game_Datas[i].Number));
        }
        else{
          switch(Scene_Name){
            case "メニューに戻る":
              game.replaceScene(Start_Menu_Scene());
              break;
            default:
              console.log(Scene_Name);
              Scene_Name  = "(名前:"+Scene_Name+":名前)";
              Scene_Name += "(画像:無し,../image/黒.png,0,0,405,227.8125:画像)";
              Scene_Name += "(文字情報:20,black,無し,40:文字情報)";
              Scene_Name += "(ボタン:戻る,40,350,325,100,無し,保存箇所:ボタン)";
              Scene_Name += "(待機時間:5:待機時間)シーンデータがありません。";
              game.replaceScene(Novel_Main_Scene(Scene_Name,Save_Datas.シーンナンバー));
              break;
          }
        }
        if(Do_Save) GAS("保存");
        return;
      }

      function Flag_get(Get_Data){
        if(Get_Data=="リセット"){
          var Log_Flag = [];
          for (var i = 0; i < Flag.length; i++) {
            if(Flag[i].split(":")[0]=="記録"){
              Log_Flag[Log_Flag.length] = Flag[i];
            }
          }
          Flag = [
            "セーブ時間==未設定",
            "キャラX==7",
            "キャラY==4",
            "キャラ向き==下",
            "キャラ画像==../image/半透明赤.png(大きさ)1",
            "マップX==0",
            "マップY==0"
          ];
          for (var i = 0; i < Log_Flag.length; i++) {
            Flag[Flag.length] = Log_Flag[i];
          }
        }
        else{
          if(Get_Data.indexOf("→")==-1&&Get_Data.indexOf("+=")==-1&&Get_Data.indexOf("-=")==-1&&Get_Data.indexOf("==")==-1){
            for(var k = 0; k < Flag.length; k++){
              if(Flag[k] == Get_Data) break;
            }
            if(k==Flag.length) Flag[Flag.length] = Get_Data;
          }
          else{
            if(Get_Data.indexOf("→")>0){
              for(var k = 0; k < Flag.length; k++){
                if(Flag[k].split("==")[0] == Get_Data.split("→")[0]) break;
              }
              if(k!=Flag.length){
                if(Get_Data.split("→")[1]=="消滅") Flag.splice(k,1);
                else Flag[k] = Get_Data.split("→")[1];
              }
            }
            if(Get_Data.indexOf("==")>0){
              for(var k = 0; k < Flag.length; k++){
                if(Flag[k].split("==")[0] == Get_Data.split("==")[0]) break;
              }
              Flag[k] = Get_Data;
            }
            if(Get_Data.indexOf("+=")>0){
              for(var k = 0; k < Flag.length; k++){
                if(Flag[k].split("==")[0] == Get_Data.split("+=")[0]) break;
              }
              if(k==Flag.length) Flag[Flag.length] = Get_Data.split("+=")[0] + "==" + Get_Data.split("+=")[1];
              else Flag[k] = Flag[k].split("==")[0] + "==" + (Flag[k].split("==")[1]*1 + Get_Data.split("+=")[1]*1);
            }
            if(Get_Data.indexOf("-=")>0){
              for(var k = 0; k < Flag.length; k++){
                if(Flag[k].split("==")[0] == Get_Data.split("-=")[0]) break;
              }
              if(k==Flag.length) Flag[Flag.length] = Get_Data.split("-=")[0] + "==-" + Get_Data.split("-=")[1];
              else Flag[k] = Flag[k].split("==")[0] + "==" + (Flag[k].split("==")[1]*1 - Get_Data.split("-=")[1]*1);
            }
          }
        }
        return;
      }

      function Buttons(a){
        a = a.split(",");
        Ui_Button[i] = new Button(a[0],"light",a[3],a[4]);
        Ui_Button[i].moveTo(a[1]*1,a[2]*1);
        Ui_Button[i].addEventListener("touchend",function(e){
          switch (a[6].split("→")[0]) {
            case "BGM+":
              a[6] = a[6].substring(5);
              if(BGM_volume<10) BGM_volume++;
              BGM.volume = BGM_volume/10;
              window.localStorage.setItem("BGM_volume",BGM_volume);
              break;
            case "BGM-":
              a[6] = a[6].substring(5);
              if(BGM_volume>0) BGM_volume--;
              BGM.volume = BGM_volume/10;
              window.localStorage.setItem("BGM_volume",BGM_volume);
              break;
            case "音声+":
              a[6] = a[6].substring(4);
              if(Voice_volume<10) Voice_volume++;
              window.localStorage.setItem("Voice_volume",Voice_volume);
              break;
            case "音声-":
              a[6] = a[6].substring(4);
              if(Voice_volume>0) Voice_volume--;
              window.localStorage.setItem("Voice_volume",Voice_volume);
              break;
            case "効果音+":
              a[6] = a[6].substring(5);
              if(Sound_effect_volume<10) Sound_effect_volume++;
              window.localStorage.setItem("Sound_effect_volume",Sound_effect_volume);
              break;
            case "効果音-":
              a[6] = a[6].substring(5);
              if(Sound_effect_volume>0) Sound_effect_volume--;
              window.localStorage.setItem("Sound_effect_volume",Sound_effect_volume);
              break;
            default:
              console.log(a[6]);
              break;
          }
          Sound_branch(a[5]);
          Scene_load(a[6]);
          return;
        });
      }

      function Branchs(Data,F_Data){

        var Conversion = Data.match(/\(変換:.+?:変換\)/g);

        if(Conversion){
          for (var i = 0; i < Conversion.length; i++) {
            Conversion[i] = Conversion[i].substring(4,Conversion[i].length-4);
            for (var j = 0; j < Game_Datas.length; j++) {
              if(Conversion[i]=="カンマ"){
                Data = Data.replace(/\(変換:カンマ:変換\)/,",");
              }
              else {
                if(Game_Datas[j].Number==Conversion[i]){
                  Conversion[i] = Branchs(Game_Datas[j].Data,F_Data);
                  Data = Data.replace(/\(変換:.+?:変換\)/,Conversion[i]);
                  break;
                }
              }
            }
          }
        }

        var Random = Data.match(/\(ランダム:.+?:ランダム\)/g);

        if(Random){
          var Random_set = [];
          var Random_Number = [];
          for (var i = 0; i < Random.length; i++) {
            Random[i] = Random[i].substring(6,Random[i].length-6);
          }
          for (var i = 0; i < Random.length; i++) {
            Random_set = [];
            for (var j = 0; j < Random[i].split("(内容)").length; j++) {
              for (var k = 0; k < Random[i].split("(内容)")[j].split("(数)")[1]*1; k++) {
                Random_set[Random_set.length] = Random[i].split("(内容)")[j].split("(数)")[0];
              }
            }
            Data = Data.replace(/\(ランダム:.+?:ランダム\)/,Random_set[rand(Random_set.length)]);
          }
        }

        Data = Data.replace(/\n/g,"");
        Data = Data.replace(/Ю/g,"(変換:Ю)");

        var Branch = Data.match(/\(フラグ所持:.+?:フラグ所持\)/g);

        if(Branch){
          for (var i = 0; i < Branch.length; i++) {
            Branch[i] = Branch[i].substring(7,Branch[i].length-7);
            for (var k = 0; k < F_Data.length; k++) {
              if(Branch[i].split("(内容)")[0].indexOf(">")>0){
                if(Branch[i].split("(内容)")[0].indexOf("数>")>0){
                  if(Branch[i].split("(内容)")[0].split("数>")[1]=="現在の表示フラグ"){
                    for(var n = 0; n < Flag_Number.length; n++){
                      if(Flag_Number[n].split(":")[0]==Branch[i].split("(内容)")[0].split("数>")[0]){
                        var Required_Number1 = Flag_Number[n].split(":")[1]*1;
                        Required_Number1++;
                        break;
                      }
                    }
                  }
                  else var Required_Number1 = Branch[i].split("(内容)")[0].split("数>")[1]*1;
                  if(Branch[i].split("(内容)")[0].split("数>")[0].indexOf("表示")>0){
                    for(var n = 0; n < Flag_Number.length; n++){
                      if(Flag_Number[n].split(":")[0]==Branch[i].split("(内容)")[0].split("表示数>")[0]){
                        var Required_Number2 = Flag_Number[n].split(":")[1]*1;
                        Required_Number2++;
                        break;
                      }
                    }
                  }
                  else{
                    var Required_Number2 = 0;
                    for (var j = 0; j < F_Data.length; j++) {
                      if(F_Data[j].split(":")[0]==Branch[i].split("(内容)")[0].split("数>")[0]){
                        Required_Number2++;
                      }
                    }
                  }
                  if(Required_Number2 > Required_Number1){
                    Data = Data.replace(/\(フラグ所持:.+?:フラグ所持\)/,Branch[i].split("(内容)")[1]);
                    break;
                  }
                }
                else{
                  if(F_Data[k].split("==")[0]==Branch[i].split("(内容)")[0].split(">")[0]){
                    if(F_Data[k].split("==")[1]*1 > Branch[i].split("(内容)")[0].split(">")[1]*1){
                      Data = Data.replace(/\(フラグ所持:.+?:フラグ所持\)/,Branch[i].split("(内容)")[1]);
                      break;
                    }
                  }
                }
              }
              else if(Branch[i].split("(内容)")[0].indexOf("<")>0){
                if(F_Data[k].split("==")[0]==Branch[i].split("(内容)")[0].split("<")[0]){
                  if(F_Data[k].split("==")[1]*1 < Branch[i].split("(内容)")[0].split("<")[1]*1){
                    Data = Data.replace(/\(フラグ所持:.+?:フラグ所持\)/,Branch[i].split("(内容)")[1]);
                    break;
                  }
                }
              }
              else{
                if(F_Data[k]==Branch[i].split("(内容)")[0]){
                  Data = Data.replace(/\(フラグ所持:.+?:フラグ所持\)/,Branch[i].split("(内容)")[1]);
                  break;
                }
              }
            }
            if(k == F_Data.length) Data = Data.replace(/\(フラグ所持:.+?:フラグ所持\)/,Branch[i].split("(内容)")[2]);
          }
        }

        var Flags_Data = Data.match(/\(フラグ:.+?:フラグ\)/g);

        if(Flags_Data&&F_Data==Flag){
          for(var i = 0; i < Flags_Data.length; i++){
            Flags_Data[i] = Flags_Data[i].substring(5,Flags_Data[i].length-5);
            Flag_get(Flags_Data[i]);
          }
          Data = Data.replace(/\(フラグ:.+?:フラグ\)/g,"");
        }

        for (var k = 0; k <= 8; k++) {

          switch (k) {
            case 1:
              F_Data = Flag1;
              Conversion = Data.match(/\(データ1:.+?:データ1\)/g);
              break;
            case 2:
              F_Data = Flag2;
              Conversion = Data.match(/\(データ2:.+?:データ2\)/g);
              break;
            case 3:
              F_Data = Flag3;
              Conversion = Data.match(/\(データ3:.+?:データ3\)/g);
              break;
            case 4:
              F_Data = Flag4;
              Conversion = Data.match(/\(データ4:.+?:データ4\)/g);
              break;
            case 5:
              F_Data = Flag5;
              Conversion = Data.match(/\(データ5:.+?:データ5\)/g);
              break;
            case 6:
              F_Data = Flag6;
              Conversion = Data.match(/\(データ6:.+?:データ6\)/g);
              break;
            case 7:
              F_Data = Flag7;
              Conversion = Data.match(/\(データ7:.+?:データ7\)/g);
              break;
            case 8:
              F_Data = Flag8;
              Conversion = Data.match(/\(データ8:.+?:データ8\)/g);
              break;
            default:
              F_Data = Flag;
              Conversion = Data.match(/\(データ:.+?:データ\)/g);
              break;
          }

          if(Conversion){
            for (var i = 0; i < Conversion.length; i++) {
              if(k==0) Conversion[i] = Conversion[i].substring(5,Conversion[i].length-5);
              else Conversion[i] = Conversion[i].substring(6,Conversion[i].length-6);
              for (var j = 0; j < F_Data.length; j++) {
                if(F_Data[j].split("==")[0]==Conversion[i]){
                  Conversion[i] = F_Data[j].split("==")[1];
                  break;
                }
              }
              switch (k) {
                case 1:
                  Data = Data.replace(/\(データ1:.+?:データ1\)/,Conversion[i]);
                  break;
                case 2:
                  Data = Data.replace(/\(データ2:.+?:データ2\)/,Conversion[i]);
                  break;
                case 3:
                  Data = Data.replace(/\(データ3:.+?:データ3\)/,Conversion[i]);
                  break;
                case 4:
                  Data = Data.replace(/\(データ4:.+?:データ4\)/,Conversion[i]);
                  break;
                case 5:
                  Data = Data.replace(/\(データ5:.+?:データ5\)/,Conversion[i]);
                  break;
                case 6:
                  Data = Data.replace(/\(データ6:.+?:データ6\)/,Conversion[i]);
                  break;
                case 7:
                  Data = Data.replace(/\(データ7:.+?:データ7\)/,Conversion[i]);
                  break;
                case 8:
                  Data = Data.replace(/\(データ8:.+?:データ8\)/,Conversion[i]);
                  break;
                default:
                  Data = Data.replace(/\(データ:.+?:データ\)/,Conversion[i]);
                  break;
              }
            }
          }
        }

        return(Data);
      }

      Data = Branchs(Data,Flag);

      var Save = null;
      var Plus_Text = null;
      var Scene_Number = null;

      for (var k = 1; k <= 8; k++) {

        switch (k) {
          case 1:
            Scene_Number = Save_Datas.シーンナンバー1;
            Save = Data.match(/\(セーブ1:.+?:セーブ1\)/);
            break;
          case 2:
            Scene_Number = Save_Datas.シーンナンバー2;
            Save = Data.match(/\(セーブ2:.+?:セーブ2\)/);
            break;
          case 3:
            Scene_Number = Save_Datas.シーンナンバー3;
            Save = Data.match(/\(セーブ3:.+?:セーブ3\)/);
            break;
          case 4:
            Scene_Number = Save_Datas.シーンナンバー4;
            Save = Data.match(/\(セーブ4:.+?:セーブ4\)/);
            break;
          case 5:
            Scene_Number = Save_Datas.シーンナンバー5;
            Save = Data.match(/\(セーブ5:.+?:セーブ5\)/);
            break;
          case 6:
            Scene_Number = Save_Datas.シーンナンバー6;
            Save = Data.match(/\(セーブ6:.+?:セーブ6\)/);
            break;
          case 7:
            Scene_Number = Save_Datas.シーンナンバー7;
            Save = Data.match(/\(セーブ7:.+?:セーブ7\)/);
            break;
          case 8:
            Scene_Number = Save_Datas.シーンナンバー8;
            Save = Data.match(/\(セーブ8:.+?:セーブ8\)/);
            break;
        }

        if(Save){
          Save = Save[0].substring(6,Save[0].length-6);
          Save = Save.split(",");
          Plus_Text = "";
          if(Scene_Number=="スタート"){
            Plus_Text += "(画像:無し,../image/NewData.png,"
            Plus_Text += Save[0]*1 + "," + Save[1]*1 + "," + Save[2]*405 + "," + Save[2]*228 + ":画像)";
          }
          else{
            for (var i = 0; i < Game_Datas.length; i++) {
              if(Game_Datas[i].Number==Scene_Number) break;
            }
            switch (k) {
              case 1:
                var Save_Images_Data = Branchs(Game_Datas[i].Data,Flag1);
                break;
              case 2:
                var Save_Images_Data = Branchs(Game_Datas[i].Data,Flag2);
                break;
              case 3:
                var Save_Images_Data = Branchs(Game_Datas[i].Data,Flag3);
                break;
              case 4:
                var Save_Images_Data = Branchs(Game_Datas[i].Data,Flag4);
                break;
              case 5:
                var Save_Images_Data = Branchs(Game_Datas[i].Data,Flag5);
                break;
              case 6:
                var Save_Images_Data = Branchs(Game_Datas[i].Data,Flag6);
                break;
              case 7:
                var Save_Images_Data = Branchs(Game_Datas[i].Data,Flag7);
                break;
              case 8:
                var Save_Images_Data = Branchs(Game_Datas[i].Data,Flag8);
                break;
            }
            var Save_Images_Data1 = Save_Images_Data.match(/\(画像:.+?:画像\)/g);
            var Save_Images_Data2 = Save_Images_Data.match(/\(画像移動:.+?:画像移動\)/g);
            if(Save_Images_Data1){
              for (var i = 0; i < Save_Images_Data1.length; i++) {
                Save_Images_Data1[i] = Save_Images_Data1[i].substring(4,Save_Images_Data1[i].length-4);
                Save_Images_Data1[i] = Save_Images_Data1[i].split(",");
                Plus_Text += "(画像:";
                Plus_Text += Save_Images_Data1[i][0] + k + ",";
                Plus_Text += Save_Images_Data1[i][1] + ",";
                Plus_Text += Save_Images_Data1[i][2] * Save[2] + Save[0]*1 + ",";
                Plus_Text += Save_Images_Data1[i][3] * Save[2] + Save[1]*1 + ",";
                Plus_Text += Save_Images_Data1[i][4] * Save[2] + ",";
                Plus_Text += Save_Images_Data1[i][5] * Save[2] + ":画像)";
              }
            }
            if(Save_Images_Data2){
              for (var i = 0; i < Save_Images_Data2.length; i++) {
                Save_Images_Data2[i] = Save_Images_Data2[i].substring(6,Save_Images_Data2[i].length-6);
                Save_Images_Data2[i] = Save_Images_Data2[i].split(",");
                Plus_Text += "(画像移動:";
                Plus_Text += Save_Images_Data2[i][0] + k + ",";
                Plus_Text += Save_Images_Data2[i][1] + ",";
                Plus_Text += Save_Images_Data2[i][2] + ",";
                Plus_Text += Save_Images_Data2[i][3] + ":画像移動)";
              }
            }
          }
          switch (k) {
            case 1:
              Data = Data.replace(/\(セーブ1:.+?:セーブ1\)/g,Plus_Text);
              break;
            case 2:
              Data = Data.replace(/\(セーブ2:.+?:セーブ2\)/g,Plus_Text);
              break;
            case 3:
              Data = Data.replace(/\(セーブ3:.+?:セーブ3\)/g,Plus_Text);
              break;
            case 4:
              Data = Data.replace(/\(セーブ4:.+?:セーブ4\)/g,Plus_Text);
              break;
            case 5:
              Data = Data.replace(/\(セーブ5:.+?:セーブ5\)/g,Plus_Text);
              break;
            case 6:
              Data = Data.replace(/\(セーブ6:.+?:セーブ6\)/g,Plus_Text);
              break;
            case 7:
              Data = Data.replace(/\(セーブ7:.+?:セーブ7\)/g,Plus_Text);
              break;
            case 8:
              Data = Data.replace(/\(セーブ8:.+?:セーブ8\)/g,Plus_Text);
              break;
          }
        }
      }

      var Flags_Display = Data.match(/\(フラグ表示:.+?:フラグ表示\)/g);
      var Display_while = true;

      if(Flags_Display){

      Flags_Display = Flags_Display[0].substring(7,Flags_Display[0].length-7);
      Flags_Display = Flags_Display.split(",");

      while (Display_while) {
          Display_while = false;
          for(var i = 0; i < Flag_Number.length; i++){
            if(Flag_Number[i].split(":")[0]==Flags_Display[0]){
              var F_S_N = Flag_Number[i].split(":")[1];
              F_S_N = Math.floor(F_S_N/9)*9;
              break;
            }
          }
          console.log(Flag_Number[i]);
          var I_X = 0;
          var I_Y = 0;
          var I_N = 0;
          var F_S_N_2 = 0;
          for (var j = 0; j < Flag.length; j++) {
            if(Flags_Display[0]==Flag[j].split(":")[0]){
              for (var k = 0; k < Game_Datas.length; k++) {
                if(Game_Datas[k].Number==Flag[j].split(":")[1].split("==")[0]) break;
              }
              if(F_S_N > 0){
                F_S_N--;
                F_S_N_2++;
                continue;
              }
              if(I_N!=9){
                switch (I_N) {
                  case 0:
                  case 3:
                  case 6:
                  I_X = 30;
                  break;
                  case 1:
                  case 4:
                  case 7:
                  I_X = 162.5;
                  break;
                  case 2:
                  case 5:
                  case 8:
                  I_X = 295;
                  break;
                }
                switch (I_N) {
                  case 0:
                  case 1:
                  case 2:
                  I_Y = 100;
                  break;
                  case 3:
                  case 4:
                  case 5:
                  I_Y = 232.5;
                  break;
                  case 6:
                  case 7:
                  case 8:
                  I_Y = 365;
                  break;
                }
                Data += "(画像:無し," + Branchs(Game_Datas[k].Data,Flag).split(",")[0];
                Data += ","+I_X+","+ I_Y +",80,80:画像)";
                Data += "(画像:無し,../image/アイテム枠.png,"+I_X+","+ I_Y +",80,80,";
                Data += Branchs(Game_Datas[k].Data,Flag).split(",")[1];
                Data += ",表示"+Flags_Display[0]+":"+(I_N+F_S_N_2)+"表示:画像)";
              }
              I_N++;
              if(I_N==10) break;
            }
          }
          if(I_N==0&&Flag_Number[i].split(":")[1]*1>0){
            Display_while = true;
            Flag_Number[i] = Flag_Number[i].split(":")[0] + ":" + (Flag_Number[i].split(":")[1]*1-9);
          }
        }
        Data = Data.replace(/\(フラグ表示:.+?:フラグ表示\)/g,"");
        if(I_N==10||Flag_Number[i].split(":")[1]*1>8){
          Data += "(文字情報:20,black,無し,40:文字情報)";
          Data += "(ボタン:←,30,490,80,80,"+Flags_Display[1]+",表示--"+Flags_Display[0]+"--表示:ボタン)";
          Data += "(ボタン:→,295,490,80,80,"+Flags_Display[1]+",表示++"+Flags_Display[0]+"++表示:ボタン)";
        }
      }

      var Images_Data = Data.match(/\(画像:.+?:画像\)/g);

      if(Images_Data){
        var Image_Number = 0;
        for (var i = 0; i < Images_Data.length; i++) {
          Images_Data[i] = Images_Data[i].substring(4,Images_Data[i].length-4);
          Images(Images_Data[i]);
        }
        Data = Data.replace(/\(画像:.+?:画像\)/g,"(変換:画像)");
      }


      var Ui_Pad = [];
      var Pads_Data = Data.match(/\(Pad:.+?:Pad\)/g);

      if(Pads_Data){
        var Pad_Number = 0;
        for (var i = 0; i < Pads_Data.length; i++) {
          Pads_Data[i] = Pads_Data[i].substring(5,Pads_Data[i].length-5);
          Pads_Data[i] = Pads_Data[i].split(",");
          Ui_Pad[i] = new Pad(Pads_Data[i][0],Pads_Data[i][4]*1);
          Ui_Pad[i].default_imageurl = Pads_Data[i][0];
          Ui_Pad[i].keyDOWN_imageurl = Pads_Data[i][1];
          Ui_Pad[i].x = Pads_Data[i][2]*1;
          Ui_Pad[i].y = Pads_Data[i][3]*1;
        }
        Data = Data.replace(/\(Pad:.+?:Pad\)/g,"(変換:Pad)");
      }

      var Characters_Data = Data.match(/\(キャラ:.+?:キャラ\)/);

      if(Characters_Data){

        Characters_Data = Characters_Data[0].substring(5,Characters_Data[0].length-5);
        if(Characters_Data=="オン") Characters_Data = true;
        else Characters_Data = false;

        for (var i = 0; i < Flag.length; i++) {
          if(Flag[i].split("==")[0]=="キャラX") var Character_X = Flag[i].split("==")[1]*27;
          if(Flag[i].split("==")[0]=="キャラY") var Character_Y = Flag[i].split("==")[1]*27;
          if(Flag[i].split("==")[0]=="キャラ向き") var Character_direction = Flag[i].split("==")[1];
          if(Flag[i].split("==")[0]=="キャラ画像"){
            var Character_image = new Sprite();
            Character_image.size = Flag[i].split("==")[1].split("(大きさ)")[1]*1;
            Character_image.width = Character_image.size*3;
            Character_image.height = Character_image.size*4;
            Character_image._element = document.createElement("img");
            Character_image._element.src = Flag[i].split("==")[1].split("(大きさ)")[0];
          }
        }

        var Character_front = new Sprite(27,27);
        Character_front._element = document.createElement("img");
        Character_front._element.src = "../image/透明.png";

        var Character = new Sprite(Character_image.size,Character_image.size);
        Character.image = Character_image;
        Character.x = Character_X;
        Character.y = Character_Y;
        Character.originX = 0;
        Character.originY = 0;
        Character.scaleX = 27/Character_image.size;
        Character.scaleY = 27/Character_image.size;
        switch (Character_direction) {
          case "上":
            Character_front.x = Character.x;
            Character_front.y = Character.y-27;
            Character.frame = 10;
            break;
          case "下":
            Character_front.x = Character.x;
            Character_front.y = Character.y+27;
            Character.frame = 1;
            break;
          case "左":
            Character_front.x = Character.x-27;
            Character_front.y = Character.y;
            Character.frame = 4;
            break;
          case "右":
            Character_front.x = Character.x+27;
            Character_front.y = Character.y;
            Character.frame = 7;
            break;
        }

        Data = Data.replace(/\(キャラ:.+?:キャラ\)/g,"(変換:キャラ)");
      }

      var Maps_Data = Data.match(/\(マップ:.+?:マップ\)/g);

      var Map_area = [];
      var Map_area_Data = [];

      if(Maps_Data){
        var Map_area_Number = 0;
        for (var i = 0; i < Maps_Data.length; i++) {
          Maps_Data[i] = Maps_Data[i].substring(5,Maps_Data[i].length-5);
          Maps_Data[i] = Maps_Data[i].split(",");

          if(Maps_Data[i][2]=="無し") Maps_Data[i][2] = 1;

          Map_area_Data[i] = new Sprite(Maps_Data[i][2]*3,Maps_Data[i][2]*4);
          Map_area[i] = new Sprite(Maps_Data[i][2],Maps_Data[i][2]);
          Map_area_Data[i]._element = document.createElement("img");
          Map_area[i].描写 = true;
          Map_area[i].name = Maps_Data[i][0];
          switch (Maps_Data[i][1]) {
            case "赤":
              Map_area_Data[i]._element.src = "../image/半透明赤.png";
              Map_area[i].image = Map_area_Data[i];
              break;
            case "無し":
              Map_area[i].描写 = false;
              break;
            default:
              Maps_Data[i][1] = Maps_Data[i][1].split("→");
              Map_area_Data[i]._element.src = Maps_Data[i][1][0];
              Map_area[i].image = Map_area_Data[i];
              Map_area[i].動 = false;
              Map_area[i].向き = false;
              if(Maps_Data[i][1][1]){
                switch (Maps_Data[i][1][1]) {
                  case "上":
                    Map_area[i].向き = true;
                    Map_area[i].frame = 10;
                    break;
                  case "下":
                    Map_area[i].向き = true;
                    Map_area[i].frame = 1;
                    break;
                  case "左":
                    Map_area[i].向き = true;
                    Map_area[i].frame = 4;
                    break;
                  case "右":
                    Map_area[i].向き = true;
                    Map_area[i].frame = 7;
                    break;
                  case "動":
                    Map_area[i].動 = true;
                    break;
                  default:
                    Map_area[i].frame = Maps_Data[i][1][1]*1;
                    break;
                }
              }
              break;
          }
          Map_area[i].originX = 0;
          Map_area[i].originY = 0;
          Map_area[i].scaleX = 27/Maps_Data[i][2];
          Map_area[i].scaleY = 27/Maps_Data[i][2];

          for (var k = 0; k < Flag.length; k++) {
            if(Flag[k].split("==")[0]=="マップX") var Map_X = Flag[k].split("==")[1]*1;
            if(Flag[k].split("==")[0]=="マップY") var Map_Y = Flag[k].split("==")[1]*1;
          }

          Map_area[i].x = Maps_Data[i][3]*1 - Map_X;
          Map_area[i].y = Maps_Data[i][4]*1 - Map_Y;
          Map_area[i].x *= 27;
          Map_area[i].y *= 27;
          Map_area[i].データ = Maps_Data[i][5];
          switch (Map_area[i].データ) {
            case "■":
              if(Maps_Data[i][6]){
                Map_area[i].ボタン = Maps_Data[i][6];
                Map_area[i].ボタンサイズ = Maps_Data[i][7];
                Map_area[i].ボタン音 = Maps_Data[i][8];
                Map_area[i].調べる = Maps_Data[i][9];
              }
              break;
            case "調べる":
              Map_area[i].ボタン = Maps_Data[i][6];
              Map_area[i].ボタンサイズ = Maps_Data[i][7];
              Map_area[i].ボタン音 = Maps_Data[i][8];
              Map_area[i].調べる = Maps_Data[i][9];
              break;
            case "シーン":
              Map_area[i].シーン = Maps_Data[i][6];
              if(Maps_Data[i][7]){
                Map_area[i].ボタン = Maps_Data[i][7];
                Map_area[i].ボタンサイズ = Maps_Data[i][8];
                Map_area[i].ボタン音 = Maps_Data[i][9];
                Map_area[i].調べる = Maps_Data[i][10];
              }
              break;
            case "□":
              Map_area[i].向かう = Maps_Data[i][6];
              if(Maps_Data[i][7]){
                Map_area[i].ボタン = Maps_Data[i][7];
                Map_area[i].ボタンサイズ = Maps_Data[i][8];
                Map_area[i].ボタン音 = Maps_Data[i][9];
                Map_area[i].調べる = Maps_Data[i][10];
              }
              break;
          }
        }
        Data = Data.replace(/\(マップ:.+?:マップ\)/g,"(変換:マップ)");
      }

      var Youtubes_Data = Data.match(/\(Youtube:.+?:Youtube\)/g);

      if(Youtubes_Data){
        var Youtube_Number = 0;
        for (var i = 0; i < Youtubes_Data.length; i++) {
          Youtubes_Data[i] = Youtubes_Data[i].substring(9,Youtubes_Data[i].length-9);
          Youtubes(Youtubes_Data[i]);
        }
        Data = Data.replace(/\(Youtube:.+?:Youtube\)/g,"(変換:Youtube)");
      }

      var Text_Areas_Data = Data.match(/\(入力:.+?:入力\)/g);

      if(Text_Areas_Data){
        var Text_Area_Number = 0;
        for (var i = 0; i < Text_Areas_Data.length; i++) {
          Text_Areas_Data[i] = Text_Areas_Data[i].substring(4,Text_Areas_Data[i].length-4);
          Text_Areas_Data[i] = Text_Areas_Data[i].split(",");
          for (var j = 0; j < Flag.length; j++) {
            if(Text_Areas_Data[i][0]==Flag[j].split("==")[0]) break;
          }
          Text_Area[i] = new Entity();
          Text_Area[i].moveTo(Text_Areas_Data[i][1]*1,Text_Areas_Data[i][2]*1);
          Text_Area[i].width = Text_Areas_Data[i][3]*1;
          Text_Area[i].height = Text_Areas_Data[i][4]*1;
          Text_Area[i]._element = document.createElement("input");
          Text_Area[i]._element.type = "text";
          Text_Area[i]._element.name = Text_Areas_Data[i][0];
          if(j!=Flag.length) Text_Area[i]._element.value = Flag[j].split("==")[1];
          if(Text_Areas_Data[i][5]) Text_Area[i]._element.placeholder = Text_Areas_Data[i][5];
          else Text_Area[i]._element.placeholder = Text_Areas_Data[i][0] + "を入力";
        }
        Data = Data.replace(/\(入力:.+?:入力\)/g,"(変換:入力)");
      }

      var Pointer = Data.match(/\(ポインタ:.+?:ポインタ\)/g);

      if(Pointer){
        Pointer[0] = Pointer[0].substring(6,Pointer[0].length-6);
        var a = Pointer[0].split(",");
        Pointer = new Sprite();
        Pointer._element = document.createElement("img");
        Pointer._element.src = a[0];
        Pointer.x = a[1]*1;
        Pointer.y = a[2]*1;
        Pointer.width = a[3]*1;
        Pointer.height = a[4]*1;

        var Pointer_Button = new Button("","light",a[7],a[8]);
        Pointer_Button.moveTo(a[5]*1,a[6]*1);
        Pointer_Button.sound = a[9];
        Pointer_Button.View = true;
        Pointer_Button.addEventListener("touchend",function(e){
          Sound_branch(Pointer_Button.button_sound);
          Scene_load(Pointer_Button.シーンナンバー);
          return;
        });

        scene.addEventListener("touchend",function(e){
          Pointer.x = e.x - a[3]*0.5;
          Pointer.y = e.y - a[4]*0.5;
          console.log(Pointer.x);
          console.log(Pointer.y);
        });

        Data = Data.replace(/\(ポインタ:.+?:ポインタ\)/g,"(変換:ポインタ)");
      }

      var White_Background = Data.match(/\(白背景\)/g);

      if(White_Background){
        White_Background = new Sprite();
        White_Background._element = document.createElement("img");
        White_Background._element.src = "../image/白.png";
        White_Background.y = width/16*9;
        White_Background.height = height-width/16*9;
        White_Background.width = width;
        scene.addChild(White_Background);
        Data = Data.replace(/\(白背景\)/g,"");
      }

      var Next_Data = Data.match(/\(次に進む:.+?:次に進む\)/g);
      var Next = false;

      if(Next_Data){
        Next_Data = Next_Data[0].substring(6,Next_Data[0].length-6);
        var Next_Time = Next_Data.split(",")[0]*1;
        Next_Data = Next_Data.split(",")[1];
        Data = Data.replace(/\(次に進む:.+?:次に進む\)/g,"(変換:次に進む)");
      }

      var Buttons_Data = Data.match(/\(ボタン:.+?:ボタン\)/g);

      if(Buttons_Data){
        var Button_Number = 0;
        for (var i = 0; i < Buttons_Data.length; i++) {
          Buttons_Data[i] = Buttons_Data[i].substring(5,Buttons_Data[i].length-5);
          Buttons(Buttons_Data[i]);
        }
        Data = Data.replace(/\(ボタン:.+?:ボタン\)/g,"(変換:ボタン)");
      }

      var Map_Button_Data = Data.match(/\(マップボタン:.+?:マップボタン\)/g);

      if(Map_Button_Data){

        Map_Button_Data = Map_Button_Data[0].substring(8,Map_Button_Data[0].length-8);
        Map_Button_Data = Map_Button_Data.split(",");

        var Map_Button = new Button(Map_Button_Data[0],"light",Map_Button_Data[3],Map_Button_Data[4]);
        Map_Button.moveTo(Map_Button_Data[1]*1,Map_Button_Data[2]*1);
        Map_Button.default_text = Map_Button.text;
        Map_Button.default_font_size = Map_Button_Data[5];
        Map_Button._style["font-size"] = Map_Button.default_font_size;
        Map_Button.default_sound = Map_Button_Data[6];
        Map_Button.sound = Map_Button.default_sound;
        Map_Button.default_SceneNumber = Map_Button_Data[7];
        Map_Button.シーンナンバー = Map_Button.default_SceneNumber;
        Map_Button.addEventListener("touchend",function(e){
          if(Map_Button.ボタンナンバー!="無し"){
            for (var j = 0; j < Flag.length; j++) {
              if(Flag[j].split("==")[0]=="キャラ向き") break;
            }
            switch(Flag[j].split("==")[1]){
              case "上":
                if(Map_area[Map_Button.ボタンナンバー].向き) Map_area[Map_Button.ボタンナンバー].frame = 1;
                break;
              case "下":
                if(Map_area[Map_Button.ボタンナンバー].向き) Map_area[Map_Button.ボタンナンバー].frame = 10;
                break;
              case "左":
                if(Map_area[Map_Button.ボタンナンバー].向き) Map_area[Map_Button.ボタンナンバー].frame = 7;
                break;
              case "右":
                if(Map_area[Map_Button.ボタンナンバー].向き) Map_area[Map_Button.ボタンナンバー].frame = 4;
                break;
            }
          }
          if(Map_Time==0){
            Sound_branch(Map_Button.sound);
            Scene_load(Map_Button.シーンナンバー);
          }
          return;
        });

        Data = Data.replace(/\(マップボタン:.+?:マップボタン\)/g,"(変換:マップボタン)");
      }

      var Text_informations_Data = Data.match(/\(文字情報:.+?:文字情報\)/g);

      if(Text_informations_Data){
        var Text_information_Number = 0;
        for (var i = 0; i < Text_informations_Data.length; i++) {
          Text_informations_Data[i] = Text_informations_Data[i].substring(6,Text_informations_Data[i].length-6);
        }
        Data = Data.replace(/\(文字情報:.+?:文字情報\)/g,"(変換:文字情報)");
      }

      var Speeds_Data = Data.match(/\(待機時間:.+?:待機時間\)/g);

      if(Speeds_Data){
        var Speed_Number = 0;
        for (var i = 0; i < Speeds_Data.length; i++) {
          Speeds_Data[i] = Speeds_Data[i].substring(6,Speeds_Data[i].length-6);
        }
        Data = Data.replace(/\(待機時間:.+?:待機時間\)/g,"(変換:待機時間)");
      }

      var Sounds_Data = Data.match(/\(再生:.+?:再生\)/g);

      if(Sounds_Data){
        var Sound_Number = 0;
        for (var i = 0; i < Sounds_Data.length; i++) {
          Sounds_Data[i] = Sounds_Data[i].substring(4,Sounds_Data[i].length-4);
        }
        Data = Data.replace(/\(再生:.+?:再生\)/g,"(変換:再生)");
      }

      var BGMs_Data = Data.match(/\(BGM:.+?:BGM\)/g);

      if(BGMs_Data){
        var BGM_Number = 0;
        for (var i = 0; i < BGMs_Data.length; i++) {
          BGMs_Data[i] = BGMs_Data[i].substring(5,BGMs_Data[i].length-5);
        }
        Data = Data.replace(/\(BGM:.+?:BGM\)/g,"(変換:BGM)");
      }

      var Coordinates_Data = Data.match(/\(文字座標:.+?:文字座標\)/g);

      if(Coordinates_Data){
        var Coordinate_Number = 0;
        for (var i = 0; i < Coordinates_Data.length; i++) {
          Coordinates_Data[i] = Coordinates_Data[i].substring(6,Coordinates_Data[i].length-6);
        }
        Data = Data.replace(/\(文字座標:.+?:文字座標\)/g,"(変換:文字座標)");
      }

      var Intervals_Data = Data.match(/\(文字間隔:.+?:文字間隔\)/g);

      if(Intervals_Data){
        var Interval_Number = 0;
        for (var i = 0; i < Intervals_Data.length; i++) {
          Intervals_Data[i] = Intervals_Data[i].substring(6,Intervals_Data[i].length-6);
        }
        Data = Data.replace(/\(文字間隔:.+?:文字間隔\)/g,"(変換:文字間隔)");
      }

      var Image_TL_Data = Data.match(/\(画像移動:.+?:画像移動\)/g);

      if(Image_TL_Data){
        var Image_TL_Number = 0;
        for (var i = 0; i < Image_TL_Data.length; i++) {
          Image_TL_Data[i] = Image_TL_Data[i].substring(6,Image_TL_Data[i].length-6);
        }
        Data = Data.replace(/\(画像移動+:.+?:画像移動\)/g,"(変換:画像移動)");
      }

      var Name_texts = Data.match(/\(名前:.+?:名前\)/g);

      if(Name_texts){
        Name_texts = Name_texts[0].substring(4,Name_texts[0].length-4);
        Name_texts = "【" + Name_texts + "】";
        var Name_text = new Sprite();
        Name_text._element = document.createElement("innerHTML");
        Name_text._style.font = width/20 + "px monospace";
        Name_text._element.textContent = Name_texts;
        Name_text.x = 0;
        Name_text.y = width/30 + width/16*9;
        Data = Data.replace(/\(名前:.+?:名前\)/g,"(変換:名前)");
      }

      var Itimozis_Data = Data.match(/\(変換:.+?\)/g);

      if(Itimozis_Data){
        var Itimozi_Number = 0;
        for (var i = 0; i < Itimozis_Data.length; i++) {
          Itimozis_Data[i] = Itimozis_Data[i].substring(4,Itimozis_Data[i].length-1);
        }
        Data = Data.replace(/\(変換:.+?\)/g,"Ю");
      }

      var Text = [];
      var PX = 20;//width/20;
      var Text_Interval = PX;
      var Text_X = PX;//width/20;
      var Text_Y = 270;//width/20 + width/20 + width/16*9;
      var Text_Sound = "無し";
      var Text_Color = "black";
      var Text_Number = 0;
      var Itimozi = null;
      var FPS = 0;
      var Display_time = 0;
      var Opacity = 1;
      var Opacitys = -0.02;
      var Move_Image = null;

      function Texts(){
        Itimozi = Data[Text_Number];
        if(!Itimozi) return;
        switch (Itimozi) {
          case "Ю":
            switch(Itimozis_Data[Itimozi_Number]){
              case "画像":
                if(Image[Image_Number].fade){
                  if(Image[Image_Number].fade.substring(0,2)=="in"){
                    Image[Image_Number].opacity = 0;
                    Image[Image_Number].tl.fadeIn(Image[Image_Number].fade.substring(2)*1);
                  }
                  else{
                    Image[Image_Number].tl.fadeOut(Image[Image_Number].fade.substring(3)*1);
                  }
                }
                if(Image[Image_Number].imageurl=="使用フラグ"){
                  for (var Used = 0; Used < Game_Datas.length; Used++) {
                    if(Game_Datas[Used].Number==Use.split(":")[1].split("==")[0]) break;
                  }
                  Image[Image_Number]._element.src = Branchs(Game_Datas[Used].Data,Flag).split(",")[0];
                }
                else Image[Image_Number]._element.src = Image[Image_Number].imageurl
                scene.addChild(Image[Image_Number]);
                Image_Number++;
                break;
              case "マップ画像":
                scene.addChild(Map_Image[Map_Image_Number]);
                Map_Image_Number++;
                break;
              case "Youtube":
                scene.addChild(Youtube[Youtube_Number]);
                Youtube_Number++;
                break;
              case "キャラ":
                scene.addChild(Character);
                scene.addChild(Character_front);
                break;
              case "入力":
                scene.addChild(Text_Area[Text_Area_Number]);
                Text_Area_Number++;
                break;
              case "マップボタン":
                scene.addChild(Map_Button);
                break;
              case "ボタン":
                Ui_Button[Button_Number].backgroundColor = Button_color;
                Ui_Button[Button_Number]._style["font-size"] = Button_fontSize;
                scene.addChild(Ui_Button[Button_Number]);
                Button_Number++;
                break;
              case "文字情報":
                PX = Text_informations_Data[Text_information_Number].split(",")[0]*1;
                Text_Interval = PX;
                Text_Color = Text_informations_Data[Text_information_Number].split(",")[1];
                Text_Sound = Text_informations_Data[Text_information_Number].split(",")[2];
                Button_fontSize = Text_informations_Data[Text_information_Number].split(",")[3]*1;
                if(Text_informations_Data[Text_information_Number].split(",")[4]){
                  Button_color = Text_informations_Data[Text_information_Number].split(",")[4];
                }
                Text_information_Number++
                break;
              case "待機時間":
                FPS = Speeds_Data[Speed_Number];
                Speed_Number++
                break;
              case "再生":
                Sound_branch(Sounds_Data[Sound_Number]);
                Sound_Number++
                break;
              case "マップ作製":
                var Map_text = "";
                scene.addEventListener("touchend",function(e){
                  Map_area[Map_area.length] = new Sprite();
                  Map_area[Map_area.length-1]._element = document.createElement("img");
                  Map_area[Map_area.length-1].描写 = true;
                  Map_area[Map_area.length-1]._element.src = "../image/半透明赤.png";
                  for (var k = 0; k < Flag.length; k++) {
                    if(Flag[k].split("==")[0]=="マップX") var Map_X = Flag[k].split("==")[1]*1;
                    if(Flag[k].split("==")[0]=="マップY") var Map_Y = Flag[k].split("==")[1]*1;
                  }
                  var EX = e.x/27 + "";
                  var EY = e.y/27 + "";
                  EX = EX.split(".")[0]*1;
                  EY = EY.split(".")[0]*1;
                  Map_area[Map_area.length-1].x = EX;
                  Map_area[Map_area.length-1].y = EY;
                  Map_area[Map_area.length-1].x *= 27;
                  Map_area[Map_area.length-1].y *= 27;
                  Map_area[Map_area.length-1].データ = "■";
                  Map_area[Map_area.length-1].width = 27;
                  Map_area[Map_area.length-1].height = 27;
                  scene.addChild(Map_area[Map_area.length-1]);
                  Map_text += "(マップ:壁,赤,無し,"+ (EX + Map_X) +"," + (EY + Map_Y) +",■:マップ)";
                  console.log(Map_text);
                });
                break;
              case "ポインタ":
                scene.addChild(Pointer);
                break;
              case "BGM":
                BGM_ON(BGMs_Data[BGM_Number]);
                BGM_Number++
                break;
              case "文字間隔":
                Text_Interval = Intervals_Data[Interval_Number]*1;
                Interval_Number++;
                break;
              case "文字座標":
                switch (Coordinates_Data[Coordinate_Number].split(",")[0].substring(0,2)){
                  case "+=":
                  case "-=":
                    Text_X -= Text_Interval;
                    Text_X += Coordinates_Data[Coordinate_Number].split(",")[0]*1;
                    break;
                  default:
                    Text_X = Coordinates_Data[Coordinate_Number].split(",")[0]*1;
                    break;
                }
                switch (Coordinates_Data[Coordinate_Number].split(",")[1].substring(0,2)){
                  case "+=":
                  case "-=":
                    Text_Y += Coordinates_Data[Coordinate_Number].split(",")[1]*1;
                    break;
                  default:
                    Text_Y = Coordinates_Data[Coordinate_Number].split(",")[1]*1;
                    break;
                }
                Coordinate_Number++
                break;
              case "画像移動":
                Move_Image = Image_TL_Data[Image_TL_Number].split(",")[0];
                for (var i = 0; i < Image.length; i++) {
                  if(Image[i].name==Move_Image){
                    Move_Image = Image[i];
                    break;
                  }
                }
                switch (Image_TL_Data[Image_TL_Number].split(",")[1]){
                  case "消滅":
                    scene.removeChild(Move_Image);
                    break;
                  case "fadein":
                    Move_Image.tl.fadeIn(Image_TL_Data[Image_TL_Number].split(",")[2]*1);
                    break;
                  case "fadeout":
                    Move_Image.tl.fadeOut(Image_TL_Data[Image_TL_Number].split(",")[2]*1);
                    break;
                  case "scale変更":
                    Move_Image.scaleX = Image_TL_Data[Image_TL_Number].split(",")[2]*1;
                    Move_Image.scaleY = Image_TL_Data[Image_TL_Number].split(",")[3]*1;
                    break;
                  case "画像変更":
                    Move_Image._element.src = Image_TL_Data[Image_TL_Number].split(",")[2];
                    break;
                  default:
                    Move_Image.VX = Image_TL_Data[Image_TL_Number].split(",")[1]*1;
                    Move_Image.VY = Image_TL_Data[Image_TL_Number].split(",")[2]*1;
                    Move_Image.VA = Image_TL_Data[Image_TL_Number].split(",")[3]*1;
                    Move_Image.tl.moveTo(Move_Image.VX,Move_Image.VY,Move_Image.VA);
                    break;
                }
                Image_TL_Number++
                break;
              case "名前":
                scene.addChild(Name_text);
                break;
              case "Pad":
                scene.addChild(Ui_Pad[Pad_Number]);
                Pad_Number++;
                break;
              case "マップ":
                if(Map_area[Map_area_Number].描写) scene.addChild(Map_area[Map_area_Number]);
                Map_area_Number++;
                break;
              case "次に進む":
                Next = Next_Data;
                break;
              case "Ю":
                Display_time++;
                if(FPS==0){
                  Text_Generate();
                  Texts();
                  return;
                }
                if(Display_time%FPS!=0) return;
                Itimozi_Number++;
                Text_Generate();
                return;
                break;
            }
            Text_Number++;
            Itimozi_Number++;
            Texts();
            return;
            break;
          case " ":
            Text_X += Text_Interval;
            Text_Number++;
            Texts();
            return;
            break;
          default:
            break;
        }
        Display_time++;
        if(FPS==0){
          Text_Generate();
          Texts();
          return;
        }
        if(Display_time%FPS!=0) return;
        Text_Generate();
        return;
      }

      function Text_Generate(){
        Display_time = 0;
        Text[Text.length] = new Sprite();
        Text[Text.length-1]._element = document.createElement("innerHTML");
        Text[Text.length-1]._style.font  = PX + "px monospace";
        Text[Text.length-1]._element.textContent = Itimozi;
        Text[Text.length-1].x = Text_X;
        Text[Text.length-1].y = Text_Y;
        if(Text_Color.substring(0,2)=="点滅"){
          Text[Text.length-1].点滅 = true;
          Text[Text.length-1]._style.color = Text_Color.substring(2);
        }
        else{
          Text[Text.length-1].点滅 = false;
          Text[Text.length-1]._style.color = Text_Color;
        }
        Text_X += Text_Interval;
        if(Text_X + Text_Interval > 405){
          Text_X  = PX;
          Text_Y += PX*1.5;
        }
        if(FPS > 0) Sound_branch(Text_Sound);
        scene.addChild(Text[Text.length-1]);
        Text_Number++;
        return;
      }

      Texts();
      var Map_Time = 0;
      var Map_move = true;

      scene.addEventListener("enterframe",function(){
        for (var i = 0; i < Map_area.length; i++) if(Map_area[i].動) Map_area[i].frame++;
        if(Map_Time!=0){
          Map_Time--;
        }
        if(Map_Button){
          for (var i = 0; i < Map_area.length; i++) {
            if(Map_area[i].調べる){
              if(Map_area[i].x==Character_front.x&&Map_area[i].y==Character_front.y){
                Map_Button.text = Map_area[i].ボタン;
                Map_Button._style["font-size"] = Map_area[i].ボタンサイズ;
                Map_Button.sound = Map_area[i].ボタン音;
                Map_Button.シーンナンバー = Map_area[i].調べる;
                Map_Button.ボタンナンバー = i;
                break;
              }
            }
          }
          if(i==Map_area.length){
            Map_Button.text = Map_Button.default_text;
            Map_Button._style["font-size"] = Map_Button.default_font_size;
            Map_Button.sound = Map_Button.default_sound;
            Map_Button.シーンナンバー = Map_Button.default_SceneNumber;
            Map_Button.ボタンナンバー = "無し";
          }
        }
        if(Map_Time==7&&Map_move) Character.frame++;
        if(Map_Time==5&&Map_move) Character.frame++;
        if(Map_Time==3&&Map_move) Character.frame--;
        if(Map_Time==1&&Map_move){
          for (var i = 0; i < Map_area.length; i++) {
            if(Map_area[i].シーン){
              if(Map_area[i].x==Character.x&&Map_area[i].y==Character.y){
                Map_Time--;
                Scene_load(Map_area[i].シーン);
                return;
              }
            }
          }
        }
        if(Characters_Data&&Map_Time==0) Map_move = true;
        if(Next){
          if(Next_Time==0){
            Scene_load(Next);
            return;
          }
          Next_Time--;
        }
        if(BGM_Change != 0){
          BGM_Volume += BGM_Change;
          if(BGM_Change > 0){
            if(BGM_Volume > BGM_volume/10){
              BGM.volume = BGM_volume/10;
              BGM_Change = 0;
            }
            else BGM.volume = BGM_Volume;
          }
          else if(BGM_Change < 0){
            if(BGM_Volume < 0){
              BGM.volume = 0;
              BGM_Change = 0;
            }
            else BGM.volume = BGM_Volume;
          }
        }
        for (var i = 0; i < Text.length; i++) {
          if(Text[i].点滅) Text[i].opacity = Opacity;
        }
        Opacity += Opacitys;
        if(Opacity < 0) Opacitys = 0.02;
        if(Opacity > 1) Opacitys = -0.02;
        Texts();
        for (var i = 0; i < Ui_Pad.length; i++) {
          Ui_Pad[i]._element.src = Ui_Pad[i].default_imageurl;
          Ui_Pad[i].rotation = 0;
        }
        if(game.input.up){
          if(Characters_Data&&Map_Time==0){
            if(Character.frame==10){
              for (var i = 0; i < Map_area.length; i++) {
                if(Map_area[i].x==Character_front.x&&Map_area[i].y==Character_front.y){
                  if(Map_area[i].データ=="■") break;
                  if(Map_area[i].データ=="□"){
                    Scene_load(Map_area[i].向かう);
                    return;
                  }
                }
              }
              if(i==Map_area.length){
                Map_Time = 9;
                Character.frame = 9;
                if(Character.y < 135 && Map_Image[0].y < 0){
                  for (var i = 0; i < Flag.length; i++) {
                    if(Flag[i].split("==")[0]=="マップY"){
                      Flag[i] = "マップY==" + (Flag[i].split("==")[1]*1 - 1);
                      break;
                    }
                  }
                  console.log(Flag[i]);
                  for (var k = 0; k < Map_area.length; k++) {
                    if(Map_area[k].描写) Map_area[k].tl.moveTo(Map_area[k].x,Map_area[k].y+27,8);
                    else Map_area[k].y += 27;
                  }
                  for (var k = 0; k < Map_Image.length; k++) {
                    Map_Image[k].tl.moveTo(Map_Image[k].x,Map_Image[k].y+27,8);
                  }
                }
                else{
                  for (var i = 0; i < Flag.length; i++) {
                    if(Flag[i].split("==")[0]=="キャラY"){
                      Flag[i] = "キャラY==" + Character_front.y/27;
                      break;
                    }
                  }
                  console.log(Flag[i]);
                  Character_front.tl.moveTo(Character_front.x,Character_front.y-27,8);
                  Character.tl.moveTo(Character.x,Character.y-27,8);
                }
              }
              //else Character.frame = 11;
            }
            else{
              Map_Time = 6;
              Map_move = false;
              Character.frame = 10;
              Character_front.x = Character.x;
              Character_front.y = Character.y-27;
              for (var i = 0; i < Flag.length; i++) {
                if(Flag[i].split("==")[0]=="キャラ向き"){
                  Flag[i] = "キャラ向き==上";
                  break;
                }
              }
            }
          }
          for (var i = 0; i < Ui_Pad.length; i++) {
            Ui_Pad[i].rotation = 0;
            Ui_Pad[i]._element.src = Ui_Pad[i].keyDOWN_imageurl;
          }
        }
        if(game.input.down){
          if(Characters_Data&&Map_Time==0){
            if(Character.frame==1){
              for (var i = 0; i < Map_area.length; i++) {
                if(Map_area[i].x==Character_front.x&&Map_area[i].y==Character_front.y){
                  if(Map_area[i].データ=="■") break;
                  if(Map_area[i].データ=="□"){
                    Scene_load(Map_area[i].向かう);
                    return;
                  }
                }
              }
              if(i==Map_area.length){
                Map_Time = 9;
                Character.frame = 0;
                if(Character.y > 81 && Map_Image[0].height * 27/Map_scale + Map_Image[0].y > 243){
                  for (var i = 0; i < Flag.length; i++) {
                    if(Flag[i].split("==")[0]=="マップY"){
                      Flag[i] = "マップY==" + (Flag[i].split("==")[1]*1 + 1);
                      break;
                    }
                  }
                  console.log(Flag[i]);
                  for (var k = 0; k < Map_area.length; k++) {
                    if(Map_area[k].描写) Map_area[k].tl.moveTo(Map_area[k].x,Map_area[k].y-27,8);
                    else Map_area[k].y -= 27;
                  }
                  for (var k = 0; k < Map_Image.length; k++) {
                    Map_Image[k].tl.moveTo(Map_Image[k].x,Map_Image[k].y-27,8);
                  }
                }
                else{
                  for (var i = 0; i < Flag.length; i++) {
                    if(Flag[i].split("==")[0]=="キャラY"){
                      Flag[i] = "キャラY==" + Character_front.y/27;
                      break;
                    }
                  }
                  console.log(Flag[i]);
                  Character_front.tl.moveTo(Character_front.x,Character_front.y+27,8);
                  Character.tl.moveTo(Character.x,Character.y+27,8);
                }
              }
              //else Character.frame = 2;
            }
            else{
              Map_Time = 6;
              Map_move = false;
              Character.frame = 1;
              Character_front.x = Character.x;
              Character_front.y = Character.y+27;
              for (var i = 0; i < Flag.length; i++) {
                if(Flag[i].split("==")[0]=="キャラ向き"){
                  Flag[i] = "キャラ向き==下";
                  break;
                }
              }
            }
          }
          for (var i = 0; i < Ui_Pad.length; i++) {
            Ui_Pad[i].rotation = 180;
            Ui_Pad[i]._element.src = Ui_Pad[i].keyDOWN_imageurl;
          }
        }
        if(game.input.left){
          if(Characters_Data&&Map_Time==0){
            if(Character.frame==4){
              for (var i = 0; i < Map_area.length; i++) {
                if(Map_area[i].x==Character_front.x&&Map_area[i].y==Character_front.y){
                  if(Map_area[i].データ=="■") break;
                  if(Map_area[i].データ=="□"){
                    Scene_load(Map_area[i].向かう);
                    return;
                  }
                }
              }
              if(i==Map_area.length){
                Map_Time = 9;
                Character.frame = 3;
                if(Character.x < 216 && Map_Image[0].x < 0){
                  for (var i = 0; i < Flag.length; i++) {
                    if(Flag[i].split("==")[0]=="マップX"){
                      Flag[i] = "マップX==" + (Flag[i].split("==")[1]*1 - 1);
                      break;
                    }
                  }
                  console.log(Flag[i]);
                  for (var k = 0; k < Map_area.length; k++) {
                    if(Map_area[k].描写) Map_area[k].tl.moveTo(Map_area[k].x+27,Map_area[k].y,8);
                    else Map_area[k].x += 27;
                  }
                  for (var k = 0; k < Map_Image.length; k++) {
                    Map_Image[k].tl.moveTo(Map_Image[k].x+27,Map_Image[k].y,8);
                  }
                }
                else{
                  for (var i = 0; i < Flag.length; i++) {
                    if(Flag[i].split("==")[0]=="キャラX"){
                      Flag[i] = "キャラX==" + Character_front.x/27;
                      break;
                    }
                  }
                  console.log(Flag[i]);
                  Character_front.tl.moveTo(Character_front.x-27,Character_front.y,8);
                  Character.tl.moveTo(Character.x-27,Character.y,8);
                }
              }
              //else Character.frame = 5;
            }
            else{
              Map_Time = 6;
              Map_move = false;
              Character.frame = 4;
              Character_front.x = Character.x-27;
              Character_front.y = Character.y;
              for (var i = 0; i < Flag.length; i++) {
                if(Flag[i].split("==")[0]=="キャラ向き"){
                  Flag[i] = "キャラ向き==左";
                  break;
                }
              }
            }
          }
          for (var i = 0; i < Ui_Pad.length; i++) {
            Ui_Pad[i].rotation = -90;
            Ui_Pad[i]._element.src = Ui_Pad[i].keyDOWN_imageurl;
          }
        }
        if(game.input.right){
          if(Characters_Data&&Map_Time==0){
            if(Character.frame==7){
              for (var i = 0; i < Map_area.length; i++) {
                if(Map_area[i].x==Character_front.x&&Map_area[i].y==Character_front.y){
                  if(Map_area[i].データ=="■") break;
                  if(Map_area[i].データ=="□"){
                    Scene_load(Map_area[i].向かう);
                    return;
                  }
                }
              }
              if(i==Map_area.length){
                Map_Time = 9;
                Character.frame = 6;
                if(Character.x > 162 && Map_Image[0].width * 27/Map_scale + Map_Image[0].x > 405){
                  for (var i = 0; i < Flag.length; i++) {
                    if(Flag[i].split("==")[0]=="マップX"){
                      Flag[i] = "マップX==" + (Flag[i].split("==")[1]*1 + 1);
                      break;
                    }
                  }
                  console.log(Flag[i]);
                  for (var k = 0; k < Map_area.length; k++) {
                    if(Map_area[k].描写) Map_area[k].tl.moveTo(Map_area[k].x-27,Map_area[k].y,8);
                    else Map_area[k].x -= 27;
                  }
                  for (var k = 0; k < Map_Image.length; k++) {
                    Map_Image[k].tl.moveTo(Map_Image[k].x-27,Map_Image[k].y,8);
                  }
                }
                else{
                  for (var i = 0; i < Flag.length; i++) {
                    if(Flag[i].split("==")[0]=="キャラX"){
                      Flag[i] = "キャラX==" + Character_front.x/27;
                      break;
                    }
                  }
                  console.log(Flag[i]);
                  Character_front.tl.moveTo(Character_front.x+27,Character_front.y,8);
                  Character.tl.moveTo(Character.x+27,Character.y,8);
                }
              }
              //else Character.frame = 8;
            }
            else{
              Map_Time = 6;
              Map_move = false;
              Character.frame = 7;
              Character_front.x = Character.x+27;
              Character_front.y = Character.y;
              for (var i = 0; i < Flag.length; i++) {
                if(Flag[i].split("==")[0]=="キャラ向き"){
                  Flag[i] = "キャラ向き==右";
                  break;
                }
              }
            }
          }
          for (var i = 0; i < Ui_Pad.length; i++) {
            Ui_Pad[i].rotation = 90;
            Ui_Pad[i]._element.src = Ui_Pad[i].keyDOWN_imageurl;
          }
        }
        if(game.input.R) console.log("R");
        return;
      });

      scene.addEventListener("touchend",function(e){
        console.log(e.x);
        console.log(e.y);
        for (var k = 0; k < Flag.length; k++) {
          if(Flag[k].split("==")[0]=="マップX") var Map_X = Flag[k].split("==")[1]*1;
          if(Flag[k].split("==")[0]=="マップY") var Map_Y = Flag[k].split("==")[1]*1;
        }
        var EX = e.x/27 + "";
        var EY = e.y/27 + "";
        EX = EX.split(".")[0]*1;
        EY = EY.split(".")[0]*1;
        console.log("(マップ:壁,赤,無し,"+ (EX + Map_X) +"," + (EY + Map_Y) + ",■:マップ)");
      });

      return scene;
    };
    var Loading_Scene = function(Type){

        var scene = new Scene();                                // 新しいシーンを作る

        var Background = new Sprite();
        Background._element = document.createElement("img");
        Background._element.src = "../image/半透明黒.png";
        Background.width = width;
        Background.height = height;
        scene.addChild(Background);

        var Loading = new Entity();
        Loading._element = document.createElement("img");
        if(Type=="読み込み") Loading._element.src = "../image/読み込み中.gif";
        else Loading._element.src = "../image/保存中.gif";
        Loading.width = width;
        Loading.height = height;
        scene.addChild(Loading);

        return scene;
    };
    var R_Main_Scene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Saikyo = false;
      var AI = 100;//AIの先攻後攻設定
      var okerutenmetu = 0;//置ける場所の表示
      var kazutenmetu = 0;//置ける場所にひっくり返る数表示
      var Time_Start = 0;
      var bamen = 0;
      var Intiki = false;

      var va = 1;
      var te = 1;
      var Kagayaki = 1;
      var Time = 0;
      var Time_Hand = 5;
      var Time_R_ensyutu = 0;
      var Time_Kagayaki = 0;
      var Black_Number = 0;
      var White_Number = 0;

      var Pointer = new Sprite(1,1);
      Pointer.image = game.assets["../image/Hand.png"];

      var Reversi = new Sprite(405,405);
      Reversi.image = game.assets["../image/Reversi.png"];
      Reversi.x = 0;
      Reversi.y = 40;
      scene.addChild(Reversi);

      var Set_button = new Sprite(195,95);
      Set_button.image = game.assets["../image/Set_button.png"];
      Set_button.x = 105;
      Set_button.y = 195;
      scene.addChild(Set_button);

      var Set_button1 = new Sprite(195,95);
      Set_button1.image = game.assets["../image/Set_button.png"];
      Set_button1.x = 5;
      Set_button1.y = 295;
      Set_button1.frame = 1;
      scene.addChild(Set_button1);

      var Set_button2 = new Sprite(195,95);
      Set_button2.image = game.assets["../image/Set_button.png"];
      Set_button2.x = 205;
      Set_button2.y = 295;
      Set_button2.frame = 2;
      scene.addChild(Set_button2);

      var Set_button3 = new Sprite(195,95);
      Set_button3.image = game.assets["../image/Set_button.png"];
      Set_button3.x = 205;
      Set_button3.y = 145;
      Set_button3.frame = 9;

      var Set_button4 = new Sprite(195,95);
      Set_button4.image = game.assets["../image/Set_button.png"];
      Set_button4.x = 105;
      Set_button4.y = 455;
      Set_button4.frame = 12;
      scene.addChild(Set_button4);
      Set_button4.addEventListener("touchend",function(e){
        game.pushScene(R_Return_Scene());
      });

      var Set_button5 = new Sprite(195,95);
      Set_button5.image = game.assets["../image/Set_button.png"];
      Set_button5.x = 105;
      Set_button5.y = 245;
      Set_button5.frame = 11;

      var Stone = Class.create(Sprite, {
        initialize: function(x,y,z) {
          Sprite.call(this, 45, 45);
          this.x = 50*x+5;
          this.y = 50*y+45;
          this.image = game.assets["../image/stone.png"];
          this.ura = z;
          if(z==3) z = 1;
          this.frame = z;
        }
      });

      var text = Class.create(Label, {
        initialize: function(x,y,ward) {
          Label.call(this);
          this.x = 50*x+5;
          this.y = 50*y+45;
          this.color = 'red';
          this.font = '20px "Arial"';
          this.on('enterframe', function(){
            this.text = (ward);
          });
        }
      });

      var Stones = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ];
      var uragaerukazu = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ];

      var urahyouzi = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ];

      var priority = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ];

      var priority_cat = [
        [-300,-20,-20,-20,-20,-20,-20,-300],
        [-20,1,-1,-1,-1,-1,1,-20],
        [-20,-1,-1,-1,-1,-1,-1,-20],
        [-20,-1,-1,-1,-1,-1,-1,-20],
        [-20,-1,-1,-1,-1,-1,-1,-20],
        [-20,-1,-1,-1,-1,-1,-1,-20],
        [-20,1,-1,-1,-1,-1,1,-20],
        [-300,-20,-20,-20,-20,-20,-20,-300]
      ];

      var priority_otter = [
        [3,2,2,2,2,2,2,3],
        [2,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,2],
        [3,2,2,2,2,2,2,3]
      ];

      var priority_people = [
        [ 30,-12,  0, -1, -1,  0,-12, 30],
        [-12,-15, -3, -3, -3, -3,-15,-12],
        [  0, -3,  0, -1, -1,  0, -3,  0],
        [ -1, -3, -1, -1, -1, -1, -3, -1],
        [ -1, -3, -1, -1, -1, -1, -3, -1],
        [  0, -3,  0, -1, -1,  0, -3,  0],
        [-12,-15, -3, -3, -3, -3,-15,-12],
        [ 30,-12,  0, -1, -1,  0,-12, 30]
      ];

      var Cheetah = [
        [ 0,90, 3, 5, 5, 3,90, 0],
        [90, 0, 1, 1, 1, 1, 0,90],
        [ 3, 1, 1, 1, 1, 1, 1, 3],
        [ 5, 1, 1, 1, 1, 1, 1, 5],
        [ 5, 1, 1, 1, 1, 1, 1, 5],
        [ 3, 1, 1, 1, 1, 1, 1, 3],
        [90, 0, 1, 1, 1, 1, 0,90],
        [ 0,90, 3, 5, 5, 3,90, 0]
      ];

      for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
          var z = Stones[y][x];
          Stones[y][x] = new Stone(x,y,z);
          var z = uragaerukazu[y][x];
          urahyouzi[y][x] = new text(x,y,z);
        }
      }

      var Hand = new Sprite(280,370);
      Hand.image = game.assets["../image/Hand.png"];

      /*var label = new Label();
      label.x = 5;
      label.y = 5;
      label.color = 'black';
      label.font = '40px "Arial"';
      label.on('enterframe', function(){
        label.text = (Time_R_ensyutu);
      });
      scene.addChild(label);*/

      var label1 = new Label();
      label1.x = 5;
      label1.y = 5;
      label1.color = 'black';
      label1.font = '40px "Arial"';
      label1.on('enterframe', function(){
        if(va==1) var van = "黒の番";
        if(va==2) var van = "白の番";
        if(va==3){
          var van = "";
          W_D();
        }
        label1.text = (van);
      });
      //scene.addChild(label1);

      var label2 = new Label();
      label2.x = 155;
      label2.y = 20;
      label2.color = 'black';
      label2.font = '20px "Arial"';
      label2.on('enterframe', function(){
        kazoeru();
        var van = "黒"+Black_Number;
        label2.text = (van);
      });
      //scene.addChild(label2);

      var label3 = new Label();
      label3.x = 205;
      label3.y = 20;
      label3.color = 'black';
      label3.font = '20px "Arial"';
      label3.on('enterframe', function(){
        kazoeru();
        var van = "白"+White_Number;
        label3.text = (van);
      });
      //scene.addChild(label3);

      var label4 = new Label();
      label4.x = 255;
      label4.y = 20;
      label4.color = 'black';
      label4.font = '20px "Arial"';
      label4.on('enterframe', function(){
        if(va==3) var van = "";
        else var van = te + "手目";
        label4.text = (van);
      });
      //scene.addChild(label4);

      function kazoeru(){
        Black_Number = 0;
        White_Number = 0;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            if(Stones[y][x].ura==1) Black_Number++;
            if(Stones[y][x].ura==2) White_Number++;
          }
        }
      }

      function bankirikae(){
        if(va==1||va==10) va = 2;
        else if(va==2||va==20) va = 1;
        else ;
      }

      function hyouzisuru(){
        bamen = 3;
        te = 1;
        Pointer.y     = 0;
        Set_button.y  = 500;
        Set_button1.y = 500;
        Set_button2.y = 500;
        scene.removeChild(Pointer);
        scene.removeChild(Set_button);
        scene.removeChild(Set_button1);
        scene.removeChild(Set_button2);
        scene.removeChild(Set_button3);
        scene.removeChild(Set_button5);
        scene.addChild(label1);
        scene.addChild(label2);
        scene.addChild(label3);
        scene.addChild(label4);
        reset();
        va = 1;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            scene.addChild(Stones[y][x]);
          }
        }
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            operating(x,y,va);
          }
        }
      }

      Reversi.addEventListener("enterframe",function(){//常に動く
        if(bamen==0) return;
        if(Time_Hand>5) scene.removeChild(Hand);
        if(va==AI&&Time_Hand>10) AI_dousa(); //AIが置くまでの時間
        if(Time_R_ensyutu>0) Time_R_ensyutu = 0;
        Time++;
        Time_R_ensyutu++;
        Time_Hand++;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            Flashing(x,y);
          }
        }
        Time_Kagayaki = Time_Kagayaki+0.2*Kagayaki;
        if(Time_Kagayaki>=0.8||Time_Kagayaki<=0.01) Kagayaki = Kagayaki*(-1);
      })

      function  Flashing(x,y){
        scene.addChild(Pointer);
        Pointer.x = 0;
        Pointer.y = 0;
        scene.removeChild(Pointer);
        if(Stones[y][x].ura==3){
          if(Time_R_ensyutu>0){
            if(va==AI) var aw = 1;//AIの時は演出カット = 0
            else var aw = 1;
            Stones[y][x].opacity = Time_Kagayaki*aw*okerutenmetu;//置ける場所点滅表示
            urahyouzi[y][x].opacity = 1*aw*kazutenmetu;//置ける数表示
          }
          else{
            Stones[y][x].opacity = 0;
            urahyouzi[y][x].opacity = 0;//置ける場所点滅表示
          }
        }
        else if(Stones[y][x].ura==10){
          if(Time_R_ensyutu<-5)Stones[y][x].frame = 3;
          else if(Time_R_ensyutu>-5&&Time_R_ensyutu<-3) Stones[y][x].frame = 4;
          else if(Time_R_ensyutu>-3&&Time_R_ensyutu<-1) Stones[y][x].frame = 5;
          else if(Time_R_ensyutu==0){
            Stones[y][x].ura = 1;
            Stones[y][x].frame = 1;
          }
        }
        else if(Stones[y][x].ura==20){
          if(Time_R_ensyutu<-5)Stones[y][x].frame = 6;
          else if(Time_R_ensyutu>-5&&Time_R_ensyutu<-3) Stones[y][x].frame = 7;
          else if(Time_R_ensyutu>-3&&Time_R_ensyutu<-1) Stones[y][x].frame = 8;
          else if(Time_R_ensyutu==0){
            Stones[y][x].ura = 2;
            Stones[y][x].frame = 2;
          }
        }
        else Stones[y][x].opacity = 1;
      }

      function okuugoki(){
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            if(Stones[y][x].intersect(Pointer)&&Stones[y][x].ura==3&&Time>0){//接触
              Time_Hand = 0;
              console.log(te+"手目横"+(x+1)+"縦"+(y+1));
              te++;
              Stones[y][x].ura = va;
              operating(x,y,va,true);
              bankirikae();
              for (var x = 0; x < 8; x++) {
                for (var y = 0; y < 8; y++) {
                  operating(x,y,va);
                }
              }
            }
          }
        }
        var okeru = false;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            if(Stones[y][x].ura==3) okeru = true;
          }
        }
        if(okeru==false){
          bankirikae();
          for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
              operating(x,y,va);
            }
          }
        }
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            if(Stones[y][x].ura==3) okeru = true;
          }
        }
        if(okeru==false) va = 3;
      }

      function reset(){
        va = 2;
        Time = 0;
        Time_Hand = 5;
        Time_R_ensyutu = 0;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            Stones[y][x].ura = 0;
            Stones[y][x].frame = 0;
            if(x==3&&y==3){
              Stones[y][x].ura = 2;
              Stones[y][x].frame = 2;
            }
            if(x==4&&y==4){
              Stones[y][x].ura = 2;
              Stones[y][x].frame = 2;
            }
            if(x==3&&y==4){
              Stones[y][x].ura = 1;
              Stones[y][x].frame = 1;
            }
            if(x==4&&y==3){
              Stones[y][x].ura = 1;
              Stones[y][x].frame = 1;
            }
          }
        }
      }

      function operating(x,y,z,t){
        var ura_kazu = 0;
        var ura_TF = false;
        for(var i = x + 1; i < 8; i++){//右方向
          if(Stones[y][i].ura==0||Stones[y][i].ura==3) break;
          if(Stones[y][i].ura==z){
            ura_TF = true;
            break;
          }
        }
        for(var k = x + 1; k < i; k++){
          if(ura_TF == false) break;
          if(t==true) reber(k,y,z);
          ura_kazu++;
        }//右方向

        var ura_TF = false;
        for(var i = x - 1; i >= 0; i--){//左方向
          if(Stones[y][i].ura==0||Stones[y][i].ura==3) break;
          if(Stones[y][i].ura==z||Stones[y][i].ura==z*10){
            ura_TF = true;
            break;
          }
        }
        for(var k = x - 1; k > i; k--){
          if(ura_TF == false) break;
          if(t==true) reber(k,y,z);
          ura_kazu++;
        }//左方向

        var ura_TF = false;
        for(var i = y - 1; i >= 0; i--){//上方向
          if(Stones[i][x].ura==0||Stones[i][x].ura==3) break;
          if(Stones[i][x].ura==z||Stones[i][x].ura==z*10){
            ura_TF = true;
            break;
          }
        }
        for(var k = y - 1; k > i; k--){
          if(ura_TF == false) break;
          if(t==true) reber(x,k,z);
          ura_kazu++;
        }//上方向

        var ura_TF = false;
        for(var i = y + 1; i < 8; i++){//下方向
          if(Stones[i][x].ura==0||Stones[i][x].ura==3) break;
          if(Stones[i][x].ura==z||Stones[i][x].ura==z*10){
            ura_TF = true;
            break;
          }
        }
        for(var k = y + 1; k < i; k++){
          if(ura_TF == false) break;
          if(t==true) reber(x,k,z);
          ura_kazu++;
        }//下方向

        var k = 1;
        var ura_TF = false;
        for(var i = x + 1; i < 8; i++){//右上方向
          if(y==0) break;
          if(Stones[y-k][i].ura==0||Stones[y-k][i].ura==3) break;
          if(Stones[y-k][i].ura==z||Stones[y-k][i].ura==z*10){
            ura_TF = true;
            break;
          }
          if(y-k==0) break;
          k++;
        }
        var k = 1;
        for(var s = x + 1; s < i; s++){
          if(ura_TF == false) break;
          if(y==0) break;
          if(t==true) reber(s,y-k,z);
          ura_kazu++;
          if(y-k==0) break;
          k++;
        };//右上方向

        var k = 1;
        var ura_TF = false;
        for(var i = x + 1; i < 8; i++){//右下方向
          if(y==7) break;
          if(Stones[y+k][i].ura==0||Stones[y+k][i].ura==3) break;
          if(Stones[y+k][i].ura==z||Stones[y+k][i].ura==z*10){
            ura_TF = true;
            break;
          }
          if(y+k==7) break;
          k++;
        }
        var k = 1;
        for(var s = x + 1; s < i; s++){
          if(ura_TF == false) break;
          if(y==7) break;
          if(t==true) reber(s,y+k,z);
          ura_kazu++;
          if(y+k==7) break;
          k++;
        }//右下方向

        var k = 1;
        var ura_TF = false;
        for(var i = x - 1; i >= 0; i--){//左上方向
          if(y==0) break;
          if(Stones[y-k][i].ura==0||Stones[y-k][i].ura==3) break;
          if(Stones[y-k][i].ura==z||Stones[y-k][i].ura==z*10){
            ura_TF = true;
            break;
          }
          if(y-k==0) break;
          k++;
        }
        var k = 1;
        for(var s = x - 1; s > i; s--){
          if(ura_TF == false) break;
          if(y==0) break;
          if(t==true) reber(s,y-k,z);
          ura_kazu++;
          if(y-k==0) break;
          k++;
        };//左上方向

        var k = 1;
        var ura_TF = false;
        for(var i = x - 1; i >= 0; i--){//左下方向
          if(y==7) break;
          if(Stones[y+k][i].ura==0||Stones[y+k][i].ura==3) break;
          if(Stones[y+k][i].ura==z||Stones[y+k][i].ura==z*10){
            ura_TF = true;
            break;
          }
          if(y+k==7) break;
          k++;
        }
        var k = 1;
        for(var s = x - 1; s > i; s--){
          if(ura_TF == false) break;
          if(y==7) break;
          if(t==true) reber(s,y+k,z);
          ura_kazu++;
          if(y+k==7) break;
          k++;
        }
        if(t==true) return;
        if(ura_kazu>0&&(Stones[y][x].ura==0||Stones[y][x].ura==3)){
          Stones[y][x].ura = 3;
          Stones[y][x].frame = z;
        }
        else {
          if(Stones[y][x].ura==3){
            Stones[y][x].ura = 0;
            Stones[y][x].frame = 0;
          }
        }
        if (Stones[y][x].ura!=0&&Stones[y][x].ura!=3) ura_kazu = 0;
        uragaerukazu[y][x] = ura_kazu;
        if(ura_kazu>0){
          scene.removeChild(urahyouzi[y][x]);
          urahyouzi[y][x] = new text(x,y,uragaerukazu[y][x]);
          scene.addChild(urahyouzi[y][x]);
        }
        else {
          scene.removeChild(urahyouzi[y][x]);
        }
      }

      function operating_AI(){
        var Max = -1000000000;
        for (var x = 0; x < 8; x++) {
          for (var y = 0; y < 8; y++) {
            if(uragaerukazu[y][x]==0) continue;
            if(uragaerukazu[y][x]*priority[y][x]>Max){
              Max = uragaerukazu[y][x]*priority[y][x];
              var Max_x = x;
              var Max_y = y;
            }
          }
        }
        if(Max_x>3&&(Hand.frame==0||Hand.frame==1||Hand.frame==2)){
          Hand.frame += 3;
        }
        else if(Max_x<=3&&(Hand.frame==3||Hand.frame==4||Hand.frame==5)){
          Hand.frame -= 3;
        }
        if(Max_x>3&&Hand.frame==6){
          Hand.frame = 8;
        }
        else if(Max_x<=3&&Hand.frame==8){
          Hand.frame = 6;
        }
        return("横"+Max_x+"縦"+Max_y);
      }

      function reber(x,y,z){
        Time_R_ensyutu = -7;
        Stones[y][x].ura = 10*z;
      }

      function AI_dousa(){
        var text = operating_AI();
        x = text.substring(1,2)*1;
        y = text.substring(3,4)*1;
        Hand.x = x*50-230;
        Hand.y = y*50-300;
        if(Hand.frame==3||Hand.frame==4||Hand.frame==5||Hand.frame==8){
          Hand.x += 240;
        }
        scene.addChild(Hand);
        Pointer.x = x*50+25;
        Pointer.y = y*50+65;
        scene.addChild(Pointer);
        scene.removeChild(Pointer);
        okuugoki();
        Stone_memory[te] = Stones;
        console.log(Stone_memory);
      }

      function W_D(){
          if(Time_R_ensyutu!=0||AI == 100) return;
          var V_or_D = new Sprite(405,405);
          V_or_D.image = game.assets["../image/V_or_D.png"];
          V_or_D.x = 0;
          V_or_D.y = 40;
          if(Black_Number>White_Number){
            if(AI == 1)V_or_D.frame = 2;
            if(AI == 2)V_or_D.frame = 1;
          }
          else if(Black_Number<White_Number){
            if(AI == 1)V_or_D.frame = 1;
            if(AI == 2)V_or_D.frame = 2;
          }
          else V_or_D.frame = 3;
          if(Hand.frame==6||Hand.frame==8){
            if(V_or_D.frame==2) V_or_D.frame = 0;
            if(V_or_D.frame==1){
              V_or_D.frame = 4;
              if(Saikyo) V_or_D.frame = 5;
            }
          }
          scene.addChild(V_or_D);
          console.log(Black_Number);
          console.log(White_Number);
      }

      var Stone_memory = [];

      scene.addEventListener("touchend",function(e){
        if((Time_Hand>5&&va!=AI)||AI == 100){
          Pointer.x = e.x;
          Pointer.y = e.y;
          scene.addChild(Pointer);
          scene.removeChild(Pointer);
          okuugoki();
          Stone_memory[te] = Stones;
          console.log(Stone_memory);
        }
        if(Set_button.intersect(Pointer)){
          if(bamen==0){
            bamen++;
            Time = 0;
            Set_button.frame  = 3;
            Set_button1.frame = 4;
            Set_button2.frame = 5;
            scene.addChild(Set_button1);
            scene.addChild(Set_button2);
          }
          else if(bamen==1&&Time>0) hyouzisuru();
          else if(bamen==2&&Time>0){
            hyouzisuru();
            Hand.frame = 1;
            for (var x = 0; x < 8; x++) {
              for (var y = 0; y < 8; y++) {
                priority[y][x] = priority_otter[y][x];
              }
            }
          }
        }
        if(Set_button1.intersect(Pointer)){
          if(bamen==0){
            okerutenmetu = 1;
            scene.removeChild(Set_button1);
          }
          else if(bamen==1){
            AI = 1;
            bamen++;
            Time = 0;
            Set_button.frame  = 7;
            Set_button1.frame = 6;
            Set_button2.frame = 8;
            Set_button.x = 205;
            Set_button.y = 45;
            Set_button1.x = 5;
            Set_button1.y = 45;
            Set_button2.x = 5;
            Set_button2.y = 145;
            scene.addChild(Set_button3);
            scene.addChild(Set_button5);
          }
          else if(bamen==2&&Time>0){
            hyouzisuru();
            Hand.frame = 0;
            for (var x = 0; x < 8; x++) {
              for (var y = 0; y < 8; y++) {
                priority[y][x] = priority_cat[y][x];
              }
            }
          }
        }
        if(Set_button2.intersect(Pointer)){
          if(bamen==0){
            kazutenmetu = 1;
            scene.removeChild(Set_button2);
          }
          else if(bamen==1){
            AI = 2;
            bamen++;
            Time = 0;
            Set_button.frame  = 7;
            Set_button1.frame = 6;
            Set_button2.frame = 8;
            Set_button.x = 205;
            Set_button.y = 45;
            Set_button1.x = 5;
            Set_button1.y = 45;
            Set_button2.x = 5;
            Set_button2.y = 145;
            scene.addChild(Set_button3);
            scene.addChild(Set_button5);
          }
          else if(bamen==2&&Time>0){
            hyouzisuru();
            Hand.frame = 2;
            for (var x = 0; x < 8; x++) {
              for (var y = 0; y < 8; y++) {
                priority[y][x] = priority_people[y][x];
              }
            }
          }
        }
        if(Set_button3.intersect(Pointer)&&bamen==2&&Time>0){
          hyouzisuru();
          Stones[0][0].ura = AI;
          Stones[0][0].frame = AI;
          Stones[0][7].ura = AI;
          Stones[0][7].frame = AI;
          Stones[7][0].ura = AI;
          Stones[7][0].frame = AI;
          Stones[7][7].ura = AI;
          Stones[7][7].frame = AI;
          Hand.frame = 6;
          for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
              priority[y][x] = priority_otter[y][x];
            }
          }
        }
        if(Set_button5.intersect(Pointer)&&bamen==2&&Time>0){
          Saikyo = true;
          hyouzisuru();
          Stones[0][0].ura = AI;
          Stones[0][0].frame = AI;
          Stones[0][7].ura = AI;
          Stones[0][7].frame = AI;
          Stones[7][0].ura = AI;
          Stones[7][0].frame = AI;
          Stones[7][7].ura = AI;
          Stones[7][7].frame = AI;
          Hand.frame = 6;
          for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
              priority[y][x] = Cheetah[y][x];
            }
          }
        }
      });
      return scene;
    };
    var R_Return_Scene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Reversi = new Sprite(405,550);
      Reversi.image = game.assets["../image/白.png"];
      scene.addChild(Reversi);

      var Set_button = new Sprite(195,95);
      Set_button.image = game.assets["../image/Set_button.png"];
      Set_button.x = 105;
      Set_button.frame = 12;
      scene.addChild(Set_button);
      Set_button.addEventListener("touchend",function(e){
        game.popScene();
        game.replaceScene(R_Main_Scene());
      });

      var S_Input = new Button("メニューに戻る","light",width/2,95);
      S_Input.moveTo(width/4,300);
      S_Input._style["font-size"] = 25;
      scene.addChild(S_Input);
      S_Input.addEventListener("touchend",function(e){
        game.popScene();
        game.replaceScene(Start_Menu_Scene());
      });

      var Set_button1 = new Sprite(195,95);
      Set_button1.image = game.assets["../image/Set_button.png"];
      Set_button1.x = 105;
      Set_button1.y = 455;
      Set_button1.frame = 10;
      scene.addChild(Set_button1);
      Set_button1.addEventListener("touchend",function(e){
        game.popScene();
      });

      return scene;
    };
    var S_Main_Scene = function(V,V2){

      game.fps = 100;

      var scene = new Scene();                                // 新しいシーンを作る

      var Hand = new Sprite(1,1);
      Hand.image = game.assets["../image/Main.png"];
      scene.addChild(Hand);

      var Main = new Sprite(405,405);
      Main.image = game.assets["../image/Main.png"];
      Main.x = 0;
      Main.y = 0;
      scene.addChild(Main);

      var Start = new Sprite(40,40);
      Start.image = game.assets["../image/Number.png"];
      Start.x = width-40;
      Start.y = height-40;
      Start.frame = 10;
      scene.addChild(Start);

      var Hint = new Sprite(40,40);
      Hint.image = game.assets["../image/Number紫.png"];
      Hint.y = height-40;
      Hint.frame = 10;
      scene.addChild(Hint);

      var Numbers = Class.create(Sprite, {
        initialize: function(x,y,z,o) {
          Sprite.call(this,40,40);
          if(V) this.image = game.assets["../image/Number緑.png"];
          else this.image = game.assets["../image/Number.png"];
          this.x = x;
          this.y = y;
          this.frame = z;
          if(o) this.opacity = 0.5;
          scene.addChild(this);
        }
      });

      var I = 5;
      var K = 5;
      var Choice = 0;

      for (var i = 1; i < 82; i++){
        Number[i] = new Numbers(K,I,0);
        K = K+44;
        if(i%3==0) K = K+2;
        if(i%9==0){
          I = I+44;
          if(i%27==0) I = I+2;
          K = 5;
        }
      }

      for (var i = 1; i < 10; i++){
        Set[i] = new Numbers((i-1)*45,500,i,true);
      }

      var V_V = window.localStorage.getItem("数独");
      if(V_V&&!V) V = JSON.parse(V_V);

      if(V){
        for (var i = 1; i < 82; i++){
          if(V[i-1] != "ヒント") Number[i].frame = V[i-1];
          else{
            V[i-1] = 0;
            Number[i].frame = 0;
            Number[i].image = game.assets["../image/Number紫.png"];
          };
          if(V2){
            if(V2[i-1] == "黒" && V[i-1]) Number[i].image = game.assets["../image/Number.png"];
            if(V2[i-1] == "緑" && V[i-1]) Number[i].image = game.assets["../image/Number緑.png"];
            if(V2[i-1] == "紫" && V[i-1]) Number[i].image = game.assets["../image/Number紫.png"];
            if(V2[i-1] == "赤" && V[i-1]) Number[i].image = game.assets["../image/Number赤.png"];
            if(V2[i-1] == "青" && V[i-1]) Number[i].image = game.assets["../image/Number青.png"];
          };
        };
      }

      scene.addEventListener("touchend",function(e){
        Hand.x = e.x;
        Hand.y = e.y;
        for (var i = 1; i < 82; i++){
          if(Number[i].intersect(Hand)){
            if(V2){
              V2[i-1] = "緑";
              Number[i].image = game.assets["../image/Number緑.png"];
            };
            if(Choice==0){
              if(Number[i].frame==9) Number[i].frame=-1;
              Number[i].frame++;
            }
            else{
              if(Choice==Number[i].frame) Number[i].frame = 0;
              else Number[i].frame = Choice;
            }
          }
        }
        for (var i = 1; i < 10; i++){
          if(Set[i].intersect(Hand)){
            for (var k = 1; k < 10; k++){
              Set[k].opacity = 0.5;
            }
            if(Choice == Set[i].frame){
              Choice = 0;
              Set[i].opacity = 0.5;
            }
            else {
              Choice = Set[i].frame;
              Set[i].opacity = 1;
            }
          }
        }
        if(Start.intersect(Hand)){
          V = [];
          for (var i = 0; i < 81; i++) V[i] = Number[i+1].frame;
          switch(Choice){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
              game.fps = Choice;
              break;
            default:
              break;
          };
          game.replaceScene(Answer_Scene(V,V2,true));
        };
        if(Hint.intersect(Hand)){
          V = [];
          for (var i = 0; i < 81; i++) V[i] = Number[i+1].frame;
          game.replaceScene(Answer_Scene(V,V2,false));
        };
      });
      return scene;
    };
    var Answer_Scene_new = function(Number_place1,V2,Answer){

      var scene = new Scene();

      var S_Input = new Button("メニューに戻る","light",width/2,95);
      S_Input.moveTo(0,height-95);
      S_Input._style["font-size"] = 25;
      if(Answer) scene.addChild(S_Input);
      S_Input.addEventListener("touchend",function(e){
        game.replaceScene(Start_Menu_Scene());
      });

      var Start = new Sprite(40,40);
      Start.image = game.assets["../image/Number.png"];
      Start.x = width-40;
      Start.y = height-40;
      Start.frame = 11;
      scene.addChild(Start);
      Start.addEventListener("touchend",function(e){
        var V = [];
        for (var i = 0; i < 81; i++){
          V[i] = Number[i+1].frame;
        }
        game.replaceScene(S_Main_Scene(V,V2));
      });

      var Main = new Sprite(405,405);
      Main.image = game.assets["../image/Main.png"];
      Main.x = 0;
      Main.y = 0;
      scene.addChild(Main);

      var Move = new Sprite(40,40);
      Move.image = game.assets["../image/Number紫.png"];
      Move.x = width-120;
      Move.y = height-40;
      Move.frame = 11;
      scene.addChild(Move);

      var Numbers_image_set = Class.create(Sprite,{
        initialize: function(x,y,z,color){
          Sprite.call(this,40,40);
          this.x = x;
          this.y = y;
          switch(color){
            default:
              z = 0;
              this.image = game.assets["../image/Number赤.png"];
              break;
            case "黒":
            case undefined:
              this.image = game.assets["../image/Number.png"];
              break;
            case "緑":
              this.image = game.assets["../image/Number緑.png"];
              break;
            case "影":
              this.image = game.assets["../image/Number青.png"];
              this.opacity = 0;
              this.番号 = Numbers_Image_shadow.length;
              break;
          };
          this.frame = z;
          scene.addChild(this);
          if(color=="影"){
            this.addEventListener("touchend",function(e){
              label.text = Numbers_Image[this.番号].テキスト;
            });
          };
        }
      });

      var label = new Label();
      label.x = 0;
      label.y = 420;
      label.color = "red";
      label.font = "30px ゴシック";
      label.width = width;
      label.text = "";
      scene.addChild(label);

      var I = 5;
      var K = 5;
      var Choice = 0;
      var Numbers_Image = [];
      var Numbers_Image_shadow = [];

      if(!V2) V2 = [];

      for (var i = 1; i < 82; i++){
        Numbers_Image[i-1] = new Numbers_image_set(K,I,Number_place1[i-1],V2[i-1]);
        Numbers_Image_shadow[i-1] = new Numbers_image_set(K,I,0,"影");
        K = K+44;
        if(i%3==0) K = K+2;
        if(i%9==0){
          I = I+44;
          if(i%27==0) I = I+2;
          K = 5;
        };
      };

      var V3 = null;
      var Moved = false;
      var STOP = "通常";
      var Skip = {};
      var Look_Number1 = 0;
      var Look_Number2 = 0;
      var Length = 1;
      var Temp_Numbers = {};
      var Differents_Number1 = {};
      var Differents_Number2 = {};
      var Number_Change = false;
      var Number_check_case = "横";

      for(var I = 0; I < Number_place1.length; I++){
        if(Number_place1[I]) Number_place1[I] = {確定:Number_place1[I]};
        else Number_place1[I] = {
          1:"未確定",
          2:"未確定",
          3:"未確定",
          4:"未確定",
          5:"未確定",
          6:"未確定",
          7:"未確定",
          8:"未確定",
          9:"未確定"
        };
      };

      function Number_check(Type,Case,Look_Number_s){

        if(Type!="削除") for(var I = 0; I < Number_place1.length; I++) Numbers_Image_shadow[I].opacity = 0.5;
        switch(Case){
          case "横":
            Check_Number_places = [0,1,2,3,4,5,6,7,8];
            for(var I = 0; I < Check_Number_places.length; I++) Check_Number_places[I] += Look_Number_s*9;
            break;
          case "縦":
            Check_Number_places = [0,9,18,27,36,45,54,63,72];
            for(var I = 0; I < Check_Number_places.length; I++) Check_Number_places[I] += Look_Number_s;
            break;
          case "枠":
            Check_Number_places = [0,1,2,9,10,11,18,19,20];
            for(var I = 0; I < Check_Number_places.length; I++) Check_Number_places[I] += Look_Number_s*3;
            switch(Look_Number_s){
              case 3:
              case 4:
              case 5:
                for(var I = 0; I < Check_Number_places.length; I++) Check_Number_places[I] += 18;
                break;
              case 6:
              case 7:
              case 8:
                for(var I = 0; I < Check_Number_places.length; I++) Check_Number_places[I] += 36;
                break;
            };
            break;
        };

        if(Type!="削除"){
          for(var I = 0; I < Check_Number_places.length; I++) Numbers_Image_shadow[Check_Number_places[I]].opacity = 0;
        };

        switch(Type){
          case "削除":
          case "チェック":
            Fixeds = [];
            for(var I = 0; I < Check_Number_places.length; I++){
              if(Number_place1[Check_Number_places[I]].確定) Fixeds[Fixeds.length] = Number_place1[Check_Number_places[I]].確定;
            };
            for(var I = 0; I < Check_Number_places.length; I++){
              for(var K = 0; K < Fixeds.length; K++){
                delete Number_place1[Check_Number_places[I]][Fixeds[K]];
              };
              switch(Object.keys(Number_place1[Check_Number_places[I]]).length){
                case 0:
                  Number_Reset();
                  Length = 1;
                  Look_Number1 = 0;
                  Number_check_case = "横";
                  delete Number_place1[Temp_Number[0]][Temp_Number[1]];
                  return;
                case 1:
                  if(Type=="チェック"){
                    Temp1 = Check_Number_places[I];
                    if(!Number_place1[Temp1].確定){
                    Number_place1[Temp1] = {確定:Object.keys(Number_place1[Temp1])[0]};
                    Numbers_Image[Temp1].frame = Number_place1[Temp1].確定;
                    switch(STOP){
                      case "通常":
                        if(Temp1+1<10) label.text = "0" + (Temp1 + 1) + "に「" + Number_place1[Temp1].確定 + "」を入力。";
                        else label.text = (Temp1 + 1) + "に「" + Number_place1[Temp1].確定 + "」を入力。";
                        Numbers_Image[Temp1].image = game.assets["../image/Number赤.png"];
                        break;
                      case "仮入力":
                        if(Temp1+1<10) label.text = "0" + (Temp1 + 1) + "に「" + Number_place1[Temp1].確定 + "」を仮入力。";
                        else label.text = (Temp1 + 1) + "に「" + Number_place1[Temp1].確定 + "」を仮入力。";
                        Numbers_Image[Temp1].image = game.assets["../image/Number青.png"];
                        break;
                    };
                  };
                  };
                  break;
              };
            };
            break;
          case "入力":
            for(var K = 1; K < 10; K++){
              Temp1 = [];
              Temp2 = false;
              for(var I = 0; I < Check_Number_places.length; I++){
                if(Number_place1[Check_Number_places[I]][K]) Temp1[Temp1.length] = Check_Number_places[I];
              };
              if(Temp1.length==Length){
                for(var I = 0; I < Temp1.length; I++){
                  if(Temp_Numbers[Temp1[I]]){
                    if(!Temp_Numbers[Temp1[I]][K]){
                      Temp1 = Temp1[I];
                      Temp2 = true;
                    };
                  }
                  else{
                    Temp1 = Temp1[I];
                    Temp2 = true;
                  };
                };
              };
              if(Temp2){
                Number_place1[Temp1] = {確定:K};
                switch(STOP){
                  case "仮決定":
                    if(Temp1+1<10) label.text = "0" + (Temp1 + 1) + "に「" + K + "」を仮入力。";
                    else label.text = (Temp1 + 1) + "に「" + K + "」を仮入力。";
                    Numbers_Image[Temp1].image = game.assets["../image/Number紫.png"];
                    if(!Temp_Numbers[Temp1]) Temp_Numbers[Temp1] = {};
                    Temp_Numbers[Temp1][K] = true;
                    Temp_Number = [Temp1,K];
                    STOP = "仮入力";
                    break;
                  case "通常":
                    if(Temp1+1<10) label.text = "0" + (Temp1 + 1) + "に「" + K + "」を入力。";
                    else label.text = (Temp1 + 1) + "に「" + K + "」を入力。";
                    Numbers_Image[Temp1].image = game.assets["../image/Number赤.png"];
                    break;
                  case "仮入力":
                    if(Temp1+1<10) label.text = "0" + (Temp1 + 1) + "に「" + K + "」を仮入力。";
                    else label.text = (Temp1 + 1) + "に「" + K + "」を仮入力。";
                    Numbers_Image[Temp1].image = game.assets["../image/Number青.png"];
                    break;
                };
                Numbers_Image[Temp1].frame = K;
                Length = 1;
                Number_Change = true;
                Number_Different_Delete();
              };
            };
            break;
        };

        for(var I = 0; I < Check_Number_places.length; I++){
          Temp1 = Check_Number_places[I];
          if(Temp1<9) Numbers_Image[Temp1].テキスト = "0";
          else Numbers_Image[Temp1].テキスト = "";
          Numbers_Image[Temp1].テキスト += Temp1 + 1 + ":";
          if(Number_place1[Temp1].確定) Numbers_Image[Temp1].テキスト += Number_place1[Temp1].確定;
          else{
            for(J = 0; J < Object.keys(Number_place1[Temp1]).length; J++){
              Numbers_Image[Temp1].テキスト += Object.keys(Number_place1[Temp1])[J] + ",";
            };
            Numbers_Image[Temp1].テキスト = Numbers_Image[Temp1].テキスト.slice(0,-1);
          };
        };
      };

      function Number_Different_Delete(){
        for(var I = 0; I < 3; I++){
          K = 0;
          while(K!=9){
            switch(I){
              case 0:
                J = "横";
                break;
              case 1:
                J = "縦";
                break;
              case 2:
                J = "枠";
                break;
            };
            Number_check("削除",J,K);
            K++
          };
        };
        return;
      };

      function Number_Reset(){
        Number_place1 = JSON.parse(Number_place2);
        for(var I = 0; I < Number_place1.length; I++){
          if(Number_place1[I].確定) Numbers_Image[I].frame = Number_place1[I].確定;
          else{
            Numbers_Image[I].image = game.assets["../image/Number.png"];
            Numbers_Image[I].frame = 0;
          };
        };
        STOP = "通常";
        return;
      };

      function Number_input(){
        Number_check("入力",Number_check_case,Look_Number1);
        Number_Different_Delete();
        Number_check("チェック",Number_check_case,Look_Number1);
        Look_Number1++;
        if(Look_Number1==9){
          Look_Number1 = 0;
          switch(Number_check_case){
            case "横":
              Number_check_case = "縦";
              break;
            case "縦":
              Number_check_case = "枠";
              break;
            case "枠":
              Number_check_case = "横";
              if(!Number_Change){
                switch(STOP){
                  case "通常":
                    Number_place2 = JSON.stringify(Number_place1);
                    STOP = "仮決定";
                    Length++;
                    break;
                  case "仮決定":
                    Number_place1 = JSON.parse(Number_place2);
                    Length++;
                    break;
                  case "仮入力":
                    Number_Reset();
                    break;
                };
              };
              Number_Change = false;
              break;
          };
        };
        return;
      };

      Move.addEventListener("touchend",function(e){
        Number_input();
        return;
      });

      Number_Different_Delete();

      Complete = false;

      scene.addEventListener("enterframe",function(){

        if(Complete) return;

        if(Moved) Number_input();

        Complete = true;

        for(var I = 0; I < Number_place1.length; I++){
          if(!Number_place1[I].確定) Complete = false;
        };

        if(Complete) for(var I = 0; I < Number_place1.length; I++) Numbers_Image_shadow[I].opacity = 0;

        return;

        if(!Look_Number2) Number_Change = false;

        switch(STOP){
          case "通常":
          case "仮入力":
          case "青":
          case "赤":
            break;
            case "取り消し":
            case "スキップ":
            for (var i = 1; i < 82; i++){
              switch(V2[i-1]){
                case "青":
                  V[i-1] = "123456789";
                  V2[i-1] = "赤";
                  Number[i].frame = 0;
                  Number[i].image = game.assets["../image/Number赤.png"];
                  break;
                case "紫":
                  V[i-1] = "123456789";
                  V2[i-1] = "赤";
                  if(STOP=="スキップ") label.text = i + "の仮入力「" + Number[i].frame + "」を取消。";
                  else{
                    if(!Differents_Number1[i-1]) Differents_Number1[i-1] = [];
                    Differents_Number1[i-1][Differents_Number1[i-1].length] = Number[i].frame*1;
                    label.text = i + "の仮入力「" + Number[i].frame + "」は矛盾。";
                  };
                  Number[i].frame = 0;
                  Number[i].image = game.assets["../image/Number赤.png"];
                  break;
                case "赤":
                  if(V[i-1] > 9||V[i-1] == 0) V[i-1] = "123456789";
                  //console.log((i-1) + ":" + V[i-1]);
                  break;
                default:
                  //console.log(V2[i-1]);
                  break;
              };
            };
            if(STOP=="スキップ"||Temp_Number) STOP = "青";
            break;
          case "終了済み":
            return;
          default:
            label.text = STOP;
            STOP = "終了済み";
            return;
        };

        while(Look_Number1 < 27){
          Temp1 = [];
          for(var I = 0; I < Number_place1.length; I++) Numbers_Image_shadow[I].opacity = 0.5;
          switch(Look_Number1){
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
              for(var I = Look_Number1 * 9; I < Look_Number1 * 9 + 9; I++){
                Numbers_Image_shadow[I].opacity = 0;
                if(!Number_place1[I].確定) continue;
                Temp1[Temp1.length] = Number_place1[I].確定;
              };
              for(var I = Look_Number1 * 9; I < Look_Number1 * 9 + 9; I++){
                if(Number_place1[I].確定) continue;
                for (var K = 0; K < Temp1.length; K++) delete Number_place1[I][Temp1[K]];
              };
              break;
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
              for (var I = Look_Number1 - 9; I < Number_place1.length; I+=9){
                Numbers_Image_shadow[I].opacity = 0;
                if(!Number_place1[I].確定) continue;
                Temp1[Temp1.length] = Number_place1[I].確定;
              };
              for (var I = Look_Number1 - 9; I < Number_place1.length; I+=9){
                if(Number_place1[I].確定) continue;
                for (var K = 0; K < Temp1.length; K++) delete Number_place1[I][Temp1[K]];
              };
              break;
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
              switch(Look_Number1){
                case 18:
                  J = 0;
                  break;
                case 19:
                  J = 3;
                  break;
                case 20:
                  J = 6;
                  break;
                case 21:
                  J = 27;
                  break;
                case 22:
                  J = 30;
                  break;
                case 23:
                  J = 33;
                  break;
                case 24:
                  J = 54;
                  break;
                case 25:
                  J = 57;
                  break;
                case 26:
                  J = 60;
                  break;
              };
              for (var I = J; I < J + 21; I++){
                switch(I){
                  case J+3:
                    I = J + 9;
                    break;
                  case J+12:
                    I = J + 18;
                    break;
                };
                Numbers_Image_shadow[I].opacity = 0;
                if(!Number_place1[I].確定) continue;
                Temp1[Temp1.length] = Number_place1[I].確定;
              };
              for (var I = J; I < J + 21; I++){
                switch(I){
                  case J+3:
                    I = J + 9;
                    break;
                  case J+12:
                    I = J + 18;
                    break;
                };
                for (var K = 0; K < Temp1.length; K++){
                  if(Number_place1[I].確定) continue;
                  for (var K = 0; K < Temp1.length; K++) delete Number_place1[I][Temp1[K]];
                };
              };
              break;
            default:
              console.log(Look_Number1);
              break;
          };
          Look_Number1++;
        };
        Look_Number1 = 0;

        Temp1 = [];
        for(var I = 0; I < Number_place1.length; I++) Numbers_Image_shadow[I].opacity = 0.5;
        switch(Look_Number2){
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            for(var K = 1; K < 10; K++){
              Temp2 = 0;
              for(var I = Look_Number2 * 9; I < Look_Number2 * 9 + 9; I++){
                if(K==1) Numbers_Image_shadow[I].opacity = 0;
                if(Number_place1[I][K]){
                  Temp2++;
                  Temp3 = I;
                };
              };
              if(Temp2==1){
                Number_place1[Temp3] = {確定:K};
                switch(STOP){
                  case "通常":
                    if(Temp3+1<10) label.text = "0" + (Temp3 + 1) + "に「" + K + "」を入力。";
                    else label.text = (Temp3 + 1) + "に「" + K + "」を入力。";
                    Numbers_Image[Temp3].image = game.assets["../image/Number赤.png"];
                    break;
                  case "仮入力":
                    if(Temp3+1<10) label.text = "0" + (Temp3 + 1) + "に「" + K + "」を仮入力。";
                    else label.text = (Temp3 + 1) + "に「" + K + "」を仮入力。";
                    Numbers_Image[Temp3].image = game.assets["../image/Number青.png"];
                    break;
                };
                Numbers_Image[Temp3].frame = K;
                Number_Change = true;
              };
            };
            for(var I = Look_Number2 * 9; I < Look_Number2 * 9 + 9; I++){
              if(!Object.keys(Number_place1[I]).length){
                if(I+1<10) label.text = "0" + (I + 1) + "に入る数字がない。";
                else label.text = (I + 1) + "に入る数字がない。";
                Number_place1 = JSON.parse(Number_place2);
                for(var I = 0; I < Numbers_Image.length; I++){
                  if(Number_place1[I].確定) Numbers_Image[I].frame = Number_place1[I].確定;
                  else{
                    Numbers_Image[I].frame = 0;
                    Numbers_Image[I].image = game.assets["../image/Number.png"];
                  };
                };
                delete Number_place1[Temp_Number.場所][Temp_Number.数字];
                STOP = "通常";
                Look_Number2 = 0;
                I = Temp_Number.場所;
                if(Object.keys(Number_place1[I]).length == 1){
                  Number_place1[I] = {確定:Object.keys(Number_place1[I])[0]}
                  if(I+1<10) label.text = "0" + (I + 1) + "に「" + Number_place1[I].確定 + "」を入力。";
                  else label.text = (I + 1) + "に「" + Number_place1[I].確定 + "」を入力。";
                  Numbers_Image[I].image = game.assets["../image/Number赤.png"];
                  Numbers_Image[I].frame = Number_place1[I].確定;
                };
                Temp_Number = null;
                return;
              };
            };
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
            for(var K = 1; K < 10; K++){
              Temp2 = 0;
              for(var I = Look_Number2 - 9; I < Number_place1.length; I+=9){
                if(K==1) Numbers_Image_shadow[I].opacity = 0;
                if(Number_place1[I][K]){
                  Temp2++;
                  Temp3 = I;
                };
              };
              if(Temp2==1){
                Number_place1[Temp3] = {確定:K};
                switch(STOP){
                  case "通常":
                    if(Temp3+1<10) label.text = "0" + (Temp3 + 1) + "に「" + K + "」を入力。";
                    else label.text = (Temp3 + 1) + "に「" + K + "」を入力。";
                    Numbers_Image[Temp3].image = game.assets["../image/Number赤.png"];
                    break;
                  case "仮入力":
                    if(Temp3+1<10) label.text = "0" + (Temp3 + 1) + "に「" + K + "」を仮入力。";
                    else label.text = (Temp3 + 1) + "に「" + K + "」を仮入力。";
                    Numbers_Image[Temp3].image = game.assets["../image/Number青.png"];
                    break;
                };
                Numbers_Image[Temp3].frame = K;
                Number_Change = true;
              };
            };
            for(var I = Look_Number2 - 9; I < Number_place1.length; I+=9){
              if(!Object.keys(Number_place1[I]).length){
                if(I+1<10) label.text = "0" + (I + 1) + "に入る数字がない。";
                else label.text = (I + 1) + "に入る数字がない。";
                Number_place1 = JSON.parse(Number_place2);
                for(var I = 0; I < Numbers_Image.length; I++){
                  if(Number_place1[I].確定) Numbers_Image[I].frame = Number_place1[I].確定;
                  else{
                    Numbers_Image[I].frame = 0;
                    Numbers_Image[I].image = game.assets["../image/Number.png"];
                  };
                };
                delete Number_place1[Temp_Number.場所][Temp_Number.数字];
                STOP = "通常";
                Look_Number2 = 0;
                I = Temp_Number.場所;
                if(Object.keys(Number_place1[I]).length == 1){
                  Number_place1[I] = {確定:Object.keys(Number_place1[I])[0]}
                  if(I+1<10) label.text = "0" + (I + 1) + "に「" + Number_place1[I].確定 + "」を入力。";
                  else label.text = (I + 1) + "に「" + Number_place1[I].確定 + "」を入力。";
                  Numbers_Image[I].image = game.assets["../image/Number赤.png"];
                  Numbers_Image[I].frame = Number_place1[I].確定;
                };
                Temp_Number = null;
                return;
              };
            };
            break;
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
            switch(Look_Number2){
              case 18:
                J = 0;
                break;
              case 19:
                J = 3;
                break;
              case 20:
                J = 6;
                break;
              case 21:
                J = 27;
                break;
              case 22:
                J = 30;
                break;
              case 23:
                J = 33;
                break;
              case 24:
                J = 54;
                break;
              case 25:
                J = 57;
                break;
              case 26:
                J = 60;
                break;
            };
            for(var K = 1; K < 10; K++){
              Temp2 = 0;
              for(var I = J; I < J + 21; I++){
                switch(I){
                  case J+3:
                    I = J + 9;
                    break;
                  case J+12:
                    I = J + 18;
                    break;
                };
                if(K==1) Numbers_Image_shadow[I].opacity = 0;
                if(Number_place1[I][K]){
                  Temp2++;
                  Temp3 = I;
                };
              };
              if(Temp2==1){
                Number_place1[Temp3] = {確定:K};
                switch(STOP){
                  case "通常":
                    if(Temp3+1<10) label.text = "0" + (Temp3 + 1) + "に「" + K + "」を入力。";
                    else label.text = (Temp3 + 1) + "に「" + K + "」を入力。";
                    Numbers_Image[Temp3].image = game.assets["../image/Number赤.png"];
                    break;
                  case "仮入力":
                    if(Temp3+1<10) label.text = "0" + (Temp3 + 1) + "に「" + K + "」を仮入力。";
                    else label.text = (Temp3 + 1) + "に「" + K + "」を仮入力。";
                    Numbers_Image[Temp3].image = game.assets["../image/Number青.png"];
                    break;
                };
                Numbers_Image[Temp3].frame = K;
                Number_Change = true;
              };
              };
            for(var I = J; I < J + 21; I++){
              switch(I){
                case J+3:
                  I = J + 9;
                  break;
                case J+12:
                  I = J + 18;
                  break;
              };
              if(!Object.keys(Number_place1[I]).length){
                if(I+1<10) label.text = "0" + (I + 1) + "に入る数字がない。";
                else label.text = (I + 1) + "に入る数字がない。";
                Number_place1 = JSON.parse(Number_place2);
                for(var I = 0; I < Numbers_Image.length; I++){
                  if(Number_place1[I].確定) Numbers_Image[I].frame = Number_place1[I].確定;
                  else{
                    Numbers_Image[I].frame = 0;
                    Numbers_Image[I].image = game.assets["../image/Number.png"];
                  };
                };
                delete Number_place1[Temp_Number.場所][Temp_Number.数字];
                STOP = "通常";
                Look_Number2 = 0;
                I = Temp_Number.場所;
                if(Object.keys(Number_place1[I]).length == 1){
                  Number_place1[I] = {確定:Object.keys(Number_place1[I])[0]}
                  if(I+1<10) label.text = "0" + (I + 1) + "に「" + Number_place1[I].確定 + "」を入力。";
                  else label.text = (I + 1) + "に「" + Number_place1[I].確定 + "」を入力。";
                  Numbers_Image[I].image = game.assets["../image/Number赤.png"];
                  Numbers_Image[I].frame = Number_place1[I].確定;
                };
                Temp_Number = null;
                return;
              };
            };
            break;
          default:
            console.log(Look_Number2);
            break;
        };
        Look_Number2++;

        for(var I = 0; I < Number_place1.length; I++){
          if(Number_place1[I].確定) Numbers_Image[I].テキスト = I + 1 + ":" + + Number_place1[I].確定;
          else{
            Numbers_Image[I].テキスト = I + 1 + ":";
            for(var K = 0; K < Object.keys(Number_place1[I]).length; K++){
              Numbers_Image[I].テキスト += Object.keys(Number_place1[I])[K] + ",";
            };
            Numbers_Image[I].テキスト = Numbers_Image[I].テキスト.slice(0,-1);
          };
          if(I < 9) Numbers_Image[I].テキスト = "0" + Numbers_Image[I].テキスト;
        };

        Complete = true;

        for(var I = 0; I < Number_place1.length; I++){
          if(!Number_place1[I].確定){
            Complete = false;
            break;
          };
        };

        if(Complete){
          STOP = "完成?";
          for(var I = 0; I < Number_place1.length; I++) Numbers_Image_shadow[I].opacity = 0;
          return;
        };


        if(Look_Number2==27){
          Look_Number2 = 0;
          if(!Number_Change){
            switch(STOP){
              case "通常":
                Temp_Numbers = {};
                Number_place2 = JSON.stringify(Number_place1);
                for(var I = 0; I < Number_place1.length; I++){
                  if(Object.keys(Number_place1[I]).length==Length){
                    if(!Temp_Number){
                      Temp_Number = {場所:I,数字:Object.keys(Number_place1[I])[0],元:Number_place1[I]};
                      Number_place1[I] = {確定:Object.keys(Number_place1[I])[0]};
                      if(I+1<10) label.text = "0" + (I + 1) + "に「" + Number_place1[I].確定 + "」を仮入力。";
                      else label.text = (I + 1) + "に「" + Number_place1[I].確定 + "」を仮入力。";
                      Numbers_Image[I].frame = Number_place1[I].確定;
                      Numbers_Image[I].image = game.assets["../image/Number紫.png"];
                      STOP = "仮入力";
                    };
                    Temp_Numbers[I] = Number_place1[I];
                  };
                };
                break;
              case "仮入力":
                Number_place1 = JSON.parse(Number_place2);
                for(var I = 0; I < Numbers_Image.length; I++){
                  if(Number_place1[I].確定) Numbers_Image[I].frame = Number_place1[I].確定;
                  else{
                    Numbers_Image[I].frame = 0;
                    Numbers_Image[I].image = game.assets["../image/Number.png"];
                  };
                };
                delete Temp_Number.元[Temp_Number.数字];
                I = Temp_Number.場所;
                if(Object.keys(Temp_Number.元)[0]){
                  Number_place1[I] = {確定:Object.keys(Temp_Number.元)[0]};
                  Temp_Number.数字 = Number_place1[I].確定;
                  if(I+1<10) label.text = "0" + (I + 1) + "に「" + Number_place1[I].確定 + "」を仮入力。";
                  else label.text = (I + 1) + "に「" + Number_place1[I].確定 + "」を仮入力。";
                  Numbers_Image[I].frame = Number_place1[I].確定;
                  Numbers_Image[I].image = game.assets["../image/Number紫.png"];
                }
                else{
                  delete Temp_Numbers[I];
                  I = Number(Object.keys(Temp_Numbers)[0]);
                  Number_place1[I] = {確定:Object.keys(Number_place1[I])[0]};
                  Temp_Number = {場所:I,数字:Object.keys(Number_place1[I])[0],元:Number_place1[I]};
                  if(I+1<10) label.text = "0" + (I + 1) + "に「" + Number_place1[I].確定 + "」を仮入力。";
                  else label.text = (I + 1) + "に「" + Number_place1[I].確定 + "」を仮入力。";
                  Numbers_Image[I].frame = Number_place1[I].確定;
                  Numbers_Image[I].image = game.assets["../image/Number紫.png"];
                };
                break;
              default:
                console.log(STOP);
                break;
            };
            //STOP = "仮停止";
            //for(var I = 0; I < Number_place1.length; I++) Numbers_Image_shadow[I].opacity = 0;
          };
        };

        return;

        if(!Complete){
          if(STOP=="青") STOP = "お手上げ";
          else STOP = "取り消し";
          Skip = {};
          Length = 7;
          label.text = i + "が入らない。";
          return;
        };

        if(!Answer){
          for (var i = 0; i < V.length; i++) {
            if(V2[i]=="赤"&&V[i]<10&&V[i]){
              console.log(i + ":" + V[i]);
              V[i] = "ヒント";
            };
          };
          while(!JSON.stringify(V).match(/ヒント/)){
            for (var i = 0; i < V.length; i++) {
              if(V[i]>9){
                if(V[i].match(/0/g).length==Length){
                  console.log(i + ":" + V[i].match(/[^0]/g));
                  V[i] = "ヒント";
                };
              };
            };
            Length--;
            if(Length==1) break;
          };
          for (var i = 0; i < V.length; i++) if(V[i]>9||!V[i]) V[i] = 0;
          game.replaceScene(S_Main_Scene(V,V2));
          return;
        };

        for (var i = 0; i < 81; i++){
          if((V[i].toString().length)!=1){
            Complete = false;
          };
        };

        for(var j = 0; j < V.length; j+=9){
          Temp1 = [];
          for (var i = j; i < j+9; i++){
            if(!V[i]) continue;
            if(V[i].toString().length==9) continue;
            for (var k = 0; k < Temp1.length; k++) {
              if(Temp1[k]==V[i]){
                if(STOP=="青") STOP = "お手上げ";
                else STOP = "取り消し";
                Skip = {};
                Length = 7;
                label.text = "横" + (j/9+1) + "が矛盾。";
                return;
              };
            }
            Temp1[Temp1.length] = V[i]*1;
          };
        };

        for(var j = 0; j < 9; j++){
          Temp1 = [];
          for (var i = j; i < V.length; i+=9){
            if(!V[i]) continue;
            if(V[i].toString().length==9) continue;
            for (var k = 0; k < Temp1.length; k++) {
              if(Temp1[k]==V[i]){
                if(STOP=="青") STOP = "お手上げ";
                else STOP = "取り消し";
                Skip = {};
                Length = 7;
                label.text = "縦" + (j+1) + "が矛盾。";
                return;
              };
            }
            Temp1[Temp1.length] = V[i]*1;
          };
        };

        for(var j = 0; j < V.length-20; j+=3){
          switch(j){
            case 9:
              j = 27;
              break;
            case 36:
              j = 54;
              break;
          };
          Temp1 = [];
          for (var i = j; i < j+21; i++){
            switch(i){
              case j+3:
                i = j+9;
                break;
              case j+12:
                i = j+18;
                break;
            };
            if(!V[i]) continue;
            if(V[i].toString().length==9) continue;
            for (var k = 0; k < Temp1.length; k++) {
              if(Temp1[k]==V[i]){
                if(STOP=="青") STOP = "お手上げ";
                else STOP = "取り消し";
                Skip = {};
                Length = 7;
                switch(i){
                  case 0:
                  case 1:
                  case 2:
                  case 9:
                  case 10:
                  case 11:
                  case 18:
                  case 19:
                  case 20:
                    label.text = "左上枠が矛盾。";
                    break;
                  case 3:
                  case 4:
                  case 5:
                  case 12:
                  case 13:
                  case 14:
                  case 21:
                  case 22:
                  case 23:
                    label.text = "上枠が矛盾。";
                    break;
                  case 6:
                  case 7:
                  case 8:
                  case 15:
                  case 16:
                  case 17:
                  case 24:
                  case 25:
                  case 26:
                    label.text = "右上枠が矛盾。";
                    break;
                  case 27:
                  case 28:
                  case 29:
                  case 36:
                  case 37:
                  case 38:
                  case 45:
                  case 46:
                  case 47:
                    label.text = "左枠が矛盾。";
                    break;
                  case 30:
                  case 31:
                  case 32:
                  case 39:
                  case 40:
                  case 41:
                  case 48:
                  case 49:
                  case 50:
                    label.text = "真ん中枠が矛盾。";
                    break;
                  case 33:
                  case 34:
                  case 35:
                  case 42:
                  case 43:
                  case 44:
                  case 51:
                  case 52:
                  case 53:
                    label.text = "右枠が矛盾。";
                    break;
                  case 54:
                  case 55:
                  case 56:
                  case 63:
                  case 64:
                  case 65:
                  case 72:
                  case 73:
                  case 74:
                    label.text = "左下枠が矛盾。";
                    break;
                  case 57:
                  case 58:
                  case 59:
                  case 66:
                  case 67:
                  case 68:
                  case 75:
                  case 76:
                  case 77:
                    label.text = "下枠が矛盾。";
                    break;
                  case 60:
                  case 61:
                  case 62:
                  case 69:
                  case 70:
                  case 71:
                  case 78:
                  case 79:
                  case 80:
                    label.text = "右下枠が矛盾。";
                    break;
                };
                return;
              };
            }
            Temp1[Temp1.length] = V[i]*1;
          };
        };

        if(Check==JSON.stringify(V)){
          for (var i = 0; i < 81; i++){
            if((V[i].toString().length)!=1){
              Complete = false;
            };
          };
          if(Complete){
            for (var i = 1; i < 82; i++){
              if(V2[i-1].match(/[青紫]/)){
                V2[i-1] = "赤";
                Number[i].image = game.assets["../image/Number赤.png"];
              };
            };
            STOP = "完成";
            return;
          };
          switch(STOP){
            case "青":
              for (var i = 1; i < 82; i++){
                STOP = V[i-1].toString().match(/0/g);
                if(STOP&&Skip[i-1]!="無理"){
                  if(STOP.length==Length){
                    if(Skip[i-1]){
                      Skip[i-1] = "無理";
                      V[i-1] = V[i-1].match(/[1-9]{1}/g)[1]*1;
                    }
                    else{
                      Skip[i-1] = true;
                      V[i-1] = V[i-1].match(/[1-9]{1}/g)[0]*1;
                    };
                    label.text = i + "に「" + V[i-1] + "」を仮入力。";
                    V2[i-1] = "紫";
                    Number[i].frame = V[i-1];
                    Number[i].image = game.assets["../image/Number紫.png"];
                    Temp_Number = true;
                    break;
                  };
                };
              };
              if(Temp_Number) STOP = "赤";
              else{
                STOP = "青";
                if(Length > 1) Length--;
                else STOP = "お手上げ";
              };
              break;
            case "赤":
              Temp_Number = null;
              STOP = "スキップ";
              break;
            default:
              console.log(STOP);
              break;
          };
        };
      });

      return scene;
    };
    var Answer_Scene = function(V,V2,Answer){

      if(!V2){
        for(var I = 0; I < V.length; I++){
          if(V[I]){
            var Send_Data = JSON.stringify(V);
            if(Send_Data==window.localStorage.getItem("数独")) break;
            window.localStorage.setItem("数独",Send_Data);
            Send_Data = {タイプ:"データ保存",データ名:"数独",データ:Send_Data};
            Send_Data.Notion = {DBID:"5d77aede6ec5414fab1b79f2af422cfb",Token:"FAM7D7Ct0HEhrGagrjCJ0qAoy8puEBsuuzQBjgmNMmZ"};
            fetch
            (
              "https://script.google.com/macros/s/AKfycbwi6ekqJT9R4EB4hcX5bJ-UwZ_1SMYVVwRCsA6VAZxhVGmx--cV/exec",
              {
                method: "POST",
                body: JSON.stringify(Send_Data)
              }
            ).then(res => res.json()).then(result => {
            },);
            break;
          };
        };
      }
      else{
        for (var i = 0; i < V2.length; i++) {
          switch (V2[i]) {
            case "紫":
            case "赤":
            case "青":
              V[i] = 0;
              break;
          };
        };
      };

      var scene = new Scene();

      var Hand = new Sprite(1,1);
      Hand.image = game.assets["../image/Main.png"];
      scene.addChild(Hand);

      var S_Input = new Button("メニューに戻る","light",width/2,95);
      S_Input.moveTo(0,height-95);
      S_Input._style["font-size"] = 25;
      if(Answer) scene.addChild(S_Input);
      S_Input.addEventListener("touchend",function(e){
        game.replaceScene(Start_Menu_Scene());
      });

      var Start = new Sprite(40,40);
      Start.image = game.assets["../image/Number.png"];
      Start.x = width-40;
      Start.y = height-40;
      Start.frame = 11;
      scene.addChild(Start);

      var Main = new Sprite(405,405);
      Main.image = game.assets["../image/Main.png"];
      Main.x = 0;
      Main.y = 0;
      scene.addChild(Main);

      var Numbers = Class.create(Sprite, {
        initialize: function(x,y,z) {
          Sprite.call(this,40,40);
          this.image = game.assets["../image/Number.png"];
          this.x = x;
          this.y = y;
          this.frame = z;
          scene.addChild(this);
        }
      });

      var label = new Label();
        label.x = 0;
        label.y = 420;
        label.color = "red";
        label.font = "30px ゴシック";
        label.width = width;
        label.text = "";
        scene.addChild(label);

        var I = 5;
        var K = 5;
        var Choice = 0;

        for (var i = 1; i < 82; i++){
          Number[i] = new Numbers(K,I,0);
          K = K+44;
          if(i%3==0) K = K+2;
          if(i%9==0){
            I = I+44;
            if(i%27==0) I = I+2;
            K = 5;
          }
        }

      if(!V2) V2 = [];

      for (var i = 1; i < 82; i++){
        if(V[i-1]==0||V[i-1]>9){
          V[i-1] = "123456789";
          Number[i].image = game.assets["../image/Number赤.png"];
          V2[i-1] = "赤";
        };
        if(!V2[i-1]) V2[i-1] = "黒";
        if(V2[i-1] == "緑") Number[i].image = game.assets["../image/Number緑.png"];
        if(V2[i-1] == "青") Number[i].image = game.assets["../image/Number青.png"];
        if(V2[i-1] == "赤") Number[i].image = game.assets["../image/Number赤.png"];
        if(V2[i-1] == "紫") Number[i].image = game.assets["../image/Number紫.png"];
      };

      var STOP = "青";
      var Skip = {};
      var Length = 7;
      var Temp_Number = null;
      var Differents_Number1 = {};
      var Differents_Number2 = {};

      Main.addEventListener("enterframe",function(){
        switch (STOP) {
          case "青":
          case "赤":
            break;
            case "取り消し":
            case "スキップ":
            for (var i = 1; i < 82; i++){
              switch(V2[i-1]){
                case "青":
                  V[i-1] = "123456789";
                  V2[i-1] = "赤";
                  Number[i].frame = 0;
                  Number[i].image = game.assets["../image/Number赤.png"];
                  break;
                case "紫":
                  V[i-1] = "123456789";
                  V2[i-1] = "赤";
                  if(STOP=="スキップ") label.text = i + "の仮入力「" + Number[i].frame + "」を取消。";
                  else{
                    if(!Differents_Number1[i-1]) Differents_Number1[i-1] = [];
                    Differents_Number1[i-1][Differents_Number1[i-1].length] = Number[i].frame*1;
                    label.text = i + "の仮入力「" + Number[i].frame + "」は矛盾。";
                  };
                  Number[i].frame = 0;
                  Number[i].image = game.assets["../image/Number赤.png"];
                  break;
                case "赤":
                  if(V[i-1] > 9||V[i-1] == 0) V[i-1] = "123456789";
                  //console.log((i-1) + ":" + V[i-1]);
                  break;
                default:
                  //console.log(V2[i-1]);
                  break;
              };
            };
            if(STOP=="スキップ"||Temp_Number) STOP = "青";
            break;
          case "終了済み":
            //game.replaceScene(S_Main_Scene(V,V2));
            return;
          default:
            label.text = STOP;
            STOP = "終了済み";
            return;
        };

        for (var i = 0; i < V.length; i++){
          if(V[i]>9){
            if(!Differents_Number1[i]) Differents_Number1[i] = [];
            for(var j = 0; j < Differents_Number1[i].length; j++){
              V[i] = V[i].replace(Differents_Number1[i][j],"0");
            };
          };
        };

        //for (var i = 0; i < V.length; i++) console.log(i + ":" + V[i]);

        Check = JSON.stringify(V);

        Differents_Number2 = {};
        for (var i = 0; i < 81; i++) Differents_Number2[i] = [];

        for(var j = 0; j < V.length; j+=9){
          Temp1 = [];
          for (var i = j; i < j+9; i++){
            if(!V[i]) continue;
            if(V[i].toString().length==9) continue;
            Temp1[Temp1.length] = V[i]*1;
          };
          for (var i = j; i < j+9; i++){
            for (var k = 0; k < Temp1.length; k++){
              Differents_Number2[i][Differents_Number2[i].length] = Temp1[k]*1;
            };
          };
        };

        for(var j = 0; j < 9; j++){
          Temp1 = [];
          for (var i = j; i < V.length; i+=9){
            if(!V[i]) continue;
            if(V[i].toString().length==9) continue;
            Temp1[Temp1.length] = V[i]*1;
          };
          for (var i = j; i < V.length; i+=9){
            for (var k = 0; k < Temp1.length; k++){
              Differents_Number2[i][Differents_Number2[i].length] = Temp1[k]*1;
            };
          };
        };

        for(var j = 0; j < V.length-20; j+=3){
          switch(j){
            case 9:
              j = 27;
              break;
            case 36:
              j = 54;
              break;
          };
          Temp1 = [];
          for (var i = j; i < j+21; i++){
            switch(i){
              case j+3:
                i = j+9;
                break;
              case j+12:
                i = j+18;
                break;
            };
            if(!V[i]) continue;
            if(V[i].toString().length==9) continue;
            Temp1[Temp1.length] = V[i]*1;
          };

          for (var i = j; i < j+21; i++){
            switch(i){
              case j+3:
                i = j+9;
                break;
              case j+12:
                i = j+18;
                break;
            };
            for (var k = 0; k < Temp1.length; k++){
              Differents_Number2[i][Differents_Number2[i].length] = Temp1[k]*1;
            };
          };
        };

        Temp2 = Object.keys(Differents_Number2);
        for (var i = 0; i < Temp2.length; i++) {
          Differents_Number2[Temp2[Temp2[i]]].sort();
          Temp3 = Differents_Number2[Temp2[Temp2[i]]];
          for (var j = 0; j < Temp3.length; j++) {
            if(Temp3[j]==Temp3[j+1]) Temp3[j] = 0;
            if(Temp3[j]==V[i]) Temp3[j] = 0;
          };
          Temp3.sort();
          Temp4 = [];
          for (var j = 0; j < Temp3.length; j++) if(Temp3[j]) Temp4[Temp4.length] = Temp3[j];
          Differents_Number2[Temp2[Temp2[i]]] = Temp4;
        };

        for (var i = 0; i < V.length; i++) {
          if(!V[i].length){
            Differents_Number2[i] = [];
            for (var j = 1; j < 10; j++) {
              if(V[i]!=j) Differents_Number2[i][Differents_Number2[i].length] = j;
            };
          };
        };

        for(var j = 0; j < V.length; j+=9){
          Temp1 = [];
          for (var i = j; i < j+9; i++){
            Temp1[Temp1.length] = Differents_Number2[i];
          };
          for(var i = 1; i < 10; i++){
            Temp2 = 0;
            for(var k = 0; k < 9; k++){
              if(!JSON.stringify(Temp1[k]).match(i)){
                Temp2++;
                Temp3 = k;
              };
            };
            if(Temp2==1) V[Temp3+j] = i;
          };
        };

        for(var j = 0; j < 9; j++){
          Temp1 = [];
          for (var i = j; i < V.length; i+=9){
            Temp1[Temp1.length] = Differents_Number2[i];
          };
          for(var i = 1; i < 10; i++){
            Temp2 = 0;
            for(var k = 0; k < 9; k++){
              if(!JSON.stringify(Temp1[k]).match(i)){
                Temp2++;
                Temp3 = k;
              };
            };
            if(Temp2==1) V[Temp3*9+j] = i;
          };
        };

        for(var j = 0; j < V.length-20; j+=3){
          switch(j){
            case 9:
              j = 27;
              break;
            case 36:
              j = 54;
              break;
          };
          Temp1 = [];
          for (var i = j; i < j+21; i++){
            switch(i){
              case j+3:
                i = j+9;
                break;
              case j+12:
                i = j+18;
                break;
            };
            Temp1[Temp1.length] = Differents_Number2[i];
          };

          for(var i = 1; i < 10; i++){
            Temp2 = 0;
            for(var k = 0; k < 9; k++){
              if(!JSON.stringify(Temp1[k]).match(i)){
                Temp2++;
                Temp3 = k;
              };
            };
            if(Temp2==1){
              switch(Temp3){
                case 0:
                  Temp3 = j;
                  break;
                case 1:
                  Temp3 = j + 1;
                  break;
                case 2:
                  Temp3 = j + 2;
                  break;
                case 3:
                  Temp3 = j + 9;
                  break;
                case 4:
                  Temp3 = j + 10;
                  break;
                case 5:
                  Temp3 = j + 11;
                  break;
                case 6:
                  Temp3 = j + 18;
                  break;
                case 7:
                  Temp3 = j + 19;
                  break;
                case 8:
                  Temp3 = j + 20;
                  break;
              };
            };
            if(Temp2==1) V[Temp3] = i;
          };
        };

        for (var i = 0; i < V.length; i++) {
          if(Differents_Number2[i].length == 8){
            //console.log(V[i]);
            //console.log(Differents_Number2[i]);
          };
        };

        /*

        STOP = "完成";
        return;

        var e = 0;
        var f = 0;
        for (var d = 0; d < 9; d++){
          for (var i = 1+d*9; i < 10+d*9; i++){
            for(var c = 1; c < 10; c++){
              if(V[i-1]==c){
                for (var k = 1+d*9; k < 10+d*9; k++){
                  if((V[k-1]+"").length==9&&V[k-1]!="000000009") V[k-1] = V[k-1].substring(0,c-1) + "0" + V[k-1].substring(c);
                }
              }
            }
          }
          for (var i = 1+d; i < 74+d; i = i+9){
            for(var c = 1; c < 10; c++){
              if(V[i-1]==c){
                for (var k = 1+d; k < 74+d; k = k+9){
                  if((V[k-1]+"").length==9&&V[k-1]!="000000009") V[k-1] = V[k-1].substring(0,c-1) + "0" + V[k-1].substring(c);
                }
              }
            }
          }
          if(d==3||d==6){
            e = e+27;
            f = 0;
          }
          for (var i = 1+e+f*3; i < 22+e+f*3; i++){
            if(i==4+e+f*3||i==13+e+f*3){
              i = i+5;
              continue;
            }
            for(var c = 1; c < 10; c++){
              if(V[i-1]==c){
                for (var k = (1+e)+f*3; k < (22+e)+f*3; k++){
                  if(k==4+e+f*3||k==13+e+f*3){
                    k = k+5;
                    continue;
                  }
                  if((V[k-1]+"").length==9&&V[k-1]!="000000009") V[k-1] = V[k-1].substring(0,c-1) + "0" + V[k-1].substring(c);
                }
              }
            }
          }
          f++;
        }
        var e = 0;
        var f = 0;
        for (var d = 0; d < 9; d++){
          if(d==3||d==6){
            e = e+27;
            f = 0;
          }
          for (var i = 1+e+f*3; i < 22+e+f*3; i++){
            if(i==4+e+f*3||i==13+e+f*3){
              i = i+5;
              continue;
            }
            var N = [0,0,0,0,0,0,0,0,0];
            var S = [0,0,0,0,0,0,0,0,0];
            for (var k = (1+e)+f*3; k < (22+e)+f*3; k++){
              if(k==4+e+f*3||k==13+e+f*3){
                k = k+5;
                continue;
              }
              if(V[k-1].length==9){
                for (var c = 0; c < 9; c++){
                  if(V[k-1].substring(c,c+1)==c+1){
                    N[c]++;
                    S[c] = k-1;
                  }
                }
              }
            }
          }
          for (var c = 0; c < 9; c++){
            if(N[c] == 1) V[S[c]] = c+1;
          }
          f++;
        }

        //すでに消されてる
        /*
        for (var d = 0; d < 9; d++){
          for (var i = 1+d*9; i < 10+d*9; i++){
            var N = [0,0,0,0,0,0,0,0,0];
            var S = [0,0,0,0,0,0,0,0,0];
            for (var k = 1+d*9; k < 10+d*9; k++){
              if(V[k-1].length==9){
                for (var c = 0; c < 9; c++){
                  if(V[k-1].substring(c,c+1)==c+1){
                    N[c]++;
                    S[c] = k-1;
                  }
                }
              }
            }
          }
          for (var c = 0; c < 9; c++){
            if(N[c] == 1) V[S[c]] = c+1;
          }
        }
        for (var d = 0; d < 9; d++){
          for (var i = 1+d; i < 74+d; i = i+9){
            var N = [0,0,0,0,0,0,0,0,0];
            var S = [0,0,0,0,0,0,0,0,0];
            for (var k = 1+d; k < 74+d; k = k+9){
              if(V[k-1].length==9){
                for (var c = 0; c < 9; c++){
                  if(V[k-1].substring(c,c+1)==c+1){
                    N[c]++;
                    S[c] = k-1;
                  }
                }
              }
            }
          }
          for (var c = 0; c < 9; c++){
            if(N[c] == 1) V[S[c]] = c+1;
          }
        }
        */
        //すでに消されてる

        for (var i = 0; i < V.length; i++){
          if(V[i]>9){
            for(var j = 0; j < Differents_Number2[i].length; j++){
              V[i] = V[i].replace(Differents_Number2[i][j],"0");
            };
          };
        };

        /*
        if(STOP=="取り消し"){
          if(!Temp_Number){
            STOP = "お手上げ";
            return;
          };
          if(!Differents_Number1[Temp_Number[0]]) Differents_Number1[Temp_Number[0]] = [];
          Temp2 = Differents_Number1[Temp_Number[0]];
          for (var i = 0; i < Temp2.length; i++) if(Temp2[i]==Temp_Number[1]) break;
          Temp2[i] = Temp_Number[1]*1;
          Temp2 = Object.keys(Differents_Number1);
          for (var i = 0; i < Temp2.length; i++) {
            for (var j = 0; j < Differents_Number1[Temp2[i]].length; j++){
              if(V[Temp2[i]].toString().length==9){
                V[Temp2[i]] = V[Temp2[i]].replace(Differents_Number1[Temp2[i]][j],"0");
              };
            };
          };
          Temp_Number = null;
          STOP = "青";
        };
        */

        Complete = true;

        for (var i = 1; i < 82; i++){
          switch(V[i-1]){
            case "000000000":
              Complete = false;
              break;
            case "100000000":
            case "020000000":
            case "003000000":
            case "000400000":
            case "000050000":
            case "000006000":
            case "000000700":
            case "000000080":
            case "000000009":
              V[i-1] = V[i-1].replace(/0/g,"");
              break;
          };
          Number[i].a = i + ":" + V[i-1];
          for (var k = 1; k < 10; k++){
            if(V[i-1]==k&&Number[i].frame==0){
              Now = new Date().getSeconds();
              Previous = new Date().getSeconds();
              label.text = i + "に「" + k + "」を入力。";
              Number[i].frame = k;
              if(STOP == "赤"){
                V2[i-1] = "青";
                Number[i].image = game.assets["../image/Number青.png"];
              };
            }
          };
        };

        if(!Complete){
          if(STOP=="青") STOP = "お手上げ";
          else STOP = "取り消し";
          Skip = {};
          Length = 7;
          label.text = i + "が入らない。";
          return;
        };

        if(!Answer){
          for (var i = 0; i < V.length; i++) {
            if(V2[i]=="赤"&&V[i]<10&&V[i]){
              console.log(i + ":" + V[i]);
              V[i] = "ヒント";
            };
          };
          while(!JSON.stringify(V).match(/ヒント/)){
            for (var i = 0; i < V.length; i++) {
              if(V[i]>9){
                if(V[i].match(/0/g).length==Length){
                  console.log(i + ":" + V[i].match(/[^0]/g));
                  V[i] = "ヒント";
                };
              };
            };
            Length--;
            if(Length==1) break;
          };
          for (var i = 0; i < V.length; i++) if(V[i]>9||!V[i]) V[i] = 0;
          game.replaceScene(S_Main_Scene(V,V2));
          return;
        };

        for (var i = 0; i < 81; i++){
          if((V[i].toString().length)!=1){
            Complete = false;
          };
        };

        for(var j = 0; j < V.length; j+=9){
          Temp1 = [];
          for (var i = j; i < j+9; i++){
            if(!V[i]) continue;
            if(V[i].toString().length==9) continue;
            for (var k = 0; k < Temp1.length; k++) {
              if(Temp1[k]==V[i]){
                if(STOP=="青") STOP = "お手上げ";
                else STOP = "取り消し";
                Skip = {};
                Length = 7;
                label.text = "横" + (j/9+1) + "が矛盾。";
                return;
              };
            }
            Temp1[Temp1.length] = V[i]*1;
          };
        };

        for(var j = 0; j < 9; j++){
          Temp1 = [];
          for (var i = j; i < V.length; i+=9){
            if(!V[i]) continue;
            if(V[i].toString().length==9) continue;
            for (var k = 0; k < Temp1.length; k++) {
              if(Temp1[k]==V[i]){
                if(STOP=="青") STOP = "お手上げ";
                else STOP = "取り消し";
                Skip = {};
                Length = 7;
                label.text = "縦" + (j+1) + "が矛盾。";
                return;
              };
            }
            Temp1[Temp1.length] = V[i]*1;
          };
        };

        for(var j = 0; j < V.length-20; j+=3){
          switch(j){
            case 9:
              j = 27;
              break;
            case 36:
              j = 54;
              break;
          };
          Temp1 = [];
          for (var i = j; i < j+21; i++){
            switch(i){
              case j+3:
                i = j+9;
                break;
              case j+12:
                i = j+18;
                break;
            };
            if(!V[i]) continue;
            if(V[i].toString().length==9) continue;
            for (var k = 0; k < Temp1.length; k++) {
              if(Temp1[k]==V[i]){
                if(STOP=="青") STOP = "お手上げ";
                else STOP = "取り消し";
                Skip = {};
                Length = 7;
                switch(i){
                  case 0:
                  case 1:
                  case 2:
                  case 9:
                  case 10:
                  case 11:
                  case 18:
                  case 19:
                  case 20:
                    label.text = "左上枠が矛盾。";
                    break;
                  case 3:
                  case 4:
                  case 5:
                  case 12:
                  case 13:
                  case 14:
                  case 21:
                  case 22:
                  case 23:
                    label.text = "上枠が矛盾。";
                    break;
                  case 6:
                  case 7:
                  case 8:
                  case 15:
                  case 16:
                  case 17:
                  case 24:
                  case 25:
                  case 26:
                    label.text = "右上枠が矛盾。";
                    break;
                  case 27:
                  case 28:
                  case 29:
                  case 36:
                  case 37:
                  case 38:
                  case 45:
                  case 46:
                  case 47:
                    label.text = "左枠が矛盾。";
                    break;
                  case 30:
                  case 31:
                  case 32:
                  case 39:
                  case 40:
                  case 41:
                  case 48:
                  case 49:
                  case 50:
                    label.text = "真ん中枠が矛盾。";
                    break;
                  case 33:
                  case 34:
                  case 35:
                  case 42:
                  case 43:
                  case 44:
                  case 51:
                  case 52:
                  case 53:
                    label.text = "右枠が矛盾。";
                    break;
                  case 54:
                  case 55:
                  case 56:
                  case 63:
                  case 64:
                  case 65:
                  case 72:
                  case 73:
                  case 74:
                    label.text = "左下枠が矛盾。";
                    break;
                  case 57:
                  case 58:
                  case 59:
                  case 66:
                  case 67:
                  case 68:
                  case 75:
                  case 76:
                  case 77:
                    label.text = "下枠が矛盾。";
                    break;
                  case 60:
                  case 61:
                  case 62:
                  case 69:
                  case 70:
                  case 71:
                  case 78:
                  case 79:
                  case 80:
                    label.text = "右下枠が矛盾。";
                    break;
                };
                return;
              };
            }
            Temp1[Temp1.length] = V[i]*1;
          };
        };

        if(Check==JSON.stringify(V)){
          for (var i = 0; i < 81; i++){
            if((V[i].toString().length)!=1){
              Complete = false;
            };
          };
          if(Complete){
            for (var i = 1; i < 82; i++){
              if(V2[i-1].match(/[青紫]/)){
                V2[i-1] = "赤";
                Number[i].image = game.assets["../image/Number赤.png"];
              };
            };
            STOP = "完成";
            return;
          };
          switch(STOP){
            case "青":
              for (var i = 1; i < 82; i++){
                STOP = V[i-1].toString().match(/0/g);
                if(STOP&&Skip[i-1]!="無理"){
                  if(STOP.length==Length){
                    if(Skip[i-1]){
                      Skip[i-1] = "無理";
                      V[i-1] = V[i-1].match(/[1-9]{1}/g)[1]*1;
                    }
                    else{
                      Skip[i-1] = true;
                      V[i-1] = V[i-1].match(/[1-9]{1}/g)[0]*1;
                    };
                    label.text = i + "に「" + V[i-1] + "」を仮入力。";
                    V2[i-1] = "紫";
                    Number[i].frame = V[i-1];
                    Number[i].image = game.assets["../image/Number紫.png"];
                    Temp_Number = true;
                    break;
                  };
                };
              };
              if(Temp_Number) STOP = "赤";
              else{
                STOP = "青";
                if(Length > 1) Length--;
                else STOP = "お手上げ";
              };
              break;
            case "赤":
              Temp_Number = null;
              STOP = "スキップ";
              break;
            default:
              console.log(STOP);
              break;
          };
        };
      })

      scene.addEventListener("touchend",function(e){
        Hand.x = e.x;
        Hand.y = e.y;
        for (var i = 1; i < 82; i++){
          if(Number[i].intersect(Hand)){
            label.text = Number[i].a;
          }
        }
        if(Start.intersect(Hand)){
          var V = [];
          for (var i = 0; i < 81; i++){
            V[i] = Number[i+1].frame;
          }
          game.replaceScene(S_Main_Scene(V,V2));
        }
      });

      return scene;
    };
    var Novel_Game_load_Scene = function(){
      var scene = new Scene();

      var Background = new Sprite();
      Background._element = document.createElement("img");
      Background._element.src = "../image/メニュー背景.png";
      Background.width = width;
      Background.height = height;
      scene.addChild(Background);

      var S_Input1 = new Entity();
      S_Input1.moveTo((width-width/1.2)/2,100);
      S_Input1.width = width/1.2;
      S_Input1.height = 30;
      S_Input1._element = document.createElement('input');
      S_Input1._element.type = "text";
      S_Input1._element.name = "myText";
      S_Input1._element.value = Spread_sheet_ID;
      S_Input1._element.placeholder = "スプレッドシートのIDを入力";
      if(HTML=="index") scene.addChild(S_Input1);

      if(HTML=="管理人"){
        var Loadbutton1 = new Button("田中家","light",width/1.2,100);
        Loadbutton1.moveTo((width-width/1.2)/2,200);
        Loadbutton1._style["font-size"] = 25;
        Loadbutton1.addEventListener("touchend",function(e){
          if(Loadbutton1.text=="田中家"){
            Spread_sheet_ID = "11p8AdCuPzb02IGNJCKS2M6LrUCZEFGNu_rNdqSMchSo";
            game.pushScene(Loading_Scene("読み込み"));
            fetch
            (
              "https://script.google.com/macros/s/AKfycbwbxBARHidLzHA52cznZ2VI_x9hdNtW2RHnk5bV_dm1QU7A2eI/exec",
              {
                method: "POST",
                body: Spread_sheet_ID
              }
            ).then(res => res.json()).then(result => {
              Game_Datas = result;
              SE = [];
              var SE_Number = 0;
              for (var i = 0; i < result.length; i++) {
                if(result[i].Data.match(/\(音:.+?:音\)/)){
                  result[i].Data = result[i].Data.substring(3,result[i].Data.length-3);
                  SE[SE_Number] = document.createElement("audio");
                  SE[SE_Number].src = result[i].Data.split(",")[0];
                  SE[SE_Number].type = result[i].Data.split(",")[1];
                  SE[SE_Number].title = result[i].Number;
                  SE_Number++;
                }
                if(result[i].Number=="フラグ管理"){
                  Flag_Number = [];
                  for (var j = 0; j < result[i].Data.split(",").length; j++) {
                    Flag_Number[Flag_Number.length] = result[i].Data.split(",")[j] + ":0";
                  }
                }
              }
              for (var i = 0; i < result.length; i++) {
                var Image = result[i].Data.match(/\(画像:.+?:画像\)/g);
                if(Image){
                  for (var k = 0; k < Image.length; k++){
                    Image[k] = Image[k].substring(4);
                    Image[k] = Image[k].split(",")[1];
                    if(Image[k]=="使用フラグ") continue;
                    var Background = new Sprite();
                    Background._element = document.createElement("img");
                    Background._element.src = Image[k];
                    Background.x = 405;
                    Background.y = 600;
                    Background.width = 0;
                    Background.height = 0;
                    scene.addChild(Background);
                  }
                }
              }
              game.popScene();
              scene.removeChild(S_Input1);
              scene.removeChild(Loadbutton2);
              Loadbutton1.text = "ゲーム開始";
              return;
            },);
          }
          else{
            game.popScene();
            GAS("読み込み");
          }
          return;
        });

        var Loadbutton2 = new Button("共有用","light",width/1.2,100);
        Loadbutton2.moveTo((width-width/1.2)/2,400);
        Loadbutton2._style["font-size"] = 25;
        Loadbutton2.addEventListener("touchend",function(e){
          if(Loadbutton2.text=="共有用"){
            Spread_sheet_ID = "15D_zCckP9NuN-HsFb9Z-Y2NiyO7mWO4yfvH_irzeIrw";
            game.pushScene(Loading_Scene("読み込み"));
            fetch
            (
              "https://script.google.com/macros/s/AKfycbwbxBARHidLzHA52cznZ2VI_x9hdNtW2RHnk5bV_dm1QU7A2eI/exec",
              {
                method: "POST",
                body: Spread_sheet_ID
              }
            ).then(res => res.json()).then(result => {
              Game_Datas = result;
              SE = [];
              var SE_Number = 0;
              for (var i = 0; i < result.length; i++) {
                if(result[i].Data.match(/\(音:.+?:音\)/)){
                  result[i].Data = result[i].Data.substring(3,result[i].Data.length-3);
                  SE[SE_Number] = document.createElement("audio");
                  SE[SE_Number].src = result[i].Data.split(",")[0];
                  SE[SE_Number].type = result[i].Data.split(",")[1];
                  SE[SE_Number].title = result[i].Number;
                  SE_Number++;
                }
                if(result[i].Number=="フラグ管理"){
                  Flag_Number = [];
                  for (var j = 0; j < result[i].Data.split(",").length; j++) {
                    Flag_Number[Flag_Number.length] = result[i].Data.split(",")[j] + ":0";
                  }
                }
              }
              for (var i = 0; i < result.length; i++) {
                var Image = result[i].Data.match(/\(画像:.+?:画像\)/g);
                if(Image){
                  for (var k = 0; k < Image.length; k++){
                    Image[k] = Image[k].substring(4);
                    Image[k] = Image[k].split(",")[1];
                    if(Image[k]=="使用フラグ") continue;
                    var Background = new Sprite();
                    Background._element = document.createElement("img");
                    Background._element.src = Image[k];
                    Background.x = 405;
                    Background.y = 600;
                    Background.width = 0;
                    Background.height = 0;
                    scene.addChild(Background);
                  }
                }
              }
              game.popScene();
              scene.removeChild(S_Input1);
              scene.removeChild(Loadbutton2);
              Loadbutton1.text = "ゲーム開始";
              return;
            },);
          }
          else{
            game.popScene();
            GAS("読み込み");
          }
          return;
        });
        scene.addChild(Loadbutton1);
        scene.addChild(Loadbutton2);
      }
      else{
        var Loadbutton = new Button("ゲームデータロード","light",width/1.2,100);
        Loadbutton.moveTo((width-width/1.2)/2,200);
        Loadbutton._style["font-size"] = 25;
        Loadbutton.addEventListener("touchend",function(e){
          if(Loadbutton.text=="ゲームデータロード"){
            switch (HTML) {
              case "Tanakake":
                Spread_sheet_ID = "11p8AdCuPzb02IGNJCKS2M6LrUCZEFGNu_rNdqSMchSo";
                break;
              case "Share":
                Spread_sheet_ID = "15D_zCckP9NuN-HsFb9Z-Y2NiyO7mWO4yfvH_irzeIrw";
                break;
              case "index":
                Spread_sheet_ID = S_Input1._element.value;
                break;
            }
            window.localStorage.setItem("Spread_sheet_ID",Spread_sheet_ID);
            game.pushScene(Loading_Scene("読み込み"));
            fetch
            (
              "https://script.google.com/macros/s/AKfycbwbxBARHidLzHA52cznZ2VI_x9hdNtW2RHnk5bV_dm1QU7A2eI/exec",
              {
                method: "POST",
                body: Spread_sheet_ID
              }
            ).then(res => res.json()).then(result => {
              Game_Datas = result;
              SE = [];
              var SE_Number = 0;
              for (var i = 0; i < result.length; i++) {
                if(result[i].Data.match(/\(音:.+?:音\)/)){
                  result[i].Data = result[i].Data.substring(3,result[i].Data.length-3);
                  SE[SE_Number] = document.createElement("audio");
                  SE[SE_Number].src = result[i].Data.split(",")[0];
                  SE[SE_Number].type = result[i].Data.split(",")[1];
                  SE[SE_Number].title = result[i].Number;
                  SE_Number++;
                }
                if(result[i].Number=="フラグ管理"){
                  Flag_Number = [];
                  for (var j = 0; j < result[i].Data.split(",").length; j++) {
                    Flag_Number[Flag_Number.length] = result[i].Data.split(",")[j] + ":0";
                  }
                }
              }
              for (var i = 0; i < result.length; i++) {
                var Image = result[i].Data.match(/\(画像:.+?:画像\)/g);
                if(Image){
                  for (var k = 0; k < Image.length; k++){
                    Image[k] = Image[k].substring(4);
                    Image[k] = Image[k].split(",")[1];
                    if(Image[k]=="使用フラグ") continue;
                    var Background = new Sprite();
                    Background._element = document.createElement("img");
                    Background._element.src = Image[k];
                    Background.x = 405;
                    Background.y = 600;
                    Background.width = 0;
                    Background.height = 0;
                    scene.addChild(Background);
                  }
                }
              }
              game.popScene();
              scene.removeChild(S_Input1);
              Loadbutton.text = "ゲーム開始";
              return;
            },);
          }
          else{
            game.popScene();
            GAS("読み込み");
          }
          return;
        });
        scene.addChild(Loadbutton);
      }

      var Returnbutton = new Button("戻る","light",80,40);
      Returnbutton.moveTo(30,30);
      Returnbutton._style["font-size"] = 15;
      Returnbutton.addEventListener("touchend",function(e){
        game.popScene();
        return;
      });
      scene.addChild(Returnbutton);

      return scene;
    };
    function GAS(Type){
      if(Type=="保存"){
        game.pushScene(Loading_Scene("保存"));
        fetch
        (
          "https://script.google.com/macros/s/AKfycbwbxBARHidLzHA52cznZ2VI_x9hdNtW2RHnk5bV_dm1QU7A2eI/exec",
          {
            method: 'POST',
            body: "保存" + ID
            + "(改行)" + Save_Datas.シーンナンバー1 + "(改行)" + Flag1
            + "(改行)" + Save_Datas.シーンナンバー2 + "(改行)" + Flag2
            + "(改行)" + Save_Datas.シーンナンバー3 + "(改行)" + Flag3
            + "(改行)" + Save_Datas.シーンナンバー4 + "(改行)" + Flag4
            + "(改行)" + Save_Datas.シーンナンバー5 + "(改行)" + Flag5
            + "(改行)" + Save_Datas.シーンナンバー6 + "(改行)" + Flag6
            + "(改行)" + Save_Datas.シーンナンバー7 + "(改行)" + Flag7
            + "(改行)" + Save_Datas.シーンナンバー8 + "(改行)" + Flag8
            + "(改行)(スプレッドシート)" + Spread_sheet_ID
          }
        ).then(res => res.json()).then(result => {
          game.popScene();
          return;
        },);
      }
      else{
        game.pushScene(Loading_Scene("読み込み"));
        fetch
        (
          "https://script.google.com/macros/s/AKfycbwbxBARHidLzHA52cznZ2VI_x9hdNtW2RHnk5bV_dm1QU7A2eI/exec",
          {
            method: 'POST',
            body: "読込" + Spread_sheet_ID
          }
        ).then(res => res.json()).then(result => {
           for (var i = 0; i < result.length; i++) {
             if(result[i].ID==ID) break;
           }
           if(i!=result.length){
             Save_Datas = result[i];
             Flag1 = Save_Datas.フラグ1.split(",");
             Flag2 = Save_Datas.フラグ2.split(",");
             Flag3 = Save_Datas.フラグ3.split(",");
             Flag4 = Save_Datas.フラグ4.split(",");
             Flag5 = Save_Datas.フラグ5.split(",");
             Flag6 = Save_Datas.フラグ6.split(",");
             Flag7 = Save_Datas.フラグ7.split(",");
             Flag8 = Save_Datas.フラグ8.split(",");
           }
           var iii = "(画像:無し,../image/メニュー背景.png:画像)";
           iii += "(文字情報:20,black,無し,30:文字情報)"
           iii += "(ボタン:初めから,101.25,200,202.5,100,無し,スタート:ボタン)";
           iii += "(ボタン:続きから,101.25,400,202.5,100,無し,続きから:ボタン)";
           game.popScene();
           game.replaceScene(Novel_Main_Scene(iii,"スタート"));
           return;
         },);
      }
    }
    game.replaceScene(Start_Menu_Scene());
  }
  game.start();
}
