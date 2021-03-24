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
