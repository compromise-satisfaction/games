enchant();

var BGM = document.createElement("audio");
BGM.addEventListener("ended",function(e){
  BGM.currentTime = BGM.id*1;
  BGM.play();
});

function Game_load(width,height){

  var Scene_kazu = 1;
  var Item_Flag = [];
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
  function Sound_branch(a){
      if(a=="無し") return;
      for (var i = 0; i < SE.length; i++) {
        if(SE[i].title == a) break;
      }
      switch(SE[i].type){
        case "音声":
          var Volume = Setting_Flag.音声音量;
          break;
        case "効果音":
          var Volume = Setting_Flag.効果音音量;
          break;
        default:
          var Volume = Setting_Flag.BGM音量;
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
      }
      return;
    }
  function BGM_ON(BGM_Name){
      switch(BGM_Name){
        case "無し":
          if(BGM.paused==false) BGM.pause();
          BGM.title = BGM_Name;
          break;
        case "消音":
          BGM.volume = 0;
          break;
        case "オン":
          BGM.volume = Setting_Flag.BGM音量/10;
          break;
        default:
          if(BGM.title == BGM_Name && BGM.paused == false) return;
          if(BGM.paused==false) BGM.pause();
          for (var i = 0; i < SE.length; i++) {
            if(SE[i].title == BGM_Name) break;
          }
          BGM.src = SE[i].src;
          BGM.currentTime = 0;
          BGM.volume = Setting_Flag.BGM音量/10;
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
  game.preload("../image/Hand.png");
  game.preload("../image/stone.png");
  game.preload("../image/V_or_D.png");
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

      function Buttons(x,y,w,h,v,i){
        Button[i] = new Entity();
        Button[i].moveTo(x,y);
        Button[i].width = w;
        Button[i].height = h;
        Button[i]._element = document.createElement("input");
        Button[i]._element.type = "button";
        Button[i]._element.value = v;
        Button[i]._element.style.fontSize = h/2.2;
        Button[i]._element.style.textAlign = "center";
        Button[i]._element.style.borderRadius = "0%";
        Button[i]._element.style.webkitAppearance = "none";
        Button[i].backgroundColor = "buttonface";
        Button[i]._element.onclick = function(e){
          switch(i){
            case 0:
              game.fps = 30;
              game.replaceScene(Brain_Training_Scene("メニュー"));
              return;
              break;
            case 1:
              game.fps = 10;
              game.replaceScene(R_MainScene());
              return;
            case 2:
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

      Buttons(width/4,180,width/2,height/10,"脳トレ",0);
      Buttons(width/4,300,width/2,height/10,"リバーシ",1);
      Buttons(width/4,420,width/2,height/10,"ノベルゲーム",2);

      return scene;
    };
    var Brain_Training_Scene = function(Type,Difficulty,Point){

      var Button = [];

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

      function Buttons(x,y,w,h,v,i){
        Button[i] = new Entity();
        Button[i].moveTo(x,y);
        Button[i].width = w;
        Button[i].height = h;
        Button[i]._element = document.createElement("input");
        Button[i]._element.type = "button";
        Button[i]._element.value = v;
        Button[i]._element.style.fontSize = w/(v.length+1);
        Button[i].backgroundColor = "buttonface";
        Button[i]._element.style.webkitAppearance = "none";
        Button[i]._element.onclick = function(e){
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
        };
        scene.addChild(Button[i]);
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
          S_Input1._element.value = "Name";
          S_Input1._element.placeholder = "ニックネームを入力";
          scene.addChild(S_Input1);

          var S_Input2 = new Entity();
          S_Input2.moveTo(width/4,150);
          S_Input2.width = width/2;
          S_Input2.height = 30;
          S_Input2._element = document.createElement('input');
          S_Input2._element.type = "submit";
          scene.addChild(S_Input2);

          var S_Input3 = new Entity();
          S_Input3.moveTo(width/4,200);
          S_Input3.width = width/2;
          S_Input3.height = 30;
          S_Input3._element = document.createElement('input');
          S_Input3._element.value = "ポイントコード発行";
          S_Input3._element.type = "submit";
          if(Point>0) scene.addChild(S_Input3);

          var S_Input4 = new Entity();
          S_Input4.moveTo(width/4,250);
          S_Input4.width = width/2;
          S_Input4.height = 30;
          S_Input4._element = document.createElement('input');
          S_Input4._element.type = "text";
          S_Input4._element.name = "myText";
          S_Input4._element.placeholder = "ワンタイムパスワード";

          var S_Input5 = new Entity();
          S_Input5.moveTo(width/4,300);
          S_Input5.width = width/2;
          S_Input5.height = 30;
          S_Input5._element = document.createElement('input');
          S_Input5._element.value = "もう一度";
          S_Input5._element.type = "submit";
          scene.addChild(S_Input5);

          var S_Input6 = new Entity();
          S_Input6.moveTo(width/4,350);
          S_Input6.width = width/2;
          S_Input6.height = 30;
          S_Input6._element = document.createElement('input');
          S_Input6._element.value = "メニューへ戻る";
          S_Input6._element.type = "submit";
          scene.addChild(S_Input6);

          var S_Input7 = new Entity();
          S_Input7.moveTo(width/4,400);
          S_Input7.width = width/2;
          S_Input7.height = 30;
          S_Input7._element = document.createElement('input');
          S_Input7._element.value = "ランキングを見る";
          S_Input7._element.type = "submit";
          if(Point>0){
            S_Input2._element.value = "ランキング登録";
            scene.addChild(S_Input7);
          }
          else S_Input2._element.value = "ランキングを見る";

          var hakkou = false;
          var Code = "";
          if(Difficulty) var Rank = "田植";
          else var Rank = "田中";

          S_Input2.addEventListener("touchstart",function(){
            if(S_Input1._element.value.length>6){
              Label1.text = "名前は六文字以下です。";
              return;
            }
            Name = S_Input1._element.value;
            window.localStorage.setItem("Name",Name);
            if(this._element.value == "ランキングを見る"){
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
               this._element.value = "ランキングを見る";
               scene.removeChild(S_Input7);
               return;
              },);
            return;
          })

          S_Input3.addEventListener("touchstart",function(){
            if(S_Input1._element.value.length>6){
              Label1.text = "名前は六文字以下です。";
              return;
            }
            Name = S_Input1._element.value;
            window.localStorage.setItem("Name",Name);
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
          })

          S_Input5.addEventListener("touchstart",function(){
            if(S_Input1._element.value.length>6){
              Label1.text = "名前は六文字以下です。";
              return;
            }
            Name = S_Input1._element.value;
            window.localStorage.setItem("Name",Name);
            game.replaceScene(Brain_Training_Scene("メイン",Difficulty));
            game.pushScene(Brain_Training_Scene("COUNTDOWN"));
            return;
          })

          S_Input6.addEventListener("touchstart",function(){
            if(S_Input1._element.value.length>6){
              Label1.text = "名前は六文字以下です。";
              return;
            }
            Name = S_Input1._element.value;
            game.replaceScene(Start_Menu_Scene());
            return;
          })

          S_Input7.addEventListener("touchstart",function(){
            if(S_Input1._element.value.length>6){
              Label1.text = "名前は六文字以下です。";
              return;
            }
            Name = S_Input1._element.value;
            window.localStorage.setItem("Name",Name);
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
          })

          return scene;
          break;
        case "STOP":
          var scene = new Scene();                                // 新しいシーンを作る

          var Background = new Sprite();
          Background._element = document.createElement("img");
          Background._element.src = "../image/半透明(黒).png";
          Background.x = 0;
          Background.y = 0;
          Background.width = width;
          Background.height = height;
          scene.addChild(Background);

          Buttons((width-300)/2,150,300,90,"続ける",7);
          Buttons((width-300)/2,300,300,90,"やめる",8);

          return scene;
          break;
        case "COUNTDOWN":
          var scene = new Scene();                                // 新しいシーンを作る

          var Background = new Sprite();
          Background._element = document.createElement("img");
          Background._element.src = "../image/半透明(黒).png";
          Background.width = width;
          Background.height = height;
          scene.addChild(Background);

          var Button = new Entity();
          Button.moveTo((width-100)/2,(height-100)/2);
          Button.width = 100;
          Button.height = 100;
          Button._element = document.createElement("input");
          Button._element.type = "submit";
          Button._element.value = "四";
          Button.backgroundColor = "buttonface";
          scene.addChild(Button);

          var Meter = new Sprite();
          Meter._element = document.createElement("img");
          Meter._element.src = "../image/透明.png";
          Meter.y = (height - width) / 2;
          Meter.width = width;
          Meter.height = width;
          scene.addChild(Meter);

          game.fps = 1;

          Button.addEventListener("enterframe",function(){
            switch (Button._element.value) {
              case "四":
                Meter._element.src = "../image/メーター.gif";
                Button._element.value = "三";
                break;
              case "三":
                Button._element.value = "二";
                break;
              case "二":
                Button._element.value = "一";
                break;
              case "一":
                Button._element.value = "スタート！";
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
            scene.removeChild(Button[9]);
            scene.removeChild(Button[10]);
          }

          if(Difficulty.length <= Point + 10){
            scene.removeChild(Button[11]);
            scene.removeChild(Button[12]);
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
    var Novel_MainScene = function(Data){

      var scene = new Scene();                                // 新しいシーンを作る

      var Image = [];

      function Images(a){
        Image[i] = new Sprite();
        Image[i]._element = document.createElement("img");
        Image[i]._element.src = "../image/透明.png";
        Image[i].imageurl = a.split(",")[0];
        Image[i].x = a.split(",")[1]*1;
        Image[i].y = a.split(",")[2]*1;
        Image[i].width = a.split(",")[3]*1;
        Image[i].height = a.split(",")[4]*1;
        Image[i].fade = false;
        if(a.split(",")[5]){
          if(a.split(",")[5].substring(0,4)=="fade"){
            Image[i].fade = a.split(",")[5].substring(4);
          }
          else{
            Image[i].addEventListener("touchend",function(e){
              for (var i = 0; i < Game_Datas.length; i++) {
                if(Game_Datas[i].Number==a.split(",")[5]) break;
              }
              if(i < Game_Datas.length) game.replaceScene(Novel_MainScene(Game_Datas[i].Data));
              else game.replaceScene(Novel_MainScene("(ボタン:エラー,0,0,405,600,スタート)"));
            });
          }
        }
        scene.addChild(Image[i]);
        return;
      }

      var Button = [];
      var Button_fontSize = 15;

      function Buttons(a){
        Button[i] = new Entity();
        Button[i].moveTo(a.split(",")[1]*1,a.split(",")[2]*1);
        Button[i].width = a.split(",")[3];
        Button[i].height = a.split(",")[4];
        Button[i]._element = document.createElement("input");
        Button[i]._element.type = "button";
        Button[i]._element.value = a.split(",")[0];
        Button[i]._element.style.fontSize = Button_fontSize;
        Button[i]._element.style.webkitAppearance = "none";
        Button[i].backgroundColor = "buttonface";
        if(false){
          Button[i]._element.value += " ✓";
          Button[i].backgroundColor = "red";
        }
        Button[i]._element.onclick = function(e){
          if(a.split(",")[6]) Sound_branch(a.split(",")[6]);
          else Sound_branch("無し");
          for (var i = 0; i < Game_Datas.length; i++) {
            if(Game_Datas[i].Number==a.split(",")[5]) break;
          }
          if(i < Game_Datas.length) game.replaceScene(Novel_MainScene(Game_Datas[i].Data));
          else{
            switch(a.split(",")[5]){
              case "popScene":
                game.popScene();
                break;
              case "pushScene":
                for (var i = 0; i < Game_Datas.length; i++) {
                  if(Game_Datas[i].Number==a.split(",")[7]) break;
                }
                if(i < Game_Datas.length) game.pushScene(Novel_MainScene(Game_Datas[i].Data));
                else game.replaceScene(Novel_MainScene("(ボタン:エラー,0,0,405,600,スタート)"));
                break;
              default:
                game.replaceScene(Novel_MainScene("(ボタン:エラー,0,0,405,600,スタート)"));
                break;
            }
          }
          return;
        };
      }

      var Images_Data = Data.match(/\(画像:.+?\)/g);

      if(Images_Data){
        var Image_Number = 0;
        for (var i = 0; i < Images_Data.length; i++) {
          Images_Data[i] = Images_Data[i].substring(4,Images_Data[i].length-1);
          Images(Images_Data[i]);
        }
        Data = Data.replace(/\(画像:.+?\)/g,"●");//テキストを消費
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
      }


      var Buttons_Data = Data.match(/\(ボタン:.+?\)/g);

      if(Buttons_Data){
        var Button_Number = 0;
        for (var i = 0; i < Buttons_Data.length; i++) {
          Buttons_Data[i] = Buttons_Data[i].substring(5,Buttons_Data[i].length-1);
          Buttons(Buttons_Data[i]);
        }
        Data = Data.replace(/\(ボタン:.+?\)/g,"Θ");//テキストを消費
      }

      var Text_informations_Data = Data.match(/\(文字情報:.+?\)/g);

      if(Text_informations_Data){
        var Text_information_Number = 0;
        for (var i = 0; i < Text_informations_Data.length; i++) {
          Text_informations_Data[i] = Text_informations_Data[i].substring(6,Text_informations_Data[i].length-1);
        }
        Data = Data.replace(/\(文字情報:.+?\)/g,"¶");//テキストを消費
      }

      var Speeds_Data = Data.match(/\(待機時間:.+?\)/g);

      if(Speeds_Data){
        var Speed_Number = 0;
        for (var i = 0; i < Speeds_Data.length; i++) {
          Speeds_Data[i] = Speeds_Data[i].substring(6,Speeds_Data[i].length-1);
        }
        Data = Data.replace(/\(待機時間:.+?\)/g,"δ");//テキストを消費
      }

      var Sounds_Data = Data.match(/\(再生:.+?\)/g);

      if(Sounds_Data){
        var Sound_Number = 0;
        for (var i = 0; i < Sounds_Data.length; i++) {
          Sounds_Data[i] = Sounds_Data[i].substring(4,Sounds_Data[i].length-1);
        }
        Data = Data.replace(/\(再生:.+?\)/g,"Ψ");//テキストを消費
      }

      var BGMs_Data = Data.match(/\(BGM:.+?\)/g);

      if(BGMs_Data){
        var BGM_Number = 0;
        for (var i = 0; i < BGMs_Data.length; i++) {
          BGMs_Data[i] = BGMs_Data[i].substring(5,BGMs_Data[i].length-1);
        }
        Data = Data.replace(/\(BGM:.+?\)/g,"§");//テキストを消費
      }

      var Items_Data = Data.match(/\(アイテム:.+?\)/g);

      if(Items_Data){
        var Item_Number = 0;
        for (var i = 0; i < Items_Data.length; i++) {
          Items_Data[i] = Items_Data[i].substring(6,Items_Data[i].length-1);
        }
        Data = Data.replace(/\(アイテム:.+?\)/g,"π");//テキストを消費
      }

      var Coordinates_Data = Data.match(/\(文字座標:.+?\)/g);

      if(Coordinates_Data){
        var Coordinate_Number = 0;
        for (var i = 0; i < Coordinates_Data.length; i++) {
          Coordinates_Data[i] = Coordinates_Data[i].substring(6,Coordinates_Data[i].length-1);
        }
        Data = Data.replace(/\(文字座標:.+?\)/g,"±");//テキストを消費
      }

      var Name_texts = Data.match(/\(名前:.+?\)/g);

      if(Name_texts){
        Name_texts = Name_texts[0].substring(4,Name_texts[0].length-1);
        Name_texts = "【" + Name_texts + "】";
        var Name_text = new Sprite();
        Name_text._element = document.createElement("innerHTML");
        Name_text._style.font  = width/20 + "px monospace";
        Name_text._element.textContent = Name_texts;
        Name_text.x = 0;
        Name_text.y = width/30 + width/16*9;
        scene.addChild(Name_text);
        Data = Data.replace(/\(名前:.+?\)/g,"");//テキストを消費
      }

      var Text = [];
      var PX = width/20;
      var Text_X = width/20;
      var Text_Y = width/20 + width/20 + width/16*9;
      var Text_Sound = "無し";
      var Text_Color = "black";
      var Text_Number = 0;
      var Itimozi = null;
      var FPS = 5;
      var Display_time = 0;
      var Opacity = 1;
      var Opacitys = -0.02;

      function Texts(){
        Itimozi = Data[Text_Number];
        if(!Itimozi) return;
        switch (Itimozi) {
          case "●":
            if(Image[Image_Number].fade){
              if(Image[Image_Number].fade.substring(0,2)=="in"){
                Image[Image_Number].opacity = 0;
                Image[Image_Number].tl.fadeIn(Image[Image_Number].fade.substring(2)*1);
              }
              else{
                Image[Image_Number].tl.fadeOut(Image[Image_Number].fade.substring(3)*1);
              }
            }
            Image[Image_Number]._element.src = Image[Image_Number].imageurl
            Image_Number++;
            Text_Number++;
            Texts();
            return;
            break;
          case "Θ":
            scene.addChild(Button[Button_Number]);
            Button_Number++;
            Text_Number++;
            Texts();
            return;
            break;
          case "¶":
            PX = Text_informations_Data[Text_information_Number].split(",")[0]*1;
            Text_Color = Text_informations_Data[Text_information_Number].split(",")[1];
            Text_Sound = Text_informations_Data[Text_information_Number].split(",")[2];
            Button_fontSize = Text_informations_Data[Text_information_Number].split(",")[3];
            Text_information_Number++
            Text_Number++;
            Texts();
            return;
            break;
          case "δ":
            FPS = Speeds_Data[Speed_Number];
            Speed_Number++
            Text_Number++;
            Texts();
            return;
            break;
          case "Ψ":
            Sound_branch(Sounds_Data[Sound_Number]);
            Sound_Number++
            Text_Number++;
            Texts();
            return;
            break;
          case "§":
            BGM_ON(BGMs_Data[BGM_Number]);
            BGM_Number++
            Text_Number++;
            Texts();
            return;
            break;
          case "π":
            for (var i = 0; i < Item_Flag.length; i++) {
              if(Item_Flag[i] == Items_Data[Item_Number]){
                break;
              }
            }
            if(i==Item_Flag.length) Item_Flag[Item_Flag.length] = Items_Data[Item_Number];
            Item_Number++
            Text_Number++;
            Texts();
            return;
            break;
          case "±":
            Text_X = Coordinates_Data[Coordinate_Number].split(",")[0]*1;
            Text_Y = Coordinates_Data[Coordinate_Number].split(",")[1]*1;
            Coordinate_Number++
            Text_Number++;
            Texts();
            return;
            break;
          case " ":
            Text_X += PX;
            Text_Number++;
            Texts();
            return;
            break;
          default:
            break;
        }
        Display_time++;
        if(FPS==0){
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
          Text_X += PX;
          Sound_branch(Text_Sound);
          scene.addChild(Text[Text.length-1]);
          Text_Number++;
          Texts();
          return;
        }
        if(Display_time%FPS!=0) return;
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
        Text_X += PX;
        Sound_branch(Text_Sound);
        scene.addChild(Text[Text.length-1]);
        Text_Number++;
        return;
      }

      Texts();

      game.addEventListener("enterframe",function(){
        for (var i = 0; i < Text.length; i++) {
          if(Text[i].点滅) Text[i].opacity = Opacity;
        }
        Opacity += Opacitys;
        if(Opacity < 0) Opacitys = 0.02;
        if(Opacity > 1) Opacitys = -0.02;
        Texts();
        if(game.input.up) console.log(Text.length);
        return;
      });


      return scene;
    };
    var Loading_Scene = function(Type){
      var scene = new Scene();                                // 新しいシーンを作る

        var Background = new Sprite();
        Background._element = document.createElement("img");
        Background._element.src = "../image/半透明(黒).png";
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
    var R_MainScene = function(){
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
      Set_button4.addEventListener('touchstart',function(e){
        game.pushScene(R_ReturnScene());
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

      scene.on("touchstart",function(e){
        if((Time_Hand>5&&va!=AI)||AI == 100){
          Pointer.x = e.x;
          Pointer.y = e.y;
          scene.addChild(Pointer);
          scene.removeChild(Pointer);
          okuugoki();
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
      })
      return scene;
    };
    var R_ReturnScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Reversi = new Sprite(405,550);
      Reversi.image = game.assets["../image/白.png"];
      scene.addChild(Reversi);

      var Set_button = new Sprite(195,95);
      Set_button.image = game.assets["../image/Set_button.png"];
      Set_button.x = 105;
      Set_button.frame = 12;
      scene.addChild(Set_button);
      Set_button.addEventListener('touchstart',function(e){
        game.popScene();
        game.replaceScene(R_MainScene());
      });

      var S_Input = new Entity();
      S_Input.moveTo(width/4,300);
      S_Input.width = width/2;
      S_Input.height = 95;
      S_Input._element = document.createElement('input');
      S_Input._element.value = "メニューへ戻る";
      S_Input._element.type = "submit";
      S_Input._element.fontSize = 90;
      scene.addChild(S_Input);
      S_Input.addEventListener('touchstart',function(e){
        game.popScene();
        game.replaceScene(Start_Menu_Scene());
      });

      var Set_button1 = new Sprite(195,95);
      Set_button1.image = game.assets["../image/Set_button.png"];
      Set_button1.x = 105;
      Set_button1.y = 455;
      Set_button1.frame = 10;
      scene.addChild(Set_button1);
      Set_button1.addEventListener('touchstart',function(e){
        game.popScene();
      });

      return scene;
    };
    if(window.localStorage){
      var ID = window.localStorage.getItem("ID");
    }
    else{
      var Codes = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
      "1","2","3","4","5","6","7","8","9"];
      var ID = "";
      for (var i = 0; i < 10; i++) {
        ID += Codes[rand(Codes.length)];
      }
      window.localStorage.setItem("ID",ID);
    }
    game.replaceScene(Start_Menu_Scene());
  }
  game.start();
}