'use client'

import { useState } from 'react'
import { Input } from '@/app/components/ui/Input'
import { Textarea } from '@/app/components/ui/Textarea'
import { Button } from '@/app/components/ui/Button'
import { Card } from '@/app/components/ui/Card'
import { Twitter, Linkedin, Calendar, Image as ImageIcon } from 'lucide-react'

export function PostForm() {
  const [formData, setFormData] = useState({
    content: '',
    scheduledDate: '',
    scheduledTime: '',
    platforms: {
      twitter: true,
      linkedin: true
    }
  })
  
  const [charCount, setCharCount] = useState(0)
  const maxChars = 280  
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setFormData({ ...formData, content })
    setCharCount(content.length)
  }
  
  const handlePlatformToggle = (platform: 'twitter' | 'linkedin') => {
    setFormData({
      ...formData,
      platforms: {
        ...formData.platforms,
        [platform]: !formData.platforms[platform]
      }
    })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Post data:', formData)
   
    alert('Post oluşturuldu! (Demo Mod)')
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
   
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          İçerik
        </h3>
        
        <Textarea
          value={formData.content}
          onChange={handleContentChange}
          placeholder="Ne paylaşmak istersiniz?"
          rows={6}
          helperText={`${charCount} / ${maxChars} karakter`}
          className={charCount > maxChars ? 'border-red-500' : ''}
        />
        
        {charCount > maxChars && (
          <p className="mt-2 text-sm text-red-500">
            ⚠️ Twitter limiti aşıldı! LinkedIn için uygun.
          </p>
        )}
      </Card>
      
 
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Platformlar
        </h3>
        
        <div className="space-y-3">
        
          <div 
            onClick={() => handlePlatformToggle('twitter')}
            className={`
              flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer
              transition-all duration-200
              ${formData.platforms.twitter 
                ? 'border-blue-600 bg-blue-600/10' 
                : 'border-gray-700 bg-gray-800'
              }
            `}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              formData.platforms.twitter ? 'bg-blue-500' : 'bg-gray-700'
            }`}>
              <Twitter className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1">
              <p className="text-white font-medium">Twitter</p>
              <p className="text-sm text-gray-400">
                280 karakter limiti
              </p>
            </div>
            
            <input
              type="checkbox"
              checked={formData.platforms.twitter}
              onChange={() => {}}
              className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-600"
            />
          </div>
          
        
          <div 
            onClick={() => handlePlatformToggle('linkedin')}
            className={`
              flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer
              transition-all duration-200
              ${formData.platforms.linkedin 
                ? 'border-blue-600 bg-blue-600/10' 
                : 'border-gray-700 bg-gray-800'
              }
            `}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              formData.platforms.linkedin ? 'bg-blue-700' : 'bg-gray-700'
            }`}>
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1">
              <p className="text-white font-medium">LinkedIn</p>
              <p className="text-sm text-gray-400">
                3000 karakter limiti
              </p>
            </div>
            
            <input
              type="checkbox"
              checked={formData.platforms.linkedin}
              onChange={() => {}}
              className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-600"
            />
          </div>
        </div>
      </Card>
    
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Zamanlama (Opsiyonel)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Tarih"
            value={formData.scheduledDate}
            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
          />
          
          <Input
            type="time"
            label="Saat"
            value={formData.scheduledTime}
            onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
          />
        </div>
        
        <p className="mt-3 text-sm text-gray-400">
          Tarih seçmezseniz post hemen yayınlanır
        </p>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" variant="primary" size="lg" className="flex-1">
          {formData.scheduledDate ? 'Zamanla' : 'Hemen Paylaş'}
        </Button>
        
        <Button type="button" variant="outline" size="lg">
          Taslak Kaydet
        </Button>
      </div>
      
    </form>
  )
}