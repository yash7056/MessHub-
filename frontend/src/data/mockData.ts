export interface Mess {
  id: string;
  name: string;
  owner: string;
  address: string;
  phone: string;
  isOpen: boolean;
  rating: number;
  reviewCount: number;
  distance: number;
  lunchPrice: number;
  dinnerPrice: number;
  isVeg: boolean;
  todaysMenu: {
    lunch: string[];
    dinner: string[];
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  reviews?: Array<{
    _id?: string;
    customerName: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export const mockMesses: Mess[] = [
  {
    id: '1',
    name: 'Shree Krishna Mess',
    owner: 'Ramesh Kumar',
    address: 'Near City College, MG Road',
    phone: '+91 98765 43210',
    isOpen: true,
    rating: 4.5,
    reviewCount: 127,
    distance: 0.8,
    lunchPrice: 80,
    dinnerPrice: 90,
    todaysMenu: {
      lunch: ['Dal Rice', 'Roti', 'Mixed Veg', 'Pickle', 'Curd'],
      dinner: ['Rajma Rice', 'Chapati', 'Aloo Gobi', 'Salad', 'Sweet']
    },
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: '2',
    name: 'Annapurna Mess',
    owner: 'Suresh Patel',
    address: 'Gandhi Nagar, Station Road',
    phone: '+91 87654 32109',
    isOpen: true,
    rating: 4.2,
    reviewCount: 89,
    distance: 1.2,
    lunchPrice: 70,
    dinnerPrice: 85,
    todaysMenu: {
      lunch: ['Sambar Rice', 'Rasam', 'Dry Veg', 'Papad', 'Buttermilk'],
      dinner: ['Chole Rice', 'Puri', 'Mix Veg', 'Pickle', 'Laddu']
    },
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: '3',
    name: 'Sagar Mess',
    owner: 'Vijay Singh',
    address: 'Market Square, Old City',
    phone: '+91 76543 21098',
    isOpen: false,
    rating: 4.0,
    reviewCount: 156,
    distance: 2.1,
    lunchPrice: 75,
    dinnerPrice: 88,
    todaysMenu: {
      lunch: ['Dal Chawal', 'Sabzi', 'Roti', 'Achaar', 'Lassi'],
      dinner: ['Paneer Curry', 'Rice', 'Naan', 'Raita', 'Gulab Jamun']
    },
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: '4',
    name: 'Mama\'s Kitchen',
    owner: 'Lakshmi Devi',
    address: 'Behind Bus Stand, Main Road',
    phone: '+91 65432 10987',
    isOpen: true,
    rating: 4.7,
    reviewCount: 203,
    distance: 1.5,
    lunchPrice: 85,
    dinnerPrice: 95,
    todaysMenu: {
      lunch: ['Biryani', 'Raita', 'Shorba', 'Pickle', 'Sweet'],
      dinner: ['Thali Special', 'Dal', 'Sabzi', 'Rice', 'Dessert']
    },
    coordinates: { lat: 12.9716, lng: 77.5946 }
  }
];