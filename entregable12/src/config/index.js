import dotenv from "dotenv";
import yargs from "yargs/yargs"
dotenv.config();


const args = yargs(process.argv.slice(2)).default({port:8080}).alias({p:"port"}).argv;

const PRODUCTS_FILENAME = "productos";
const CARTS_FILENAME = "carritos";
const config = {
  SERVER: {
    PORT: args.port,
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
  PROCESS: {
    ARGS: args,
    PLATFORM: process.platform,
    PID: process.pid,
    PATH: process.execPath,
    MEMORY: process.memoryUsage(),
    DIR: process.cwd(),
    VERSION: process.version
  },
  CHILD: {
    RANDOM: process.env.RANDOM
  }
};

export { config,args }