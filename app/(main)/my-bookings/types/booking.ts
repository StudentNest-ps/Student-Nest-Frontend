export interface Apartment {
    id: string
    name: string
    location: string
    image: string
    rating: number
    bedrooms: number
    bathrooms: number
    area: string
  }
  
  export interface Booking {
    id: string
    apartment: Apartment
    checkIn: string
    checkOut: string
    guests: number
    totalAmount: number
    status: "pending" | "accepted" | "rejected"
    bookingDate: string
  }
  