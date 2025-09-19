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
      stock INTEGER NOT NULL,
      category TEXT
      );
    `);
    // await db.execAsync(`
    //   CREATE TABLE IF NOT EXISTS products (
    //     id TEXT PRIMARY KEY,
    //     name TEXT NOT NULL,
    //     price REAL NOT NULL,
    //     image TEXT,
    //     category TEXT CHECK(category IN ('Food','Drink','Snack')) NOT NULL
    //   );
    // `);

    // await db.execAsync(`DROP TABLE IF EXISTS transactions;`);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        productId TEXT,
        productName TEXT,
        quantity INTEGER,
        total REAL,
        date TEXT
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

// 🔹 Simpan transaksi
export const saveTransaction = async (
  items: { product: Product; quantity: number }[]
): Promise<void> => {
  const database = await initDB();
  const date = new Date().toISOString();

  for (const { product, quantity } of items) {
    const id = randomUUID();
    const total = product.price * quantity;

    await database.runAsync(
      `INSERT INTO transactions (id, productId, productName, quantity, total, date)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [id, product.id, product.name, quantity, total, date]
    );
  }
};

// 🔹 Ambil laporan bulanan
// export const getMonthlyReport = async (
//   year: number,
//   month: number
// ): Promise<any[]> => {
//   const database = await initDB();
//   const monthStr = month.toString().padStart(2, "0");

//   const start = `${year}-${monthStr}-01T00:00:00.000Z`;
//   const endDate = new Date(year, month, 0).getDate(); // jumlah hari dalam bulan
//   const end = `${year}-${monthStr}-${endDate}T23:59:59.999Z`;

//   const result = await database.getAllAsync<any>(
//     `SELECT * FROM transactions WHERE date BETWEEN ? AND ? ORDER BY date ASC;`,
//     [start, end]
//   );

//   return result;
// };

// 🔹 Ambil laporan bulanan per produk
export const getMonthlyReport = async (
  year: number,
  month: number
): Promise<
  {
    productId: string;
    productName: string;
    totalQty: number;
    totalSales: number;
  }[]
> => {
  const database = await initDB();
  const monthStr = month.toString().padStart(2, "0");

  const start = `${year}-${monthStr}-01T00:00:00.000Z`;
  const endDate = new Date(year, month, 0).getDate();
  const end = `${year}-${monthStr}-${endDate}T23:59:59.999Z`;

  const result = await database.getAllAsync<{
    productId: string;
    productName: string;
    totalQty: number;
    totalSales: number;
  }>(
    `
    SELECT 
      productId,
      productName,
      SUM(quantity) as totalQty,
      SUM(total) as totalSales
    FROM transactions
    WHERE date BETWEEN ? AND ?
    GROUP BY productId, productName
    ORDER BY totalSales DESC;
    `,
    [start, end]
  );

  return result;
};

// 🔹 Ambil laporan bulanan per kategori
export const getMonthlyReportByCategory = async (
  year: number,
  month: number
): Promise<{ category: string; totalQty: number; totalSales: number }[]> => {
  const database = await initDB();
  const monthStr = month.toString().padStart(2, "0");

  const start = `${year}-${monthStr}-01T00:00:00.000Z`;
  const endDate = new Date(year, month, 0).getDate();
  const end = `${year}-${monthStr}-${endDate}T23:59:59.999Z`;

  const result = await database.getAllAsync<{
    category: string;
    totalQty: number;
    totalSales: number;
  }>(
    `
    SELECT 
      p.category as category,
      SUM(t.quantity) as totalQty,
      SUM(t.total) as totalSales
    FROM transactions t
    JOIN products p ON t.productId = p.id
    WHERE t.date BETWEEN ? AND ?
    GROUP BY p.category
    ORDER BY totalSales DESC;
    `,
    [start, end]
  );

  return result;
};
