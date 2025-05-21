export interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'studio' | string;
  price: number;
  address: string;
  ownerName: string;
  ownerPhoneNumber: string;
  amenities: string[];
  images: string[];
  country: string;
  city: string;
  availableFrom: string;
  maxGuests: string;
}
