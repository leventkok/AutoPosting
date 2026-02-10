'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/app/components/ui/Input'
import { Button } from '@/app/components/ui/Button'
import { mockRegister } from '@/lib/auth'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
   
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Tüm alanları doldurun')
      setIsLoading(false)
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      setIsLoading(false)
      return
    }
    
    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalı')
      setIsLoading(false)
      return
    }
    

    const user = mockRegister(formData.name, formData.email, formData.password)
    
    if (user) {
   
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } else {
      setError('Kayıt oluşturulamadı')
      setIsLoading(false)
    }
  }
  
  return (
    <div className="w-full">
      
     
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Hesap Oluşturun
        </h1>
        <p className="text-gray-400">
          AutoPosting'e katılın
        </p>
      </div>
      
   
      <div className="mb-6 p-4 bg-green-600/10 border border-green-600/20 rounded-lg flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
        <div>
          <p className="text-sm text-green-400 font-medium mb-1">
            Demo modunda çalışıyor
          </p>
          <p className="text-sm text-green-400/80">
            Şimdilik tüm kayıtlar başarılı kabul edilir
          </p>
        </div>
      </div>
      

      {error && (
        <div className="mb-6 p-4 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
   
      <form onSubmit={handleSubmit} className="space-y-5">
        
   
        <Input
          label="Ad Soyad"
          name="name"
          type="text"
          placeholder="Ahmet Yılmaz"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
        />
        
  
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="ahmet@example.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        
   
        <Input
          label="Şifre"
          name="password"
          type="password"
          placeholder="En az 6 karakter"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />
        
   
        <Input
          label="Şifre Tekrar"
          name="confirmPassword"
          type="password"
          placeholder="Şifrenizi tekrar girin"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
        />
        
       
        <div className="flex items-start gap-3">
          <input 
            type="checkbox" 
            id="terms"
            className="mt-1 w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-600"
          />
          <label htmlFor="terms" className="text-sm text-gray-400">
            <Link href="#" className="text-blue-400 hover:text-blue-300">
              Kullanım koşullarını
            </Link>
            {' '}ve{' '}
            <Link href="#" className="text-blue-400 hover:text-blue-300">
              gizlilik politikasını
            </Link>
            {' '}kabul ediyorum
          </label>
        </div>
        
       
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur'}
        </Button>
        
      </form>
      
  
      <div className="my-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-800" />
        <span className="text-sm text-gray-500">veya</span>
        <div className="flex-1 h-px bg-gray-800" />
      </div>
      
   
      <p className="text-center text-gray-400">
        Zaten hesabınız var mı?{' '}
        <Link 
          href="/login" 
          className="text-blue-400 hover:text-blue-300 font-medium"
        >
          Giriş yapın
        </Link>
      </p>
      
    </div>
  )
}