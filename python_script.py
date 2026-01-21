"""
python_script.py
================
Sosyal Medya Zamanlayıcı - Ana Çalıştırma Scripti
Tüm modülleri başlatır ve koordine eder.
"""

import threading
import logging
import uvicorn
import sys
import signal

# Kendi modüllerimiz
from app import app
from src.content_manager import ContentManager
from api_integration import SocialMediaAPI
from scheduler import PostScheduler, PerformanceTracker

# Logging yapılandırması
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/app.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class SocialMediaAutomation:
    """
    Sosyal medya otomasyonunu yöneten ana sınıf.
    Tüm servisleri başlatır, durdurur ve koordine eder.
    """
    
    def __init__(self):
        logger.info("🚀 Sosyal Medya Otomasyonu Başlatılıyor...")
        
        # Servisler
        self.content_manager = ContentManager()
        self.api = SocialMediaAPI(enable_twitter=True, enable_linkedin=True)
        
        # Twitter publisher'ı al (api_integration'dan)
        self.twitter = self.api.publishers.get('Twitter')
        self.linkedin = self.api.publishers.get('LinkedIn')
        
        # Zamanlayıcılar
        self.post_scheduler = PostScheduler(
            self.content_manager,
            self.twitter,
            self.linkedin
        )
        
        self.performance_tracker = PerformanceTracker(
            self.content_manager,
            self.twitter,
            self.linkedin
        )
        
        # Thread'ler
        self.scheduler_thread = None
        self.metrics_thread = None
        self.running = False
        
        logger.info("✅ Servisler başarıyla yüklendi")
    
    def start(self):
        """Tüm servisleri başlat"""
        self.running = True
        
        # 1. Post Zamanlayıcısı Thread
        self.scheduler_thread = threading.Thread(
            target=self.post_scheduler.start,
            daemon=True,
            name="PostScheduler"
        )
        self.scheduler_thread.start()
        logger.info("✅ Post zamanlayıcısı başlatıldı")
        
        # 2. Performans Takipçisi Thread
        self.metrics_thread = threading.Thread(
            target=self.performance_tracker.start,
            daemon=True,
            name="PerformanceTracker"
        )
        self.metrics_thread.start()
        logger.info("✅ Performans takipçisi başlatıldı")
        
        # 3. Web Dashboard
        self._start_web_server()
    
    def _start_web_server(self):
        """Web dashboard'ı başlat"""
        logger.info("🌐 Web Dashboard başlatılıyor...")
        
        print("\n" + "="*70)
        print("🎉 SOSYAL MEDYA ZAMANLAYICI ÇALIŞIYOR!")
        print("="*70)
        print(f"📊 Dashboard: http://127.0.0.1:8000")
        print(f"📋 Aktif Platformlar: {', '.join(self.api.get_available_platforms())}")
        print(f"💾 Veri Dosyası: {self.content_manager.db_path}")
        print(f"📝 Log Dosyası: logs/app.log")
        print("="*70)
        print("💡 Durdurmak için: Ctrl+C")
        print("="*70 + "\n")
        
        # FastAPI/Uvicorn başlat
        uvicorn.run(
            app,
            host="127.0.0.1",
            port=8000,
            log_level="info"
        )
    
    def stop(self):
        """Tüm servisleri durdur"""
        logger.info("🛑 Servisler durduruluyor...")
        
        self.running = False
        
        if self.post_scheduler:
            self.post_scheduler.stop()
        
        if self.performance_tracker:
            self.performance_tracker.stop()
        
        logger.info("✅ Tüm servisler durduruldu")


def signal_handler(sig, frame):
    """Ctrl+C ile güvenli kapatma"""
    print("\n\n⚠️ Kapatma sinyali alındı...")
    sys.exit(0)


def main():
    """Ana fonksiyon"""
    # Ctrl+C handler
    signal.signal(signal.SIGINT, signal_handler)
    
    try:
        # Uygulamayı başlat
        app_instance = SocialMediaAutomation()
        app_instance.start()
        
    except KeyboardInterrupt:
        logger.info("\n⚠️ Kullanıcı tarafından durduruldu")
        
    except Exception as e:
        logger.error(f"❌ Kritik hata: {e}", exc_info=True)
        sys.exit(1)
    
    finally:
        logger.info("👋 Uygulama kapatılıyor...")


if __name__ == "__main__":
    # Banner
    print("""
    ╔════════════════════════════════════════════════════════╗
    ║                                                        ║
    ║       🤖 SOSYAL MEDYA ZAMANLAYICI v1.0                ║
    ║                                                        ║
    ║       Otomatik Post Gönderimi & Performans Takibi     ║
    ║                                                        ║
    ╚════════════════════════════════════════════════════════╝
    """)
    
    main()
