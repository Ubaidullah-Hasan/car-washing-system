import { TService } from "./service.interface";
import { ServiceModel } from "./service.model";

const createServiceIntoDB = async (payload: TService) => {
    const user = await ServiceModel.create(payload);
    return user;
};



export const sserviceServices = {
    createServiceIntoDB,
};
