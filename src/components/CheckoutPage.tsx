'use client';

import React, { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement
} from '@stripe/react-stripe-js';
import convertToSubcurrency from "@/lib/ConvertToSubcurrency";
import Loader from "./Shared/Loader";

const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMSG, setErrorMSG] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('Fetching payment intent for amount:', amount);

        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })
            .then((res) => {
                console.log('Response status:', res.status); // Debug log
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${ res.status }`);
                }
                return res.json();
            })
            .then((data) => {
                console.log('Payment intent data:', data); // Debug log
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else if (data.error) {
                    setErrorMSG(data.error);
                }
            })
            .catch((error) => {
                console.error('Error creating payment intent:', error);
                setErrorMSG('Failed to initialize payment');
            });
    }, [amount]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMSG(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${ window.location.origin }/payment-success`,
            },
        });

        if (error) {
            setErrorMSG(error.message);
        }

        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements) {
        return (
            <div style={ { textAlign: "center", marginTop: "50px" } }>
                <Loader />
            </div>
        );
    }

    return (
        <form onSubmit={ handleSubmit } style={ { maxWidth: "500px", margin: "0 auto" } }>
            { clientSecret && <PaymentElement /> }

            { errorMSG && (
                <div style={ { color: "red", marginTop: "10px" } }>
                    { errorMSG }
                </div>
            ) }

            <button
                disabled={ !stripe || loading }
                type="submit"
                style={ {
                    width: "100%",
                    padding: "12px",
                    marginTop: "20px",
                    backgroundColor: "#635bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "16px",
                    cursor: loading ? "not-allowed" : "pointer"
                } }
            >
                { loading ? "Processing..." : `Pay $${ amount }` }
            </button>
        </form>
    );
};

export default CheckoutPage;
