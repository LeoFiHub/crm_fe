# CRM Frontend Application

Ứng dụng CRM (Customer Relationship Management) được xây dựng với React.js, Tailwind CSS và React Router.

## 🚀 Tính năng

- **Trang đăng nhập** - Giao diện đăng nhập hiện đại với xác thực
- **Dashboard** - Bảng điều khiển chính với:
  - Sidebar navigation với nhiều menu items
  - Bảng quản lý nhân viên
  - Lịch công việc (My Schedule)
  - Header với search bar và thông tin user
- **Responsive Design** - Tối ưu cho mọi thiết bị
- **Theme System** - Hỗ trợ Light/Dark mode

## 🛠️ Công nghệ sử dụng

- **React.js** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Modern icon library
- **Vite** - Build tool và dev server
- **Font Lexend** - Typography từ Google Fonts

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

## 🎨 Color Scheme

Dự án sử dụng bảng màu chủ đạo:

- **Primary Colors**: Indigo palette (#6366f1)
- **Secondary Colors**: Zinc/Gray palette
- **Accent Colors**: Violet (#8b5cf6)

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Reusable components
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── Header.jsx      # Top header bar
│   ├── EmployeeTable.jsx # Employee data table
│   ├── ScheduleCalendar.jsx # Calendar widget
│   └── PageTemplate.jsx # Layout template
├── pages/              # Page components
│   ├── Login.jsx       # Login page
│   ├── Dashboard.jsx   # Main dashboard
│   └── AllEmployees.jsx # Employee list page
├── layouts/            # Layout components
│   └── MainLayout.jsx  # Main app layout
├── constants/          # App constants
│   └── theme.js        # Color and theme constants
└── assets/             # Static assets
```

## 🔐 Authentication

- Default login credentials:
  - Email: `robertallen@example.com`
  - Password: Any password (demo purposes)

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

This project is licensed under the MIT License.

## 👥 Team

- Frontend Developer: Sử dụng modern React patterns và best practices
- UI/UX Design: Dựa trên Figma design specifications
- Responsive Design: Mobile-first approach với Tailwind CSS+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
