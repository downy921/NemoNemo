// 데이터를 받아옴. (받아왔다고 가정)
// const reader = new FileReader();
// reader.readAsText(new File([""],"../Data/sample_data.txt"));
// reader.onload=function(){
//     eval(reader.result);

//     console.log(reader.result);
// }

// eval(reader.result);
// reader.onerror=()=>{
// }

// game = [portrait, landscape, character3D, character2D];

var game;

function readTextFile(file)
{

    var allText;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                
        
            }
        }
    }
    rawFile.send(null);

    var newArr = JSON.parse(allText);
    game=newArr;
}

readTextFile("../Data/sample_data.json");

var sample_index=0;
var game_index=20;

var sample=game[sample_index];

user_name="DDANG2DDUNG"; //사용자 이름

game_name=sample["name"]; //플레이 하는 게임 이름

game_size=sample["size"]; //10*10, 20*20, 25*25

game_answer=get_mini_array(
                sample["answer"],
                game_index,
                game_size
            ); //정답 배열

game_play=get_mini_array(
                sample["play"],
                game_index,
                game_size
            ); //플레이 중 배열

game_hint=sample["hint"][game_index]; //남은 힌트 수

[game_row,game_col]=get_info(game_answer,game_size); //row info, col info

game_progress=sample["progress"][game_index];
console.log(game_progress);