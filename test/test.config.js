const fs = require('fs');

module.exports.FENStrings = [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
    ];

module.exports.PGNLoad = function(){
    // let out = fs.createReadStream('./test/PGN/lichess_pgn_2020.05.16_fealoce_vs_MrPoern.PhcaCBmR.pgn');
    // console.log(out);
}

module.exports.moves = [
    "d4","d5","Bf4","Nc6","e3","Nf6","Nf3","b6","Bb5","Bb7", 
    "O-O","a6","Ba4","b5","Bb3","e6","Nc3","b4","Na4","Na5",
    "c3","bxc3","bxc3","Bd6","c4","dxc4","d5","exd5","Bxd6",
    "cxd6","Bc2","O-O", "Ng5","h6","Nh7","Re8","Nxf6+",
    "gxf6","Qxd5","Bxd5","Rae1","f5","e4","Bxe4","Bxe4",
    "fxe4","f3","e3","Nc3","Rb8","Nd5","Re5","Nxe3","Rh5",
    "Rc1","Rbb5","Nxc4","Nxc4","Rxc4","d5","Rc6","Qd7",
    "Rf6","Kg7","Rf4","Qd6","g3","Rb2","Rg4+","Kf6","Rf4+","Ke7",
    "Re1+","Kd7","Rxf7+","Kd8","g4","Rhxh2","Rh7","Qg3+","Kf1","Rbf2#" 
];

module.exports.doRender = true;