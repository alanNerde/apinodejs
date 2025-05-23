PRAGMA foreign_keys = on;

CREATE TABLE IF NOT EXISTS CUSTOMER(
  ID integer primary key autoincrement,
  NAME text,
  CPF_CNPJ text,
  PHONE text,
  EMAIL text,
  BIRTH_DATE Date,
  STATUS text
);

CREATE TABLE IF NOT EXISTS PRODUCT(
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  NAME TEXT NOT NULL,
  DESCRIPTION TEXT,
  PRICE REAL
  STATUS TEXT NOT NULL CHECK (STATUS IN ('A','I'))
);

CREATE TABLE IF NOT EXISTS "ORDER"(
  ID INTEGER PRIMARY KEY autoincrement,
  TOTAL_AMOUNT DOUBLE,
  "DATE" DATE,
  STATUS TEXT,
  CUSTOMER NUMBER,
  ADDRESS NUMBER,
  FOREIGN KEY(CUSTOMER) REFERENCES CUSTOMER(ID) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS ORDER_ITEM (
  ID           INTEGER PRIMARY KEY AUTOINCREMENT,
  ORDER     INTEGER NOT NULL,
  PRODUCT   INTEGER NOT NULL,
  AMOUNT     INTEGER NOT NULL CHECK(quantity > 0),
  UNIT_PRICE   REAL    NOT NULL CHECK(unit_price >= 0),
  STATUS TEXT NOT NULL CHECK(STATUS IN ('A', 'I'))
  FOREIGN KEY(ORDER)   REFERENCES ORDER(ID)    ON DELETE CASCADE,
  FOREIGN KEY(PRODUCT) REFERENCES PRODUCT(ID)  ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS CITY(
  id integer primary key autoincrement,
  name text not null,
  uf text not null
);

CREATE TABLE IF NOT EXISTS ADDRESS (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  customer      INTEGER NOT NULL,
  street        TEXT    NOT NULL,
  neighborhood  TEXT,
  number        TEXT,
  postal_code   TEXT,
  city          INTEGER NOT NULL,
  complemente   TEXT    NOT NULL,
  type          TEXT NOT NULL,
  STATUS TEXT NOT NULL CHECK(STATUS IN ('A', 'I')),
  FOREIGN KEY(customer) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY(city) references city(id) ON DELETE RESTRICT
);
