import path from "node:path"
import { readFileSync } from "fs";


const confirmationService = async (transactionId: string, status: string) => {
    let filePath;

    
    if(status === "success"){
        filePath = path.join(__dirname, "../../../views/success.html");
    } else if(status === "fail") {
        filePath = path.join(__dirname, "../../../views/fail.html");
    }

    const template = readFileSync(filePath!, "utf-8");

    return template;
}

export const paymentServices = {
    confirmationService
}