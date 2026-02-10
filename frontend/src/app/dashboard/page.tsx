'use client'

import Link from 'next/link'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'
import { 
  Plus, 
  Calendar, 
  BarChart3,
  Twitter,
  Linkedin,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react'

const stats = [
  {
    label: 'Toplam Post',
    value: '24',
    change: '+12%',
    icon: FileText,
    color: 'blue'
  },
  {
    label: 'Zamanlanmış',
    value: '8',
    change: '+3',
    icon: Clock,
    color: 'purple'
  },
  {
    label: 'Yayınlandı',
    value: '16',
    change: '+5',
    icon: CheckCircle2,
    color: 'green'
  },
  {
    label: 'Platformlar',
    value: '2',
    change: 'Twitter, LinkedIn',
    icon: BarChart3,
    color: 'orange'
  }
]


const quickActions = [
  {
    title: 'Yeni Post Oluştur',
    description: 'Twitter ve LinkedIn için paylaşım',
    icon: Plus,
    href: '/dashboard/posts/new',
    color: 'blue'
  },
  {
    title: 'Takvimi Görüntüle',
    description: 'Planlanmış postları gör',
    icon: Calendar,
    href: '/dashboard/calendar',
    color: 'purple'
  },
  {
    title: 'Analytics',
    description: 'Performans raporları',
    icon: BarChart3,
    href: '/dashboard/analytics',
    color: 'green'
  }
]


const recentPosts = [
  {
    id: 1,
    content: 'Yeni blog yazımız yayında! 🚀 #webdev #coding',
    platform: 'twitter',
    status: 'published',
    date: '2 saat önce'
  },
  {
    id: 2,
    content: 'Ekip olarak harika bir proje geliştirdik...',
    platform: 'linkedin',
    status: 'scheduled',
    date: 'Yarın 10:00'
  },
  {
    id: 3,
    content: 'AutoPosting ile zaman kazanın! ⏰',
    platform: 'twitter',
    status: 'published',
    date: '1 gün önce'
  }
]

export default function DashboardPage() {
  return (
    <div className="p-8">
      
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-400">
          Sosyal medya aktivitelerinize genel bakış
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const colorClasses = {
            blue: 'bg-blue-600/10 text-blue-400',
            purple: 'bg-purple-600/10 text-purple-400',
            green: 'bg-green-600/10 text-green-400',
            orange: 'bg-orange-600/10 text-orange-400'
          }
          
          return (
            <Card key={index}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              
              <p className="text-sm text-gray-400 mb-2">
                {stat.label}
              </p>
              
              <p className="text-xs text-gray-500">
                {stat.change}
              </p>
            </Card>
          )
        })}
      </div>
      
  
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">
          Hızlı İşlemler
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            const colorClasses = {
              blue: 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20',
              purple: 'bg-purple-600/10 text-purple-400 hover:bg-purple-600/20',
              green: 'bg-green-600/10 text-green-400 hover:bg-green-600/20'
            }
            
            return (
              <Link key={index} href={action.href}>
                <Card hover className="cursor-pointer h-full">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[action.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
      

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            Son Paylaşımlar
          </h2>
          
          <Link href="/dashboard/posts">
            <Button variant="outline" size="sm">
              Tümünü Gör
            </Button>
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Card key={post.id}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  post.platform === 'twitter' 
                    ? 'bg-blue-500/10' 
                    : 'bg-blue-700/10'
                }`}>
                  {post.platform === 'twitter' ? (
                    <Twitter className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white mb-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-600/10 text-green-400'
                        : 'bg-orange-600/10 text-orange-400'
                    }`}>
                      {post.status === 'published' ? 'Yayınlandı' : 'Zamanlanmış'}
                    </span>
                    
                    <span className="text-gray-500">
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
    </div>
  )
}