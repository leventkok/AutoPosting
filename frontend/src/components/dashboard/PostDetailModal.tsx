'use client'

import { X, Twitter, Linkedin, Calendar, Clock } from 'lucide-react'
import { CalendarPost, formatDate } from '@/lib/calendar-utils'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

interface PostDetailModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDay: Date | null
  posts: CalendarPost[]
}

export function PostDetailModal({
  isOpen,
  onClose,
  selectedDay,
  posts
}: PostDetailModalProps) {
  
  if (!isOpen || !selectedDay) return null
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto border border-gray-800"
        onClick={(e) => e.stopPropagation()} // Modal'a tıklayınca kapanmasın
      >
        
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">
              {formatDate(selectedDay, 'dd MMMM yyyy')}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {posts.length} paylaşım
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                Bu gün için zamanlanmış post yok
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <Card key={post.id}>
                <div className="space-y-3">
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      post.status === 'scheduled' 
                        ? 'bg-orange-600/10 text-orange-400' 
                        : 'bg-green-600/10 text-green-400'
                    }`}>
                      {post.status === 'scheduled' ? 'Zamanlanmış' : 'Yayınlandı'}
                    </span>
                    
                    {post.platforms.includes('twitter') && (
                      <div className="px-2 py-1 bg-blue-500/10 rounded flex items-center gap-1">
                        <Twitter className="w-3 h-3 text-blue-400" />
                        <span className="text-xs text-blue-400">Twitter</span>
                      </div>
                    )}
                    {post.platforms.includes('linkedin') && (
                      <div className="px-2 py-1 bg-blue-700/10 rounded flex items-center gap-1">
                        <Linkedin className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-blue-600">LinkedIn</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-white">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>
                      {formatDate(new Date(post.scheduledAt), 'HH:mm')}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      Düzenle
                    </Button>
                    <Button variant="outline" size="sm">
                      Sil
                    </Button>
                  </div>
                  
                </div>
              </Card>
            ))
          )}
        </div>
        
      </div>
    </div>
  )
}