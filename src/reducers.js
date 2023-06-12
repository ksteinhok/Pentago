import {NUM_COLUMNS, NUM_ROWS} from "./constants";
import doWeHaveAWinner from "./doWeHaveAWinner";

const  advanceColor = (color) => color === 'blue' ? 'red' : 'blue';

function createInitialState() {
    // The board is a 2D array of Objects. Each Object holds the state of the "cell" that it represents.
    // Each of the elements of firstAvailableIndex contains an index for each column of the 2D array.
    // The value at the index specifies which row in that column a disk can be deposited.

    let board = Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill({color: "#e4bc84", isOccupied: false}));
    board.map((row, rowIdx) => row.map( (col, colIdx) => {

        return {...board[rowIdx][colIdx], row: rowIdx, column: colIdx }
    }));


    return {
        board,
        firstAvailableIndex: Array(NUM_COLUMNS).fill(NUM_ROWS - 1),
        haveAWinner: false,
        nextColor: 'blue',
        rotated: false
    };
}
function RotateCounterClockwise(state, TopLeftCol, TopLeftRow){

    let board = state.board;
    console.log(board[TopLeftRow])
    let affectedRow1 = board[TopLeftRow].slice();
    let affectedRow2 = board[TopLeftRow+1].slice();
    let affectedRow3 = board[TopLeftRow+2].slice();
    //create copies of the first 3 rows,
    // do we even need an 'if' if we just move the colors rather than checking?
    for(let i =0;i<3;i++){
        affectedRow1[TopLeftCol+i] = {
            ...state.board[(TopLeftRow + i)][TopLeftCol + 2]
        }//test whether its dictionary vs just = state.board[][]

    };
    affectedRow2[TopLeftCol] = {
        //...affectedRow1[TopLeftCol+1]
        ...state.board[TopLeftRow][TopLeftCol+1]
    }
    affectedRow2[TopLeftCol+2]={
        ...state.board[TopLeftRow+2][TopLeftCol+1]
    }

    for(let i =0;i<3;i++){
        affectedRow3[TopLeftCol+i] = {
            ...state.board[TopLeftRow+i][TopLeftCol]
        }
    }
    //console.log(TopLeftRow+2);
    // takes the left side of a quad and pushes it to top?
    let newBoard = board.slice();
    newBoard[TopLeftRow] = affectedRow1;
    newBoard[TopLeftRow+1]= affectedRow2;
    newBoard[TopLeftRow+2] = affectedRow3;

    const activeColor = state.nextColor;

    let newState = {
        ...state,
        board: newBoard,
        nextColor: advanceColor(activeColor),
        rotated: false
    }

    for(let x = TopLeftRow;x <TopLeftRow+3;x++){
        for(let y = TopLeftCol; y<TopLeftCol+3;y++){
            if(newState.board[x][y].color == activeColor){
                console.log("checking",x,",", y, "for color", activeColor)
                if( doWeHaveAWinner(x, y, activeColor, newBoard) ) {
                    console.log("we have 5 in a row")
                    newState = {
                        ...newState,
                        haveAWinner: true,
                        winnerColor: activeColor
                    };
                    return newState;
                }
            }
        }
    }
    //we confirmed player color didn't win, now we check for opponent color win
    for(let x = TopLeftRow;x <TopLeftRow+3;x++){
        for(let y = TopLeftCol; y<TopLeftCol+3;y++){
            if(newState.board[x][y].color == advanceColor(activeColor)){
                console.log("checking",x,",", y, "for color", activeColor)
                if( doWeHaveAWinner(x, y, advanceColor(activeColor), newBoard) ) {
                    console.log("we have 5 in a row")
                    newState = {
                        ...newState,
                        haveAWinner: true,
                        winnerColor: advanceColor(activeColor)
                    };
                    return newState;
                }
            }
        }
    }
    return newState;

}
function RotateClockwise(state, TopLeftCol, TopLeftRow){
    let board = state.board;

    let affectedRow1 = board[TopLeftRow].slice();
    let affectedRow2 = board[TopLeftRow+1].slice();
    let affectedRow3 = board[TopLeftRow+2].slice();

    for(let i =0;i<3;i++) {
        affectedRow1[TopLeftCol + i] = {
            ...state.board[TopLeftRow+2-i][TopLeftCol]
        }
    }
    affectedRow2[TopLeftCol] = {
        //...affectedRow1[TopLeftCol+1]
        ...state.board[TopLeftRow+2][TopLeftCol+1]
    }
    affectedRow2[TopLeftCol+2]={
        ...state.board[TopLeftRow][TopLeftCol+1]
    }
    for(let i =0;i<3;i++){
        affectedRow3[TopLeftCol+i] = {
            ...state.board[TopLeftRow+2-i][TopLeftCol+2]
        }
    }

    let newBoard = board.slice();
    newBoard[TopLeftRow] = affectedRow1;
    newBoard[TopLeftRow+1]= affectedRow2;
    newBoard[TopLeftRow+2] = affectedRow3;

    const activeColor = state.nextColor;

    let newState = {
        ...state,
        board: newBoard,
        nextColor: advanceColor(activeColor),
        rotated:false
    }
    for(let x = TopLeftRow;x <TopLeftRow+3;x++){
        for(let y = TopLeftCol; y<TopLeftCol+3;y++){
            if(newState.board[x][y].color == activeColor){
                console.log("checking",x,",", y, "for color", activeColor)
                if( doWeHaveAWinner(x, y, activeColor, newBoard) ) {
                    console.log("we have 5 in a row")
                    newState = {
                        ...newState,
                        haveAWinner: true,
                        winnerColor: activeColor
                    };
                    return newState;
                }
            }
        }
    }
    for(let x = TopLeftRow;x <TopLeftRow+3;x++){
        for(let y = TopLeftCol; y<TopLeftCol+3;y++){
            if(newState.board[x][y].color == advanceColor(activeColor)){
                console.log("checking",x,",", y, "for color", activeColor)
                if( doWeHaveAWinner(x, y, advanceColor(activeColor), newBoard) ) {
                    console.log("we have 5 in a row")
                    newState = {
                        ...newState,
                        haveAWinner: true,
                        winnerColor: advanceColor(activeColor)
                    };
                    return newState;
                }
            }
        }
    }

    return newState;
}


function integrateClick(state, colIdx, rowId) {

    // rowIdx = state.firstAvailableIndex[colIdx];

    let board = state.board;
    let affectedRow = board[rowId].slice();
    affectedRow[colIdx] = {
        ...affectedRow[colIdx],
        color: state.nextColor,
        isOccupied: true
    };

    let newBoard = board.slice();
    newBoard[rowId] = affectedRow;
    const activeColor = state.nextColor;

    let newState = {
        ...state,
        board: newBoard,
        rotated: true
        //nextColor: advanceColor(activeColor),
    };

    if( doWeHaveAWinner(rowId, colIdx, activeColor, board) ) {
        newState = {
            ...newState,
            haveAWinner: true,
            winnerColor: activeColor
        };
    }

    return newState;
}


function reducers(state, action) {
    if( state === undefined )
        return state;

    // console.log(`in reducers. action.type is: ${action.type}, board contains: ${JSON.stringify(state)}`);

    if( action.type === 'RESET' ) {
        return createInitialState();
    } else if( action.type === 'CELL_CLICKED') {
        if( state.rotated )
            return state;

        if( state.haveAWinner )
            return state;

        if(state.board[action.rowIdx][action.colIdx].isOccupied)  // doesn't change color of click
            return state;

        return integrateClick(state, action.colIdx, action.rowIdx);
    } else if( action.type === 'RotateL'){
        if( state.haveAWinner )
            return state;
        if( !state.rotated )
            return state;
        return RotateCounterClockwise(state, action.ToprightCol, action.ToprightRow);

    } else if( action.type === 'RotateR') {
        if( state.haveAWinner )
            return state;
        if( !state.rotated )
            return state
        return RotateClockwise(state, action.ToprightCol, action.ToprightRow);
    }

    return state;

}

export {
    reducers,
    createInitialState
};