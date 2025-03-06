# Task Management System

Bu proje, Laravel 12, Vite, Tailwind CSS ve Laravel Breeze kullanılarak geliştirilmiş basit bir Görev Yönetim Sistemi’dir. Hem web arayüzü hem de API desteği ile görev oluşturma, listeleme, düzenleme, silme ve tamamlamayı sağlamaktadır. Proje; kullanıcı-görev ilişkisi, validasyon, middleware kullanımı, API endpoint’leri ve testlerle temel Laravel konseptlerinin uygulanmasını kapsamaktadır.

## Özellikler

- **Görev CRUD İşlemleri:**
  - **Oluşturma:** Kullanıcılar yeni görev ekleyebilir.
  - **Listeleme:** Sadece giriş yapmış kullanıcıya ait görevler listelenir.
  - **Güncelleme:** Görev bilgileri düzenlenebilir.
  - **Silme:** Görevler silinebilir.
  - **Tamamla:** Görev tamamlandığında durumu güncellenir.

- **Kullanıcı-Görev İlişkisi:**
  - Her görev, ilgili kullanıcıya aittir. Yalnızca görev sahibi işlemleri gerçekleştirebilir.

- **Web Arayüzü:**
  - Laravel Breeze ile modern, responsive ve Tailwind CSS destekli arayüz.
  - Blade şablonları: `index`, `create` ve `edit` dosyaları.

- **API Desteği:**
  - API üzerinden de aynı CRUD işlemleri gerçekleştirilebilmektedir.
  - Laravel Sanctum ile token tabanlı API kimlik doğrulaması (opsiyonel).

- **Validation, Middleware ve Testler:**
  - Form validasyonları ve `auth` middleware ile güvenli erişim.
  - Feature testleri ile temel işlevsellik doğrulanmıştır.

## Proje Yapısı

- **app/Models/Task.php:**  
  Görev modelinin tanımı, fillable alanlar ve kullanıcı ilişkisi (`belongsTo`).

- **database/migrations/**  
  `tasks` tablosunu oluşturacak migration dosyası (görev başlığı, açıklaması, tamamlanma durumu, user_id).

- **app/Http/Controllers/TaskController.php:**  
  Görev CRUD işlemleri ve `complete` metodunu içeren controller.

- **resources/views/tasks/**  
  Breeze tasarımına uyumlu `index.blade.php`, `create.blade.php` ve `edit.blade.php` dosyaları.

- **routes/web.php & routes/api.php:**  
  Web ve API route tanımlamaları (resource route ve tamamla işlemi).

- **tests/Feature/TaskTest.php:**  
  Görev yönetimi için örnek feature testleri.

## Kurulum

### Gereksinimler

- PHP 8.3 veya üstü
- Composer
- Node.js ve npm
- Laravel 12

### Adımlar

1. **Projeyi Klonla:**

   ```bash
   git clone [[<repository-url>]()](https://github.com/anilgundal/task-management.git)
   cd task-management
2. **Composer Bağımlılıklarını Yükle:**

   ```bash
   composer install
3. **Node Bağımlılıklarını Yükle:**
   ```bash
   npm install
4. **.env Dosyasını Oluştur:**
   ```bash
   cp .env.example .env
5. **Ardından uygulama anahtarını oluştur:**
   ```bash
   php artisan key:generate
6. **Migrationları Çalıştır:**
   ```bash
   php artisan migrate
7. **Geliştirme Sunucusunu Başlat:**
   ```bash
   php artisan serve
8. **.env Dosyasını Oluştur:**
   ```bash
   composer install
### Testleri Çalıştırmak (Opsiyonel)
8. **Projeyi test etmek için aşağıdaki komutu kullanabilirsiniz:**
   ```bash
   php artisan test --filter TaskTest
