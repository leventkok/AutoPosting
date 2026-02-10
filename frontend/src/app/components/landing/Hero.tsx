'use client'  

import { Button } from '@/app/components/ui/Button'
import { Container } from '@/app/components/ui/Container'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      
   
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
   
      <Container className="relative z-10 text-center">
        
 
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">72 Saatlik Hackathon Projesi</span>
        </div>


           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Sosyal Medyayı
          <span className="block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Otomatikleştirin
          </span>
        </h1>
        
 
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Twitter ve LinkedIn paylaşımlarınızı tek bir yerden planlayın, 
          zamanında otomatik yayınlayın. Zaman kazanın, etkinizi artırın.
        </p>
        
    
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="primary" 
            size="lg"
            className='flex items-center'
            onClick={() => window.location.href = '/login'}
          >
            Hemen Başla
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button variant="outline" size="lg">
            Demo İzle
          </Button>
        </div>
        

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <div className="text-4xl font-bold text-white mb-2">2+</div>
            <div className="text-gray-400">Platform</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">7/24</div>
            <div className="text-gray-400">Otomatik</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">∞</div>
            <div className="text-gray-400">Post Limiti</div>
          </div>
        </div>
        
      </Container>
    </section>
  )
}