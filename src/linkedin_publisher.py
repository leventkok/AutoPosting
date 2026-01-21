import requests
import os
import time
from dotenv import load_dotenv

class LinkedInPublisher:
    def __init__(self):
        load_dotenv()
        self.access_token = os.getenv('LINKEDIN_ACCESS_TOKEN')
        self.api_version = "2.0.0"
        
        if not self.access_token:
            print("❌ LinkedIn Access Token bulunamadı! Lütfen .env dosyasını kontrol edin.")

    def get_user_info(self):
        """Kullanıcı Person URN bilgisini alır."""
        headers = {
            'Authorization': f'Bearer {self.access_token}',
            'Content-Type': 'application/json'
        }
        try:
            response = requests.get('https://api.linkedin.com/v2/userinfo', headers=headers)
            if response.status_code == 200:
                return response.json().get('sub')
            print(f"❌ Kullanıcı bilgisi alınamadı: {response.status_code}")
            return None
        except Exception as e:
            print(f"⚠️ Kimlik bilgisi çekilirken hata oluştu: {e}")
            return None

    # DÜZELTME BURADA YAPILDI: post_id parametresi eklendi
    def post_to_linkedin(self, content, post_id=None):
        """LinkedIn'e post atar - Akıllı Retry ve Token tabanlı"""
        if not self.access_token:
            return False

        # 1. İçerik Uzunluk Kontrolü
        if len(content) > 3000:
            print(f"❌ Hata: LinkedIn postu {len(content)} karakter. Sınır 3000!")
            return False

        # 2. Kullanıcı URN al
        person_urn = self.get_user_info()
        if not person_urn:
            return False

        url = 'https://api.linkedin.com/v2/ugcPosts'
        headers = {
            'Authorization': f'Bearer {self.access_token}',
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': self.api_version
        }

        post_data = {
            "author": f"urn:li:person:{person_urn}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {"text": content},
                    "shareMediaCategory": "NONE"
                }
            },
            "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
        }

        # 3. Akıllı Retry Mekanizması
        max_attempts = 3
        for attempt in range(1, max_attempts + 1):
            try:
                response = requests.post(url, headers=headers, json=post_data)
                
                if response.status_code == 201:
                    print(f"✅ LinkedIn postu başarıyla gönderildi! (Post ID: {post_id})")
                    return True
                
                # Rate Limit veya Geçici Hata Kontrolü
                elif response.status_code in [429, 500, 503]:
                    wait_time = 60 if response.status_code == 429 else 10
                    if attempt < max_attempts:
                        print(f"⏰ Hata {response.status_code}. {wait_time} sn sonra tekrar deneniyor... ({attempt}/{max_attempts})")
                        time.sleep(wait_time)
                    else:
                        print("❌ Tüm denemeler başarısız oldu.")
                else:
                    print(f"❌ LinkedIn API Hatası ({response.status_code}): {response.text}")
                    break

            except Exception as e:
                print(f"⚠️ Beklenmedik hata: {e}")
                time.sleep(5)
        
        return False

    def get_post_metrics(self, post_id):
        """LinkedIn post istatistiklerini getir (Şimdilik dummy)"""
        # Not: Gerçek API entegrasyonu için Organization API gerekebilir
        # Şimdilik hata vermemesi için boş dönüyoruz
        return None