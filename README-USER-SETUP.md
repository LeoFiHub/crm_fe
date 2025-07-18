# 🚀 Hướng dẫn cài đặt và chạy CRM Frontend

## 📋 Yêu cầu hệ thống

- **Docker Desktop** (Windows/Mac) hoặc **Docker Engine** (Linux)
- **Git** để clone repository
- **4GB RAM** trống
- **2GB** dung lượng ổ cứng

## 🛠️ Cài đặt Docker Desktop

### Windows

1. Tải Docker Desktop: <https://www.docker.com/products/docker-desktop>
2. Chạy installer và restart máy
3. Mở Docker Desktop và đảm bảo nó đang chạy

### Mac

1. Tải Docker Desktop for Mac: <https://www.docker.com/products/docker-desktop>
2. Kéo thả vào Applications folder
3. Chạy Docker Desktop

### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo usermod -aG docker $USER
```

## 📥 Cài đặt dự án

### Bước 1: Clone repository

```bash
git clone [repository-url]
cd crm_fe
git checkout dev
```

### Bước 2: Setup environment

```bash
cp .env.example .env
```

### Bước 3: Chạy frontend với Docker

```bash
# Build và chạy
docker-compose up -d

# Xem logs để đảm bảo không có lỗi
docker-compose logs -f
```

### Bước 4: Truy cập ứng dụng

- **Frontend**: <http://localhost:5173>

## ⚠️ Lưu ý quan trọng

### Backend API

- Frontend sẽ cố kết nối với backend tại: `http://localhost:3000`
- **Nếu bạn có backend**: Đảm bảo backend đang chạy trên port 3000
- **Nếu chưa có backend**: Frontend vẫn chạy được nhưng các API calls sẽ fail

### Kiểm tra Docker đang chạy

```bash
# Kiểm tra container status
docker-compose ps

# Xem logs nếu có lỗi
docker-compose logs frontend
```

## 🔧 Troubleshooting

### 1. Port 5173 đã được sử dụng

```bash
# Dừng container và chạy lại
docker-compose down
docker-compose up -d
```

### 2. Frontend không load được

```bash
# Rebuild container
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### 3. Lỗi "crypto.hash is not a function"

```bash
# Clean rebuild
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d
```

### 4. Docker Desktop không chạy

- Restart Docker Desktop
- Trên Windows: Bật Hyper-V trong Windows Features
- Trên Mac: Kiểm tra Resources trong Docker settings

### 5. Permission denied (Linux)

```bash
sudo usermod -aG docker $USER
logout
# Login lại
```

## 📂 Cấu trúc project sau khi setup

```
crm_fe/
├── docker-compose.yml    # Docker configuration
├── Dockerfile.dev        # Docker build file
├── .env                  # Environment variables
├── package.json          # Dependencies
└── src/                  # Source code
```

## 🛑 Dừng ứng dụng

```bash
# Dừng containers
docker-compose down

# Dừng và xóa tất cả data
docker-compose down -v
```

## 🆘 Cần hỗ trợ?

### Common Commands

```bash
# Xem logs real-time
docker-compose logs -f

# Restart một service
docker-compose restart frontend

# Vào trong container để debug
docker-compose exec frontend sh

# Kiểm tra network
docker network ls
```

### Kiểm tra hệ thống

```bash
# Kiểm tra Docker version
docker --version
docker-compose --version

# Kiểm tra port có bị conflicts
netstat -an | grep 5173
```

## 🎯 Kết quả mong đợi

Sau khi setup thành công:

- ✅ Docker container "crm_fe-frontend-1" đang chạy
- ✅ Frontend accessible tại <http://localhost:5173>
- ✅ Hot reload hoạt động khi edit code
- ✅ Console logs hiển thị Vite dev server

---

**Happy Coding! 🎉**

*Nếu gặp vấn đề, hãy copy logs từ `docker-compose logs -f` để được hỗ trợ*
