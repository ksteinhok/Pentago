import {Fragment, useReducer} from 'react';
import { click_on_cell_action, reset_action, RotateL, RotateR } from './actions';
import { reducers, createInitialState, } from './reducers';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import Stack from '@mui/material/Stack';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import IconButton from '@mui/material/IconButton';
import {Rotate90DegreesCcw, RotateLeft} from "@mui/icons-material";


const config = {
    num_rows: 6,
    num_columns: 6,
    h_gap:7,
    cell_width: 50,
    cell_height: 50
}



function Cell(props) {
    const { dispatch, cell, colIdx, rowIdx } = props;
    return (
        <Box sx={{
            width: config.cell_width,
            height: config.cell_height,
            backgroundColor: cell['color'],
            border: 1,
            borderColor: 'black',
            borderRadius: '50%'
        }}
             onClick={() => dispatch(click_on_cell_action(colIdx, rowIdx))}
        />
    );
}

function Row(props) {
    const {cell, dispatch } = props;

    return (
        <Grid container
              conlumns={config.num_columns}
              sx={{
                  display: 'flex',
                  direction: 'flex-row',
                  alignContent: 'space-between',
                  justifyContent: 'space-between'
              }}
        >
            {
                props.row.map((cell, idx) =>
                    <Grid item
                          key={idx}
                    >
                        <Cell key={idx}
                              cell={cell}
                              colIdx={idx}
                              rowIdx={props.rowIdx}
                              dispatch={dispatch}
                              sx={{borderRight:2}}
                        />
                    </Grid>)
            }
        </Grid>
    )
}
function TopButtons(props) {
    const { dispatch } = props;
    return(
        <Grid>
            <IconButton onClick={() => dispatch(RotateL(0,0))}>
                <UndoIcon/>
            </IconButton>
            <IconButton sx={{ marginRight:10}} onClick={() => dispatch(RotateR(0,0))}>
                <RedoIcon/>
            </IconButton>
            <IconButton onClick={() => dispatch(RotateL(3,0))}>
                <UndoIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(RotateR(3,0))}>
                <RedoIcon/>
            </IconButton>
        </Grid>
    )
}
function BotButtons(props) {
    const { dispatch } = props;
    return(
        <Grid>
            <IconButton onClick={() => dispatch(RotateL(0,3))}>
                <UndoIcon/>
            </IconButton>
            <IconButton sx={{ marginRight:10}} onClick={() => dispatch(RotateR(0,3))}>
                <RedoIcon/>
            </IconButton>
            <IconButton onClick={() => dispatch(RotateL(3,3))}>
                <UndoIcon/>
            </IconButton>
            <IconButton onClick={() => dispatch(RotateR(3,3))}>
                <RedoIcon/>
            </IconButton>
        </Grid>
    )
}
function TopMessage(props) {

    const {haveAWinner, winnerColor} = props;

    const playerColor = props.nextColor.charAt(0).toUpperCase() + props.nextColor.slice(1);
    const wColor = winnerColor ? winnerColor.charAt(0).toUpperCase() + winnerColor.slice(1) : null;

    const firstMessage = () => haveAWinner ? `${wColor} Wins. Game Over` : `${playerColor} plays next`;

    return (
        <Stack width='100%'>
            <Typography variant='h6' textAlign='center'>
                {
                    firstMessage()
                }
            </Typography>
            <Button width='100%'
                    sx={{
                        opacity: haveAWinner ? 1 : 0
                    }}
                    onClick={() => props.dispatch(reset_action())}>Reset?
            </Button>
        </Stack>
    )
};

export default function Board(props) {

    const [state, dispatch] = useReducer(reducers, undefined, createInitialState);
    const {nextColor, winnerColor, haveAWinner, board, rotated} = state;

    const calcWidth = () => config.num_columns * config.cell_width +
        (config.num_columns - 1) * config.h_gap

    return (
        <Fragment>
            <Grid item sx={{mb: 3, marginTop:"50px"}}>
                <TopMessage nextColor={nextColor}
                            winnerColor={winnerColor}
                            haveAWinner={haveAWinner}
                            dispatch={dispatch}
                />
            </Grid>

            <Grid container margin='auto'
                  columns={1}
                  sx={{
                      width: calcWidth(),
                      display: 'flex',
                      direction: 'flex-column',
                      justifyContent: 'center',
                      mt: 2, //adjust this?
                      backgroundColor:'#765341',
                      border:2,
                      borderRadius:'10px'
                  }}
            >
                <TopButtons dispatch={dispatch}/>
                <Grid sx={{border:1}}>
                    {
                        board.map((row, rowIdx) => (

                            <Grid item

                                  key={rowIdx}
                                  width='100%'
                                  sx={{mb: 1}}
                                  xs={1}

                            >

                                <Row key={rowIdx}
                                     row={row}
                                     rowIdx={rowIdx}
                                     dispatch={dispatch}
                                />
                            </Grid>))
                    }
                </Grid>

                <BotButtons dispatch={dispatch}/>
            </Grid>

        </Fragment>
    );
}

