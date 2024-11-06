import { Request, Response } from 'express';
import { connect } from '../util/Mongo';
import { createApiResponse } from '../util/ApiResponse';
import Site from '../models/siteModel'; // Assuming the model is in the models folder
import { ApiResponse } from '../util/ApiResponse';
import XLSX from 'xlsx';


// Controller function to delete a site by its ID
export const deleteSite = async (req: Request, res: Response): Promise<void> => {
  try {
    const siteId = req.params.id;
    const deletedSite = await Site.findByIdAndDelete(siteId);

    if (!deletedSite) {
      res.status(404).json({ message: 'Site not found' });
      return; // Exit early if no site found
    }

    res.status(200).json({ message: 'Site deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting site', error });
  }
};

// This function creates a site in the db
export const createSite: any = async (req: Request, res: Response) => {
  const siteData: any = req.body;
  try {
    await connect();
    const existSite = await Site.findOne({ address: siteData.address });

    if (existSite !== null) {
      return res.status(400).json(createApiResponse(false, null, "Site already exists."));
    }
    const site = new Site(siteData);
    await site.save();

    const response: ApiResponse = createApiResponse(true, site, "Site created successfully.");
    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    const response: ApiResponse = createApiResponse(false, null, "Site creation failed", null, error.message);
    res.status(500).json(response);
  }
};

export const getSiteById: any = async (req: Request, res: Response) => {
  const siteId: any = req.params.id;
  console.log();
  try {
    const existSite = await Site.findById(siteId);

    if (existSite === null) {
      return res.status(404).json(createApiResponse(false, null, "Site does not exist."));
    }

    const response: ApiResponse = createApiResponse(true, existSite, "Site retrieved successfully.");
    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    const response: ApiResponse = createApiResponse(false, null, "Site retrieval failed", null, error.message);
    res.status(500).json(response);
  }
};

// export const updateSide = async (req: Request, res: Response): Promise<void> => {
//   const address: string = req.params.address;
//   const updateData: any = req.body;

//   try {
  
//     const updatedSite = await Site.findOneAndUpdate({ address }, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedSite) {
//       res.status(404).json({ message: "Site not found" });
//       return;
//     }

//     res.status(200).json(updatedSite);
//   } catch (error: any) {
//     console.error("Error during site update:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
export const updateSide = async (req: Request, res: Response): Promise<void> => {
  const siteId: string = req.params.id;  // עדכון ל-ID
  const updateData: any = req.body;

  try {
    const updatedSite = await Site.findByIdAndUpdate(siteId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSite) {
      res.status(404).json({ message: "Site not found" });
      return;
    }

    res.status(200).json(updatedSite);
  } catch (error: any) {
    console.error("Error during site update:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const getAllSites = async (req: Request, res: Response) => {
  try {
    await connect();
    const sites = await Site.find();
    if (sites.length > 0) {
      const response = createApiResponse(true, sites, "Fetched all sites successfully", null, null);
      res.status(200).json(response);
    } else {
      const response = createApiResponse(true, sites, "No sites found", null, null);
      res.status(404).json(response);
    }
  } catch (error: any) {
    console.error('Error fetching sites:', error);
    const response = createApiResponse(false, null, "Failed to fetch sites", null, error.message);
    res.status(500).json(response);

  }
};


export const searchSites: any = async (req: Request, res: Response) => {
  const { searchTerm } = req.body;

  try {
    if (!searchTerm) {
      return res.status(400).json(createApiResponse(false, null, "Search term is required", null, null));
    }

    let sites;
    if (searchTerm.trim() === "") {
      sites = await Site.find();
    } else {
      sites = await Site.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { address: { $regex: searchTerm, $options: "i" } },
        ],
      });
    }

    const response = createApiResponse(true, sites, "Search results", null, null);
    res.status(200).json(response);
  } catch (error: any) {
    console.error(error);
    const response = createApiResponse(false, null, "Failed to retrieve sites", null, error.message);
    res.status(500).json(response);
  }
};

const exportSitesToExcel = async (): Promise<Buffer> => {
  const users = await Site.find().lean();
  const worksheet = XLSX.utils.json_to_sheet(users);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sites");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
};

export const exportSiteList = async (req: Request, res: Response) => {
  try {
    await connect();
    const excelData = await exportSitesToExcel();
    res.setHeader("Content-Disposition", "attachment; filename=Sites-list.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(excelData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error exporting users");
  }
};
