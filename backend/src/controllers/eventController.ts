import { Request, RequestHandler, Response } from "express";
import Event from "../models/eventModel";
import { sendEmail } from "../services/emailService";
import dayjs from "dayjs";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const createEvent: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { email, date, description } = req.body;
  const userEmail = req.user?.email;

  try {
    await sendEmail(userEmail as string, email, "Event created", "Hi Salam kenal");
    const newEvent = new Event({
      email,
      date,
      description,
      createdBy: req.user?.id,
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.log(error, "error creating event");
    res.status(500).json({
      message: "Error creating event",
    });
  }
};

export const getEvent: RequestHandler = async (req: Request, res: Response) => {
  const { month } = req.query;

  try {
    if (
      !month ||
      isNaN(Number(month)) ||
      Number(month) < 1 ||
      Number(month) > 12
    ) {
      res.status(400).json({ message: "Invalid month" });
      return;
    }

    const monthNumber = Number(month);
    const year = dayjs().year();

    const startDate = dayjs(`${year}-${monthNumber}-01`)
      .startOf("month")
      .toDate();
    const endDate = dayjs(startDate).endOf("month").toDate();

    const eventList = await Event.find({
      date: { $gte: startDate, $lte: endDate },
    });

    res.status(200).json({
      message: "Get event successfully",
      data: eventList,
    });
  } catch (error) {
    console.log(error, "error fetching event");
    res.status(500).json({ message: "Error fetching event" });
  }
};

export const updateEvent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { email, date, description } = req.body;

  try {
    const updateEvent = await Event.findByIdAndUpdate(
      id,
      { email, date, description },
      { new: true, runValidators: true }
    );

    if (!updateEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.status(200).json({
      message: "Event updated successfully",
      data: updateEvent,
    });
  } catch (error) {
    console.log(error, "error updating event");
    res.status(500).json({ message: "Error updating event" });
  }
};

export const deleteEvent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const deleteEvent = await Event.findByIdAndDelete(id);

    if (!deleteEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.log(error, "error deleting event");
    res.status(500).json({ message: "Error deleting event" });
  }
};
