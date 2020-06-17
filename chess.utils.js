const utils = {};

utils.FILES = {
    "a":1, "b":2, "c":3, "d":4,
    "e":5, "f":6, "g":7, "h":8 };


utils.deFILE = function(fileAsNum){
    return Object.keys(this.FILES).find((key)=>{return this.FILES[key] === fileAsNum});
};

utils.transpose = function (matrix) {
    // console.log(matrix);
    return matrix[0].map((column, colIndex) => matrix.map(row => row[colIndex]));
};

utils.printBoard= function(GAME){
    let boardString = "";
    const table = this.transpose(GAME.table);
    table.forEach((rank,y_index)=>{
        // console.log(rank);
        rank.forEach((file,x_index)=>{
            if(file === 'e') {
                boardString = boardString.concat(" ");
            }
            else{
                boardString = boardString.concat(file);
            }
        });
        boardString = boardString.concat("\n");
    });
    boardString = boardString.substring(0, boardString.length - 1);
    console.log(boardString);
    return boardString;
};

module.exports = utils;