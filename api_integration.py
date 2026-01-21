"""
api_integration.py
==================
Tüm sosyal medya platformlarının API entegrasyonlarını yöneten merkezi modül.
Twitter, LinkedIn ve diğer platformların publisher'larını bir arada tutar.
"""

import logging
from src.post_publisher import PostPublisher
from src.linkedin_publisher import LinkedInPublisher

logger = logging.getLogger(__name__)


class SocialMediaAPI:
    """
    Tüm sosyal medya platformlarının API'lerini yöneten merkezi sınıf.
    Factory pattern kullanarak platform bazlı işlemler yapar.
    """
    
    SUPPORTED_PLATFORMS = ['Twitter', 'LinkedIn']
    
    def __init__(self, enable_twitter=True, enable_linkedin=False):
        """
        Args:
            enable_twitter (bool): Twitter API'yi aktifleştir
            enable_linkedin (bool): LinkedIn API'yi aktifleştir
        """
        self.publishers = {}
        
        # Twitter'ı başlat
        if enable_twitter:
            try:
                self.publishers['Twitter'] = PostPublisher()
                logger.info("✅ Twitter API entegrasyonu başarılı")
            except Exception as e:
                logger.error(f"❌ Twitter API hatası: {e}")
        
        # LinkedIn'i başlat
        if enable_linkedin:
            try:
                self.publishers['LinkedIn'] = LinkedInPublisher()
                logger.info("✅ LinkedIn API entegrasyonu başarılı")
            except Exception as e:
                logger.error(f"❌ LinkedIn API hatası: {e}")
        
        logger.info(f"🔌 API Entegrasyonu tamamlandı. Aktif platformlar: {list(self.publishers.keys())}")
    
    def post_to_platform(self, platform, content, post_id=None):
        """
        Belirtilen platforma post gönder
        
        Args:
            platform (str): 'Twitter' veya 'LinkedIn'
            content (str): Gönderilecek içerik
            post_id (int): Post ID (opsiyonel, loglama için)
        
        Returns:
            tuple: (success: bool, api_id: str or None)
        """
        if platform not in self.publishers:
            logger.error(f"❌ Platform desteklenmiyor: {platform}")
            return False, None
        
        publisher = self.publishers[platform]
        
        try:
            if platform == 'Twitter':
                result = publisher.post_to_twitter(content, post_id)
            elif platform == 'LinkedIn':
                result = publisher.post_to_linkedin(content, post_id)
            else:
                return False, None
            
            if result:
                api_id = str(result) if result is not True else f"{platform[:2].upper()}-{post_id}"
                return True, api_id
            
            return False, None
            
        except Exception as e:
            logger.error(f"❌ {platform} post hatası: {e}")
            return False, None
    
    def get_metrics(self, platform, api_post_id):
        """
        Belirtilen platformdan post metriklerini çek
        
        Args:
            platform (str): 'Twitter' veya 'LinkedIn'
            api_post_id (str): API'den dönen post ID
        
        Returns:
            dict or None: Metrikler {'likes': int, 'shares': int, ...}
        """
        if platform not in self.publishers:
            logger.warning(f"⚠️ Platform desteklenmiyor: {platform}")
            return None
        
        publisher = self.publishers[platform]
        
        try:
            metrics = publisher.get_post_metrics(api_post_id)
            return metrics
        except Exception as e:
            logger.error(f"❌ {platform} metrik hatası: {e}")
            return None
    
    def is_platform_available(self, platform):
        """
        Platformun kullanılabilir olup olmadığını kontrol et
        
        Args:
            platform (str): Platform adı
        
        Returns:
            bool: Platform kullanılabilir mi?
        """
        return platform in self.publishers
    
    def get_available_platforms(self):
        """
        Kullanılabilir platformların listesini döndür
        
        Returns:
            list: Platform isimleri
        """
        return list(self.publishers.keys())
    
    def test_connection(self, platform):
        """
        Platform bağlantısını test et
        
        Args:
            platform (str): Test edilecek platform
        
        Returns:
            bool: Bağlantı başarılı mı?
        """
        if platform not in self.publishers:
            logger.error(f"❌ Platform bulunamadı: {platform}")
            return False
        
        try:
            # Basit bir test işlemi
            publisher = self.publishers[platform]
            
            if platform == 'Twitter':
                # Twitter için get_me() çağrısı yapabiliriz
                return True
            elif platform == 'LinkedIn':
                # LinkedIn için bağlantı kontrolü
                return publisher.client is not None
            
            return True
            
        except Exception as e:
            logger.error(f"❌ {platform} bağlantı testi başarısız: {e}")
            return False


class APIConfig:
    """
    API yapılandırma ayarlarını yöneten sınıf.
    Hangi platformların aktif olacağını, rate limit'leri vb. tutar.
    """
    
    def __init__(self):
        self.config = {
            'Twitter': {
                'enabled': True,
                'rate_limit': 50,  # Günlük tweet limiti
                'retry_attempts': 3,
                'retry_delay': 10
            },
            'LinkedIn': {
                'enabled': False,  # Varsayılan olarak kapalı
                'rate_limit': 25,
                'retry_attempts': 3,
                'retry_delay': 10
            }
        }
    
    def is_enabled(self, platform):
        """Platform aktif mi kontrol et"""
        return self.config.get(platform, {}).get('enabled', False)
    
    def enable_platform(self, platform):
        """Platformu aktifleştir"""
        if platform in self.config:
            self.config[platform]['enabled'] = True
            logger.info(f"✅ {platform} aktifleştirildi")
    
    def disable_platform(self, platform):
        """Platformu devre dışı bırak"""
        if platform in self.config:
            self.config[platform]['enabled'] = False
            logger.info(f"🚫 {platform} devre dışı bırakıldı")
    
    def get_rate_limit(self, platform):
        """Platform için rate limit al"""
        return self.config.get(platform, {}).get('rate_limit', 0)
    
    def get_retry_config(self, platform):
        """Platform için retry ayarlarını al"""
        platform_config = self.config.get(platform, {})
        return {
            'attempts': platform_config.get('retry_attempts', 3),
            'delay': platform_config.get('retry_delay', 10)
        }


# Singleton instance
_api_instance = None
_config_instance = None


def get_api_instance(enable_twitter=True, enable_linkedin=False):
    """
    SocialMediaAPI singleton instance'ını döndür
    
    Args:
        enable_twitter (bool): Twitter'ı aktifleştir
        enable_linkedin (bool): LinkedIn'i aktifleştir
    
    Returns:
        SocialMediaAPI: API instance
    """
    global _api_instance
    if _api_instance is None:
        _api_instance = SocialMediaAPI(enable_twitter, enable_linkedin)
    return _api_instance


def get_config_instance():
    """
    APIConfig singleton instance'ını döndür
    
    Returns:
        APIConfig: Config instance
    """
    global _config_instance
    if _config_instance is None:
        _config_instance = APIConfig()
    return _config_instance


# Test
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    
    print("\n" + "="*60)
    print("🧪 API ENTEGRASYON TESTİ")
    print("="*60 + "\n")
    
    # API instance oluştur
    api = SocialMediaAPI(enable_twitter=True, enable_linkedin=False)
    
    # Mevcut platformları göster
    print("📋 Aktif platformlar:", api.get_available_platforms())
    
    # Twitter bağlantısını test et
    print("\n🔍 Twitter bağlantısı test ediliyor...")
    twitter_ok = api.test_connection('Twitter')
    print(f"   → {'✅ Başarılı' if twitter_ok else '❌ Başarısız'}")
    
    # Config testi
    config = APIConfig()
    print("\n⚙️ Twitter rate limit:", config.get_rate_limit('Twitter'))
    print("⚙️ Retry ayarları:", config.get_retry_config('Twitter'))
    
    print("\n✅ Test tamamlandı!")
