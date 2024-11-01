import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axiosInstance from "@/lib/axios";
import { useAppContext } from "@/context/appContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const useAuth = () => {
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

  const onLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/login", {
        email: data.email,
        password: data.password,
      });
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      setLoading(false);
      showToast({
        variant: "default",
        title: "Login successful",
        description: "You have successfully logged in.",
      });
      reset();
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      setLoading(false);
      showToast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred while logging in.",
      });
      console.error("Login failed:", error);
    }
  };

  const onLogout = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/logout");

      if (response.status !== 200) {
        throw new Error("Logout failed");
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setLoading(false);
      showToast({
        variant: "default",
        title: "Logout successful",
        description: "You have successfully logged out.",
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      setLoading(false);
      showToast({
        variant: "destructive",
        title: "Logout failed",
        description: "An error occurred while logging out.",
      });
      console.error("Logout failed:", error);
    }
  }

  return {
    errors,
    register,
    onLogout,
    handleSubmit: handleSubmit(onLogin),
  };
};

export default useAuth;
