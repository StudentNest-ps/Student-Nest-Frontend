export interface Apartment {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  floor: string;
  city: string;
  neighborhood: string;
  amenities: string[];
  availableFrom: string;
  maxGuests: number;
  featured: boolean;
  location: {
    lat: number;
    lng: number;
  };
}

export const apartmentListings: Apartment[] = [
  {
    id: 1,
    title: 'Modern Studio Near Najah University',
    description:
      'Bright and cozy studio apartment within walking distance to Najah National University. Perfect for students.',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
    price: 350,
    bedrooms: 1,
    bathrooms: 1,
    floor: '2nd',
    city: 'nablus',
    neighborhood: 'University District',
    amenities: ['WiFi', 'Air Conditioning', 'Fully Furnished', 'Parking'],
    availableFrom: '2023-11-15',
    maxGuests: 1,
    featured: true,
    location: {
      lat: 32.224,
      lng: 35.2625,
    },
  },
  {
    id: 2,
    title: 'Spacious 2-Bedroom Apartment in Rafidia',
    description:
      'Modern 2-bedroom apartment in the heart of Rafidia. Close to shops, restaurants, and public transportation.',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    price: 500,
    bedrooms: 2,
    bathrooms: 2,
    floor: '3rd',
    city: 'nablus',
    neighborhood: 'Rafidia',
    amenities: ['WiFi', 'Balcony', 'Fully Furnished', 'Elevator'],
    availableFrom: '2023-12-01',
    maxGuests: 4,
    featured: false,
    location: {
      lat: 32.228,
      lng: 35.255,
    },
  },
  {
    id: 3,
    title: 'Cozy 1-Bedroom with Mountain View',
    description:
      'Beautiful 1-bedroom apartment with stunning views of Mount Gerizim. Newly renovated with modern amenities.',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
    price: 400,
    bedrooms: 1,
    bathrooms: 1,
    floor: '5th',
    city: 'nablus',
    neighborhood: 'Old City',
    amenities: ['WiFi', 'Air Conditioning', 'Fully Furnished', 'Mountain View'],
    availableFrom: '2023-11-20',
    maxGuests: 2,
    featured: false,
    location: {
      lat: 32.221,
      lng: 35.259,
    },
  },
  {
    id: 4,
    title: 'Luxury 3-Bedroom Apartment',
    description:
      'Spacious and luxurious 3-bedroom apartment in a quiet neighborhood. Perfect for families or groups.',
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop',
    price: 700,
    bedrooms: 3,
    bathrooms: 2,
    floor: '1st',
    city: 'nablus',
    neighborhood: 'Al-Makhfiya',
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Fully Furnished',
      'Parking',
      'Garden',
    ],
    availableFrom: '2023-12-15',
    maxGuests: 6,
    featured: true,
    location: {
      lat: 32.226,
      lng: 35.268,
    },
  },
  {
    id: 5,
    title: 'Student-Friendly Studio with Utilities Included',
    description:
      'Affordable studio apartment with all utilities included. Just a 5-minute walk to Najah National University.',
    image:
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop',
    price: 300,
    bedrooms: 1,
    bathrooms: 1,
    floor: '4th',
    city: 'nablus',
    neighborhood: 'University District',
    amenities: ['WiFi', 'Fully Furnished', 'Utilities Included'],
    availableFrom: '2023-11-10',
    maxGuests: 1,
    featured: false,
    location: {
      lat: 32.2235,
      lng: 35.261,
    },
  },
  {
    id: 6,
    title: 'Modern 2-Bedroom in City Center',
    description:
      'Newly renovated 2-bedroom apartment in the heart of Nablus. Close to markets, cafes, and cultural sites.',
    image:
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop',
    price: 550,
    bedrooms: 2,
    bathrooms: 1,
    floor: '3rd',
    city: 'nablus',
    neighborhood: 'City Center',
    amenities: ['WiFi', 'Air Conditioning', 'Fully Furnished', 'Balcony'],
    availableFrom: '2023-12-05',
    maxGuests: 3,
    featured: false,
    location: {
      lat: 32.2215,
      lng: 35.263,
    },
  },
  {
    id: 7,
    title: 'Charming 1-Bedroom in Historic Building',
    description:
      'Beautiful 1-bedroom apartment in a renovated historic building in the Old City of Nablus.',
    image:
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=2071&auto=format&fit=crop',
    price: 450,
    bedrooms: 1,
    bathrooms: 1,
    floor: '2nd',
    city: 'nablus',
    neighborhood: 'Old City',
    amenities: ['WiFi', 'Fully Furnished', 'Historic Building'],
    availableFrom: '2023-11-25',
    maxGuests: 2,
    featured: true,
    location: {
      lat: 32.2205,
      lng: 35.257,
    },
  },
  {
    id: 8,
    title: 'Spacious Family Apartment with Garden',
    description:
      'Large 3-bedroom apartment with a private garden. Ideal for families looking for a comfortable stay.',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop',
    price: 650,
    bedrooms: 3,
    bathrooms: 2,
    floor: 'Ground',
    city: 'nablus',
    neighborhood: 'Al-Makhfiya',
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Fully Furnished',
      'Parking',
      'Garden',
    ],
    availableFrom: '2023-12-10',
    maxGuests: 5,
    featured: false,
    location: {
      lat: 32.227,
      lng: 35.266,
    },
  },
  {
    id: 9,
    title: 'Budget Studio for Students',
    description:
      'Affordable studio apartment perfect for students. Located close to Najah National University and amenities.',
    image:
      'https://images.unsplash.com/photo-1630699144867-37acec97df5a?q=80&w=2070&auto=format&fit=crop',
    price: 280,
    bedrooms: 1,
    bathrooms: 1,
    floor: '3rd',
    city: 'nablus',
    neighborhood: 'University District',
    amenities: ['WiFi', 'Fully Furnished'],
    availableFrom: '2023-11-05',
    maxGuests: 1,
    featured: false,
    location: {
      lat: 32.2245,
      lng: 35.2615,
    },
  },
  {
    id: 10,
    title: 'Luxury Penthouse with City Views',
    description:
      'Stunning penthouse apartment with panoramic views of Nablus. Features high-end finishes and amenities.',
    image:
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=2070&auto=format&fit=crop',
    price: 900,
    bedrooms: 2,
    bathrooms: 2,
    floor: 'Penthouse',
    city: 'nablus',
    neighborhood: 'Rafidia',
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Fully Furnished',
      'Parking',
      'Balcony',
      'City View',
    ],
    availableFrom: '2023-12-20',
    maxGuests: 4,
    featured: true,
    location: {
      lat: 32.229,
      lng: 35.254,
    },
  },
  {
    id: 11,
    title: 'Modern Apartment in Ramallah City Center',
    description:
      'Contemporary apartment in the heart of Ramallah with easy access to shops, restaurants, and cultural sites.',
    image:
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2084&auto=format&fit=crop',
    price: 600,
    bedrooms: 2,
    bathrooms: 1,
    floor: '4th',
    city: 'ramallah',
    neighborhood: 'City Center',
    amenities: ['WiFi', 'Air Conditioning', 'Fully Furnished', 'Balcony'],
    availableFrom: '2023-11-15',
    maxGuests: 3,
    featured: true,
    location: {
      lat: 31.9038,
      lng: 35.2034,
    },
  },
  {
    id: 12,
    title: 'Cozy Studio in Al-Tireh, Ramallah',
    description:
      'Comfortable studio apartment in the upscale Al-Tireh neighborhood of Ramallah. Close to Birzeit University.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop',
    price: 350,
    bedrooms: 1,
    bathrooms: 1,
    floor: '2nd',
    city: 'ramallah',
    neighborhood: 'Al-Tireh',
    amenities: ['WiFi', 'Fully Furnished', 'Parking'],
    availableFrom: '2023-11-10',
    maxGuests: 1,
    featured: false,
    location: {
      lat: 31.91,
      lng: 35.195,
    },
  },
  {
    id: 13,
    title: 'Family Apartment in Jenin City',
    description:
      'Spacious family apartment in a quiet neighborhood of Jenin. Close to the American Arab University.',
    image:
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop',
    price: 450,
    bedrooms: 3,
    bathrooms: 2,
    floor: '1st',
    city: 'jenin',
    neighborhood: 'City Center',
    amenities: ['WiFi', 'Air Conditioning', 'Fully Furnished', 'Parking'],
    availableFrom: '2023-12-01',
    maxGuests: 5,
    featured: true,
    location: {
      lat: 32.4597,
      lng: 35.295,
    },
  },
  {
    id: 14,
    title: 'Student Housing Near Arab American University',
    description:
      'Affordable apartment designed for students at the Arab American University in Jenin.',
    image:
      'https://images.unsplash.com/photo-1626178793926-22b28830aa30?q=80&w=2070&auto=format&fit=crop',
    price: 300,
    bedrooms: 2,
    bathrooms: 1,
    floor: '3rd',
    city: 'jenin',
    neighborhood: 'University Area',
    amenities: ['WiFi', 'Fully Furnished', 'Study Area'],
    availableFrom: '2023-11-20',
    maxGuests: 2,
    featured: false,
    location: {
      lat: 32.455,
      lng: 35.3,
    },
  },
  {
    id: 15,
    title: 'Historic Apartment in Bethlehem Old City',
    description:
      "Charming apartment in a historic building in the heart of Bethlehem's Old City. Walking distance to major attractions.",
    image:
      'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?q=80&w=2070&auto=format&fit=crop',
    price: 500,
    bedrooms: 1,
    bathrooms: 1,
    floor: '2nd',
    city: 'bethlehem',
    neighborhood: 'Old City',
    amenities: ['WiFi', 'Fully Furnished', 'Historic Building'],
    availableFrom: '2023-12-05',
    maxGuests: 2,
    featured: true,
    location: {
      lat: 31.7054,
      lng: 35.2024,
    },
  },
  {
    id: 16,
    title: 'Modern Apartment Near Hebron University',
    description:
      'Contemporary apartment close to Hebron University. Ideal for students and visiting faculty.',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    price: 400,
    bedrooms: 2,
    bathrooms: 1,
    floor: '4th',
    city: 'hebron',
    neighborhood: 'University Area',
    amenities: ['WiFi', 'Air Conditioning', 'Fully Furnished'],
    availableFrom: '2023-11-25',
    maxGuests: 3,
    featured: false,
    location: {
      lat: 31.5326,
      lng: 35.0998,
    },
  },
];
