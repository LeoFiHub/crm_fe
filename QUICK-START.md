# 🎯 Hướng dẫn Quick Start

## Bước 1: Cài đặt môi trường

```bash
# Clone project
git clone <repository-url>
cd crm_fe

# Copy environment file
cp .env.example .env
```

## Bước 2: Chạy với Docker (Recommended)

```bash
# Khởi động development environment
docker-compose up -d

# Xem logs để đảm bảo mọi thứ hoạt động
docker-compose logs -f
```

## Bước 3: Truy cập ứng dụng

- **Frontend**: <http://localhost:5173>
- **Backend API**: <http://localhost:3000>

## Bước 4: Dừng services

```bash
docker-compose down
```

---

## 🛠️ Alternative: Chạy thủ công (không dùng Docker)

### Prerequisites

- Node.js 18+
- npm hoặc yarn
- MySQL database

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📚 Chi tiết cấu hình Docker

Xem file [README-DOCKER.md](./README-DOCKER.md) để biết thêm chi tiết về:

- Cấu hình environment variables
- Troubleshooting
- Production deployment
- Docker commands chuyên sâu

---

## 🚀 Features chính

- ✅ Employee Management
- ✅ Payroll System
- ✅ Wallet Integration
- ✅ Authentication
- ✅ Real-time Notifications
- ✅ CSV Export
- ✅ Responsive UI
