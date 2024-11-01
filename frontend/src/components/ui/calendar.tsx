import { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomEvent } from "@/types/Event";
import {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";

dayjs.extend(weekday);
dayjs.extend(utc);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const localizer = dayjsLocalizer(dayjs);

interface MyCalendarProps {
  events: CustomEvent[];
  errors: FieldErrors<{ email: string; date: Date; description: string }>;
  setCurrentEventId: (id: string | null) => void;
  onDelete: () => void;
  handleMonthChange: (month: number) => void;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<{ email: string; date: Date; description: string }>;
  reset: UseFormReset<{ email: string; date: Date; description: string }>;
  setValue: UseFormSetValue<{ email: string; date: Date; description: string }>;
}

const MyCalendar = ({
  events,
  errors,
  setCurrentEventId,
  onDelete,
  handleMonthChange,
  handleSubmit,
  register,
  reset,
  setValue,
}: MyCalendarProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSelectEvent = (event: CustomEvent) => {
    console.log(event, "ini event apaan?");
    setCurrentEventId(event.id as string);
    setIsDialogOpen(true);
    setValue("email", event.email as string);
    setValue("date", event.start as Date);
    setValue("description", event.title as string);
  };

  const handleDelete = () => {
    onDelete();
    reset();
    setIsDeleteDialogOpen(false);
    setIsDialogOpen(false);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        onNavigate={(date) => {
          const month = dayjs(date).month() + 1;
          handleMonthChange(month);
        }}
        onSelectEvent={handleSelectEvent}
      />

      <Dialog
        open={isDialogOpen}
        onOpenChange={(isOpen) => {
          setIsDialogOpen(isOpen);
          setCurrentEventId(null);
          if (!isOpen) reset();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update the details of your event.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <Input type="date" placeholder="Date" {...register("date")} />
                {errors.date && (
                  <span className="text-red-500 text-sm">
                    {errors.date.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Description"
                  {...register("description")}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
            <DialogFooter className="mt-5">
              <div className="flex w-full justify-between">
                <div>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsDeleteDialogOpen(true);
                      setIsDialogOpen(false);
                    }}
                    className="bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
                <div className="flex gap-x-2">
                  <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                    Update
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setCurrentEventId(null);
                      reset();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-5">
            <Button type="button" onClick={handleDelete} className="bg-red-600">
              Yes, Delete
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setCurrentEventId(null);
                reset();
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCalendar;
