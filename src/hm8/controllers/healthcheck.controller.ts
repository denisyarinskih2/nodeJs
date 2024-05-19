import AppDataSource from "../data-source.config";

export const healthcheck = async (req: Request, res: any): Promise<void> => {
  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.query("SELECT 1");
      res.status(200).json({ status: "Application is healthy" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
