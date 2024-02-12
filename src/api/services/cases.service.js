import { CaseHelper } from "../helpers/cases.helper.js";
import csvtojson from "csvtojson";

import models from "../models/index.js";
import logger from "../../loaders/logger.js";

export class CaseService {
  constructor() {
    this.caseHelper = new CaseHelper();
    this.caseModel = models.Case;
    this.partnerConfigModel = models.PartnerConfig;
  }

  async processCsvDataInChunks(filePath, partnerId) {
    try {
      //   const csvData = await this.caseHelper.fetchDataFromUrl(fileUrl);
      const jsonArrayObj = await csvtojson().fromFile(filePath);
      logger.info(jsonArrayObj);
      const headersMapping = await this.fetchHeaderMapping(partnerId);
      const resp = await this.transformData(jsonArrayObj, headersMapping);

      return resp;
    } catch (error) {
      logger.error(error);
      throw new Error(
        "An error occurred during CSV processing: " + error.message
      );
    }
  }

  async transformData(partnerData, headersMapping) {
    try {
      const unifiedData = partnerData.map((partnerRow) => {
        const unifiedRow = {};
        for (const unifiedField in headersMapping) {
          const partnerField = headersMapping[unifiedField];
          unifiedRow[unifiedField] = partnerRow[partnerField];
        }
        return unifiedRow;
      });
      const resp = await this.caseModel.insertMany(unifiedData);
      if (resp && resp.errors) {
        logger.error(`Error saving to MongoDB: ${error.message}`);
        throw new Error(`Error saving to MongoDB: ${error.message}`);
      } else {
        logger.info("Data saved to MongoDB.");
        return resp;
      }
    } catch (error) {
      logger.error(`Error transforming data: ${error.message}`);
      throw new Error(`Error transforming data: ${error.message}`);
    }
  }

  async fetchHeaderMapping(partnerId) {
    try {
      const mapping = await this.partnerConfigModel
        .findOne({ partnerId })
        .lean();
      return mapping ? mapping.headersMapping : {};
    } catch (error) {
      logger.error(`Error fetching header mapping from DB: ${error.message}`);
      throw new Error(
        `Error fetching header mapping from DB: ${error.message}`
      );
    }
  }

  async insertHeaderMapping(body) {
    try {
      const mapping = await this.partnerConfigModel.create(body);
      return mapping;
    } catch (error) {
      logger.error(`Error fetching header mapping from DB: ${error.message}`);
      throw new Error(
        `Error fetching header mapping from DB: ${error.message}`
      );
    }
  }

  async getCases() {
    try {
      const cases = await this.caseModel.find(
        {},
        { institutionName: 1, city: 1, propertyType: 1 }
      );
      return cases;
    } catch (error) {
      logger.error(`Error fetching cases  from DB: ${error.message}`);
      throw new Error(`Error fetching cases  from DB: ${error.message}`);
    }
  }
  async filterCases(body) {
    try {
      const { city, fromDate, toDate } = body;
      let from = new Date(fromDate + " 00:00:00");
      let to = new Date(toDate + " 23:59:59");
      const cases = await this.caseModel.aggregate([
        {
          $match: {
            city: city,
            ...(fromDate &&
              toDate && {
                createdAt: { $gte: from, $lte: to },
              }),
          },
        },
        {
          $project: {
            _id: 0,
            institutionName: 1,
            city: 1,
            propertyType: 1,
          },
        },
      ]);
      if (!cases)
        throw new Error(`Error fetching cases  from DB: ${error.message}`);
      return cases;
    } catch (error) {
      logger.error(`Error fetching cases  from DB: ${error.message}`);
      throw new Error(`Error fetching cases  from DB: ${error.message}`);
    }
  }
}
