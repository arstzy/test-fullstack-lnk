import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useRegistration from "@/hooks/useRegistration";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, errors } = useRegistration();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-6 px-6">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gray-50 p-3 rounded-full mb-4">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Create an account</h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                className="pl-10"
              />
              {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="pl-10"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>

            <Button className="w-full bg-zinc-900 hover:bg-zinc-800">
              Sign Up
            </Button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Button variant="link" onClick={() => navigate('/login')} className="p-0 text-blue-600 hover:underline">
                Sign in
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
