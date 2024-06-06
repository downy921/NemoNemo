// 게임 인덱스에서부터 가로 세로 몇번째에 있는 게임인지 반환
function get_row_col_index(whole_size, game_size, game_index){
   
    var one_row=parseInt(whole_size/game_size);


    return [parseInt(game_index/one_row), parseInt(game_index%one_row)];
}

// 전체 배열로부터 게임 인덱스에 해당하는 작은 배열 반환
function get_mini_array(array, game_index, game_size){
    var [ri, ci]=get_row_col_index(array.length, game_size, game_index);
    var mini_array=[]

    for(var i=0; i<game_size; i++){
        mini_array.push(array[ri*game_size+i].slice(ci*game_size, ci*game_size+game_size));
    }

    return mini_array;
}

// row info, col info 계산
function get_info(mini_answer_array, game_size){
    var max_size=parseInt(game_size/2)+1;

    var row_infos = [], col_infos = [];
    var max_row=0, max_col=0;

    for(var i=0; i<game_size; i++){
        var idx=0;
        var value=0;
        var info=Array(max_size).fill(0);

        for(var col=0; col<game_size; col++){

            value=0;

            while(col < game_size && mini_answer_array[i][col]!=0){
                col++;
            }

            while(col < game_size && mini_answer_array[i][col]==0){
                col++;
                value++;
            }

            if(value!=0) info[idx++]=value;
           
        }

        if(idx>max_row) max_row=idx;
        row_infos.push(info);

        idx=0;
        value=0;
        info=Array(max_size).fill(0);

        for(var row=0; row<game_size; row++){

            value=0;

            while(row < game_size && mini_answer_array[row][i]!=0){
                row++;
            }

            while(row < game_size && mini_answer_array[row][i]==0){
                row++;
                value++;
            }

            if(value!=0) info[idx++]=value;
           
        }


        if(idx>max_col) max_col=idx;

        col_infos.push(info);
    }


    for(var i=0; i<game_size; i++){
        row_infos[i]=row_infos[i].slice(0,max_row);
        col_infos[i]=col_infos[i].slice(0,max_col);
    }

    return [row_infos, col_infos];
}