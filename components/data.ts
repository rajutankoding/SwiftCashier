// src/data.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "Food" | "Drink" | "Snack";
}

export const MenuManagement = [
  {
    id: "1",
    title: "Management Products",
    to: "/(features)/(managementProduct)/product",
  },
  {
    id: "2",
    title: "Management Promotion",
    to: "/(features)/(promotion)",
  },
  { id: "3", title: "Management Stock", to: "Nicee" },
  { id: "4", title: "Management Stock", to: "Nicee" },
  { id: "5", title: "Management Stock", to: "Nicee" },
  { id: "6", title: "Management Stock", to: "Nicee" },
];

export interface CartItem extends Product {
  quantity: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Nasi Goreng",
    price: 25000,
    image:
      "https://media.istockphoto.com/id/186826982/id/foto/sepiring-nasi-goreng-udang-di-atas-placemat-dan-meja-kayu.webp?a=1&b=1&s=612x612&w=0&k=20&c=WZ4trzDcVMmXPx_Kp_pqaz0kH4ULYP87U00Do5OAJZc=",
    category: "Food",
  },
  {
    id: "2",
    name: "Ayam Goreng",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF5YW18ZW58MHx8MHx8fDA%3D",
    category: "Food",
  },
  {
    id: "3",
    name: "Burger Keju",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?fit=crop&w=400&q=80",
    category: "Food",
  },

  {
    id: "4",
    name: "Es Kopi",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXMlMjBrb3BpfGVufDB8fDB8fHww",
    category: "Drink",
  },
  {
    id: "5",
    name: "Jus Jeruk",
    price: 15000,
    image:
      "https://media.istockphoto.com/id/1454673088/id/foto/menuangkan-jus-jeruk-segar-dan-sehat.webp?a=1&b=1&s=612x612&w=0&k=20&c=33Qz3UJ8MIvBt23LhO_XbRsIewcA9sXaf-uU5pOSrGk=",
    category: "Drink",
  },
  {
    id: "6",
    name: "Lemon Tea",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVtb24lMjB0ZWF8ZW58MHx8MHx8fDA%3D",
    category: "Drink",
  },

  {
    id: "7",
    name: "Keripik Kentang",
    price: 10000,
    image:
      "https://images.unsplash.com/photo-1617102738820-bee2545405fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2VyaXBpayUyMGtlbnRhbmd8ZW58MHx8MHx8fDA%3D",
    category: "Snack",
  },
  {
    id: "8",
    name: "Kue Coklat",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a3VlJTIwY29rbGF0fGVufDB8fDB8fHww",
    category: "Snack",
  },
  {
    id: "9",
    name: "Magelangan",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1664717698774-84f62382613b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmFzaSUyMG9yYWslMjBhcmlrfGVufDB8fDB8fHww",
    category: "Food",
  },
  {
    id: "10",
    name: "Orak Arik Telur",
    price: 25000,
    image:
      "https://media.istockphoto.com/id/2157431026/id/foto/orak-arik-sayuran-dan-telur-atau-orak-arik-sayuran-dan-telur-melayani-di-piring-menu-makanan.webp?a=1&b=1&s=612x612&w=0&k=20&c=tz10qeQrcrFFQQQf-BcbCV78e4a3gdjlmdQOrhHbkis=",
    category: "Food",
  },
  {
    id: "11",
    name: "Burjo",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1636044990152-53fc0e6a3b45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJ1YnVyJTIwa2FjYW5nJTIwaGlqYXV8ZW58MHx8MHx8fDA%3D",
    category: "Food",
  },
];

export type ProductCategory = "Food" | "Drink" | "Snack";
