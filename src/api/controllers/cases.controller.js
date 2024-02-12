import { CaseService } from "../services/cases.service.js";
import logger from "../../loaders/logger.js";
const caseService = new CaseService();

export class CaseController {
  // constructor() {}

  async fetchDataAndProcessInBatches(req, res) {
    try {
      const { filePath, partnerId } = req.body;
      if (!filePath) {
        return res
          .status(400)
          .json({ success: false, error: "File URL is required." });
      }
      logger.info("Data processing completed.");
      const resp = await caseService.processCsvDataInChunks(
        filePath,
        partnerId
      );
      logger.info("Data processing completed.");
      return res
        .status(200)
        .json({ success: true, resp, message: "CSV processing completed." });
    } catch (error) {
      logger.error("Error:", error);
      return res.status(400).json({ success: false, error: error.message });
    }
  }
  async createHeaderMapping(req, res) {
    try {
      let body = req.body;
      const resp = await caseService.insertHeaderMapping(body);
      logger.info("Headers inserting completed.");
      return res
        .status(200)
        .json({ success: true, resp, message: "Headers inserting completed." });
    } catch (error) {
      logger.error("Error:", error);
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  async getAllCases(req,res){
    try{
      const resp = await caseService.getCases(); 
      return res
        .status(200)
        .json({ success: true, resp, message: "Fetching Cases Successfully" });
    }
    catch(err){
      logger.error("Error:", err);
      return res.status(400).json({ success: false, error: err.message });

    }

  }
  async filterCases(req,res){
    try{
      const resp = await caseService.filterCases(req.body); 
      return res
        .status(200)
        .json({ success: true, resp, message: "Fetching Cases Successfully" });
    }
    catch(err){
      logger.error("Error:", err);
      return res.status(400).json({ success: false, error: err.message });

    }

  }
}
