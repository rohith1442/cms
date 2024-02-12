// NPM Modules
import { CronJob } from "cron";
import logger from "../../loaders/logger.js";
import { CaseService } from "../services/cases.service.js";

export class CronController {
  constructor() {
    this.caseService = new CaseService();
  }

  async fetchDataCron(cronExpression, taskDescription, taskLogic) {
    const cronJob = new CronJob(
      cronExpression,
      async () => {
        try {
          logger.info(taskDescription);
          logger.info(`Fetch Data from CSV CRON Started at ${new Date()}`);
          await taskLogic();
        } catch (error) {
          logger.error(`Error executing CRON task: ${error.message}`);
        }
      },
      null,
      true,
      "Asia/Calcutta"
    );

    cronJob.start();
  }

  scheduleTaskFor10AM() {
    const cronExpression = "0 10 * * *";
    const taskDescription = "10 AM";
    logger.info(`Executing task at 10 AM`);
    this.fetchDataCron(cronExpression, taskDescription, async () => {
      const filePath =
          "/home/rohith/workspace/cms/src/assets/files/partnerdata.csv",
        partnerId = "A1B2";
      const resp = await this.caseService.processCsvDataInChunks(filePath, partnerId);
      logger.info(`Executed task at 10 AM and the Response: ${resp}`);
    });
  }

  scheduleTaskFor5PM() {
    const cronExpression = "0 17 * * *";
    const taskDescription = "5 PM";
    this.fetchDataCron(cronExpression, taskDescription, async () => {
      const filePath =
          "/home/rohith/workspace/cms/src/assets/files/partnerdata.csv",
        partnerId = "A1B3";
      const resp = await this.caseService.processCsvDataInChunks(filePath, partnerId);
      logger.info(`Executed task at 5 PM and the Response: ${resp}`);
    });
  }
}

