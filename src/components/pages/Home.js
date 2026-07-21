import React from "react";
import { AddTransaction, GetTransaction, EditTransaction, DeleteTransaction, GetCalcualteBalance } from '../funtions/Transaction';
import { Box } from "@mui/material";
import '../css/Transaction.css';
import '../css/Home.css';

export const Home = () => {
    return (
        <div className="container">
            <h1></h1>
            <GetCalcualteBalance />
            <div>
                <Box className="home-actions">
                    <AddTransaction />
                    <EditTransaction />
                    <DeleteTransaction />
                </Box>
            </div>
            <GetTransaction />

        </div>
    );
};
