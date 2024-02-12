import axios from "axios";
import logger from "../../loaders/logger.js";

export class CaseHelper {
  async fetchDataFromUrl(fileUrl) {
    try {
      const response = await axios.get(fileUrl);
      if (response.headers["content-type"] !== "text/csv") {
        throw new Error("The content type is not CSV.");
      }
      return response.data;
    } catch (error) {
      logger.error("Error fetching CSV data:", error.message);
      throw error;
    }
  }
}
