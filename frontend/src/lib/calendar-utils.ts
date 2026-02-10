import{
startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths
} from 'date-fns'
import { tr } from 'date-fns/locale'


export interface CalendarPost{
    id: number
    content: string
    scheduledAt: Date
    platforms: string[]
    status: 'scheduled' | 'published' | 'draft'
}


export function getCalendarDays(date: Date): Date[]{
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1})
    const calendarEnd = endOfWeek(monthEnd, {weekStartsOn: 1})
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd})

}


export function getPostsForDay(posts: CalendarPost[], day: Date): CalendarPost[]{
    return posts.filter(post => isSameDay(new Date(post.scheduledAt), day))
}

export function formatDate(date: Date, formatStr: string): string{
    return format(date, formatStr, {locale: tr})
}

export function isCurrentMonth(day: Date, currentMonth: Date): boolean {
    return isSameMonth(day,currentMonth)
}


export function nextMonth (date: Date): Date{
    return addMonths(date, 1)
}

export function previousMonth(date: Date): Date{
    return subMonths(date, 1)
}

export function isToday(date: Date): boolean{
    return isSameDay(date, new Date())
}

