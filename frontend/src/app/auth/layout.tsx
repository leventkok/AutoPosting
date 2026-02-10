import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode}){
    return (
        <div className="min-h-screen bg-gray-950 flex">
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>

            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-purple-600 items-center justify-center p-12">
                <div className="max-w-lg text-white">
                    <h2 className="text-4xl font-bold mb-6">
                        AutoPosting ile Sosyal Medyayı Yönetin
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Paylaşımlarını tek yerden planlayın ve otomatik yayınlayın.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Çoklu platform desteği",
                            'Akıllı zamanlama',
                            'Otomatik paylaşım',
                            'Detaylı analiz'
                        ].map((feature, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-sm">✓</span>
                                </div>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}