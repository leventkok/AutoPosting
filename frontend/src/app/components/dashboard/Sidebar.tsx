'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    LayoutDashboard,
    FileText,
    Calendar,
    BarChart3,
    Settings,
    LogOut
} from 'lucide-react'

import { mockLogout } from "@/lib/auth"


const menuItems = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard'
    },
    {
        label: 'Postlar',
        icon: FileText,
        href: '/dashboard/posts'
    },
    {
        label: 'Takvim',
        icon: Calendar,
        href: '/dashboard/calendar'
    },
    {
        label: 'Analytics',
        icon: BarChart3,
        href: '/dashboard/analytics'
    },
    {
        label: 'Ayarlar',
        icon: Settings,
        href: '/dashboard/settings'
    }
]


export function Sidebar(){
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        mockLogout()
        router.push('/login')
    }

    return(
        <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
            {/* Logo gelecek */}

            <div className="p-6 border-b border-gray-800">
                <h1 className="text-xl font-bold text-white">
                    AutoPosting
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                    Socail Media Manager
                </p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname == item.href

                    return(
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                                    ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                                `}
                        >
                            <Icon className="w-5 h-5"/>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200"
                >
                    <LogOut className="w-5 h-5"/>
                    <span className="font-medium">Çıkış yap</span>
                </button>
            </div>

        </aside>
        
    )
}