# 🤖 Sosyal Medya Zamanlayıcı

Otomatik sosyal medya post zamanlama ve performans takip sistemi. Twitter ve LinkedIn'e belirli zamanlarda otomatik post gönderir, performanslarını takip eder.


---

## ✨ Özellikler

- 🚀 **Otomatik Post Gönderimi** - Belirli zamanlarda otomatik tweet/post atma
- 📊 **Performans Takibi** - Beğeni, paylaşım, yorum sayılarını otomatik çekme (Free hesap için desteklenmez)
- 🌐 **Web Dashboard** - Kullanıcı dostu arayüz ile post planlama
- 🔄 **Çoklu Platform** - Twitter & LinkedIn desteği
- ⚡ **Akıllı Retry** - Hata durumunda otomatik tekrar deneme
- 📝 **Detaylı Loglama** - Tüm işlemlerin kaydı

---

## 📋 Gereksinimler

- Python 3.10 veya üzeri
- Twitter Developer Account (API anahtarları için)
- LinkedIn Developer Account (API anahtarları için)

---

## 🚀 Kurulum

### 1. Projeyi İndirin

```bash
git clone <repo-url>
cd AutoPosting
```

### 2. Sanal Ortam Oluşturun (Önerilen)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 3. Bağımlılıkları Yükleyin

```bash
pip install -r requirements.txt
```

### 4. Klasörleri Oluşturun

```bash
mkdir data logs
```

### 5. API Anahtarlarını Ayarlayın

`.env` dosyası oluşturun ve aşağıdaki bilgileri doldurun:

```env
# Twitter API Credentials
TWITTER_API_KEY=your_api_key_here
TWITTER_API_SECRET=your_api_secret_here
TWITTER_ACCESS_TOKEN=your_access_token_here
TWITTER_ACCESS_SECRET=your_access_secret_here

# LinkedIn API Credentials
LINKEDIN_CLIENT_ID=your_client_key_here
LINKEDIN_CLIENT_SECRET=your_client_key_secret_here
LINKEDIN_ACCESS_TOKEN=your_access_key_here

```

**⚠️ Önemli:** `.env` dosyasını asla Git'e yüklemeyin!

---

## 🎮 Kullanım

### Uygulamayı Başlatma

```bash
python python_script.py
```

Terminal'de şu mesajı göreceksiniz:

```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║       🤖 SOSYAL MEDYA ZAMANLAYICI v1.0                ║
║                                                        ║
║       Otomatik Post Gönderimi & Performans Takibi     ║
║                                                        ║
╚════════════════════════════════════════════════════════╝

🎉 SOSYAL MEDYA ZAMANLAYICI ÇALIŞIYOR!
📊 Dashboard: http://127.0.0.1:8000
```

### Dashboard'a Erişim

Tarayıcınızda açın:
```
http://127.0.0.1:8000
```

### Post Planlama

1. Dashboard'da "Yeni Post Planla" formunu doldurun
2. Platform seçin (Twitter/LinkedIn)
3. İçeriği yazın
4. Yayınlanma zamanını seçin
5. "Paylaş" butonuna tıklayın

### Durdurma

Terminal'de `Ctrl+C` tuşlarına basın.

---

## 📂 Proje Yapısı

```
AutoPosting/
│
├── python_script.py          # Ana çalıştırma scripti ⭐
├── api_integration.py        # API entegrasyon merkezi ⭐
├── scheduler.py              # Zamanlayıcı modülü ⭐
├── app.py                    # FastAPI web uygulaması
├── .env                      # API anahtarları (GİZLİ)
├── requirements.txt          # Python bağımlılıkları
│
├── src/
│   ├── content_manager.py   # İçerik yönetimi ⭐
│   ├── post_publisher.py    # Twitter API
│   ├── linkedin_publisher.py # LinkedIn API
│   └── error_handler.py     # Hata yönetimi
│
├── templates/
│   └── index.html            # Web dashboard
│
├── data/
│   └── posts.json            # Post veritabanı
│
└── logs/
    └── app.log               # Uygulama logları
```

⭐ = Yarışma teslim dosyaları

---

## 🎯 Özellikler Detaylı

### 1. Otomatik Zamanlama

- Her 30 saniyede bir bekleyen postları kontrol eder
- Zamanı gelen postları otomatik gönderir
- Başarılı/başarısız durumları kaydeder

### 2. Performans Takibi (Metrics ücretsiz sunulmaz!)

- Her 10 dakikada bir metrics güncellenir
- Beğeni, paylaşım, yorum sayıları
- Impression (görüntülenme) verileri

### 3. Hata Yönetimi

- Otomatik retry (3 deneme)
- Rate limit kontrolü
- Detaylı hata logları

### 4. Web Dashboard

- Post planlama arayüzü
- Mevcut postları listeleme
- Performans verilerini görüntüleme
- Manuel metrik güncelleme

---

## 🔧 Yapılandırma

### Zamanlayıcı Ayarları

`scheduler.py` içinde:

```python
self.check_interval = 30  # Post kontrol aralığı (saniye)
```

### Metrik Güncelleme

`scheduler.py` içinde:

```python
self.check_interval = 600  # 10 dakika
```


---

## ⚠️ Önemli Notlar

### Twitter API Limitleri

**Free Tier:**
- ✅ Tweet gönderme (1,500/ay)
- ❌ Metrics okuma (Elevated Access gerekli)

**Metrics için:**
- Twitter API Pro (~$5,000/ay) gerekir



---

## 🐛 Sorun Giderme

### "401 Unauthorized" Hatası

**Sorun:** Twitter API anahtarları hatalı

**Çözüm:**
1. `.env` dosyasındaki anahtarları kontrol edin
2. Twitter Developer Portal'dan yeni anahtarlar oluşturun

### "Module not found" Hatası

**Sorun:** Bağımlılıklar kurulmamış

**Çözüm:**
```bash
pip install -r requirements.txt
```

### Posts.json Bulunamadı

**Sorun:** `data/` klasörü yok

**Çözüm:**
```bash
mkdir data
```


---

## 📊 Kullanım Senaryoları

### Senaryo 1: Günlük Tweet Atma

```
1. Dashboard'a girin
2. Sabah 9:00 için bir tweet planlayın
3. Sistem otomatik gönderir
4. 10 dakika sonra performans verileri güncellenir (Ücretli)
```

### Senaryo 2: 

```
1. Hafta boyunca 7 post planlayın
2. Her gün farklı saatlerde
3. Sistem otomatik yönetir
4. Dashboard'dan performansı takip edin
```

---

## 🚀 Gelişmiş Özellikler (Gelecek)

- [ ] AI destekli içerik önerileri
- [ ] Otomatik hashtag önerileri
- [ ] En iyi gönderim zamanı analizi
- [ ] Görsel/video post desteği
- [ ] Instagram entegrasyonu
- [ ] CSV/Excel'den toplu post yükleme

---

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing`)
5. Pull Request açın

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 👥 Takım
  
**Katılımcılar:**
1. Burak Altungök
2. Levent Kök
3. Melisa Özkılıç
4. Merve Korkut
5. Tesnim Çelik


---


---

## 🙏 Teşekkürler

- [Tweepy](https://www.tweepy.org/) - Twitter API wrapper
- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework
- [YZTA](https://yapayzekaveteknolojiakademisi.com/) - Yapay Zeka ve Teknoloji Akademisi

---

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!**
