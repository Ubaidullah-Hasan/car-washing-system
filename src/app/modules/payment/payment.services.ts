import path from "node:path"
import { readFileSync } from "fs";
import { verifyPayment } from "./payment_utils";
import { BookingModel } from "../booking/booking.model";
import { paymentStatus } from "../booking/booking.constant";


const confirmationService = async (transactionId: string, status: string) => {
    const response = await verifyPayment(transactionId);

    if (response.pay_status === 'Successful') {
        await BookingModel.findOneAndUpdate(
            { transactionId },
            { paymentStatus: paymentStatus.paid },
        )
    }

    let filePath;
    if (status === "success") {
        filePath = path.join(__dirname, "../../../views/success.html");
    } else if (status === "fail") {
        filePath = path.join(__dirname, "../../../views/fail.html");
    }

    const template = readFileSync(filePath!, "utf-8");

    return template;
}

export const paymentServices = {
    confirmationService
}