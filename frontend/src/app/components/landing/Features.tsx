
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import {Calendar, Clock, Zap, Users, icons} from 'lucide-react'
import { title } from "process";



const features = [
    {
        icon: Calendar,
        title: 'Akıllı Zamanlama',
        description: 'Gönderilerinizi istediğiniz tarih ve saate planalyın. Sistem otamatik paylaşsın.'
    },
    {
        icon: Clock, 
        title: 'Zaman Tasarrufu',
        description: 'Tek tıkla platformlar arası paylaşım.'
    },
    {
        icon: Zap,
        title: 'Hızlı & Güvenilir',
        description: 'Python & FastAPI ile geliştirilmiş yüksek performanslı mimari.'
    },
    {
        icon: Users,
        title: 'Çoklu Platform',
        description: 'Twitter & LinkedIn desteği. Daha fazlası yakında!'
    }
]

export function Features(){
    return (
        <section className="py-24 bg-gray-950">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Neden AutoPosting?
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Sosyal medya yönetiminizi bir sonraki seviyeye taşıyacak özellikler
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                     {features.map((feature, index) => {
                        const Icon = feature.icon
                        return(
                            <Card key={index} hover>
                                <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-blue-400"/>
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400">
                                    {feature.description}
                                </p>
                            </Card>
                        )
                        })}

                </div>
            </Container>
        </section>
    )
}