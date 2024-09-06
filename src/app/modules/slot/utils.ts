import httpStatus from "http-status";
import AppError from "../../errors/AppError";

export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  serviceDuration: number,
) => {

  const startHour = startTime.split(":").map((string) => parseInt(string, 10));
  const endHour = endTime.split(":").map((string) => parseInt(string, 10));

  const startHourToMinutes = (startHour[0] * 60) + startHour[1];
  const endHourToMinutes = (endHour[0] * 60) + endHour[1];
  const inputTime = endHourToMinutes - startHourToMinutes;
  if (inputTime === serviceDuration) {
    return true;
  }

  throw new AppError(httpStatus.BAD_REQUEST, `Invalid service duration, duration must be ${serviceDuration}`);
};
