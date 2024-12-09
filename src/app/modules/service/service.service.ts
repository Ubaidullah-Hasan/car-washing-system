import config from "../../config";
import { TService, TServiceQueryParams } from "./service.interface";
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

  const result = await ServiceModel.create({ ...payload, image: imageUrl });
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  const srevice = await ServiceModel.findById(id);
  return srevice;
};

const getAllServiceFromDB = async (queryParams: TServiceQueryParams) => {
  const { sortPriceOrder, sortDurationOrder, searchTerm, limit } = queryParams;

  // Initialize filter and sort options
  const filterOptions: Partial<TService> = {};
  const sortOptions: Record<string, 1 | -1> = {};
  
  filterOptions.isDeleted = false;

  // Search by name
  if (searchTerm) {
    filterOptions.name = { $regex: searchTerm, $options: 'i' };
  }

  // Sort by price
  if (sortPriceOrder) {
    sortOptions.price = sortPriceOrder === 'descend' ? -1 : 1;
  }

  // Sort by duration
  if (sortDurationOrder) {
    sortOptions.duration = sortDurationOrder === 'descend' ? -1 : 1;
  }

  if (!sortPriceOrder || !sortDurationOrder) {
    sortOptions.createdAt = -1
  }


  const services = await ServiceModel.find(filterOptions).sort(sortOptions).limit(limit as number);
  return services;
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

const getOfferServices = async() => {
  const result = await ServiceModel.find({ offer: { $gt: 0 } });
  return result;
}
const getBestSaleServices = async() => {
  const result = await ServiceModel.find({ isBestSale: true });
  return result;
}
const getPopularServices = async() => {
  const result = await ServiceModel.find({ isPopular: true });
  return result;
}

export const serviceServices = {
  createServiceIntoDB,
  getSingleServiceFromDB,
  getAllServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
  getOfferServices,
  getBestSaleServices,
  getPopularServices,
};
