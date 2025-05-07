import path from 'path';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

let dbInstance: Database | null = null;

export async function getDB(): Promise<Database> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await open({
    filename:
      process.env.DB_PATH || path.resolve(__dirname, '../../dbapi.sqlite'),
    driver: sqlite3.Database,
  });

  return dbInstance;
}
