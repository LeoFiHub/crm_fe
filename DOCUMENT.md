***

# LeoLab CRM: Hệ Thống CRM & Trả Lương On-Chain

Dự án này đề xuất xây dựng một hệ thống Quản lý Quan hệ Khách hàng (CRM) phi tập trung, kết hợp với tính năng tự động hóa trả lương cho nhân viên bằng stablecoin trên nền tảng blockchain.

## 🎯 Mục Tiêu & Ý Tưởng

Dự án được xây dựng với mục tiêu tham gia các cuộc thi blockchain hackathon, cụ thể là **Lisk Protocol Layer Zero Camp** và **Vietnam Aptos Hackathon**.

Ý tưởng cốt lõi là phát triển một giải pháp CRM đột phá, tận dụng sức mạnh của công nghệ blockchain để giải quyết các vấn đề về quản lý nhân sự và thanh toán lương một cách minh bạch, an toàn và hiệu quả. Hệ thống sẽ giúp doanh nghiệp tự động hóa quy trình trả lương, giảm thiểu sai sót và tăng cường sự tin tưởng từ phía nhân viên.

### Thông Tin Cuộc Thi

- **Lisk Protocol:**
  - [Tổng quan chương trình](https://vbiacademy.edu.vn/en/news-feed/tong-quan-chuong-trinh-lisk-protocol-85285)
  - [Tài liệu kỹ thuật](https://vbiacademy.edu.vn/vi/courses/lisk-protocol-layer-zero-camp-88230)
- **Aptos-Move:**
  - [Thông tin Hackathon](https://dorahacks.io/hackathon/vietnamaptoshackathon/detail)
  - [Tài liệu kỹ thuật](https://aptos.dev/en/network/blockchain/move)

## ✨ Tính Năng Chính

- **Quản Lý Nhân Sự On-Chain:** Lưu trữ và cập nhật hồ sơ, hợp đồng của nhân viên một cách an toàn, bất biến trên blockchain.
- **Tự Động Hóa Trả Lương:** Lên lịch và thực hiện thanh toán lương tự động bằng stablecoin (USDC, USDT,...) thông qua smart contract.
- **Minh Bạch & Tuân Thủ:** Tạo lập hồ sơ trả lương không thể chỉnh sửa, dễ dàng truy xuất để phục vụ kiểm toán và tuân thủ pháp lý.
- **Hỗ Trợ Đa Dạng Stablecoin:** Cho phép doanh nghiệp và nhân viên linh hoạt lựa chọn loại stablecoin để thanh toán và nhận lương.
- **Kiểm Soát Truy Cập Phân Quyền:** Thiết lập các vai trò (Admin, HR, Nhân viên) với quyền hạn truy cập dữ liệu và thực hiện chức năng riêng biệt.
- **Trải Nghiệm Người Dùng Mượt Mà:** Cung cấp bảng điều khiển (dashboard) trực quan để quản lý nhân sự, lên lịch trả lương, theo dõi lịch sử và nhận thông báo.

## 🏛️ Kiến Trúc Hệ Thống Đề Xuất

| Lớp | Mô Tả | Công Nghệ Đề Xuất |
| :--- | :--- | :--- |
| **Blockchain** | Nền tảng để triển khai smart contract, ghi nhận giao dịch và lưu trữ dữ liệu nhân sự một cách an toàn, phi tập trung. | Lisk, Aptos, Ethereum (hoặc L2 tương thích) |
| **Smart Contract** | Logic cốt lõi tự động hóa quy trình trả lương, quản lý quyền truy cập và đảm bảo tuân thủ các điều khoản đã định. | Solidity, Move |
| **Giao Diện (dApp)** | Giao diện Web3 cho phép quản trị viên, bộ phận nhân sự và nhân viên tương tác với hệ thống một cách dễ dàng. | React.js, Vite, Tailwind CSS |
| **Stablecoin** | Phương tiện thanh toán lương ổn định, được tích hợp trực tiếp vào quy trình của smart contract. | USDC, USDT, DAI,... |
| **Ví Điện Tử** | Cổng kết nối an toàn để người dùng tương tác với dApp, ký giao dịch và quản lý tài sản của mình. | MetaMask, Petra Wallet, ví tương thích WalletConnect |

## 🔄 Quy Trình Hoạt Động

1. **Onboarding:** Nhân viên mới được thêm vào hệ thống. Họ kết nối địa chỉ ví cá nhân và thông tin được mã hóa, lưu trữ trên blockchain.
2. **Thiết Lập Bảng Lương:** Bộ phận nhân sự hoặc quản lý cấu hình chu kỳ trả lương (hàng tháng, 2 tuần/lần), số tiền, và loại stablecoin cho từng nhân viên.
3. **Thực Thi Smart Contract:** Vào ngày trả lương đã định, smart contract sẽ tự động thực thi, chuyển chính xác số lượng stablecoin từ ví của công ty đến ví của nhân viên.
4. **Ghi Nhận & Thông Báo:** Mọi giao dịch đều được ghi lại công khai trên blockchain. Nhân viên nhận được thông báo tức thì và có thể xác thực giao dịch bất kỳ lúc nào.
5. **Báo Cáo & Kiểm Toán:** Dữ liệu giao dịch bất biến trên blockchain giúp việc tạo báo cáo và kiểm toán trở nên đơn giản, minh bạch tuyệt đối.

## 🛠️ Công Nghệ Dự Kiến Sử Dụng

- **Frontend Framework:** React.js
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Blockchain Interaction:** Ethers.js / Web3.js (cho EVM) hoặc Aptos SDK
- **Routing:** React Router
- **Icons:** Lucide React

## 🗺️ Lộ Trình Phát Triển (Roadmap)

- [ ] **Giai đoạn 1: Nghiên cứu & Thiết kế**
  - [ ] Hoàn thiện kiến trúc hệ thống chi tiết.
  - [ ] Thiết kế smart contract cho việc quản lý nhân viên và trả lương.
  - [ ] Thiết kế giao diện người dùng (UI/UX).
- [ ] **Giai đoạn 2: Phát triển Smart Contract**
  - [ ] Viết và kiểm thử (unit test) các chức năng cốt lõi trên Testnet.
  - [ ] Tích hợp các loại stablecoin phổ biến.
- [ ] **Giai đoạn 3: Phát triển Frontend (dApp)**
  - [ ] Xây dựng giao diện đăng nhập (kết nối ví), dashboard, các trang quản lý.
  - [ ] Tích hợp frontend với smart contract đã triển khai.
- [ ] **Giai đoạn 4: Tích Hợp & Triển Khai**
  - [ ] Kiểm thử toàn diện (end-to-end testing).
  - [ ] Triển khai phiên bản Beta trên Testnet.
  - [ ] Thu thập phản hồi và tối ưu hóa.
- [ ] **Giai đoạn 5: Hoàn Thiện & Trình Bày**
  - [ ] Kiểm toán bảo mật (Security Audit).
  - [ ] Chuẩn bị tài liệu, video demo và bài thuyết trình cho hackathon.

## 🤝 Đóng Góp

Đây là một dự án mở cho cuộc thi hackathon. Nếu bạn quan tâm, hãy tham gia bằng cách:

1. Fork repository này.
2. Tạo một feature branch mới (`git checkout -b feature/TenTinhNang`).
3. Commit các thay đổi của bạn (`git commit -m 'Add: Them mot tinh nang tuyet voi'`).
4. Push lên branch của bạn (`git push origin feature/TenTinhNang`).
5. Mở một Pull Request.

## 📄 Giấy Phép

Dự án này được cấp phép dưới Giấy phép MIT.
