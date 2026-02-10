import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/calendar-utils'
import { Button } from '@/app/components/ui/Button'

interface CalendarHeaderProps {
  currentDate: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
  onToday: () => void
}

export function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday
}: CalendarHeaderProps) {
  
  return (
    <div className="flex items-center justify-between mb-6">
      
      <div>
        <h2 className="text-2xl font-bold text-white">
          {formatDate(currentDate, 'MMMM yyyy')}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Zamanlanmış paylaşımlarınız
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToday}
        >
          Bugün
        </Button>
        
        <button
          onClick={onPreviousMonth}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>
        
        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      
    </div>
  )
}