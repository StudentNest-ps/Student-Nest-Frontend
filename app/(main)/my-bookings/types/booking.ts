export interface Owner {
  id: string
  name: string
  avatar?: string
  phone?: string
  email?: string
}

export interface Apartment {
  id: string
  name: string
  location: string
  image?: string
  rating: number
  bedrooms: number
  bathrooms: number
  area: string
  owner?: Owner
}

export interface Booking {
  id: string
  apartment: Apartment
  checkIn: string
  checkOut: string
  guests: number
  totalAmount: number
  status: "pending" | "accepted" | "already_booked"
  bookingDate: string
}
