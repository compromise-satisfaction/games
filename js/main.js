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
        Button[i]._element.style.fontSize = h/2;
        Button[i].backgroundColor = "buttonface";
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
        Button[i]._element.type = "submit";
        Button[i]._element.value = v;
        Button[i]._element.style.fontSize = w/(v.length+1);
        Button[i].backgroundColor = "buttonface";
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

      function Buttons(a){
        Button[i] = new Entity();
        Button[i].moveTo(a.split(",")[1]*1,a.split(",")[2]*1);
        Button[i].width = a.split(",")[3];
        Button[i].height = a.split(",")[4];
        Button[i]._element = document.createElement("input");
        Button[i]._element.type = "submit";
        Button[i]._element.value = a.split(",")[0];
        Button[i].backgroundColor = "buttonface";
        if(false){
          Button[i]._element.value += " ✓";
          Button[i].backgroundColor = "red";
        }
        Button[i]._element.onclick = function(e){
          if(a.split(",")[6]) Sound_branch(a.split(",")[6]);
          else Sound_branch("無し");
          switch(a.split(",")[7]){
            case "人物":
            case "アイテム":
              if(Scene_kazu == 1){
                game.pushScene(Novel_MainScene(a.split(",")[7]));
                Scene_kazu++;
              }
              else game.replaceScene(Novel_MainScene(a.split(",")[7]));
              return;
              break;
            case "popScene":
              game.popScene();
              Scene_kazu--;
              return;
              break;
            default:
              Setting_Flag.シーンナンバー = a.split(",")[5];
              break;
          }
          for (var i = 0; i < Game_Datas.length; i++) {
            if(Game_Datas[i].Number==a.split(",")[5]) break;
          }
          if(i < Game_Datas.length) game.replaceScene(Novel_MainScene(Game_Datas[i].Data));
          else game.replaceScene(Novel_MainScene("(ボタン:エラー,0,0,405,600,スタート)"));
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

      var White_Background = new Sprite();
      White_Background._element = document.createElement("img");
      switch(Data){
        case "アイテム":
          White_Background._element.src = "../image/メニュー背景.png";
          White_Background.height = height;
          Data  = "(ボタン:戻る,30,30,80,40,popScene,戻る,popScene)";
          Data += "(ボタン:設定,162.5,30,80,40,popScene,メニュー)";
          Data += "(ボタン:人物,295,30,80,40,人物,メニュー,人物)";
          for (var i = 0; i < Item_Flag.length; i++) {
            Data += "(ボタン:" + Item_Flag[i] + ",30,140,345,40,人物,メニュー,人物)";
          }
          break;
        case "人物":
          White_Background._element.src = "../image/メニュー背景.png";
          White_Background.height = height;
          Data  = "(ボタン:戻る,30,30,80,40,popScene,戻る,popScene)";
          Data += "(ボタン:設定,162.5,30,80,40,popScene,メニュー)";
          Data += "(ボタン:アイテム,295,30,80,40,アイテム,メニュー,アイテム)";
          break;
        default:
          White_Background._element.src = "../image/白.png";
          White_Background.y = width/16*9;
          White_Background.height = height-width/16*9;
          break;
      }
      White_Background.width = width;
      scene.addChild(White_Background);

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

      var PX = width/20;
      var Text_X = width/20;
      var Text_Y = width/20 + width/20 + width/16*9;
      var Text_Sound = "無し";
      var Text_Color = "black";
      var Text_Number = 0;
      var Itimozi = null;
      var FPS = 5;
      var Display_time = 0;

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
        if(Display_time%FPS!=0) return;
        Display_time = 0;
        Text[Text_Number] = new Sprite();
        Text[Text_Number]._element = document.createElement("innerHTML");
        Text[Text_Number]._style.font  = PX + "px monospace";
        Text[Text_Number]._element.textContent = Itimozi;
        Text[Text_Number].x = Text_X;
        Text[Text_Number].y = Text_Y;
        Text[Text_Number]._style.color = Text_Color;
        Text_X += PX;
        Sound_branch(Text_Sound);
        scene.addChild(Text[Text_Number]);
        Text_Number++;
        return;
      }

      Texts();

      White_Background.addEventListener("enterframe",function(){
        Texts();
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
    /*
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
    */
    game.replaceScene(Start_Menu_Scene());
  }
  game.start();
}
