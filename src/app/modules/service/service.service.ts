import config from "../../config";
import { TService } from "./service.interface";
import { ServiceModel } from "./service.model";

const createServiceIntoDB = async (payload: TService) => {
  let imageUrl = "";

  if (payload.image) {
    const formData = new FormData();
    formData.append("image", payload.image);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${config.img_bb_api_key}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        imageUrl = data.data.url;
        console.log("Image uploaded successfully:", imageUrl);
      } else {
        console.error("Image upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  const result = await ServiceModel.create({ ...payload, imageUrl });
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
  const result = await ServiceModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await ServiceModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const serviceServices = {
  createServiceIntoDB,
  getSingleServiceFromDB,
  getAllServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};
