import React from 'react';
import { Footer, CheckOutForm } from '../../containers';
import { Navbar } from '../../components';

const CheckOut = () => {
    return (
        <div>
            <Navbar />
            <CheckOutForm />
            <Footer />
        </div>
    )
}

export default CheckOut