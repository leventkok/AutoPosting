'use client'

import { useState } from 'react'
import { CalendarHeader } from '@/components/dashboard/CalendarHeader'  // ✅ DÜZELTİLDİ
import { CalendarDay } from '@/components/dashboard/CalendarDay'
import { PostDetailModal } from '@/components/dashboard/PostDetailModal'
import {
  getCalendarDays,
  getPostsForDay,
  isCurrentMonth,
  isToday,
  nextMonth,
  previousMonth,
  CalendarPost
} from '@/lib/calendar-utils'

const mockPosts: CalendarPost[] = [
  {
    id: 1,
    content: 'Yeni blog yazımız yayında! Web geliştirme ipuçları 🚀',
    scheduledAt: new Date(2024, 0, 25, 10, 0),
    platforms: ['twitter', 'linkedin'],
    status: 'scheduled'
  },
  {
    id: 2,
    content: 'AutoPosting ile zaman kazanın! ⏰',
    scheduledAt: new Date(2024, 0, 25, 14, 30),
    platforms: ['twitter'],
    status: 'scheduled'
  },
  {
    id: 3,
    content: 'Hackathon projemiz tamamlandı! 💪',
    scheduledAt: new Date(2024, 0, 27, 9, 0),
    platforms: ['linkedin'],
    status: 'scheduled'
  },
  {
    id: 4,
    content: 'Python ve FastAPI ile modern web uygulamaları',
    scheduledAt: new Date(2024, 0, 28, 16, 0),
    platforms: ['twitter', 'linkedin'],
    status: 'scheduled'
  },
  {
    id: 5,
    content: 'Sosyal medya yönetimi artık çok kolay!',
    scheduledAt: new Date(2024, 0, 30, 11, 0),
    platforms: ['twitter'],
    status: 'scheduled'
  }
]

const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const calendarDays = getCalendarDays(currentDate)
  
  const handlePreviousMonth = () => {
    setCurrentDate(previousMonth(currentDate))
  }
  
  const handleNextMonth = () => {
    setCurrentDate(nextMonth(currentDate))
  }
  
  const handleToday = () => {
    setCurrentDate(new Date())
  }
  
  const handleDayClick = (day: Date) => {
    setSelectedDay(day)
    setIsModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDay(null)
  }
  
  const selectedDayPosts = selectedDay 
    ? getPostsForDay(mockPosts, selectedDay)
    : []
  
  return (
    <div className="p-8">
      
      <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />
      
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        
        <div className="grid grid-cols-7 bg-gray-800 border-b border-gray-700">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-semibold text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const dayPosts = getPostsForDay(mockPosts, day)
            
            return (
              <CalendarDay
                key={index}
                day={day}
                isCurrentMonth={isCurrentMonth(day, currentDate)}
                isToday={isToday(day)}
                posts={dayPosts}
                onClick={handleDayClick}
              />
            )
          })}
        </div>
        
      </div>
      
      <PostDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedDay={selectedDay}
        posts={selectedDayPosts}
      />
      
    </div>
  )
}