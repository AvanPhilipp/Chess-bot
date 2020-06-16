module.exports.FENStrings = [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"
    ];

module.exports.validMoves = [
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


module.exports.posibleMoves = {
    castle: ["O-O","O-O-O","O-O+","O-O-O+","O-O#","O-O-O#"],

    move: ["d4","Bf4","Nc6","Rh7","Qd6","Kd8","Bxf4","Nxc6","Rxh7","Qxd6","Kxd8",
            "Bcf4","Nbc6","Rah7","Qdd6","Ked8","d4+","Bf4+","Nc6+","Rh7+","Qd6+","Kd8+",
            "Bxf4+","Nxc6+","Rxh7+","Qxd6+","Kxd8+",
            "cxd4+","Bcxf4+","Nbxc6+","Raxh7+","Qdxd6+","Kexd8+","Bc1xf4+","Nb1xc6+","Ra7xh7+","Qd6xd6+","Ke8xd8+",
            "Bcf4+","Nbc6+","Rah7+","Qdd6+","Ked8+","Bc1f4+","Nb1c6+","Ra7h7+","Qd6d6+","Ke8d8+",
            "e8=Q+","e1=B+","fxe8=Q+","d4#","Bf4#","Nc6#","Rh7#","Qd6#","Kd8#","Bxf4#","Nxc6#","Rxh7#","Qxd6#","Kxd8#",
            "Bcf4#","Nbc6#","Rah7#","Qdd6#","Ked8#","Bc1f4#","Nb1c6#","Ra7h7#","Qd6d6#","Ke8d8#",
            "cxd4#","Bcxf4#","Nbxc6#","Raxh7#","Qdxd6#","Kexd8#","Bc1xf4#","Nb1xc6#","Ra7xh7#","Qd6xd6#","Ke8xd8#",
            "e1=R#","e8=N#","exf1=Q#","exd6e.p.#","exd3e.p.#","Bxf4","Nxc6","Rxh7","Qxd6","Kxd8",
            "Bxf4+","Nxc6+","Rxh7+","Qxd6+","Kxd8+","Bxf4#","Nxc6#","Rxh7#","Qxd6#","Kxd8#",
            "cxd4","Bcxf4","Nbxc6","Raxh7","Qdxd6","Kexd8","Bc1xf4","Nb1xc6","Ra7xh7","Qd6xd6","Ke8xd8",
            "cxd4+","Bcxf4+","Nbxc6+","Raxh7+","Qdxd6+","Kexd8+","Bc1xf4+","Nb1xc6+","Ra7xh7+","Qd6xd6+","Ke8xd8+",
            "cxd4#","Bcxf4#","Nbxc6#","Raxh7#","Qdxd6#","Kexd8#","Bc1xf4#","Nb1xc6#","Ra7xh7#","Qd6xd6#","Ke8xd8#","Bcf4","Nbc6","Rah7","Qdd6","Ked8",
            "Bc1f4","Nb1c6","Ra7h7","Qd6d6","Ke8d8","Bcf4+","Nbc6+","Rah7+","Qdd6+","Ked8+","Bc1f4+","Nb1c6+","Ra7h7+","Qd6d6+","Ke8d8+",
            "Bcf4#","Nbc6#","Rah7#","Qdd6#","Ked8#","Bc1f4#","Nb1c6#","Ra7h7#","Qd6d6#","Ke8d8#","e8=Q","e8=R","e8=N","e8=B","e1=Q","e1=R","e1=N","e1=B",
            "fxe8=Q","e8=Q+","e1=B+","e1=R#","e8=N#","fxe8=Q+","exf1=Q#","exd6e.p.","exd3e.p.","exd6e.p.+","exd3e.p.+","exd6e.p.#","exd3e.p.#"],
    
    check: ["d4+","Bf4+","Nc6+","Rh7+","Qd6+","Kd8+",
            "Bxf4+","Nxc6+","Rxh7+","Qxd6+","Kxd8+",
            "cxd4+","Bcxf4+","Nbxc6+","Raxh7+","Qdxd6+","Kexd8+","Bc1xf4+","Nb1xc6+","Ra7xh7+","Qd6xd6+","Ke8xd8+",
            "Bcf4+","Nbc6+","Rah7+","Qdd6+","Ked8+","Bc1f4+","Nb1c6+","Ra7h7+","Qd6d6+","Ke8d8+",
            "e8=Q+","e1=B+","fxe8=Q+"],
    
    mate: ["d4#","Bf4#","Nc6#","Rh7#","Qd6#","Kd8#",
            "Bxf4#","Nxc6#","Rxh7#","Qxd6#","Kxd8#",
            "Bcf4#","Nbc6#","Rah7#","Qdd6#","Ked8#","Bc1f4#","Nb1c6#","Ra7h7#","Qd6d6#","Ke8d8#",
            "cxd4#","Bcxf4#","Nbxc6#","Raxh7#","Qdxd6#","Kexd8#","Bc1xf4#","Nb1xc6#","Ra7xh7#","Qd6xd6#","Ke8xd8#",
            "e1=R#","e8=N#","exf1=Q#","exd6e.p.#","exd3e.p.#"],
    
    take: ["Bxf4","Nxc6","Rxh7","Qxd6","Kxd8","Bxf4+","Nxc6+","Rxh7+","Qxd6+","Kxd8+","Bxf4#","Nxc6#","Rxh7#","Qxd6#","Kxd8#",
            "cxd4","Bcxf4","Nbxc6","Raxh7","Qdxd6","Kexd8","Bc1xf4","Nb1xc6","Ra7xh7","Qd6xd6","Ke8xd8",
            "cxd4+","Bcxf4+","Nbxc6+","Raxh7+","Qdxd6+","Kexd8+","Bc1xf4+","Nb1xc6+","Ra7xh7+","Qd6xd6+","Ke8xd8+",
            "cxd4#","Bcxf4#","Nbxc6#","Raxh7#","Qdxd6#","Kexd8#","Bc1xf4#","Nb1xc6#","Ra7xh7#","Qd6xd6#","Ke8xd8#"],

    orig: ["Bcf4","Nbc6","Rah7","Qdd6","Ked8",
            "Bc1f4","Nb1c6","Ra7h7","Qd6d6","Ke8d8",
            "Bcf4+","Nbc6+","Rah7+","Qdd6+","Ked8+","Bc1f4+","Nb1c6+","Ra7h7+","Qd6d6+","Ke8d8+",
            "Bcf4#","Nbc6#","Rah7#","Qdd6#","Ked8#","Bc1f4#","Nb1c6#","Ra7h7#","Qd6d6#","Ke8d8#",
            "cxd4","Bcxf4","Nbxc6","Raxh7","Qdxd6","Kexd8","Bc1xf4","Nb1xc6","Ra7xh7","Qd6xd6","Ke8xd8",
            "cxd4+","Bcxf4+","Nbxc6+","Raxh7+","Qdxd6+","Kexd8+","Bc1xf4+","Nb1xc6+","Ra7xh7+","Qd6xd6+","Ke8xd8+",
            "cxd4#","Bcxf4#","Nbxc6#","Raxh7#","Qdxd6#","Kexd8#","Bc1xf4#","Nb1xc6#","Ra7xh7#","Qd6xd6#","Ke8xd8#"],

    promote: ["e8=Q","e8=R","e8=N","e8=B","e1=Q","e1=R","e1=N","e1=B","fxe8=Q","e8=Q+","e1=B+","e1=R#","e8=N#","fxe8=Q+","exf1=Q#"],

    enPassant: ["exd6e.p.","exd3e.p.","exd6e.p.+","exd3e.p.+","exd6e.p.#","exd3e.p.#"]
};

module.exports.malformedMoves = [
    "O-","O-O-","O-+","O-O-+","O-#","O-O-#","Oe3","OBf4", /** malformed castling moves */
]

module.exports.doRender = false;