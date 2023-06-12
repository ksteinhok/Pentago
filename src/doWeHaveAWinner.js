
import { NUM_ROWS, NUM_COLUMNS } from './constants'


const doWeHaveAWinnerThatIncludes = (rowIdx, colIdx, color, board) => {

    const doWeHaveAWinnerDownward = (rowIdx, colIdx) => {
        let matchingCells = [{row: rowIdx, column: colIdx}];
        rowIdx += 1;
        while(rowIdx < NUM_ROWS && board[rowIdx][colIdx]['color'] === color ) {
            matchingCells.push({row: rowIdx, column: colIdx});
            rowIdx += 1;
        }
        return matchingCells.length >= 5 ? matchingCells : false;
    };

    const doWeHaveAWinnerUpward = (rowIdx, colIdx) => {
        let matchingCells = [{row: rowIdx, column: colIdx}];
        if(rowIdx > 0){
            rowIdx -= 1;
        }

        while(rowIdx >= 0 && board[rowIdx][colIdx]['color'] === color ) {
            matchingCells.push({row: rowIdx, column: colIdx});
            rowIdx -= 1;
        }
        return matchingCells.length >= 5 ? matchingCells : false;
    };

    const doWehaveAWinnerSideways = (rowIdx, colIdx) => {
        let matchingCells = [{row: rowIdx, column: colIdx}];
        let leftColIdx = colIdx - 1;
        while(leftColIdx >= 0 && board[rowIdx][leftColIdx]['color'] === color ) {
            matchingCells.push({row: rowIdx, column: leftColIdx});
            leftColIdx -= 1;
        }
        let rightColIdx = colIdx + 1;
        while(rightColIdx < NUM_COLUMNS && board[rowIdx][rightColIdx]['color'] === color ) {
            matchingCells.push({row: rowIdx, column: rightColIdx});

            rightColIdx += 1;
        }
        return matchingCells.length >= 5 ? matchingCells : false;

    };

    const dowWeHaveAWinnerOnRightDiagonal = (rowIdx, colIdx) => {
        let matchingCells = [{row: rowIdx, column: colIdx}];

        let downRowIdx = rowIdx + 1;
        let downColIdx = colIdx + 1;

        while (downRowIdx < NUM_ROWS && downColIdx < NUM_COLUMNS &&
        board[downRowIdx][downColIdx]['color'] === color) {
            matchingCells.push({row: downRowIdx, column: downColIdx});

            downRowIdx += 1;
            downColIdx += 1;

        }
        let upRowIdx = rowIdx - 1;
        let upColIdx = colIdx - 1;
        while (upRowIdx >= 0 && upColIdx >= 0 &&
        board[upRowIdx][upColIdx]['color'] === color) {
            console.log(upRowIdx,upColIdx)

            matchingCells.push({row: upRowIdx, column: upColIdx});
            upRowIdx -= 1;
            upColIdx -= 1;

        }
        return matchingCells.length >= 5 ? matchingCells : false;

    };

    const dowWeHaveAWinnerOnLeftDiagonal = (rowIdx, colIdx) => {
        let matchingCells = [{row: rowIdx, column: colIdx}];

        let downRowIdx = rowIdx + 1;
        let downColIdx = colIdx - 1;
        while (downRowIdx < NUM_ROWS && downColIdx >= 0 &&
        board[downRowIdx][downColIdx]['color'] === color) {
            matchingCells.push({row: downRowIdx, column: downColIdx});
            downRowIdx += 1;
            downColIdx -= 1;

        }
        let upRowIdx = rowIdx - 1;
        let upColIdx = colIdx + 1;
        while (upRowIdx >= 0 && upColIdx < NUM_COLUMNS &&
        board[upRowIdx][upColIdx]['color'] === color) {
            matchingCells.push({row: upRowIdx, column: upColIdx});
            upRowIdx -= 1;
            upColIdx += 1;

        }
        return matchingCells.length >= 5 ? matchingCells : false;
    };

    return doWeHaveAWinnerDownward(rowIdx, colIdx) ||
        doWehaveAWinnerSideways(rowIdx, colIdx) ||
        dowWeHaveAWinnerOnLeftDiagonal(rowIdx, colIdx) ||
        dowWeHaveAWinnerOnRightDiagonal(rowIdx, colIdx) ||
        doWeHaveAWinnerUpward(rowIdx, colIdx);

};

export default doWeHaveAWinnerThatIncludes;