/*This is a Tranasction funtion: Author Vinh */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../css/Transaction.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

console.log("this run");

export const AddTransaction = () => {
    const [name, setName] = useState('');
    const [number, setInterval] = useState('');
    const [date, setdate] = React.useState(dayjs('07-02-2024'));
    const [companyname, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [product, setProduct] = useState('');
    const [location, setLocation] = useState('');
    // button close on and off
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // sent POSt reuest to Back end at localhost:8080
    const handleSubmit = async (event) => {
        console.log(date);
        //format the date into US date
        const formatted = date.format('MM-DD-YYYY');
        console.log(formatted);
        try {
            //sent reuest in JSON
            const response = await axios.post('http://localhost:8080/transactions/newtransactions', {
                textTitle: name,
                amountEnter: number,
                exchangeDate: formatted,
                company: {
                    companyname: companyname,
                    email: email,
                },
                spent: {
                    textTitle: product,
                    location: location,
                }
            });
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    };
    return (
        // Pop up 
        <div>
            <React.Fragment>
                {/* Button to open */}
                <Button variant="outlined" onClick={handleClickOpen} sx={{ m: 1, width: '20ch', }}>
                    New
                </Button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            handleSubmit(event);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Add</DialogTitle>
                    <DialogContent>
                        <TextField sx={{ m: 1, width: '20ch', }}
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="empty"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FormControl fullWidth sx={{ m: 1, width: '20ch', }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Amount"
                                value={number}
                                onChange={(e) => setInterval(e.target.value)}
                            />
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']} fullWidth sx={{ m: 1 }} >
                                <DatePicker value={date} onChange={(newValue) => setdate(newValue)} />
                            </DemoContainer>
                        </LocalizationProvider>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl sx={{ m: 1, width: '20ch', }} >
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={companyname}
                                    label="catergory"
                                    onChange={(e) => setCompanyName(e.target.value)}
                                >
                                    <MenuItem value={"car"}>Car</MenuItem>
                                    <MenuItem value={"bill"}>Bill</MenuItem>
                                    <MenuItem value={"entertainment"}>Entertainment</MenuItem>
                                    <MenuItem value={"insurance"}>Insurance</MenuItem>
                                    <MenuItem value={"other"}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl sx={{ m: 1, width: '20ch', }}>
                                <InputLabel id="demo-simple-select-label">Payment</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={email}
                                    label="Payment"
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                    <MenuItem value={""}></MenuItem>
                                    <MenuItem value={"income"}>Income</MenuItem>
                                    <MenuItem value={"expense"}>Expense</MenuItem>
                                    <MenuItem value={"transfer"}>Transfer</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl sx={{ m: 1, width: '20ch', }}>
                                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={location}
                                    label="Location"
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <MenuItem value={""}></MenuItem>
                                    <MenuItem value={"online"}>Online</MenuItem>
                                    <MenuItem value={"in-person"}>In-person</MenuItem>
                                    <MenuItem value={"subscription"}>Subscription</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField fullWidth sx={{ m: 1, width: '20ch' }}
                            id="outlined-multiline-static"
                            label="Note"
                            multiline
                            rows={4}
                            defaultValue="Default Value"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        />
                        {/* button */}
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    );
};
//GET
export const GetTransaction = () => {
    const [data, setData] = useState([]);
    // run every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`http://localhost:8080/transactions/gettransactions`)
                .then(res => setData(res.data))
                .catch(err => console.error(err));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Catergory</th>
                        <th>Payment</th>
                        <th>Product</th>
                        <th>location</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.textTitle}</td>
                            <td>{item.exchangeDate}</td>
                            <td>{item.company.companyname}</td>
                            <td>{item.company.email}</td>
                            <td>{item.spent.textTitle}</td>
                            <td>{item.spent.location}</td>
                            <td><h3>${item.amountEnter}</h3></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}
//PUT
export const EditTransaction = () => {
    const [id, setid] = useState('');
    const [name, setName] = useState('');
    const [number, setInterval] = useState('');
    const [date, setdate] = React.useState(dayjs('07-02-2024'));
    const [companyname, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [product, setProduct] = useState('');
    const [location, setLocation] = useState('');

    // button close on and off
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formatted = date.format('MM-DD-YYYY');
        try {
            const response = await axios.put('http://localhost:8080/transactions/edittransaction', {
                id: id,
                textTitle: name,
                amountEnter: number,
                exchangeDate: formatted,
                company: {
                    companyname: companyname,
                    email: email,
                },
                spent: {
                    textTitle: product,
                    location: location,
                }
            });
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error sending PUT request:', error);
        }
    };
    return (
        <div>
            <React.Fragment>
                {/* Button to open */}
                <Button variant="outlined" onClick={handleClickOpen} sx={{ m: 1, width: '20ch', }} >
                    Edit
                </Button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            handleSubmit(event);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Add</DialogTitle>
                    <DialogContent>
                        <TextField sx={{ m: 1, width: '20ch', }}
                            id="outlined-number"
                            label="Number"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={id}
                            onChange={(e) => setid(e.target.value)}
                        />
                        <TextField fullWidth sx={{ m: 1, width: '20ch', }}
                            required
                            id="outlined-required"
                            label="Required"
                            defaultValue="empty"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FormControl fullWidth sx={{ m: 1, width: '20ch', }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Amount"
                                value={number}
                                onChange={(e) => setInterval(e.target.value)}
                            />
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']} fullWidth sx={{ m: 1 }} >
                                <DatePicker value={date} onChange={(newValue) => setdate(newValue)} />
                            </DemoContainer>
                        </LocalizationProvider>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl sx={{ m: 1, width: '20ch', }} >
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={companyname}
                                    label="catergory"
                                    onChange={(e) => setCompanyName(e.target.value)}
                                >
                                    <MenuItem value={"car"}>Car</MenuItem>
                                    <MenuItem value={"bill"}>Bill</MenuItem>
                                    <MenuItem value={"entertainment"}>Entertainment</MenuItem>
                                    <MenuItem value={"insurance"}>Insurance</MenuItem>
                                    <MenuItem value={"other"}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl sx={{ m: 1, width: '20ch', }}>
                                <InputLabel id="demo-simple-select-label">Payment</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={email}
                                    label="Payment"
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                    <MenuItem value={""}></MenuItem>
                                    <MenuItem value={"income"}>Income</MenuItem>
                                    <MenuItem value={"expense"}>Expense</MenuItem>
                                    <MenuItem value={"transfer"}>Transfer</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl sx={{ m: 1, width: '20ch', }}>
                                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={location}
                                    label="Location"
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <MenuItem value={""}></MenuItem>
                                    <MenuItem value={"online"}>Online</MenuItem>
                                    <MenuItem value={"in-person"}>In-person</MenuItem>
                                    <MenuItem value={"subscription"}>Subscription</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField fullWidth sx={{ m: 1, width: '20ch' }}
                            id="outlined-multiline-static"
                            label="Note"
                            multiline
                            rows={4}
                            defaultValue="Empty"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        />
                        {/* button */}
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div >
    );
};
//DELETE
export const DeleteTransaction = () => {
    const [labelid, setlabelid] = useState('');

    // button close on and off
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8080/transactions/deletetransaction/${labelid}`);
            console.log('Server response:', labelid);
        } catch (error) {
            console.error('Error sending DELETE request:', error);
        }
    };
    return (
        <div>
            <React.Fragment>
                {/* Button to open */}
                <Button variant="outlined" onClick={handleClickOpen} sx={{ m: 1, width: '20ch', }}>
                    Delete
                </Button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            handleSubmit(event);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Delete</DialogTitle>
                    <DialogContent>
                        <TextField sx={{ m: 1, width: '20ch', }}
                            id="outlined-number"
                            label="Number"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={labelid}
                            onChange={(e) => setlabelid(e.target.value)}
                        />
                        {/* button */}
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div >
    );
};
//Calcualte Balance
export const GetCalcualteBalance = () => {
    const [balance, setBalance] = useState([]);
    // run every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`http://localhost:8080/balance/calculateBalance`)
                .then(res => setBalance(res.data))
                .catch(err => console.error(err));
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <h2>Balance: ${Number(balance).toFixed(2)}</h2>

        </div >
    );
}