"""
scheduler.py
============
Sosyal medya postlarını zamanında gönderen arka plan zamanlayıcısı.
Belirli aralıklarla bekleyen postları kontrol eder ve platforma göre gönderir.
"""

import time
import logging
from datetime import datetime

logger = logging.getLogger(__name__)


class PostScheduler:
    """
    Postların zamanında gönderilmesini sağlayan zamanlayıcı sınıfı.
    """
    
    def __init__(self, content_manager, twitter_publisher, linkedin_publisher=None):
        """
        Args:
            content_manager: ContentManager instance
            twitter_publisher: PostPublisher instance (Twitter)
            linkedin_publisher: LinkedInPublisher instance (opsiyonel)
        """
        self.cm = content_manager
        self.twitter = twitter_publisher
        self.linkedin = linkedin_publisher
        self.running = False
        self.check_interval = 30  # Saniye cinsinden kontrol aralığı
        
        logger.info("⏰ PostScheduler başlatıldı")
    
    def start(self):
        """Zamanlayıcıyı başlat"""
        self.running = True
        logger.info("✅ Zamanlayıcı çalışmaya başladı (Her %d saniyede kontrol)", self.check_interval)
        
        while self.running:
            try:
                self._check_and_send_posts()
            except Exception as e:
                logger.error(f"⚠️ Zamanlayıcı hatası: {e}")
            
            # Belirlenen süre kadar bekle
            time.sleep(self.check_interval)
    
    def stop(self):
        """Zamanlayıcıyı durdur"""
        self.running = False
        logger.info("🛑 Zamanlayıcı durduruldu")
    
    def _check_and_send_posts(self):
        """Bekleyen postları kontrol et ve gönder"""
        pending_posts = self.cm.get_pending_posts()
        
        if not pending_posts:
            return
        
        logger.info(f"📋 {len(pending_posts)} adet gönderilmeyi bekleyen post bulundu")
        
        for post in pending_posts:
            if not isinstance(post, dict):
                logger.warning(f"⚠️ Hatalı veri tipi: {post}")
                continue
            
            self._send_post(post)
    
    def _send_post(self, post):
        """
        Tek bir postu platforma göre gönder
        
        Args:
            post (dict): Gönderilecek post verisi
        """
        logger.info(f"🚀 Post gönderiliyor: {post['content'][:50]}...")
        
        success = False
        api_id = None
        
        # Platforma göre gönder
        if post['platform'] == 'Twitter':
            success, api_id = self._send_to_twitter(post)
        
        elif post['platform'] == 'LinkedIn':
            if self.linkedin:
                success, api_id = self._send_to_linkedin(post)
            else:
                logger.warning("⚠️ LinkedIn publisher yapılandırılmamış")
                return
        
        else:
            logger.error(f"❌ Bilinmeyen platform: {post['platform']}")
            return
        
        # Gönderim sonucunu kaydet
        if success and api_id:
            self.cm.update_post_after_send(post['id'], api_id, status="sent")
            logger.info(f"✅ {post['platform']} postu başarıyla gönderildi (ID: {api_id})")
        else:
            self.cm.update_post_after_send(post['id'], None, status="failed")
            logger.error(f"❌ {post['platform']} gönderimi başarısız")
    
    def _send_to_twitter(self, post):
        """
        Twitter'a post gönder
        
        Returns:
            tuple: (success: bool, api_id: str)
        """
        try:
            result = self.twitter.post_to_twitter(post['content'], post['id'])
            if result:
                return True, str(result)
            return False, None
        except Exception as e:
            logger.error(f"Twitter gönderim hatası: {e}")
            return False, None
    
    def _send_to_linkedin(self, post):
        """
        LinkedIn'e post gönder
        
        Returns:
            tuple: (success: bool, api_id: str)
        """
        try:
            result = self.linkedin.post_to_linkedin(post['content'], post['id'])
            if result:
                # LinkedIn'den gerçek ID gelmezse timestamp kullan
                api_id = str(result) if isinstance(result, str) else f"LI-{int(time.time())}"
                return True, api_id
            return False, None
        except Exception as e:
            logger.error(f"LinkedIn gönderim hatası: {e}")
            return False, None


class PerformanceTracker:
    """
    Gönderilmiş postların performansını takip eden sınıf.
    Belirli aralıklarla metrics günceller.
    """
    
    def __init__(self, content_manager, twitter_publisher, linkedin_publisher=None):
        """
        Args:
            content_manager: ContentManager instance
            twitter_publisher: PostPublisher instance
            linkedin_publisher: LinkedInPublisher instance (opsiyonel)
        """
        self.cm = content_manager
        self.twitter = twitter_publisher
        self.linkedin = linkedin_publisher
        self.running = False
        self.check_interval = 600  # 10 dakika
        self.initial_delay = 60  # İlk başlangıçta 60 saniye bekle
        
        logger.info("📊 PerformanceTracker başlatıldı")
    
    def start(self):
        """Performans takipçisini başlat"""
        self.running = True
        logger.info(f"✅ Performans takipçisi başladı (Her {self.check_interval//60} dakikada kontrol)")
        
        # İlk başlangıçta biraz bekle
        time.sleep(self.initial_delay)
        
        while self.running:
            try:
                self._update_metrics()
            except Exception as e:
                logger.error(f"⚠️ Performans güncelleme hatası: {e}")
            
            time.sleep(self.check_interval)
    
    def stop(self):
        """Performans takipçisini durdur"""
        self.running = False
        logger.info("🛑 Performans takipçisi durduruldu")
    
    def _update_metrics(self):
        """Gönderilmiş postların metriklerini güncelle"""
        all_posts = self.cm.get_all_posts()
        sent_posts = [
            p for p in all_posts
            if isinstance(p, dict)
            and p.get('status') == 'sent'
            and p.get('api_post_id')
        ]
        
        if not sent_posts:
            logger.info("📊 Güncellenecek metrik yok")
            return
        
        logger.info(f"📊 {len(sent_posts)} adet post için metrikler güncelleniyor...")
        
        for post in sent_posts:
            try:
                metrics = None
                
                if post['platform'] == 'Twitter':
                    metrics = self.twitter.get_post_metrics(post['api_post_id'])
                elif post['platform'] == 'LinkedIn' and self.linkedin:
                    metrics = self.linkedin.get_post_metrics(post['api_post_id'])
                
                if metrics:
                    self.cm.update_metrics(post['id'], metrics)
                    logger.info(
                        f"✅ Post #{post['id']}: "
                        f"❤️ {metrics.get('likes', 0)} | "
                        f"🔁 {metrics.get('shares', 0)}"
                    )
                else:
                    logger.debug(f"⚠️ Post #{post['id']} için metrik alınamadı")
                    
            except Exception as e:
                logger.error(f"⚠️ Post #{post['id']} metrik hatası: {e}")
        
        logger.info("✅ Metrik güncelleme tamamlandı")


# Test
if __name__ == "__main__":
    from src.content_manager import ContentManager
    from src.post_publisher import PostPublisher
    
    logging.basicConfig(level=logging.INFO)
    
    cm = ContentManager()
    twitter = PostPublisher()
    
    # Zamanlayıcıyı test et
    scheduler = PostScheduler(cm, twitter)
    
    print("📋 Bekleyen postlar:", len(cm.get_pending_posts()))
    print("⏰ Zamanlayıcı test modu (10 saniye çalışacak)...")
    
    import threading
    thread = threading.Thread(target=scheduler.start, daemon=True)
    thread.start()
    
    time.sleep(10)
    scheduler.stop()
    print("✅ Test tamamlandı!")
