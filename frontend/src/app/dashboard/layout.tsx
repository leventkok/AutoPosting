'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, getCurrentUser } from "@/lib/auth"
import { Sidebar } from "../components/dashboard/Sidebar"


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}){
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        if(!isAuthenticated()){
            router.push('/login')
        }else{
            setUser(getCurrentUser())
            setIsLoading(false)
        }
    }, [router])

    if(isLoading){
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4">
                        <p className="text-gray-400">Yükleniyor...</p>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-gray-950 flex">
            <Sidebar/>

            <div className="flex-1 flex flex-col">
                <header className="bg-gray-900 border-b border-gray-800 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                Hoş Geldiniz, {user?.name}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {user?.email}
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-semibold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}