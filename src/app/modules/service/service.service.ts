import { TService } from "./service.interface";
import { ServiceModel } from "./service.model";

const createServiceIntoDB = async (payload: TService) => {
    const result = await ServiceModel.create(payload);
    return result;
};

const getSingleServiceFromDB = async (id: string) => {
    const srevice = await ServiceModel.findById(id);
    return srevice;
};

const getAllServiceFromDB = async () => {
    const srevices = await ServiceModel.find();
    return srevices;
};



export const sserviceServices = {
    createServiceIntoDB,
    getSingleServiceFromDB,
    getAllServiceFromDB
};
