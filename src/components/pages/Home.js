import React from "react";
import { AddTransaction, GetTransaction, EditTransaction, DeleteTransaction, GetCalcualteBalance } from '../funtions/Transaction';
import BasicSpeedDial from "../funtions/DialButton";
export const Home = () => {
    return (
        <div>
            <GetCalcualteBalance />
            <GetTransaction />
            <BasicSpeedDial></BasicSpeedDial>
            <AddTransaction />
            <EditTransaction />
            <DeleteTransaction />
        </div>
    );
};
