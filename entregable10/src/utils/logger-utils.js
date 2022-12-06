import ContenedorFS from "../contenedores/contenedorFs.js";
import { DATE_UTILS } from "./date-utils.js";

const LoggerDao = new ContenedorFS("logs");

const addLog = async (error) => {
  const log = { timestamp: DATE_UTILS.getTimestamp(), message: `${error}` };
  console.log(log)
  await LoggerDao.save(log);
};

export const LOGGER_UTILS = { addLog };