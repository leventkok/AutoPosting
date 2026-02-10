'use client'

import { CalendarPost } from '@/lib/calendar-utils'
import { Twitter, Linkedin } from 'lucide-react'

interface CalendarDayProps {
  day: Date
  isCurrentMonth: boolean
  isToday: boolean
  posts: CalendarPost[]
  onClick: (day: Date) => void
}

export function CalendarDay({ 
  day, 
  isCurrentMonth, 
  isToday, 
  posts,
  onClick 
}: CalendarDayProps) {
  
  const dayNumber = day.getDate()
  
  return (
    <div
      onClick={() => onClick(day)}
      className={`
        min-h-30 border border-gray-800 p-3
        cursor-pointer transition-all duration-200 hover:bg-gray-800/50
        relative
        ${!isCurrentMonth ? 'bg-gray-900/30 text-gray-600' : 'bg-gray-900'}
        ${isToday ? 'ring-2 ring-blue-600' : ''}
      `}
    >
      {/* Gün numarası - Sol üstte */}
      <div className="mb-3">
        <span className={`
          text-base font-semibold
          ${isToday ? 'text-blue-400' : isCurrentMonth ? 'text-white' : 'text-gray-600'}
        `}>
          {dayNumber}
        </span>
      </div>
      
      {/* Bugün badge'i - Sol altta (absolute) */}
      {isToday && (
        <div className="absolute bottom-2 left-2">
          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
            Bugün
          </span>
        </div>
      )}
      
      {/* Postlar */}
      <div className="space-y-2">
        {posts.slice(0, 3).map((post) => (
          <div
            key={post.id}
            className={`
              text-xs p-2 rounded
              ${post.status === 'scheduled' 
                ? 'bg-blue-600/20 text-blue-300 border border-blue-600/30' 
                : 'bg-green-600/20 text-green-300 border border-green-600/30'
              }
            `}
          >
            {/* Platform ikonları */}
            <div className="flex items-center gap-1 mb-1">
              {post.platforms.includes('twitter') && (
                <Twitter className="w-3 h-3" />
              )}
              {post.platforms.includes('linkedin') && (
                <Linkedin className="w-3 h-3" />
              )}
            </div>
            
            {/* İçerik preview */}
            <div className="line-clamp-2 text-xs">
              {post.content}
            </div>
          </div>
        ))}
        
        {/* Fazla post varsa */}
        {posts.length > 3 && (
          <div className="text-xs text-gray-500 text-center font-medium">
            +{posts.length - 3} daha
          </div>
        )}
      </div>
    </div>
  )
}
