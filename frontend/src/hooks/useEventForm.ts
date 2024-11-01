import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axiosInstance from "@/lib/axios";
import { useAppContext } from "@/context/appContext";
import { useCallback, useEffect, useState } from "react";
import { EventData, CustomEvent } from "@/types/Event";
import dayjs from "dayjs";
import { User } from "@/types/User"

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string().required("Description is required"),
});

const useEventForm = () => {
  const { setLoading, showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [currentEvent, setCurrentEvent] = useState<CustomEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const user: User = JSON.parse(localStorage.getItem("user") || '{}') as User;

  const getDataEvents = useCallback(
    async (month: number) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<{ data: EventData[] }>(
          "/event",
          {
            params: {
              month,
            },
          }
        );

        const formatedEvents = response.data.data.map((event: EventData) => ({
          title: event.description,
          start: new Date(event.date),
          end: new Date(event.date),
          email: event.email,
          id: event._id,
        }));

        setEvents(formatedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setLoading(false);
      }
    },
    [setLoading, setEvents]
  );

  useEffect(() => {
    const month = dayjs().month() + 1;
    getDataEvents(month);
  }, [getDataEvents]);

  const onSubmit = async (
    data: { email: string; date: Date; description: string }
  ) => {
    setLoading(true);
    const endpoint = currentEventId ? `/event/${currentEventId}` : "/event";
    const method = currentEventId ? "put" : "post";
    try {
      const response = await axiosInstance[method](endpoint, data);
      const action = currentEventId ? "updated" : "created";

      console.log(`Event ${action} successfully`, response.data);
      showToast({
        variant: "default",
        title: `Event ${action}`,
        description: `Your event was ${action} successfully.`,
      });
      reset();
      setLoading(false);
      getDataEvents(dayjs().month() + 1);
    } catch (error) {
      setLoading(false);
      showToast({
        variant: "destructive",
        title: "Event operation failed",
        description: "An error occurred while processing your event.",
      });
      console.error("Event creation failed:", error);
    }
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/event/${currentEventId}`);
      console.log("Event deleted successfully", response.data);
      showToast({
        variant: "default",
        title: "Event deleted",
        description: "Your event was deleted successfully.",
      });
      getDataEvents(dayjs().month() + 1);
    } catch (error) {
      showToast({
        variant: "destructive",
        title: "Event deletion failed",
        description: "An error occurred while deleting your event.",
      });
      console.error("Event deletion failed:", error);
    }
  }

  const handleMonthChange = (month: number) => {
    getDataEvents(month);
  };

  return {
    user,
    events,
    errors,
    currentEvent,
    isDialogOpen,
    isDeleteDialogOpen,
    reset,
    onDelete,
    onSubmit,
    register,
    setValue,
    setIsDialogOpen,
    setCurrentEvent,
    handleMonthChange,
    setCurrentEventId,
    setIsDeleteDialogOpen,
    handleSubmit: handleSubmit(onSubmit),
  };
};

export default useEventForm;
