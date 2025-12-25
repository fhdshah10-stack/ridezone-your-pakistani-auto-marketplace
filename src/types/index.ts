export interface Car {
  id: string;
  title: string;
  price: number;
  mileage: number;
  year: number;
  location: string;
  image: string;
  make: string;
  model: string;
  fuelType: string;
  transmission: string;
  isManaged?: boolean;
  isFeatured?: boolean;
}

export interface Bike {
  id: string;
  title: string;
  price: number;
  year: number;
  location: string;
  image: string;
  make: string;
  model: string;
  engineCC: number;
}

export interface NewCar {
  id: string;
  brand: string;
  brandLogo: string;
  model: string;
  price: number;
  priceLabel: string;
  image: string;
  status: 'popular' | 'upcoming' | 'newly-launched';
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  duration: string;
}

export interface BlogPost {
  id: string;
  title: string;
  thumbnail: string;
  excerpt: string;
  date: string;
}

export interface FuelPrice {
  type: string;
  price: number;
  change: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface AdFormData {
  photos: File[];
  title: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  price: number;
  description: string;
  isFeatured: boolean;
}

export interface FilterState {
  search: string;
  minPrice: number;
  maxPrice: number;
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
  mileageMax: number;
  transmission: string;
  fuelType: string;
  engineCapacity: string;
  condition: string;
  bodyType: string;
}
