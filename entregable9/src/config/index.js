import dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILENAME = "productos";
const MESSAGES_FILENAME = "mensajes";
const USERS_FILENAME = "usuarios";
const config = {
  SERVER: {
    PORT: process.env.PORT,
  },
  DAO: process.env.DAO,
  DATABASES: {
    filesystem: {
      PRODUCTS_FILENAME,
      MESSAGES_FILENAME,
      USERS_FILENAME
    },
    firebase: {
      PRODUCTS_FILENAME,
      MESSAGES_FILENAME,
      USERS_FILENAME
    },
    mongo: {
      url:process.env.MONGO_URL
    }
  },
};

export { config }