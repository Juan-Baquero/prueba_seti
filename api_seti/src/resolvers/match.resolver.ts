import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import matchController from "../controllers/match.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getResult = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
      const result = await matchController.getResultCont(req.params);
    res.status(OK).json(result);
  } catch (error) {
    console.error("An error ocurred getResult: ", error);
    res
      .status(EXPECTATION_FAILED)
      .json({ message: "Error, ocurrio un problema en la solicitud" });
  }
};
const getReport = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
      const result = await matchController.getReportCont();
    res.status(OK).json(result);
  } catch (error) {
    console.error("An error ocurred getResult: ", error);
    res
      .status(EXPECTATION_FAILED)
      .json({ message: "Error, ocurrio un problema en la solicitud" });
  }
};

export default {
  getResult,
  getReport
};
