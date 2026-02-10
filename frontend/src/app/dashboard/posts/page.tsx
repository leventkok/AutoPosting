'use client'

import Link from "next/link"
import { Card } from "@/app/components/ui/Card"
import { Button } from "@/app/components/ui/Button"
import {Plus, Twitter, Linkedin, MoreVertical, Edit, Trash2} from 'lucide-react'
import { useState } from "react"


const mockPosts = [
  {
    id: 1,
    content: 'Yeni blog yazımız yayında! Web geliştirme ipuçları ve best practice\'ler 🚀 #webdev #coding',
    platforms: ['twitter', 'linkedin'],
    status: 'published',
    publishedAt: '2024-01-23T14:30:00',
    stats: {
      views: 1250,
      likes: 45,
      comments: 12
    }
  },
  {
    id: 2,
    content: 'AutoPosting ile sosyal medya yönetimi artık çok kolay! Zamanınızı en iyi şekilde kullanın ⏰',
    platforms: ['twitter'],
    status: 'scheduled',
    scheduledAt: '2024-01-25T10:00:00'
  },
  {
    id: 3,
    content: 'Ekip olarak harika bir Hackathon projesi geliştirdik. 72 saatte neler yapılabilir görmek inanılmazdı! 💪',
    platforms: ['linkedin'],
    status: 'published',
    publishedAt: '2024-01-22T09:15:00',
    stats: {
      views: 3450,
      likes: 127,
      comments: 34
    }
  },
  {
    id: 4,
    content: 'Python ve FastAPI ile modern web uygulamaları geliştiriyoruz. Sizin favori stack\'iniz nedir? 🐍',
    platforms: ['twitter', 'linkedin'],
    status: 'draft'
  }
]


export default function PostsPage(){
    const [filter, setFilter] = useState<'all' | 'published' | 'scheduled' | 'draft'>('all')


    const filteredPosts = filter == 'all' ? mockPosts : mockPosts.filter(post => post.status === filter)

    return(
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Postlar
                    </h1>
                    <p className="text-gray-400">
                        Tüm paylaşımlarınızı yönetin
                    </p>
                </div>

                <Link href="/dashboard/posts/new">
                    <Button variant="primary" size="lg">
                        <div className="flex items-center gap-2">
                            <Plus className="w-5 h-5"/>
                            Yeni Gönderi
                        </div>
                    </Button>
                </Link>
            </div>

            <div className="flex gap-2 mb-6">
        {(['all', 'published', 'scheduled', 'draft'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${filter === status 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }
            `}
          >
            {status === `all` ? "Tümü" : status === 'published' ? 'Yayınlanmış':status === 'scheduled' ? 'Zamanlanmış' : 'Task'}
            </button>
        ))}
        </div>
        <div className="space-y-4">
            {filteredPosts.map((post) => (
                <Card key={post.id}>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <p className="text-white mb-3">
                                {post.content}
                            </p>
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex gap-2">
                                    {post.platforms.includes('twitter') && (
                                        <div className="px-2 py-1 bg-blue-500/10 rounded flex items-center gap-1">
                                            <Twitter className="w-3 h-3 text-blue-400"/>
                                            <span className="text-xs text-blue-400">Twitter</span>
                                        </div>
                                    )}
                                    {post.platforms.includes('linkedin') && (
                                        <div className="px-2 py-1 bg-blue-700/10 rounded flex items-center gap-1">
                                            <Linkedin className="w-3 h-3 text-blue-600"/>
                                            <span className="text-xs text-blue-600">LinkedIn</span>
                                        </div>
                                    )}
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${post.status === 'published' ? 'bg-green-600/10 text-green-400' : post.status === 'scheduled' ? 'bg-orange-600/10 text-orange-400' : 'bg-gray-600/10 text-gray-400'}`}>
                                    {post.status === 'published' ? 'Yayınlandı' : post.status === 'scheduled' ? 'Zamanlanmış' : 'Taslak'}
                                </span>

                                <span className="text-sm text-gray-500">
                                    {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                                    {post.scheduledAt && new Date(post.scheduledAt).toLocaleDateString('tr-TR')}
                                </span>

                                {post.stats && (
                                    <div className="flex gap-4 text-sm text-gray-400">
                                        <span>{post.stats.views} Görüntüleme</span>
                                        <span>{post.stats.likes} Beğeni</span>
                                        <span>{post.stats.comments} Yorum</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-gray-400"/>
                            </button>
                            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4 text-red-400"/>
                            </button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
        {filteredPosts.length === 0 && (
            <div className="text-center py-12">
                <p className="text-gray-400 mb-4">
                    Bu kategoride gönderi bulunmadı
                </p>
                <Link href="/dashboard/posts/new">
                    <Button variant="primary">
                        İlk Postunuzu Oluşturun
                    </Button>
                </Link>
            </div>
        )}
    </div>
    )
}