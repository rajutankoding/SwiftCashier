// src/data.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "Food" | "Drink" | "Snack";
}

export const products: Product[] = [
  {
    id: "1",
    name: "Nasi Goreng",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1572615962804-03a11b8543d8?fit=crop&w=400&q=80",
    category: "Food",
  },
  {
    id: "2",
    name: "Ayam Geprek",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1621213797669-7ae37415170d?fit=crop&w=400&q=80",
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
      "https://images.unsplash.com/photo-1541167716161-073c6838a169?fit=crop&w=400&q=80",
    category: "Drink",
  },
  {
    id: "5",
    name: "Jus Jeruk",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1600713994358-1317a36c646b?fit=crop&w=400&q=80",
    category: "Drink",
  },
  {
    id: "6",
    name: "Lemon Tea",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1622359052528-7952a8b98165?fit=crop&w=400&q=80",
    category: "Drink",
  },

  {
    id: "7",
    name: "Keripik Kentang",
    price: 10000,
    image:
      "https://images.unsplash.com/photo-1627883584742-f283b9c92a95?fit=crop&w=400&q=80",
    category: "Snack",
  },
  {
    id: "8",
    name: "Kue Coklat",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1620950334800-410a76f62590?fit=crop&w=400&q=80",
    category: "Snack",
  },
  {
    id: "9",
    name: "Magelangan",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1572615962804-03a11b8543d8?fit=crop&w=400&q=80",
    category: "Food",
  },
  {
    id: "10",
    name: "Orak Arik Teur",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1572615962804-03a11b8543d8?fit=crop&w=400&q=80",
    category: "Food",
  },
  {
    id: "11",
    name: "Burjo",
    price: 25000,
    image:
      "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Food",
  },
];

export type ProductCategory = "Food" | "Drink" | "Snack";
