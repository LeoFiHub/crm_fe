# 🚀 Frontend Docker Setup - Kết nối Backend Port 3000

## Hướng dẫn nhanh

### 1. Setup environment

```bash
cp .env.example .env
```

### 2. Chạy frontend Docker

```bash
docker-compose up -d
```

### 3. Truy cập

- **Frontend**: <http://localhost:5173>
- **Backend**: <http://localhost:3000> (đang chạy sẵn)

### 4. Xem logs

```bash
docker-compose logs -f
```

### 5. Dừng

```bash
docker-compose down
```

## ✅ Cấu hình đã setup

- ✅ **Frontend Only**: Chỉ chạy React frontend trong Docker
- ✅ **Backend Connection**: Kết nối với backend trên `host.docker.internal:3000`
- ✅ **Node 20**: Tương thích với Vite 7 và React Router 7
- ✅ **Hot Reload**: Code changes tự động update
- ✅ **Environment Variables**: API_BASE_URL đã configure

## 🔧 Troubleshooting

### Nếu không truy cập được localhost:5173

```bash
docker-compose logs frontend
```

### Nếu frontend không kết nối được backend

- Kiểm tra backend đang chạy trên port 3000
- Kiểm tra file .env có VITE_API_BASE_URL=<http://localhost:3000>

### Rebuild nếu cần

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```
