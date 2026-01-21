import tweepy
from dotenv import load_dotenv
import os
import time
from src.error_handler import error_handler

class PostPublisher:
    def __init__(self):
        load_dotenv()
        # Twitter client oluştur
        self.twitter_client = tweepy.Client(
            consumer_key=os.getenv('TWITTER_API_KEY'),
            consumer_secret=os.getenv('TWITTER_API_SECRET'),
            access_token=os.getenv('TWITTER_ACCESS_TOKEN'),
            access_token_secret=os.getenv('TWITTER_ACCESS_SECRET')
        )
        
        # Twitter API erişim seviyesini kontrol et
        self.check_api_access()
    
    def check_api_access(self):
        """Twitter API erişim seviyesini kontrol eder"""
        try:
            # Basit bir API çağrısı yaparak yetkileri test et
            me = self.twitter_client.get_me()
            if me.data:
                print(f"✅ Twitter bağlantısı başarılı! (@{me.data.username})")
            else:
                print("⚠️ Twitter kullanıcı bilgisi alınamadı.")
        except Exception as e:
            print(f"⚠️ Twitter API bağlantı hatası: {e}")
    
    def post_to_twitter(self, content, post_id=None):
        """Twitter'a tweet at - akıllı retry ile"""
        max_attempts = 3
        for attempt in range(1, max_attempts + 1):
            try:
                # İçerik kontrolü - kalıcı hata, retry yok
                if len(content) > 280:
                    error = "Tweet 280 karakterden uzun!"
                    error_handler.log_error('twitter', post_id, error, content)
                    print(f"❌ {error}")
                    print(f"💡 Tweet uzunluğu: {len(content)} karakter")
                    return False
                
                # Tweet at
                response = self.twitter_client.create_tweet(text=content)
                tweet_id = response.data['id']
                
                # Tweet URL'sini oluştur
                me = self.twitter_client.get_me()
                username = me.data.username if me.data else "twitter"
                tweet_url = f"https://twitter.com/{username}/status/{tweet_id}"
                
                # Başarılı
                error_handler.log_success('twitter', post_id, content)
                print(f"✅ Tweet başarıyla gönderildi!")
                print(f"Tweet ID: {tweet_id}")
                print(f"🔗 Tweet URL: {tweet_url}")
                return tweet_id
                
            except tweepy.TooManyRequests as e:
                error = "Rate limit aşıldı"
                error_handler.log_error('twitter', post_id, error, content)
                if attempt < max_attempts:
                    wait_time = 60
                    print(f"⏰ Rate limit! {wait_time} saniye bekleniyor...")
                    error_handler.log_retry('twitter', post_id, attempt)
                    time.sleep(wait_time)
                else:
                    print(f"❌ Rate limit devam ediyor, vazgeçildi.")
                    return False
                    
            except tweepy.Forbidden as e:
                error = f"Yetki hatası: {str(e)}"
                error_handler.log_error('twitter', post_id, error, content)
                print(f"❌ {error}")
                return False
                
            except tweepy.BadRequest as e:
                error = f"Geçersiz istek: {str(e)}"
                error_handler.log_error('twitter', post_id, error, content)
                print(f"❌ {error}")
                return False
                
            except Exception as e:
                error = str(e)
                error_handler.log_error('twitter', post_id, error, content)
                if attempt < max_attempts:
                    wait_time = 10
                    print(f"🔄 Hata: {error}")
                    print(f"⏰ {wait_time} saniye sonra tekrar denenecek... (Deneme {attempt}/{max_attempts})")
                    error_handler.log_retry('twitter', post_id, attempt)
                    time.sleep(wait_time)
                else:
                    print(f"❌ Tüm denemeler başarısız!")
                    return False
        
        return False
    
    def get_post_metrics(self, tweet_id):
        """
        Tweet ID kullanarak beğeni ve retweet sayılarını getirir.
        Not: Bu özellik Twitter API v2 Elevated Access gerektirir.
        Free tier için metrics çekilemeyebilir.
        """
        try:
            response = self.twitter_client.get_tweet(
                id=tweet_id,
                tweet_fields=['public_metrics']
            )
            
            if response.data:
                metrics = response.data.public_metrics
                
                return {
                    "likes": metrics.get('like_count', 0),
                    "shares": metrics.get('retweet_count', 0),
                    "replies": metrics.get('reply_count', 0),
                    "impressions": metrics.get('impression_count', 0)
                }
            
            return None
            
        except tweepy.Forbidden as e:
            # Yetki hatası - Free tier için normaldir
            print(f"⚠️ Twitter metrik erişimi yok (Free tier için normal)")
            print(f"💡 Metrics için Twitter API Elevated Access gerekiyor")
            return None
            
        except tweepy.Unauthorized as e:
            # 401 hatası - OAuth sorunu
            print(f"⚠️ Twitter metrics için yetkilendirme hatası")
            print(f"💡 Tweet atma çalışıyor ama metrics okuma yetkisi yok")
            return None
            
        except Exception as e:
            print(f"⚠️ Twitter metrik hatası: {e}")
            return None


# Test
if __name__ == "__main__":
    publisher = PostPublisher()
    
    # Kısa tweet - başarılı olmalı
    test_tweet_1 = "🤖 Bu kısa bir test tweet! #Python"
    print("📤 Test 1: Kısa tweet gönderiliyor...")
    result = publisher.post_to_twitter(test_tweet_1)
    print(f"Sonuç: {result}")
