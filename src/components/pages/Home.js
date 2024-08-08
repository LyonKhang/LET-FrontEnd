import React from "react";
import { AddTransaction, GetTransaction, EditTransaction, DeleteTransaction, GetCalcualteBalance } from '../funtions/Transaction';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from "@mui/material";
import '../css/Transaction.css'

export const Home = () => {
    return (
        <div className="container">
            <h1></h1>
            <GetCalcualteBalance />
            <div>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minWidth: 300,
                        m: 1,

                    }}
                >
                    <ButtonGroup variant="contained" aria-label="Button Bar"
                        sx={{
                            boxShadow: 1,
                            borderRadius: 2,
                            p: 2,
                            minWidth: 300,
                            m: 2,
                            background: '#FFC55A',
                        }}
                    >
                        <AddTransaction />
                        <EditTransaction />
                        <DeleteTransaction />
                    </ButtonGroup>
                </Box>
            </div>
            <GetTransaction />

        </div>
    );
};
