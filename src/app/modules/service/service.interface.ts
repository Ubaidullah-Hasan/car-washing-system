export type TService = {
  name: string | { $regex: string; $options: string };
  description: string;
  price: number;
  duration: number;
  image: string;
  isDeleted?: boolean;
};

export type TServiceQueryParams = {
  sortPriceOrder?: 'ascend' | 'descend';
  sortDurationOrder?: 'ascend' | 'descend';
  searchTerm?: string;
  limit?: number;
};
