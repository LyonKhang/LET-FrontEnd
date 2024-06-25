import React from "react";
import { AddTransaction, GetTransaction, EditTransaction, DeleteTransaction, GetCalcualteBalance } from '../funtions/Transaction';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from "@mui/material";

export const Home = () => {
    return (
        <div className="container">
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
