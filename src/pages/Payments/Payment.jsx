import React from 'react'
import { Footer, PaymentForm } from '../../containers';
import { Navbar } from '../../components';

const Payment = () => {
    return (
        <div>
            <Navbar />
            <PaymentForm />
            <Footer />
        </div>
    )
}

export default Payment