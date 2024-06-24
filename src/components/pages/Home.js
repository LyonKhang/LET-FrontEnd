import React from "react";
import { AddTransaction, GetTransaction, EditTransaction, DeleteTransaction, GetCalcualteBalance } from '../funtions/Transaction';


export const Home = () => {
    return (
        <div>
            <GetCalcualteBalance />
            <AddTransaction />
            <EditTransaction />
            <DeleteTransaction />
            <GetTransaction />

        </div>
    );
};
