import { Product } from "@/components/data";
import { randomUUID } from "expo-crypto";
import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export const initDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("swiftsachier.db");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT,
        category TEXT CHECK(category IN ('Food','Drink','Snack')) NOT NULL
      );
    `);
  }
  return db;
};

// Tambah produk (pakai object biar lebih clean)
export const addProduct = async (
  product: Omit<Product, "id">
): Promise<void> => {
  const database = await initDB();
  const id = randomUUID(); // generate UUID string
  await database.runAsync(
    "INSERT INTO products (id, name, price, image, category) VALUES (?, ?, ?, ?, ?);",
    [id, product.name, product.price, product.image, product.category]
  );
};

// Ambil semua produk
export const getProducts = async (): Promise<Product[]> => {
  const database = await initDB();
  const result = await database.getAllAsync<Product>("SELECT * FROM products;");
  return result;
};

// Hapus produk
export const deleteProduct = async (id: string): Promise<void> => {
  const database = await initDB();
  await database.runAsync("DELETE FROM products WHERE id = ?;", [id]);
};

// Update produk
export const updateProduct = async (product: Product): Promise<void> => {
  const database = await initDB();
  await database.runAsync(
    "UPDATE products SET name = ?, price = ?, image = ?, category = ? WHERE id = ?;",
    [product.name, product.price, product.image, product.category, product.id]
  );
};
