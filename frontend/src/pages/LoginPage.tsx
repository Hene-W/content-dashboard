import React, { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {login} = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault()

    const result = await login(email, password)
    if (result) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-slate-100 to-[#effaf0] flex items-center justify-center p-6">

        <div className="w-full m-2 sm:w-2/3 sm:m-0 lg:w-1/3 xl:w-1/4 rounded-4xl bg-white/95 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-200 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#065f46] font-semibold">Connexion</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Bienvenue</h2>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="nom@exemple.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#059669] focus:bg-white focus:ring-2 focus:ring-[#059669]/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-[#059669] focus:bg-white focus:ring-2 focus:ring-[#059669]/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 text-xl flex items-center text-slate-500 transition hover:text-slate-900"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <IoEyeOff />
                  ) : (
                    <IoEye />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-primary px-4 py-3 font-semibold text-white shadow-lg shadow-[#059669]/20 transition hover:bg-primary-hover hover:cursor-pointer"
            >
              Se connecter
            </button>
          </form>
        </div>
    </div>
  )
}

export default LoginPage