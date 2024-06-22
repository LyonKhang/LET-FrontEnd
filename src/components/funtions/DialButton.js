import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Add, Edit, Delete } from '@mui/icons-material';
import FullScreenDialog from './Add';

function handleClick(e, operation) {
    e.preventDefault();
    if (operation == "add") {
        return <FullScreenDialog />;
    } else if (operation == "edit") {
        return "";
    }
    setOpen(!open);// to close the speed dial, remove this line if not needed.
};
const actions = [
    { icon: <Add />, name: 'Add', operation: 'add' },
    { icon: <Edit />, name: 'Edit', operation: 'edit' },
    { icon: <Delete />, name: 'Delete', operation: 'delete' },
];


export default function BasicSpeedDial() {
    return (
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map(action => (
                    <SpeedDialAction
                        tooltipOpen
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={(e) => {
                            handleClick(e, action.operation)
                        }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
