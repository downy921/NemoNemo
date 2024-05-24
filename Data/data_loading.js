var sample_index=0;
var game_index=20;

var sample=game[sample_index];

game_name=sample["name"];

game_size=sample["size"];

game_answer=get_mini_array(
                sample["answer"],
                game_index,
                game_size
            );

game_play=get_mini_array(
                sample["play"],
                game_index,
                game_size
            );

game_hint=sample["hint"][game_index];

[game_row,game_col]=get_info(game_answer,game_size);

