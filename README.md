# LeoLab CRM Frontend Application

## 🚀 Quick Start cho User

### ⚡ Cách nhanh nhất (Recommended)

#### Windows

1. Mở Command Prompt hoặc PowerShell
2. Chạy: `setup.bat`

#### Mac/Linux

1. Mở Terminal  
2. Chạy: `chmod +x setup.sh && ./setup.sh`

### 📋 Yêu cầu hệ thống

- **Docker Desktop** (bắt buộc)
- **4GB RAM** trống
- **Port 5173** không bị sử dụng

### 🌐 Truy cập sau khi setup

- **Frontend**: <http://localhost:5173>
- **Backend cần có**: <http://localhost:3000>

### 🔧 Commands hữu ích

```bash
# Xem logs
docker-compose logs -f

# Dừng
docker-compose down

# Restart
docker-compose restart
```

---

## 📖 Chi tiết kỹ thuật

Ứng dụng CRM (Customer Relationship Management) được xây dựng với React.js, Tailwind CSS và Ant design.

<!-- ## 🚀 Tính năng

- **Trang đăng nhập** - Giao diện đăng nhập hiện đại với xác thực
- **Dashboard** - Bảng điều khiển chính với:
  - Sidebar navigation với nhiều menu items
  - Bảng quản lý nhân viên
  - Lịch công việc (My Schedule)
  - Header với search bar và thông tin user
- **Responsive Design** - Tối ưu cho mọi thiết bị
- **Theme System** - Hỗ trợ Light/Dark mode -->

## 📦 Cài đặt

1. Clone repository:

```bash
git clone <repository-url>
cd crm-fe
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Chạy development server:

```bash
npm run dev
```

4. Mở trình duyệt và truy cập: `http://localhost:5174`

## 📁 Cấu trúc thư mục

```
src/
├── api/                # API called logic 
├── components/         # Reusable components
├── pages/              # Page components
├── layouts/            # Layout components
├── constants/          # App constants
└── assets/             # Static assets
```

## 🚧 Roadmap

- [ ] Thêm các trang Employee Management
- [ ] Thêm Department Management
- [ ] Thêm Attendance System
- [ ] Thêm Payroll Management
- [ ] Thêm Job/Candidate Management
- [ ] Thêm Leave Management
- [ ] Thêm Holiday Calendar
- [ ] Thêm Settings page
- [ ] Tích hợp API backend
- [ ] Thêm form validation
- [ ] Thêm search và filter functionality
- [ ] Thêm export/import features

## 📝 Usage

### Navigation

- Sử dụng sidebar để điều hướng giữa các module
- Click vào logo để về trang chính
- Toggle light/dark theme ở bottom sidebar

### Employee Management

- View danh sách employees trong bảng
- Actions: View, Edit, Delete cho mỗi employee
- Pagination để điều hướng qua pages
- Search functionality (đang phát triển)

### Schedule Calendar

- Xem lịch làm việc hàng tháng
- Highlights các ngày có events
- Chi tiết schedule cho từng ngày

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

This project is licensed under LeoLab.
