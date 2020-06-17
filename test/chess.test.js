const assert = require('chai').assert;

const chess = require('../chess');
const utils = require('../chess.utils');

const FENStrings = require('./test.config').FENStrings;
const validMoves = require('./test.config').validMoves;
const posibleMoves = require('./test.config').posibleMoves;
const malformedMoves = require('./test.config').malformedMoves;

const PIECES = utils.PIECES;
const FILES = Object.keys(utils.FILES);

describe("Chess",()=>{
describe("init()", ()=>{
    it("should return a new game", ()=>{
        const GAME = chess.init();
        // assert.equal(result, 1);
    });
});

describe("FENconverter(FEN)",()=>{

    FENStrings.forEach((FENString) => {
    describe("game object validation ("+FENString+")", ()=>{
            let GAME;
            before(()=>{
                GAME = chess.FENconverter(FENString);
            });
            it('should have a 8x8 board',()=>{
                assert.exists(GAME.table);
                assert.equal(GAME.table.length,8);
                GAME.table.forEach((rank)=>{
                    assert.equal(rank.length,8);
                });
            });
            it("should have a starting player",()=>{
                assert.oneOf(GAME.nextPlayer,["w","b"]);
            });
            it("should have boolean castling options",()=>{
                assert.exists(GAME.castling);
                assert.typeOf(GAME.castling.whiteQueen,"boolean");
                assert.typeOf(GAME.castling.whiteKing,"boolean");
                assert.typeOf(GAME.castling.blackQueen,"boolean");
                assert.typeOf(GAME.castling.blackKing,"boolean");
            });
            it("should have en Passant options",()=>{
                assert.exists(GAME.enPassant);
                assert.oneOf(GAME.enPassant.file, FILES.concat([null]));
                assert.oneOf(GAME.enPassant.rank, [3, 6, null]);
                if((GAME.enPassant.rank && !GAME.enPassant.file) || (!GAME.enPassant.rank && GAME.enPassant.file)){
                    assert.fail("Either both file and rank should be 'null' or both should have correct values.");
                }
            });
            it("should count the half moves",()=>{
                assert.isNumber(GAME.fiftyMove);
            });
            it("should count the moves",()=>{
                assert.isNumber(GAME.moves);
            });
            it("should contain all the pieces on the board",()=>{
                assert.exists(GAME);
                assert.equal(GAME.pieces.white.length, 16);
                assert.equal(GAME.pieces.black.length, 16);
            });
        });
    });
    it("sould accept starting position", ()=>{
        const GAME = chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        assert.isObject(GAME);
    });
    it("sould accept no castling option", ()=>{
        const GAME = chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1");
        assert.isObject(GAME);
    });
    it("sould accept en passat", ()=>{
        const GAME = chess.FENconverter("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1");
        assert.isObject(GAME);
    });
    it("sould accept in-progress games", ()=>{
        const GAME = chess.FENconverter("rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2");
        assert.isObject(GAME);
    });
    it("sould accept turns of black", ()=>{
        const GAME = chess.FENconverter("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2");
        assert.isObject(GAME);
    });
    describe("error checks", ()=>{
        it("sould throw error on malformed FEN", ()=>{
            assert.throws(()=>{
                chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0");
            }, /Input not correct. 6 arguments expected, recived \d/);
        });
        it("sould throw error for too much ranks", ()=>{
            assert.throws(()=>{
                chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR/RNBQKBNR w KQkq - 0 1");
            }, /Input not correct. Incorrect number of ranks: \d/);
        });
        it("sould throw error for too few ranks", ()=>{
            assert.throws(()=>{
                chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP w KQkq - 0 1");
            }, /Input not correct. Incorrect number of ranks: \d/);
        });
        it("sould throw error for too much files", ()=>{
            assert.throws(()=>{
                chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB w KQkq - 0 1");
            }, /Input not correct. Incorrect number of file: \d/);
        });
        it("sould throw error for too few files", ()=>{
            assert.throws(()=>{
                chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNRQQQ w KQkq - 0 1");
            }, /Input not correct. Incorrect number of file: \d/);
        });

        it("sould throw error for invalid players", ()=>{
            assert.throws(()=>{
                chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR c KQkq - 0 1")
            }, /Input not correct. Unknown player: \w/);
        });
        it("sould throw error for wrong Halfmove", ()=>{
            assert.throws(()=>{
                chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - A 1")
            }, /Input not correct. Halfmoves must be an integer: ./);
        });
        it("sould throw error for wrong Fullmove", ()=>{
            assert.throws(()=>{
                chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 A")
            }, /Input not correct. Fullmoves must be an integer: ./);
        });
    });
}); 

describe("getPieces(GAME)",()=>{
    it("should find all the pieces on the board",()=>{
        FENStrings.forEach(FENstring => {
            const testGame = chess.getPieces(chess.FENconverter(FENstring));
            assert.exists(testGame);
            assert.equal(testGame.white.length, 16);
            assert.equal(testGame.black.length, 16);
        });
    });
    it("throws erro on unknown piece", ()=>{
        assert.throws(()=>{
            const testGame = chess.getPieces(chess.FENconverter("rnbqkbnr/pppppXpp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
        },/Unknown Piece: ./);
    });
});

describe("moveCalc(PGN)", ()=>{
    it("Should be a castle move",()=>{
        posibleMoves.castle.forEach((move)=>{
            let OUT = chess.moveCalc(move);
            assert.oneOf(OUT.castle, ["King", "Queen"]);
        });
    });

    it("Should be a valid move",()=>{
        posibleMoves.move.forEach((move)=>{
            let OUT = chess.moveCalc(move);
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.moves);
            assert.oneOf(OUT.moves.file, FILES);
            assert.isAtMost(OUT.moves.rank,8);
            assert.notEqual(OUT.moves.rank,0);
        });
    });

    it("Should be a take move",()=>{
        posibleMoves.take.forEach((move)=>{
            let OUT = chess.moveCalc(move);
            assert.isTrue(OUT.take);
        });
    });
    
    it("Should be a check move",()=>{
        posibleMoves.check.forEach((move)=>{
            let OUT = chess.moveCalc(move);
            assert.isTrue(OUT.check);
        });
    });

    it("Should be a mate move",()=>{
        posibleMoves.mate.forEach((move)=>{
            let OUT = chess.moveCalc(move);
            assert.isTrue(OUT.mate);
        });
    });

    it("Should be a move, with origin",()=>{
        posibleMoves.orig.forEach((move)=>{
            let OUT = chess.moveCalc(move);
            assert.exists(OUT.from);
            assert.oneOf(OUT.from.file, FILES);
            if(OUT.from.rank){
                assert.isAtMost(OUT.from.rank,8);
                assert.notEqual(OUT.from.rank,0);
            }
        });
    });

    it("Should be a promote move",()=>{
        posibleMoves.promote.forEach((move)=>{
            let OUT = chess.moveCalc(move);
            assert.oneOf(OUT.promote, PIECES);
        });
    });

    it("Should be an en Passant move",()=>{
        posibleMoves.enPassant.forEach((move)=>{
            let OUT = chess.moveCalc(move);
            assert.isTrue(OUT.enPassant);
        });
    });

    it("should throw error on malformed inputs", ()=>{
        malformedMoves.forEach((move)=>{
            // console.log(move);
            assert.throws(()=>{
                chess.moveCalc(move);
            },/Wrong move format: \w/)
        });
    });

    it("should accept a valid game", ()=>{
        validMoves.forEach((move)=>{
            assert.doesNotThrow(()=>{
                chess.moveCalc(move);
            },/.*/);
        });
    });
});
describe("searchPossiblePiece(GAME, MOVE)",()=>{
    let GAME;
    let MOVE;
    before(()=>{
        GAME = chess.newGame();
        MOVE = chess.moveCalc("e4");
    });
    it("should generate FROM fields", ()=>{
        const OUT = chess.searchPossiblePiece(GAME,MOVE);
        assert.exists(OUT.from);
        assert.oneOf(OUT.from.file, FILES);
        if(OUT.from.rank){
            assert.isAtMost(OUT.from.rank,8);
            assert.notEqual(OUT.from.rank,0);
        }
    });
});
describe("moveInGame(GAME, MOVE)",()=>{
    let GAME;
    let MOVE1;
    let MOVE2;
    const controllBoard1 = [
        ['r','p','e','e','e','e','P','R'],
        ['n','p','e','e','e','e','P','N'],
        ['b','p','e','e','e','e','P','B'],
        ['q','p','e','e','e','e','P','Q'],
        ['k','p','e','e','P','e','e','K'],
        ['b','p','e','e','e','e','P','B'],
        ['n','p','e','e','e','e','P','N'],
        ['r','p','e','e','e','e','P','R']
      ];
    const controllBoard2 = [
        ['r','p','e','e','e','e','P','R'],
        ['n','p','e','e','e','e','P','N'],
        ['b','p','e','e','e','e','P','B'],
        ['q','p','e','e','e','e','P','Q'],
        ['k','e','e','p','P','e','e','K'],
        ['b','p','e','e','e','e','P','B'],
        ['n','p','e','e','e','e','P','N'],
        ['r','p','e','e','e','e','P','R']
    ];
    before(()=>{
        GAME = chess.newGame();
        MOVE1 = chess.moveCalc("e4");
        MOVE2 = chess.moveCalc("e5");
    });

    it("should move one piece", ()=>{
        const OUT = chess.moveInGame(GAME,MOVE1);
        assert.equal(OUT.nextPlayer, "b");
        assert.deepEqual(OUT.table, controllBoard1);
    });
    it("should move two piece",()=>{
        const OUT = chess.moveInGame(GAME,MOVE2);
        assert.equal(OUT.nextPlayer, "w");
        assert.deepEqual(OUT.table, controllBoard2);
    });
});
});