# 🚀 DigitalOcean Deployment Rehberi

Bu rehber `kankam.ai`'yi DigitalOcean Droplet'ında host etmek için adım adım talimatlar içerir.

## 📋 Önkoşullar

- ✅ DigitalOcean Droplet (Ubuntu 22.04 / 24.04 önerilir)
- ✅ `kankam.ai` domain'i registrar'dan alındı
- ✅ Droplet'a SSH erişimi (`ssh root@<ip>`)
- ✅ Sudo yetkisi olan bir kullanıcı (önerilir: `deploy`)

## 🏗️ Tek seferlik sunucu hazırlığı

### 1. Sistem güncellemesi

```bash
ssh root@<droplet-ip>
apt update && apt upgrade -y
```

### 2. Deploy kullanıcısı oluştur (root ile çalışma!)

```bash
adduser deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/  # (varsa) kendi public key'in
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

Bundan sonra: `ssh deploy@<droplet-ip>`

### 3. Nginx kurulumu

```bash
sudo apt install -y nginx
sudo systemctl enable --now nginx
sudo ufw allow "Nginx Full"
sudo ufw allow OpenSSH
sudo ufw enable
```

### 4. Site klasörü oluştur

```bash
sudo mkdir -p /var/www/kankam.ai
sudo chown -R deploy:deploy /var/www/kankam.ai
```

### 5. Nginx config

`/etc/nginx/sites-available/kankam.ai` oluştur:

```nginx
# kankam.ai — statik Next.js export servisi
server {
    listen 80;
    listen [::]:80;
    server_name kankam.ai www.kankam.ai;

    root /var/www/kankam.ai;
    index index.html;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;

    # Brotli (modülü varsa)
    # brotli on;
    # brotli_comp_level 6;
    # brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    # add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'" always;

    # Cache static assets — 1 yıl, immutable (Next.js hash'li dosyalar)
    location /_next/static/ {
        expires 1y;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location ~* \.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|otf|eot)$ {
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000, immutable";
    }

    # HTML — kısa cache (yeni deploy hızlı yansısın)
    location ~* \.html$ {
        expires 5m;
        add_header Cache-Control "public, max-age=300, must-revalidate";
    }

    # Next.js trailing slash routing
    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # 404
    error_page 404 /404.html;

    # /robots.txt, /sitemap.xml hızlı
    location = /robots.txt {
        access_log off;
        log_not_found off;
    }
    location = /sitemap.xml {
        access_log off;
        log_not_found off;
    }

    # .well-known (Let's Encrypt için)
    location /.well-known/acme-challenge/ {
        root /var/www/kankam.ai;
        allow all;
    }
}

# www → root redirect
server {
    listen 80;
    listen [::]:80;
    server_name www.kankam.ai;
    return 301 http://kankam.ai$request_uri;
}
```

Sembolik link + reload:

```bash
sudo ln -s /etc/nginx/sites-available/kankam.ai /etc/nginx/sites-enabled/
sudo nginx -t        # syntax kontrolü
sudo systemctl reload nginx
```

### 6. DNS bağlantısı

Registrar'da (Namecheap / GoDaddy / Cloudflare):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | `<droplet-ip>` | 300 |
| A | www | `<droplet-ip>` | 300 |
| CAA | @ | `0 issue "letsencrypt.org"` | 3600 |

DNS yayılma: 5 dakika - 24 saat.

Test:
```bash
dig +short kankam.ai
dig +short www.kankam.ai
```

### 7. SSL (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d kankam.ai -d www.kankam.ai \
  --email hi@kankam.ai \
  --agree-tos \
  --redirect \
  --non-interactive
```

Certbot Nginx config'i otomatik HTTPS'e geçirir + redirect ekler.

Yenileme cron'u zaten kurulur — test:
```bash
sudo certbot renew --dry-run
```

### 8. nginx sudo deploy kullanıcısı için (opsiyonel)

Deploy sırasında `nginx -t` ve `nginx reload` için passwordless sudo:

```bash
sudo visudo
```

Eklenen satır:
```
deploy ALL=(ALL) NOPASSWD: /usr/sbin/nginx, /bin/systemctl reload nginx, /bin/systemctl restart nginx
```

## 🤖 GitHub Actions — Otomatik deploy

### 1. SSH key oluştur (lokal değil, deploy için yeni!)

```bash
# Lokal makinende veya başka bir yerde
ssh-keygen -t ed25519 -C "github-actions-kankam" -f ~/.ssh/kankam_deploy

# Public key'i sunucuya ekle
ssh-copy-id -i ~/.ssh/kankam_deploy.pub deploy@<droplet-ip>

# Private key'i panoya kopyala (GitHub secret olacak)
cat ~/.ssh/kankam_deploy
```

### 2. GitHub repo secrets ekle

Repo → Settings → Secrets and variables → Actions → New repository secret

| Secret | Değer |
|--------|-------|
| `DO_HOST` | Droplet IP veya `kankam.ai` |
| `DO_USER` | `deploy` |
| `DO_PORT` | `22` (custom port varsa onu yaz) |
| `DO_PATH` | `/var/www/kankam.ai` |
| `DO_SSH_KEY` | `cat ~/.ssh/kankam_deploy` çıktısı (`-----BEGIN OPENSSH PRIVATE KEY-----` dahil) |

### 3. Test deploy

```bash
# Lokal'de main'e push at
git push origin main

# GitHub Actions → Workflows → "Build & Deploy to DigitalOcean"
# Veya manuel: gh workflow run deploy.yml
```

Workflow:
1. `npm ci` — bağımlılıklar
2. `npm run lint` — ESLint kontrol
3. `npm run build` — statik build (`out/` üretilir)
4. SSH ile sunucuya bağlan
5. `rsync` ile `out/` → `/var/www/kankam.ai/`
6. Nginx config kontrol + reload

İlk deploy ~2-3 dakika, sonrakiler ~1 dakika.

## 🩺 Sorun giderme

### "502 Bad Gateway"
Statik export'ta upstream yok, bu hata olmamalı. Olursa Nginx config'inde yanlışlık var:
```bash
sudo nginx -t
sudo journalctl -u nginx --since "5 minutes ago"
```

### "404" tüm sayfalarda
`trailingSlash: true` ile Next.js her sayfaya `/` ekler. Nginx `try_files` order'ı doğru mu?
```nginx
try_files $uri $uri.html $uri/ =404;
```

### "SSL renewal failed"
```bash
sudo certbot renew --force-renewal
```

### Cache temizleme (deploy sonrası eski içerik görünüyor)
```bash
# Tarayıcı: Ctrl+Shift+R (hard refresh)
# Sunucu: nginx reload
sudo systemctl reload nginx

# Cloudflare proxy varsa
# → Cloudflare dashboard → Caching → Purge Everything
```

### GitHub Actions "Permission denied (publickey)"
```bash
# Sunucuda authorized_keys'in doğru olduğunu kontrol et:
cat ~/.ssh/authorized_keys

# Permissions'a dikkat:
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# DO_SSH_KEY secret'ının başında `-----BEGIN OPENSSH PRIVATE KEY-----` var mı?
```

## 📊 Monitoring (opsiyonel)

### Uptime monitoring (free)
- **UptimeRobot** — https://uptimerobot.com (50 monitor free)
- **Better Uptime** — https://betteruptime.com

### Analytics (KVKK-friendly)
- **Plausible** (self-host on same droplet veya cloud)
- **Umami** (open source, self-hosted)
- Cookie-free, anonim

### Log monitoring
```bash
# Nginx access log
sudo tail -f /var/log/nginx/access.log

# Sadece 4xx-5xx hataları
sudo tail -f /var/log/nginx/access.log | awk '$9 ~ /^[45]/'
```

## 🔐 Güvenlik checklist

- [ ] Root SSH erişimi kapalı (`PermitRootLogin no` in `/etc/ssh/sshd_config`)
- [ ] Şifre ile SSH kapalı (`PasswordAuthentication no`)
- [ ] UFW açık ve sadece 22, 80, 443 portlarına izinli
- [ ] `fail2ban` kurulu (`sudo apt install fail2ban`)
- [ ] Otomatik güvenlik güncellemeleri açık (`sudo dpkg-reconfigure -plow unattended-upgrades`)
- [ ] HTTPS zorunlu (`return 301 https://`)
- [ ] Security headers eklendi (Nginx config'de yukarıda var)
- [ ] Let's Encrypt cron çalışıyor

## 🚀 İlk deploy

```bash
# Lokal makinende
cd kankam-ai-website
npm run build

# Manuel rsync (CI olmadan test için)
rsync -avz --delete \
  -e "ssh -i ~/.ssh/kankam_deploy" \
  ./out/ \
  deploy@<droplet-ip>:/var/www/kankam.ai/

# Test
curl -I https://kankam.ai
# HTTP/2 200 görmelisin
```

🎉 Site live!
