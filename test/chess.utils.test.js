const assert = require('chai').assert;

const utils = require('../chess.utils');
const chess = require('../chess');


describe('utils',()=>{
    
describe("printBoard(GAME)", ()=>{
    it("prints Board",()=>{
        const controlString = "rnbqkbnr\npppppppp\n        \n        \n        \n        \nPPPPPPPP\nRNBQKBNR"
        const boardString = utils.printBoard(chess.newGame("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
        assert.equal(boardString,controlString);
    });
});

describe("transpose(matrix)", ()=>{
    it("2x2", ()=>{
        const M = [[1, 2],[3, 4]];
        const M2 = utils.transpose(M);
        assert.deepEqual(M2, [[1,3],[2,4]]);
    });
    it("2x3",()=>{
        const M = [[1, 2, 3],[4, 5, 6]];
        const M2 = utils.transpose(M);
        assert.deepEqual(M2, [[1, 4],[2, 5],[3, 6]]);
    });
    it("double transpose",()=>{
        const M = [[1,2,3],[4,5,6],[7,8,9]];
        const M2 = utils.transpose(utils.transpose(M));
        assert.deepEqual(M2, M);
    })
});

function deFileTest(idx){
    it("returns the name of the #"+i+" file",()=>{
        // console.log(Object.keys(utils.FILES)[idx-1]);
        // console.log(utils.deFILE(idx));
        // console.log(idx);
        const fileName = utils.deFILE(idx)
        assert.equal(fileName, Object.keys(utils.FILES)[idx-1]);
    });
}
describe("deFile(fileAsNumber)", ()=>{
    for(i=1;i<=8;i++){
        deFileTest(i);
    }
});

});