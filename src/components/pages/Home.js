import React from "react";
import { AddTransaction, GetTransaction, EditTransaction, DeleteTransaction, GetCalcualteBalance } from '../funtions/Transaction';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export const Home = () => {
    return (
        <div>
            <GetCalcualteBalance />
            <ButtonGroup variant="contained" aria-label="Button Bar">
                <AddTransaction />
                <EditTransaction />
                <DeleteTransaction />
            </ButtonGroup>
            <GetTransaction />

        </div>
    );
};
