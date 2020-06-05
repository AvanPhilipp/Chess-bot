const assert = require('chai').assert;

const chess = require('../chess');
// const FENconverter = require('../chess').FENconverter;
// const init = require('../chess').init;
// const moveCalc = require('../chess').moveCalc;

const FENStrings = require('./test.config').FENStrings;
const validMoves = require('./test.config').validMoves;
const posibleMoves = require('./test.config').posibleMoves;
const malformedMoves = require('./test.config').malformedMoves;

const PIECES = ["K", "Q", "R", "N", "B", "P"];
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];





function testFENObjects(FENString) {
    let GAME;
    before("creating valid GAME object",()=>{
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
    it("should find all the pieces on the board",()=>{
        const testGame = chess.getPieces(GAME);
        assert.exists(testGame);
        assert.equal(testGame.whitePieces.length, 16);
        assert.equal(testGame.blackPieces.length, 16);
    });
}


describe("Chess",()=>{
    describe("init()", ()=>{
        it("should return 1", ()=>{
            const result = chess.init();
            assert.equal(result, 1);
        });
    });

    describe("FENconverter(FEN)",()=>{
        describe("game object validation", ()=>{
            FENStrings.forEach(FENstring => {
                testFENObjects(FENstring);
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
                    chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0")
                }, /Input not correct. 6 arguments expected, recived \d/);
            });
            it("sould throw error for too much ranks", ()=>{
                assert.throws(()=>{
                    chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR/RNBQKBNR w KQkq - 0 1")
                }, /Input not correct. Incorrect number of ranks: \d/);
            });
            it("sould throw error for too few ranks", ()=>{
                assert.throws(()=>{
                    chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP w KQkq - 0 1")
                }, /Input not correct. Incorrect number of ranks: \d/);
            });
            it("sould throw error for too much files", ()=>{
                assert.throws(()=>{
                    chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB w KQkq - 0 1")
                }, /Input not correct. Incorrect number of file: \d/);
            });
            it("sould throw error for too few files", ()=>{
                assert.throws(()=>{
                    chess.FENconverter("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNRQQQ w KQkq - 0 1")
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

        FENStrings.forEach(FENstring => {
            let GAME;
            before("creating valid GAME object",()=>{
                GAME = chess.FENconverter(FENStrings[0]);
            });
            it("should find all the pieces on the board",()=>{
                const testGame = chess.getPieces(GAME);
                assert.exists(testGame);
                assert.equal(testGame.whitePieces.length, 16);
                assert.equal(testGame.blackPieces.length, 16);
            });
        });
    });
    
});

describe("moveCalc(PGN)", ()=>{
    // posibleMoves.castle.forEach((move)=>{    
    //     it("should calculate valid castle moves", ()=>{
    //         // console.log(move);
    //         let OUT = chess.moveCalc(move);
    //         console.log(OUT);
    //     });
    // });
    posibleMoves.simple.forEach((move)=>{    
        it("should calculate valid simple moves", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.moves);
            assert.oneOf(OUT.moves.file, FILES);
            assert.isNumber(OUT.moves.rank);
            assert.isAtMost(OUT.moves.rank,8);

        });
    });
    posibleMoves.check.forEach((move)=>{    
        it("should calculate valid check moves", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert(OUT.check,"Should be check");
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.moves);
            assert.oneOf(OUT.moves.file, FILES);
            assert.isNumber(OUT.moves.rank);
            assert.isAtMost(OUT.moves.rank,8);

        });
    });
    posibleMoves.mate.forEach((move)=>{    
        it("should calculate valid mate moves", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert(OUT.mate,"Should be mate");
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.moves);
            assert.oneOf(OUT.moves.file, FILES);
            assert.isNumber(OUT.moves.rank);
            assert.isAtMost(OUT.moves.rank,8);

        });
    });
    posibleMoves.orig.forEach((move)=>{    
        it("should calculate valid moves, from specified Origin", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.from);
            assert.oneOf(OUT.from.file, FILES);
            assert.exists(OUT.moves);
            assert.oneOf(OUT.moves.file, FILES);
            assert.isNumber(OUT.moves.rank);
            assert.isAtMost(OUT.moves.rank,8);

        });
    });
    posibleMoves.checkOrig.forEach((move)=>{    
        it("should calculate valid check moves, from specified Origin", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert(OUT.check,"Should be check");
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.from);
            assert.oneOf(OUT.from.file, FILES);
            assert.exists(OUT.moves);
            assert.oneOf(OUT.moves.file, FILES);
            assert.isNumber(OUT.moves.rank);
            assert.isAtMost(OUT.moves.rank,8);

        });
    });
    posibleMoves.mateOrig.forEach((move)=>{    
        it("should calculate valid mate moves, from specified Origin", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert(OUT.mate,"Should be mate");
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.from);
            assert.oneOf(OUT.from.file, FILES);
            assert.exists(OUT.moves);
            assert.oneOf(OUT.moves.file, FILES);
            assert.isNumber(OUT.moves.rank);
            assert.isAtMost(OUT.moves.rank,8);

        });
    });
    posibleMoves.take.forEach((move)=>{    
        it("should calculate valid take moves", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.takes);
            assert.oneOf(OUT.takes.file, FILES);
            assert.isNumber(OUT.takes.rank);
            assert.isAtMost(OUT.takes.rank,8);

        });
    });
    posibleMoves.takeCheck.forEach((move)=>{    
        it("should calculate valid take, check moves", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert(OUT.check,"Should be check");
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.takes);
            assert.oneOf(OUT.takes.file, FILES);
            assert.isNumber(OUT.takes.rank);
            assert.isAtMost(OUT.takes.rank,8);

        });
    });
    posibleMoves.takeMate.forEach((move)=>{    
        it("should calculate valid take, mate moves", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert(OUT.mate,"Should be mate");
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.takes);
            assert.oneOf(OUT.takes.file, FILES);
            assert.isNumber(OUT.takes.rank);
            assert.isAtMost(OUT.takes.rank,8);

        });
    });
    posibleMoves.takeOrig.forEach((move)=>{    
        it("should calculate valid take moves, from specified Origin", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.from);
            assert.oneOf(OUT.from.file, FILES);
            assert.exists(OUT.takes);
            assert.oneOf(OUT.takes.file, FILES);
            assert.isNumber(OUT.takes.rank);
            assert.isAtMost(OUT.takes.rank,8);
        });
    });
    posibleMoves.takeCheckOrig.forEach((move)=>{    
        it("should calculate valid take moves, from specified Origin", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert(OUT.check,"Should be check");
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.from);
            assert.oneOf(OUT.from.file, FILES);
            assert.exists(OUT.takes);
            assert.oneOf(OUT.takes.file, FILES);
            assert.isNumber(OUT.takes.rank);
            assert.isAtMost(OUT.takes.rank,8);
        });
    });
    posibleMoves.takeMateOrig.forEach((move)=>{    
        it("should calculate valid take moves, from specified Origin", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert(OUT.mate,"Should be mate");
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.from);
            assert.oneOf(OUT.from.file, FILES);
            assert.exists(OUT.takes);
            assert.oneOf(OUT.takes.file, FILES);
            assert.isNumber(OUT.takes.rank);
            assert.isAtMost(OUT.takes.rank,8);
        });
    });

    posibleMoves.promote.forEach((move)=>{    
        it("should calculate valid promote moves", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert.oneOf(OUT.promote,PIECES);
        });
    });
    posibleMoves.enPassant.forEach((move)=>{    
        it("should calculate valid en Passant moves", ()=>{
            // console.log(move);
            let OUT = chess.moveCalc(move);
            // console.log(OUT);
            assert.isBoolean(OUT.enPassant);
            assert(OUT.enPassant, "En passant should be true");
            assert.oneOf(OUT.piece,PIECES);
            assert.exists(OUT.from);
            assert.oneOf(OUT.from.file, FILES);
            assert.exists(OUT.takes);
            assert.oneOf(OUT.takes.file, FILES);
            assert.isAtMost(OUT.takes.rank,8);
        });
    });
    malformedMoves.forEach((move)=>{
        it("should throw error on malformed inputs", ()=>{
            // console.log(move);
            assert.throws(()=>{
                chess.moveCalc(move);
            },/Wrong move format: \w/)
        });
    });
});