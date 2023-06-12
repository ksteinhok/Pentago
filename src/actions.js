
const click_on_cell_action = (clickColIdx, clickRowIdx) => {
    console.log(clickRowIdx, clickColIdx)
    return {
        type: "CELL_CLICKED",
        colIdx: clickColIdx,
        rowIdx: clickRowIdx
    }
}

const reset_action = () => {
    return {
        type: 'RESET',
    }
}

const RotateL = (ToprightCol, ToprightRow) => {

    return {
        type: 'RotateL',
        ToprightCol: ToprightCol,
        ToprightRow: ToprightRow
    }
}

const RotateR =(ToprightCol, ToprightRow) => {

    return {
        type: 'RotateR',
        ToprightCol: ToprightCol,
        ToprightRow: ToprightRow
    }
}
export {
    click_on_cell_action,
    reset_action,
    RotateL,
    RotateR
};
