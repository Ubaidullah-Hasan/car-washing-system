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

const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
    const result = await ServiceModel.findByIdAndUpdate(
        id,
        payload,
        {
            new: true,
        }
    );
    return result;
};



export const serviceServices = {
    createServiceIntoDB,
    getSingleServiceFromDB,
    getAllServiceFromDB,
    updateServiceIntoDB
};
