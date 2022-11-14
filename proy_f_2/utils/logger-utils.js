import { Logs } from "../models/models.js"
import { DATE_UTILS } from "./date-utils.js";


const addLog = async (error) => {
  const log = { timestamp: DATE_UTILS.getTimestamp(), message: error };
  await Logs.save(log);
};

export const LOGGER_UTILS = { addLog };