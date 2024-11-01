import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axiosInstance from "@/lib/axios";
import { useAppContext } from "@/context/appContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const useRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const { setLoading, showToast } = useAppContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (data: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/register", {
        name: data.fullName,
        email: data.email,
        password: data.password,
      });
      console.log("Registration successful:", response.data);
      setLoading(false);
      showToast({
        variant: "default",
        title: "Registration successful",
        description: "You have successfully created an account.",
      });
      reset();
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setLoading(false);
      showToast({
        variant: "destructive",
        title: "Registration failed",
        description: "An error occurred while creating an account.",
      });
      console.error("Registration failed:", error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};

export default useRegistration;
