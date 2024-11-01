import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CustomEvent } from "@/types/Event";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";


interface EventDialogProps {
  open: boolean;
  onClose: () => void;
  event?: CustomEvent | null;
  onDelete?: () => void;
  isDeleteMode?: boolean;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<{ email: string; date: Date; description: string }>;
  errors: FieldErrors<{ email: string; date: Date; description: string }>;
}

const EventDialog: React.FC<EventDialogProps> = ({
  open,
  onClose,
  errors,
  register,
  onDelete,
  handleSubmit,
  isDeleteMode,
}) => {

  console.log(open, "open");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isDeleteMode ? "Delete Event" : "Create or Edit Event"}</DialogTitle>
          <DialogDescription>
            {isDeleteMode
              ? "Are you sure you want to delete this event?"
              : "Provide details for your event."}
          </DialogDescription>
        </DialogHeader>
        {!isDeleteMode ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required." })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
              <div>
                <Input
                  type="date"
                  {...register("date", { required: "Date is required." })}
                />
                {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Description"
                  {...register("description", { required: "Description is required." })}
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
              </div>
            </div>
            <DialogFooter className="mt-5">
              <Button type="submit">{isDeleteMode ? "Delete" : "Save"}</Button>
              <Button type="button" onClick={onClose}>Cancel</Button>
            </DialogFooter>
          </form>
        ) : (
          <DialogFooter className="mt-5">
            <Button type="button" onClick={onDelete} className="bg-red-600">
              Yes, Delete
            </Button>
            <Button type="button" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
