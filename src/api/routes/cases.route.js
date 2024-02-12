import { Router } from 'express';
import { CronController } from "../controllers/cron.controller.js";
import { CaseController } from '../controllers/cases.controller.js';

const cronController = new CronController();
const caseController = new CaseController();

// Schedule tasks using the methods
cronController.scheduleTaskFor10AM();
cronController.scheduleTaskFor5PM();


// Creating express Router
const router = Router();

router.post('/cases', caseController.fetchDataAndProcessInBatches);
router.post('/headers', caseController.createHeaderMapping);
router.get('/cases', caseController.getAllCases);
router.post('/filter', caseController.filterCases);




export default router;



