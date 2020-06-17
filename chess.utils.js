const utils = {};


utils.deFILE = function(fileNum){
    return Object.keys(this.FILES).find((key)=>{return this.FILES[key] === fileNum});
};

utils.transpose = function (array) {
    return array[0].map((column, colIndex) => array.map(row => row[colIndex]));
};

utils.ASCIIBoard= function(GAME){
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
    console.log(boardString);
};

module.exports = utils;