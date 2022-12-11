import dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILENAME = "productos";
const CARTS_FILENAME = "carritos";
const config = {
  SERVER: {
    PORT: process.env.PORT,
  },
  DAO: process.env.DAO,
  DATABASES: {
    filesystem: {
      PRODUCTS_FILENAME,
      CARTS_FILENAME,
    },
    firebase: {
      PRODUCTS_FILENAME,
      CARTS_FILENAME,
    },
    mongo: {
      url:process.env.MONGO_URL
    }
  },
};

export { config }