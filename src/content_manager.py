import json
import os
from datetime import datetime

class ContentManager:
    def __init__(self):
        # Dosya yolunu proje kök dizinine göre ayarlıyoruz
        self.db_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'posts.json')
        self._ensure_db_exists()

    def _ensure_db_exists(self):
        """Dosya yoksa veya boşsa başlatır."""
        # data klasörünü oluştur
        data_dir = os.path.dirname(self.db_path)
        if not os.path.exists(data_dir):
            os.makedirs(data_dir)
            print(f"📁 '{data_dir}' klasörü oluşturuldu.")
        
        # posts.json dosyasını oluştur
        if not os.path.exists(self.db_path) or os.path.getsize(self.db_path) == 0:
            with open(self.db_path, 'w', encoding='utf-8') as f:
                json.dump([], f)
            print(f"📄 '{self.db_path}' dosyası oluşturuldu.")

    def get_all_posts(self):
        """Tüm postları listeler."""
        try:
            with open(self.db_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except json.JSONDecodeError:
            print("⚠️ posts.json bozuk, sıfırlanıyor...")
            return []

    def add_post(self, content, platform, schedule_time):
        """Yeni bir postu 'pending' (beklemede) olarak ekler."""
        posts = self.get_all_posts()
        
        new_post = {
            "id": len(posts) + 1,
            "content": content,
            "platform": platform,  # 'Twitter' veya 'LinkedIn'
            "schedule_time": schedule_time,  # 'YYYY-MM-DD HH:MM' formatında
            "status": "pending",
            "api_post_id": None,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "metrics": {
                "likes": 0,
                "shares": 0,  # Twitter için retweets, LinkedIn için shares
                "replies": 0,
                "impressions": 0
            }
        }
        
        posts.append(new_post)
        self._save_all(posts)
        print(f"✅ Post başarıyla kaydedildi! (ID: {new_post['id']})")
        return new_post

    def get_pending_posts(self):
        """Zamanı gelmiş ve gönderilmeyi bekleyen postları getirir."""
        now = datetime.now().strftime("%Y-%m-%d %H:%M")
        posts = self.get_all_posts()
        pending = [p for p in posts if p['status'] == 'pending' and p['schedule_time'] <= now]
        
        if pending:
            print(f"📋 {len(pending)} adet gönderilmeyi bekleyen post bulundu.")
        
        return pending

    def update_metrics(self, post_id, new_metrics):
        """Belirli bir postun beğeni ve paylaşım sayılarını günceller."""
        posts = self.get_all_posts()
        updated = False
        
        for post in posts:
            if post['id'] == post_id:
                # Mevcut metrikleri koru, yeni gelenleri ekle/güncelle
                post['metrics'].update(new_metrics)
                post['last_updated'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                updated = True
                print(f"📊 Post #{post_id} metrikleri güncellendi: {new_metrics}")
                break
        
        if updated:
            self._save_all(posts)
        else:
            print(f"⚠️ Post #{post_id} bulunamadı!")

    def update_post_after_send(self, post_id, api_id, status="sent"):
        """Post gönderildikten sonra durumunu ve API ID'sini günceller."""
        posts = self.get_all_posts()
        updated = False
        
        for post in posts:
            if post['id'] == post_id:
                post['status'] = status
                post['api_post_id'] = api_id
                post['sent_at'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                updated = True
                print(f"✅ Post #{post_id} durumu güncellendi: {status} (API ID: {api_id})")
                break
        
        if updated:
            self._save_all(posts)
        else:
            print(f"⚠️ Post #{post_id} bulunamadı!")

    def _save_all(self, posts):
        """Verileri JSON dosyasına yazar."""
        try:
            with open(self.db_path, 'w', encoding='utf-8') as f:
                json.dump(posts, f, indent=4, ensure_ascii=False)
        except Exception as e:
            print(f"❌ Kaydetme hatası: {e}")


# Test
if __name__ == "__main__":
    cm = ContentManager()
    
    print("\n" + "="*50)
    print("TEST: Content Manager")
    print("="*50 + "\n")
    
    # Test 1: Post ekleme
    print("📝 Test 1: Yeni post ekleniyor...")
    cm.add_post(
        content="Bu bir test postu!",
        platform="Twitter",
        schedule_time="2026-01-22 15:00"
    )
    
    # Test 2: Tüm postları listeleme
    print("\n📋 Test 2: Tüm postlar:")
    all_posts = cm.get_all_posts()
    for post in all_posts:
        print(f"  - ID: {post['id']}, Platform: {post['platform']}, Durum: {post['status']}")
    
    # Test 3: Pending postları kontrol et
    print("\n⏰ Test 3: Bekleyen postlar:")
    pending = cm.get_pending_posts()
    print(f"  Bekleyen post sayısı: {len(pending)}")
    
    print("\n✅ Testler tamamlandı!")
