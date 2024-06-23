
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


console.log("this run");

export const AddTransaction = () => {
    const [name, setName] = useState('');
    const [number, setInterval] = useState('');
    const [date, setdate] = React.useState(dayjs('07-02-2024'));
    const [companyname, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [product, setProduct] = useState('');
    const [location, setLocation] = useState('');
    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log(date);
        const formatted = date.format('MM-DD-YYYY');
        console.log(formatted);
        try {
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
        <div>
            <Box onSubmit={handleSubmit}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <FormControl fullWidth sx={{ m: 0.5 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        value={number}
                        onChange={(e) => setInterval(e.target.value)}
                    />
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker value={date} onChange={(newValue) => setdate(newValue)} />
                    </DemoContainer>
                </LocalizationProvider>


                <button type="submit">Submit</button>
            </Box>

            <h2>new</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number"
                    value={number}
                    onChange={(e) => setInterval(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setdate(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyname}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                />
                <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="online">Online</option>
                    <option value="inperson">In-Person</option>
                    <option value="subscription">Subscription</option>
                    <option value="other">Other</option>
                </select>
                {location && (
                    <p>You selected: {location}</p>
                )}
                <button type="submit">Submit</button>
            </form>
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
                        <th>Company</th>
                        <th>Email</th>
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
    const [date, setdate] = useState('');
    const [companyname, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [product, setProduct] = useState('');
    const [location, setLocation] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formatted = moment(date).format('MM-DD-YYYY');
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
            <h2>Edit</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="id"
                    placeholder="id"
                    value={id}
                    onChange={(e) => setid(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number"
                    value={number}
                    onChange={(e) => setInterval(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setdate(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyname}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                />
                <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="online">Online</option>
                    <option value="inperson">In-Person</option>
                    <option value="subscription">Subscription</option>
                    <option value="other">Other</option>
                </select>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};
//DELETE
export const DeleteTransaction = () => {
    const [labelid, setlabelid] = useState('');
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
            <h2>Delete</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="id"
                    placeholder="id"
                    value={labelid}
                    onChange={(e) => setlabelid(e.target.value)}
                />
                <button type="submit">Delete</button>
            </form>
        </div>
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