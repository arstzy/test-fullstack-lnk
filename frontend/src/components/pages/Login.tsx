import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

import useAuth from "@/hooks/useAuth"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const { errors, handleSubmit, register } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">

      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-6 px-6">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gray-50 p-3 rounded-full mb-4">
              <LogIn className="w-6 h-6 text-gray-600" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Sign in with email</h1>
            <p className="text-gray-500 text-center">
              Organize your events, track important dates,
              <br />and keep everything in one place. It's free!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <div className="text-right">
              <Button onClick={() => navigate('/register')} variant="link" className="text-sm p-0">
                Sign Up
              </Button>
            </div>

            <Button className="w-full bg-zinc-900 hover:bg-zinc-800">
              Get Started
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage;