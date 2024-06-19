
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

console.log("this run");

export const AddTransaction = () => {
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
            <h1>GET from Spring boot</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}> {item.id} - {item.textTitle} -  {item.exchangeDate} - {item.company.companyname}
                        - {item.company.email} - {item.spent.textTitle}- {item.spent.location} - {item.amountEnter}</li>
                ))}
            </ul>
        </div>
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
            {balance !== null ? (
                <h2>Balance: ${Number(balance).toFixed(2)}</h2>
            ) : (
                <h2>Loading balance...</h2>
            )}
        </div >
    );
}