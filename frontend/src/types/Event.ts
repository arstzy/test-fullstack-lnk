import { Event as BigCalendarEvent } from "react-big-calendar"

export interface EventData {
  _id: string;
  email: string;
  date: string;
  description: string;
  createdBy: string;
  createdAt: string;
  __v: number;
}

export interface CustomEvent extends BigCalendarEvent {
  email?: string;
  id?: string;
}