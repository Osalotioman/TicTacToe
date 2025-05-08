function st(v){
    if(v == "show_settings"){
        game.style = "display:none;"
        settings_page.style = "display:block;"
    }else if(v == "return_to_game"){
        game.style = "display:block;"
        settings_page.style = "display:none;"
    }
}
function rs(){
    for(let rsf=0; rsf<3; rsf++){
        for(let rsr=0; rsr<3; rsr++){
            document.getElementById(boardn[rsf][rsr]).innerText = "";
            board[rsf][rsr] = "_";
        }
    }
    con1 = ["", false, 0];
    t = 0;
    setTimeout(default_settings, 250);
}

function compF(){
  if(default_settings_items["playWith"] == "computer" && default_settings_items["computerGoes"] == "first"){
    ai();
  }
}

function default_settings(){
    compF();
    //Play with computer is default so when you got to setting for the first time, it should already be checked.
    if(default_settings_items["page"] == "page1"){
        st("return_to_game");
    }else if(default_settings_items["page"] == "page2"){
        st("show_settings");
    }
}
function load_default_settings(){
    setTimeout(default_settings, 250);
}
function adjust_settings(v){
  if(v == 1){
    //default_settings_items["symbolGoesFirst"] = 
    let holdv = tl[0];
    tl[0] = tl[1];
    tl[1] = holdv;
    default_settings_items["page"] = "page2";
    rs();
  } else if (v == 2) {
    if (default_settings_items["playWith"] == "computer") {
      default_settings_items["playWith"] = "human";
    } else {
      default_settings_items["playWith"] = "computer";
    }
    default_settings_items["page"] = "page2";
    rs();
  } else if (v == 3) {
    if (default_settings_items["difficultyLevel"] == "easy") {
      default_settings_items["difficultyLevel"] = "hard";
    } else {
      default_settings_items["difficultyLevel"] = "easy";
    }
    default_settings_items["page"] = "page2";
    rs();
  }
}
window.onload = function(){
    load_default_settings();
}
