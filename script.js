function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function cell(f, r, s, v){
  if(s == 'r'){
    return board[3-r][f-1];
  }else if(s == 's'){
    board[3-r][f-1] = v;
    document.getElementById(boardn[3-r][f-1]).innerText = v;
  } 
}
function occupy_corner_cell(){
  let pos = [[a, 1], [a, 3], [c, 3], [c, 1]];
  let por =  getRandomInt(0, 3);
  while(true){
    if(cell(pos[por][0], pos[por][1], 'r', null) == "_"){cell(pos[por][0], pos[por][1], 's', tl[t%2]); break;}
    por =  getRandomInt(0, 3);
  }
}
function occupy_non_corner_cell(){
  let pos = [[a, 2], [b, 3], [c, 2], [b, 1]];
  let por =  getRandomInt(0, 3);
  while(true){
    if(cell(pos[por][0], pos[por][1], 'r', null) == "_"){cell(pos[por][0], pos[por][1], 's', tl[t%2]); break;}
    por =  getRandomInt(0, 3);
  }
}
function occupy_adjacent_cell(){
  let por = getRandomInt(1, 2);
  while(true){
    if(cell(con1l[con1[2]][por][0], con1l[con1[2]][por][1], 'r', null) == "_"){cell(con1l[con1[2]][por][0], con1l[con1[2]][por][1], 's', tl[t%2]); break;}
    por =  getRandomInt(1, 2);
  }
}
function occupy_cross_cell(){
  let por = getRandomInt(1, 2);
  while(true){
    if(cell(con2l[con2][por][0], con2l[con2][por][1], 'r', null) == "_"){cell(con2l[con2][por][0], con2l[con2][por][1], 's', tl[t%2]); break;}
    por =  getRandomInt(1, 2);
  }
}
function win(){
  for(let i=0; i<8; i++){
    sum = cell(wl[i][0][0], wl[i][0][1], 'r', null) + cell(wl[i][1][0], wl[i][1][1], 'r', null) + cell(wl[i][2][0], wl[i][2][1], 'r', null);
    if(sum == "XXX" || sum == "OOO"){
      return true
    }
  }
  return false
}
function draw(){
  let d = 0
  for(let f=1; f<4; f++){
    for(let r=1; r<4; r++){
      if(cell(f, r, 'r', null) == "_"){
        d++
      }
    }
  }
  return (d==0 && !win()) ? true : false;
}
function pan(){
  //This function needs to be removed.
  for(let f=1; f<4; f++){
    for(let r=1; r<4; r++){
      if(cell(f, r, 'r', null) == "_"){
        cell(f, r, 's', tl[t % 2]);
        return;
      }
    }
  }
}
function block(win_opponent){
  if(win_opponent){t -= 1;}
  for(let i=0; i<8; i++){
    sum = cell(wl[i][0][0], wl[i][0][1], 'r', null) + cell(wl[i][1][0], wl[i][1][1], 'r', null) + cell(wl[i][2][0], wl[i][2][1], 'r', null)
    if(sum == tl[(t+1)%2]+tl[(t+1)%2]+"_" || sum == tl[(t+1)%2]+"_"+tl[(t+1)%2] || sum == "_"+tl[(t+1)%2]+tl[(t+1)%2]){//alert(sum)
      if(win_opponent){t += 1;}
      if(sum[0] == "_"){
        cell(wl[i][0][0], wl[i][0][1], 's', tl[t % 2])
      }else if(sum[1] == "_"){
        cell(wl[i][1][0], wl[i][1][1], 's', tl[t % 2])
      }else if(sum[2] == "_"){
        cell(wl[i][2][0], wl[i][2][1], 's', tl[t % 2])
      }
      return true
    }
  }
  if(win_opponent){t += 1;}
  return false
}
function ai(){
  if(win()){/*localStorage.test += 'e'*/return;}
  if(default_settings_items["computerGoes"] == "second"){ 
    if(t == 1){
      if(cell(b, 2, 'r', null) == "_"){cell(b, 2, 's', tl[t%2]);}else{
        occupy_corner_cell();
      }
    }else if(t == 3){
      let con1 = cell(b, 1, 'r', null) + cell(b, 3, 'r', null);
      let con2 = cell(a, 2, 'r', null) + cell(c, 2, 'r', null);
      let con3 = tl[(t+1)%2] + tl[(t+1)%2];
      let con4 = cell(a, 1, 'r', null) + cell(a, 3, 'r', null) + cell(c, 1, 'r', null) + cell(c, 3, 'r', null);
      let con4c = ['a1', 'a3', 'c1', 'c3'];
      let con4b = false;
      let con5b = false;
      for(let i=0; i<4; ++i){
	if(con4[i] == tl[(t+1)%2]){
	  for(let j=0; j<4; ++j){
	    if(con4[j] == tl[t%2]){
		if(con4c[i][0] != con4c[j][0]){con4b = true;}
                break;
	    }else if(i != j && con4[j] == tl[(t+1)%2]){
		if(con4c[i][0] != con4c[j][0]){con5b = true;}
                break;
	    }
	  }
	  break;
	}
      }
      console.log(con4b);
      if(con1 == con3 || con2 == con3 || con4b){
        occupy_corner_cell();//N.B: This condition only happens when the user did not occupy centre square to begin with. At this poiint the computer has won the game
      }else if(con5b){console.log("Cross Cell Occupied")
	occupy_non_corner_cell();
      }else{
        if(!block(false)){//try to block, if you cannot then...
          //pan();//occupy_corner_cell();
	  /*
	    This is for if you were able to take the centre square.
	     A number of things could happen here, the ones which require your attention are stated below:
	      1. If the user  occupies two non-adjacent corner squares
	    This is for if you were not able to take the centre square.
	     There is only one move I can think of that the user can play to achieve a two way.
	      1. Obviously if the user takes the centre square you should be blocking on t = 3.
	      2. Also if the user takes the centre square you take a corner square.
	      3. If 1 is false, and you did 2 (which you are programmed to do) it can only mean that the user has played a corner-square which is non-adjacent to yours.
	      Solution: Occupy a corner square.
	      Solved: See con4, con4c, con4b and the for loops and if statements that utilize the.
	  */
	  console.log("Has not been coded yet.");
        }
        //console.log("TO be implemented.")
      }
    }else{
      if(block(true)){}else if(block(false)){}else{ pan(); console.log("you cannot win and cannot block");}
    }
    //if(!block()){pan();}
    console.log("player: "+ tl[t%2] + " : " +t);
    //localStorage.test += '['+board+']';
    //t++;//changes it to the next players turn
  }else if(default_settings_items["computerGoes"] == "first"){
    if(t == 0){cell(b, 2, 's', tl[t%2]);}else if(t == 2){
      //let pos = [[a, 1], [a, 3], [c, 3], [c, 1]];
      for(let i=0; i<4; ++i){
        let con1v = cell(con1l[i][0][0], con1l[i][0][1], 'r', null);
        if(con1v != "_"){con1[2] = i;}
        con1[0] += con1v;
      }
      if(con1[0] != "____"){
        occupy_adjacent_cell();
        //cell(con1[2][0], con1[2][1], 's', tl[t%2]);//what is going on here
        //console.log(con1)
        console.log("it the first configuration")
        con1[1] = true;
        console.log(con1);
        //Assuming you are playing with an ooptimal player, the gamed is already over, ends in a draw.

      }else{
        for(let i=0; i<4; ++i){
          if(cell(con2l[i][0][0], con2l[i][0][1], 'r', null) != "_"){con2 = i;}
        }
        occupy_cross_cell();
        //console.log("it the second configuration")
      }
    }else if(t == 4){
      if(con1[1] && !block(true)){
        occupy_adjacent_cell();
      }
    }else{
      if(block(true)){}else if(block(false)){}else{ pan(); console.log("you cannot win and cannot block");}
    }
    //t++;//changes it to the next players turn
  }
  if(win()){alert("Player "+tl[t%2]+" won!!");/*localStorage.test += 'e'*/return;}
  t++;
}
function ttt(f, r, cn){
  if(win() || ava){
    return;
  }
  if(cell(f, r, 'r', null) == "_"){
    cell(f, r, 's', tl[t%2]);
    if(win()){
      alert("Player "+tl[t%2]+" won!!"); 
      return;
    }
    t++;
    if(default_settings_items["playWith"] == "computer"){
      setTimeout(ai, 250);
    }
    //Second player clicks and restarts whole function. If ai second, ai here.
    if(draw()){
      alert("Draw!!!");
    }
  }
}
