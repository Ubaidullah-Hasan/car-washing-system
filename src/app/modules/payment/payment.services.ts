import path from "node:path"
import { readFileSync } from "fs";


const confirmationService = async (transactionId: string, status: string) => {
    const filePath = path.join(__dirname, "../../../views/success.html")
    let template = readFileSync(filePath, "utf-8");
    
    return template;
}

export const paymentServices = {
    confirmationService
}