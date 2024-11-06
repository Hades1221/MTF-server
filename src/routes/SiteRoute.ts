

import express from 'express';
import { deleteSite, getAllSites, searchSites, createSite, getSiteById, updateSide, exportSiteList } from '../controller/SitesController';

const router = express.Router();

router.delete('/deleteSite/:id', deleteSite);
router.get('/getAllSites', getAllSites);
router.post('/searchSites', searchSites);
router.post('/createSite', createSite);
router.get('/getSite/:id', getSiteById);
router.patch('/updateSide/:id', updateSide);
router.get('/export-sites', exportSiteList);
export default router;
