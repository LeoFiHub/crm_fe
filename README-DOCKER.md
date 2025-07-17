# 🐳 Docker Setup cho CRM Application

## 📋 Yêu cầu hệ thống

- Docker Desktop (Windows/Mac) hoặc Docker Engine (Linux)
- Git
- 4GB RAM trống
- 10GB dung lượng ổ cứng

## 🚀 Cách chạy dự án

### 1. Clone và chuẩn bị dự án

```bash
# Clone repository
git clone <repository-url>
cd crm_fe

# Copy file environment
cp .env.example .env
```

### 2. Chạy môi trường Development

```bash
# Khởi động tất cả services
docker-compose up -d

# Hoặc build lại nếu có thay đổi code
docker-compose up --build -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

**Truy cập ứng dụng:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Database: localhost:3306

### 3. Chạy môi trường Production

```bash
# Khởi động production
docker-compose -f docker-compose.prod.yml up -d

# Build và khởi động
docker-compose -f docker-compose.prod.yml up --build -d
```

**Truy cập production:**
- Frontend: http://localhost (port 80)
- Backend API: http://localhost:3000

## 🛠️ Các lệnh Docker hữu ích

### Quản lý containers

```bash
# Xem trạng thái containers
docker-compose ps

# Restart một service
docker-compose restart frontend

# Vào bên trong container
docker-compose exec frontend sh
docker-compose exec backend sh

# Xem logs của một service
docker-compose logs frontend
docker-compose logs backend

# Theo dõi logs real-time
docker-compose logs -f frontend
```

### Quản lý data và volumes

```bash
# Xóa tất cả (bao gồm volumes)
docker-compose down -v

# Xóa images không dùng
docker image prune

# Xóa tất cả (containers, networks, volumes)
docker-compose down --rmi all -v --remove-orphans
```

### Build và deploy

```bash
# Build image mới
docker-compose build

# Build không cache
docker-compose build --no-cache

# Pull images mới nhất
docker-compose pull
```

## 📁 Cấu trúc files Docker

```
crm_fe/
├── Dockerfile              # Production build
├── Dockerfile.dev          # Development build
├── docker-compose.yml      # Development environment
├── docker-compose.prod.yml # Production environment
├── .dockerignore           # Files bị ignore khi build
├── .env.example            # Template environment variables
└── README-DOCKER.md        # File này
```

## ⚙️ Cấu hình Environment Variables

Tạo file `.env` từ `.env.example` và cập nhật các giá trị:

```env
# Database
DB_ROOT_PASSWORD=your_secure_root_password
DB_NAME=crm_db
DB_USER=crm_user
DB_PASSWORD=your_secure_password

# API
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_ENV=development
```

## 🔧 Troubleshooting

### Frontend không kết nối được Backend

```bash
# Kiểm tra network
docker network ls
docker-compose exec frontend ping backend

# Kiểm tra port binding
docker-compose ps
```

### Database connection issues

```bash
# Kiểm tra database logs
docker-compose logs database

# Reset database
docker-compose down
docker volume rm crm_fe_mysql_data
docker-compose up -d
```

### Build errors

```bash
# Clear Docker cache
docker system prune -a

# Rebuild từ đầu
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Hot reload không hoạt động

Trong `docker-compose.yml`, đảm bảo có volumes mapping:

```yaml
volumes:
  - .:/app
  - /app/node_modules
```

## 🐛 Debug và Development

### Truy cập logs

```bash
# Tất cả services
docker-compose logs

# Một service cụ thể
docker-compose logs frontend
docker-compose logs backend
docker-compose logs database

# Theo dõi real-time
docker-compose logs -f
```

### Chạy commands trong container

```bash
# Install package mới
docker-compose exec frontend npm install package-name

# Run tests
docker-compose exec frontend npm test

# Access shell
docker-compose exec frontend sh
```

## 🚀 Deploy Production

### Sử dụng Docker Compose

```bash
# 1. Set environment variables
export DB_ROOT_PASSWORD=secure_password
export DB_NAME=crm_db
export DB_USER=crm_user
export DB_PASSWORD=secure_password

# 2. Deploy
docker-compose -f docker-compose.prod.yml up -d

# 3. Verify
docker-compose -f docker-compose.prod.yml ps
```

### Sử dụng Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.prod.yml crm-stack

# Check services
docker service ls
```

## 📊 Monitoring

### Health Checks

```bash
# Check container health
docker-compose exec frontend curl http://localhost:5173
docker-compose exec backend curl http://localhost:3000/health
```

### Resource Usage

```bash
# Monitor resource usage
docker stats

# Check logs size
docker-compose logs --tail=50 frontend
```

## 🔒 Security Notes

1. **Environment Variables**: Không commit file `.env` vào Git
2. **Database Passwords**: Sử dụng mật khẩu mạnh trong production
3. **Network Security**: Cấu hình firewall cho production
4. **SSL/TLS**: Sử dụng HTTPS trong production

## 📞 Support

Nếu gặp vấn đề:

1. Kiểm tra logs: `docker-compose logs`
2. Restart services: `docker-compose restart`
3. Rebuild containers: `docker-compose up --build`
4. Check documentation: Docker official docs

---

**Happy Dockerizing! 🐳**
