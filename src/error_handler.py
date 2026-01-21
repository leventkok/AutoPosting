import logging
from datetime import datetime
import time
from functools import wraps

class ErrorHandler:
    def __init__(self):
        # Log dosyası ayarla
        import os
        if not os.path.exists('logs'):
            os.makedirs('logs')
        
        log_file = f"logs/scheduler_{datetime.now().strftime('%Y%m%d')}.log"
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file, encoding='utf-8'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def log_success(self, platform, post_id, content):
        """Başarılı post kaydı"""
        self.logger.info(f"✅ SUCCESS | {platform.upper()} | Post #{post_id} | {content[:50]}")
    
    def log_error(self, platform, post_id, error, content):
        """Hata kaydı"""
        self.logger.error(f"❌ ERROR | {platform.upper()} | Post #{post_id} | {error} | {content[:50]}")
    
    def log_retry(self, platform, post_id, attempt):
        """Tekrar deneme kaydı"""
        self.logger.warning(f"🔄 RETRY | {platform.upper()} | Post #{post_id} | Attempt {attempt}/3")
    
    def retry_on_failure(self, max_attempts=3, delay=30):
        """Decorator: Hata durumunda tekrar dene"""
        def decorator(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                for attempt in range(1, max_attempts + 1):
                    try:
                        return func(*args, **kwargs)
                    except Exception as e:
                        if attempt < max_attempts:
                            self.logger.warning(f"🔄 Attempt {attempt} failed: {e}. Retrying in {delay}s...")
                            time.sleep(delay)
                        else:
                            self.logger.error(f"❌ All {max_attempts} attempts failed: {e}")
                            raise
                return None
            return wrapper
        return decorator

# Kullanım
error_handler = ErrorHandler()
