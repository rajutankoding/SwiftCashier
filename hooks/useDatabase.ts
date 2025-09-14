import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

export function useDatabase() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [dbIsReady, setDbIsReady] = useState(false);

  useEffect(() => {
    async function openDatabase() {
      try {
        const openedDb = await SQLite.openDatabaseAsync("swiftcashier");

        await openedDb.execAsync(`
          CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            image TEXT,
            category TEXT
          );
        `);

        setDb(openedDb);
        setDbIsReady(true);
      } catch (e) {
        console.error("Gagal membuka database atau membuat tabel", e);
      }
    }
    openDatabase();
  }, []);

  return { db, dbIsReady };
}
