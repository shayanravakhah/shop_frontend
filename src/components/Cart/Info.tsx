"use client"

import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react"

export default function Info() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errors, setErrors] = useState<boolean[]>([false, false, false, false, false]);

    function validateInputs(): boolean {
        let thereError: boolean = false;
        const tmp: boolean[] = [...errors];
        if (name.trim() === '') {
            tmp[0] = true;
            thereError = true;
        }
        if (email.trim() === '' || !email.includes('@')) {
            tmp[1] = true;
            thereError = true;

        }
        if (phone.trim() === '' || phone.length != 11) {
            tmp[2] = true;
            thereError = true;

        }
        if (address.trim() === '') {
            tmp[3] = true;
            thereError = true;

        }
        if (postalCode.trim() === '') {
            tmp[4] = true;
            thereError = true;

        }
        setErrors(tmp);
        return thereError;
    }

    async function SubmitHandller() {
        if (localStorage.length == 0) {
            alert("Your cart is empty!");
            return;
        }
        if (validateInputs()) return;
        setIsSubmitting(true);
        for (let index = 0; index < localStorage.length; index++) {
            const key = localStorage.key(index);
            if (!key) continue;
            const amountStr = localStorage.getItem(key);
            if (!amountStr) continue;
            const amount = Number(amountStr);
            await axios.post('https://shopbackend-production-df00.up.railway.app/client-order', {
                name: name,
                email: email,
                phone_number: phone,
                address: address,
                zip_code: postalCode,
                amount: amount,
                product_id: Number(key)
            }).then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.error('There was an error!', error);
            });
        }
        setIsSubmitting(false);
        localStorage.clear();
        alert("Your order was successful!");
        window.location.reload();
    }

    return (
        <div className='w-full lg:w-1/3 rounded-lg shadow-md bg-white shadow-gray-500 py-5 px-4'>
            <div className='font-bold text-lg'>Your Information</div>
            <div className='flex flex-col gap-y-3 my-4 '>
                <TextField
                    className='w-full border rounded-md '
                    label="Full Name"
                    value={name}
                    type='text'
                    disabled={isSubmitting}
                    error={errors[0]}
                    onChange={(e) => setName(e.target.value)}>
                </TextField>

                <TextField
                    className='w-full border rounded-md '
                    label="Email"
                    value={email}
                    type='email'
                    disabled={isSubmitting}
                    error={errors[1]}
                    onChange={(e) => setEmail(e.target.value)}>
                </TextField>

                <TextField
                    className='w-full border rounded-md '
                    label="Phone Number"
                    value={phone}
                    type='number'
                    disabled={isSubmitting}
                    error={errors[2]}
                    onChange={(e) => setPhone(e.target.value)}>
                </TextField>

                <TextField
                    className='w-full border rounded-md '
                    label="Address"
                    value={address}
                    type='text'
                    disabled={isSubmitting}
                    error={errors[3]}
                    onChange={(e) => (setAddress(e.target.value))}>
                </TextField>

                <TextField
                    label="Postal Code"
                    value={postalCode}
                    type='text'
                    disabled={isSubmitting}
                    className='w-full border rounded-md'
                    error={errors[4]}
                    onChange={(e) => setPostalCode(e.target.value)}>
                </TextField>
                <button disabled={isSubmitting} onClick={SubmitHandller} className={`w-full px-3 py-1 rounded-md bg-black text-white ${isSubmitting ? 'opacity-20 cursor-not-allowed' : ''}`}>Online Pay</button>
                <div className={`mt-4 ${isSubmitting ? "flex" : "hidden"} flex-col items-center gap-y-1`}>
                    <CircularProgress className="text-green-600"></CircularProgress>
                    <p className='text-green-600'>Please wait for server response</p>
                </div>
            </div>
        </div>
    )
}
