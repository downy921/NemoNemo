var database="../DataBase/";
var iconBase="../Icon/";

var profile={};
var button={};
var restHint=[];
var title;
var hintCheckbox;

var colInfoWrapper;
var rowInfoWrapper;
var gameGridWrapper;

var section;
var cover;
var upperSection;
var lowerSection;
var blankSpace;

var minimun;

var colInfo=[];
var rowInfo=[];
var gameGrid=[];

// const hideDragDefaultImg = (e) => {
//     let emptyImg = new Image();
//     emptyImg.src =
//       "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
//     e.dataTransfer.setDragImage(emptyImg, 0, 0);
//   };

  const hideDragDefaultImg = (e) => {
    let emptyImg = new Image();
    emptyImg.src =
      "../Icon/home.png";
    e.dataTransfer.setDragImage(emptyImg, 0, 0);
  };

function attachListener(){
    button["reset"].addEventListener("click", reset);
    hintCheckbox.addEventListener('click', (e)=>{hintChanged(e);});
    if(game_hint<=0) hintCheckbox.disabled="disabled";

    for(var i=0; i<game_size; i++){
        for(var j=0; j<game_size; j++){
            gameGrid[i][j].addEventListener("click", (e)=>{blackOrBlank(e);});
            gameGrid[i][j].addEventListener("dragenter", (e)=>{dragTest(e);});
        }
    }

}

function dragTest(e){
    blackOrBlank(e);
}

function initVariables(){

    var buttonNameList=['setting', 'home','back','hint', 'reset' ,'black','blank'];

    title=document.querySelector('#title');

    for (var i=0; i<buttonNameList.length; i++){
        var bname=buttonNameList[i]
        button[bname]=document.querySelector('#' + bname+"Button");
    }

    for (var i=0; i<3; i++){
        restHint[i]=document.querySelector('#restHint'+(i+1));
    }

    profile["img"]=document.querySelector('#profile');
    profile["name"]=document.querySelector('#userName');


    colInfoWrapper=document.querySelector('#colInfo');
    rowInfoWrapper=document.querySelector('#rowInfo');
    gameGridWrapper=document.querySelector('#gameGrid');


    section=document.querySelector('#gameSection');
    cover=document.querySelector('#gameCover');
    upperSection=document.querySelector('#gameUpper');
    lowerSection=document.querySelector('#gameLower');
    blankSpace=document.querySelector('#blankSpace');

    hintCheckbox=document.querySelector('#hint');
}

function setHint(){

    var rest=game_hint;

    for(var i=0; i<rest; i++){
        restHint[i].src=iconBase+"hintLeft.png";
    }
    for(var i=rest; i<3; i++){
        restHint[i].src=iconBase+"hintUsed.png";
    }

}

function setGameSection(){

    var row_num=game_row[0].length+game_size;
    var col_num=game_col[0].length+game_size;
    var size_width=parseInt(section.offsetWidth / row_num)
    var size_height=parseInt(section.offsetHeight / col_num)
    minimum=size_width;

    if( size_width > size_height){
        minimum=size_height;
    }

    cover.style.width=minimum*row_num+"px";
    cover.style.height=minimum*col_num+"px";
    cover.style.marginLeft=parseInt((section.offsetWidth-cover.offsetWidth)/2)+"px";
    cover.style.marginBottom=parseInt((section.offsetHeight-cover.offsetHeight)/2)+"px";

    upperSection.style.height=minimum*game_col[0].length+"px";
    lowerSection.style.height=minimum*game_size+"px";

    blankSpace.style.width=minimum*game_row[0].length+"px";
    colInfoWrapper.style.width=minimum*game_size+"px";

    rowInfoWrapper.style.width=minimum*game_row[0].length+"px";
    gameGridWrapper.style.width=minimum*game_size+"px";
    
    for(var i=0; i<game_size; i++){
        document.querySelector('#row'+i).style.height=minimum+"px";
        document.querySelector('#col'+i).style.width=minimum+"px";
        document.querySelector('#grid'+i).style.height=minimum+"px";
    }

    document.querySelector('#rowInfo').style.lineHeight=minimum+"px";
    document.querySelector('#colInfo').style.lineHeight=minimum+"px";
}

function gridSetting(){
    for(var i=0; i<game_size; i++){
        var query='<div id="row'+i+'" class="colFlex info border rightBorder">\n';
        
        for(var j=0; j<game_row[0].length; j++){
            query+='<div id='+j+'></div>\n';
        }
        query+='</div>';
        rowInfoWrapper.innerHTML+=query;

        query='<div id="col'+i+'" class="rowFlex colGrid info border bottomBorder">\n';
        
            for(var j=0; j<game_col[0].length; j++){
                query+='<div id='+j+'></div>\n';
            }
        query+='</div>';
        colInfoWrapper.innerHTML+=query;

        query='<div id="grid'+i+'" class="colFlex game">\n';
        
            for(var j=0; j<game_size; j++){
                
                query+='<div id='+j+' draggable="true"></div>\n';
            }
        query+='</div>';
        gameGridWrapper.innerHTML+=query;

    }


    for(var i=0; i<game_size; i++){
        rowInfo.push(document.querySelector('#row'+i).children);
        colInfo.push(document.querySelector('#col'+i).children);
        gameGrid.push(document.querySelector('#grid'+i).children);
    }

    document.querySelector('#col0').classList.add("leftBorder");

    for(var i=0; i<game_size; i++){

        for(var j=0; j<game_size; j++){
            gameGrid[i][j].classList.add("border");   

            if((j+1)%5==0 && j+1!=game_size){
                gameGrid[i][j].classList.add("rightBorder");
                document.querySelector('#col'+j).classList.add("rightBorder");
                
            }

            if((i+1)%5==0 && i+1!=game_size){
                gameGrid[i][j].classList.add("bottomBorder");
                document.querySelector('#row'+i).classList.add("bottomBorder");
            }
        }

    }


}

function setInfo(){
    for(var i=0; i<game_size; i++){

        var size=game_row[0].length;
        var not_zero=0;

        for(j=0; j<size; j++){
            if(game_row[i][j]!=0){
                not_zero+=1;
            }
            if(game_row[i][j]==0){
                break;
            }
        }

        if(not_zero!=0){
            for(j=0; j<not_zero; j++){
                rowInfo[i][size-not_zero+j].innerHTML=game_row[i][j];
            }
        } else{
            rowInfo[i][size-1].innerHTML=game_row[i][not_zero];
        }

        size=game_col[0].length;
        not_zero=0;

        for(j=0; j<size; j++){
            if(game_col[i][j]!=0){
                not_zero+=1;
            }
            if(game_col[i][j]==0){
                break;
            }
        }

        if(not_zero!=0){
            for(j=0; j<not_zero; j++){
                colInfo[i][size-not_zero+j].innerHTML=game_col[i][j];
            }
        } else{
            colInfo[i][size-1].innerHTML=game_col[i][not_zero];
        }

    }
}

function pageInit(){
    profile["name"].innerHTML=user_name;
    profile["img"].src=database+user_name+".jpg";
    title.innerHTML=game_name;

    gridSetting();

    
    setHint();
    setGameSection();
    setInfo();
    paintAllGrid();

    window.onresize = setGameSection;
}

function myConfirm(string){
    // confirm Custom
    result=confirm(string);
    return result;
}

function myAlert(string){

    // alert Custom
    alert(string);
} 


function reset(){
    if(myConfirm("초기화 하시겠습니까?")){
        game_progress=0;
        for (var i=0; i<game_size; i++){
            for (var j=0; j<game_size; j++){

                if(game_play[i][j]!=2 && game_play[i][j]!=-2 ){
                    game_play[i][j]=0;
                }
                
                if(game_answer[i][j]==255 || game_play[i][j]==2){
                    game_progress++;
                }
            }
        }
        paintAllGrid();
        myAlert("초기화되었습니다.")

    }
}

function hintChanged(e){
    if(hintCheckbox.checked){
        button["hint"].src="../Icon/hintLeft.png";
    } else{
        button["hint"].src="../Icon/hint.png";
    }
}

function showHint(e){
    // hint 기능 (2)
    const rowIdx=parseInt(e.target.parentNode.id.substring(4,e.target.parentNode.id.length));
    const colIdx=parseInt(e.target.id);
    const answer=game_answer[rowIdx][colIdx];

    var updateProgress=false;

    if(answer==255){
        if(game_play[rowIdx][colIdx]>0){
            updateProgress=true;
        }
        game_play[rowIdx][colIdx]=-2;
    } else{
        if(game_play[rowIdx][colIdx]<=0){
            updateProgress=true;
        }
        game_play[rowIdx][colIdx]=2;
    }
    if(updateProgress){
        game_progress++;
    }
    paintOneGrid(rowIdx,colIdx);
}

function hint(e){
    if(game_hint>0){

        if(myConfirm("힌트를 사용하시겠습니까?")){

            showHint(e);

            game_hint--;
            setHint();
            
            myAlert("힌트 사용이 완료되었습니다.");
            
        } 
        hintCheckbox.checked=false;
        hintChanged();

        if(game_hint<=0) hintCheckbox.disabled="disabled";
    }
    else {
        myAlert("남은 힌트 수가 없습니다.");
    }
}


function setBlack(node){
    node.classList.remove("setBlank");
    node.classList.remove("setWhite");
    node.classList.add("setBlack");
    // node.innerHTML="";
    // node.style.backgroundColor="black";
}

function setBlank(node){
    node.classList.remove("setBlack");
    node.classList.remove("setWhite");
    node.classList.add("setBlank");
    // setWhite(node);
    // node.innerHTML='<img class="gridBlank" src="../Icon/gridBlank.png">';
}

function setWhite(node){
    node.classList.remove("setBlank");
    node.classList.remove("setBlack");
    node.classList.add("setWhite");
}

function updateProgress(rowIdx,colIdx){
    if(game_answer[rowIdx][colIdx]==255){
        if(game_play[rowIdx][colIdx]==0 || game_play[rowIdx][colIdx]==-1){
            game_progress+=1;
        }
        else{
            game_progress-=1;
        }
    } else{
        if(game_play[rowIdx][colIdx]==1){
            game_progress+=1;
        }
        else{
            game_progress-=1;
        }
    }

}

function paintOneGrid(rowIdx, colIdx){
    var value=game_play[rowIdx][colIdx];

    if(value==0){
        // white
        setWhite(gameGrid[rowIdx][colIdx]);
    }
    else if(value>0){
        // black
        setBlack(gameGrid[rowIdx][colIdx]);
    } else if(value<0){
        // blank
        setBlank(gameGrid[rowIdx][colIdx]);
    }

}

function paintAllGrid(){
    for(var i=0; i<game_size; i++){
        for(var j=0; j<game_size; j++){
            paintOneGrid(i, j);
        }
    }
}

function blackOrBlank(e){

    if(hintCheckbox.checked){
        hint(e);
        return;
    }

    const black=1;
    const blank=-1;
    const white=0;

    const rowIdx=parseInt(e.target.parentNode.id.substring(4,e.target.parentNode.id.length));
    const colIdx=parseInt(e.target.id);

    const radio = document.getElementById('marking');

    var value_changed=false;
    var have_to_update=false;
    
    if(game_play[rowIdx][colIdx]==2 || game_play[rowIdx][colIdx]==-2){
        return;
    }

    if(!radio.checked){ //black
        if(game_play[rowIdx][colIdx]==blank || game_play[rowIdx][colIdx]==white){
            value_changed=true;
            have_to_update=true;
        }
        game_play[rowIdx][colIdx]=black;
    } else{ //blank
        if(game_play[rowIdx][colIdx]==black){
            value_changed=true;
            have_to_update=true;
        } else if(game_play[rowIdx][colIdx]==white){
            value_changed=true;
        }
        game_play[rowIdx][colIdx]=blank;
    }

    if(value_changed){
        paintOneGrid(rowIdx, colIdx);
    }

    if(have_to_update){
        updateProgress(rowIdx,colIdx);
    }

    if(game_progress==game_size*game_size){
        gameEnd();
    }
    
}

function gameEnd(){
    alert("모두 맞췄습니다.");
}


initVariables();
pageInit();
attachListener();