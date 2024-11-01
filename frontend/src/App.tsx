import { useState } from "react";
import MyCalendar from "./components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useEventForm from "./hooks/useEventForm";
import { Input } from "@/components/ui/input";
import EmailAvatar from "./components/ui/nameAvatar";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    user,
    events,
    errors,
    reset,
    register,
    setValue,
    onDelete,
    handleSubmit,
    handleMonthChange,
    setCurrentEventId,
  } = useEventForm();

  return (
    <div className="mx-10 my-5">
      <div className="w-full mb-3 flex justify-between">
        <EmailAvatar name={user.name} />
        <Button onClick={() => setIsDialogOpen(true)} className="mb-4">
          Create
        </Button>
      </div>

      <MyCalendar
        setValue={setValue}
        reset={reset}
        errors={errors}
        handleMonthChange={handleMonthChange}
        handleSubmit={handleSubmit}
        onDelete={onDelete}
        register={register}
        setCurrentEventId={setCurrentEventId}
        events={events}
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
            <DialogTitle>Create Event</DialogTitle>
            <DialogDescription>
              Enter details for your new event.
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
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                Save
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsDialogOpen(false);
                  reset();
                }}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
