import React from "react";
import { AddTransaction, GetTransaction, EditTransaction, DeleteTransaction } from '../funtions/Transaction';

export const Home = () => {
    return (
        <div>
            <GetTransaction />
            <AddTransaction />
            <EditTransaction />
            <DeleteTransaction />
            <h1>this runs!!!!</h1>
        </div>
    );
};
