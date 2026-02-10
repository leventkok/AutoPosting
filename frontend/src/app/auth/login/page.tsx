'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import { mockLogin } from '@/lib/auth'
import { Mail, Lock, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()  
    setError('')  
    setIsLoading(true)  
    
  
    if (!email || !password) {
      setError('Tüm alanları doldurun')
      setIsLoading(false)
      return
    }
    
    const user = mockLogin(email, password)
    
    if (user) {
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)  
    } else {
      setError('Email veya şifre hatalı')
      setIsLoading(false)
    }
  }
  
  return (
    <div className="w-full">
      
   
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Tekrar Hoş Geldiniz
        </h1>
        <p className="text-gray-400">
          Hesabınıza giriş yapın
        </p>
      </div>
      

      <div className="mb-6 p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
        <p className="text-sm text-blue-400">
          <strong>Demo:</strong> Email: admin | Şifre: admin
        </p>
      </div>
    
      {error && (
        <div className="mb-6 p-4 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
      

      <form onSubmit={handleSubmit} className="space-y-6">
        
    
        <Input
          label="Email"
          type="text"
          placeholder="admin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        
      
        <Input
          label="Şifre"
          type="password"
          placeholder="admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        
   
        <div className="flex justify-end">
          <Link 
            href="#" 
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Şifremi unuttum
          </Link>
        </div>
        
      
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </Button>
        
      </form>
      

      <div className="my-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-800" />
        <span className="text-sm text-gray-500">veya</span>
        <div className="flex-1 h-px bg-gray-800" />
      </div>
      
   
      <p className="text-center text-gray-400">
        Hesabınız yok mu?{' '}
        <Link 
          href="/register" 
          className="text-blue-400 hover:text-blue-300 font-medium"
          
        >
          Kayıt olun
        </Link>
      </p>
      
    </div>
  )
}