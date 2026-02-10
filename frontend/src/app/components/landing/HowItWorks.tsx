import { Container } from '@/app/components/ui/Container'
import { FileEdit, Calendar, Send } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: FileEdit,
    title: 'İçeriği Oluştur',
    description: 'Post içeriğinizi yazın, görsel ekleyin, mention\'lar ile etiketleyin.'
  },
  {
    number: '2',
    icon: Calendar,
    title: 'Zamanla',
    description: 'Paylaşım tarihini ve saatini belirleyin. Takvim görünümünde planlayın.'
  },
  {
    number: '3',
    icon: Send,
    title: 'Otomatik Paylaş',
    description: 'Sistem belirlediğiniz zamanda otomatik olarak tüm platformlarda paylaşır.'
  }
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-900">
      <Container>
        
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-xl text-gray-400">
            3 basit adımda sosyal medya yönetimi
          </p>
        </div>
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            
            return (
              <div key={index} className="relative">
                
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-600 to-transparent" />
                )}
                
        
                <div className="relative w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Icon className="w-10 h-10 text-white" />
                  
                  
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gray-950 border-2 border-blue-600 flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-sm">
                      {step.number}
                    </span>
                  </div>
                </div>
                
            
                <h3 className="text-2xl font-bold text-white text-center mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 text-center">
                  {step.description}
                </p>
                
              </div>
            )
          })}
        </div>
        
      </Container>
    </section>
  )
}