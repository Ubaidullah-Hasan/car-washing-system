/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

export const createPayment = async (paymentInfo: any) => {
    const paymentData = {
        store_id: config.store_id,
        signature_key: config.signature_key,
        amount: paymentInfo.amount,
        tran_id: paymentInfo.tran_id,
        currency: "BDT",
        desc: "T-Shirt",
        cus_add1: "Sreepur, Gazipur",
        cus_add2: "N/A",
        cus_city: "Dhaka",
        cus_state: "Gazipur",
        cus_postcode: "N/A",
        cus_country: "Bangladesh",
        type: "json",
        success_url: `http://localhost:3000/api/payments?transactionId=${paymentInfo.tran_id}&status=success`,
        fail_url: 'http://localhost:5173/payment/fail',
        cancel_url: 'http://localhost:5173/payment/cancel',
        cus_name: paymentInfo.cus_name,
        cus_email: paymentInfo.cus_email,
        cus_phone: paymentInfo.cus_phone,
    };

    try {
        const response = await axios.post(config.payment_url!, paymentData);
        return response?.data.payment_url;

    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, "Payment initiation failed!")
    }
}


