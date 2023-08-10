# Work Management React App

Tổng quan: Là trang web dùng để quản lý công việc theo hướng kanban board 


## Functions 

Trang web đã có thể xử lý những tính năng sau:

### Authentication

- User có thể sign up account mới: sign up bằng cách tạo mới password và email, hoặc sign up bằng google, và log in sau khi đã sign up 
- Có regex kiểm tra password khi sign up
- Từng user (xác định bằng từng email riêng) sẽ có data riêng


### Tạo board, tạo card

- Tạo không gian làm việc (Board) cho một công việc, một hoạt động, hoặc một dự án. Trong mỗi Board, có thể tạo các cột (Column), mỗi cột chứa một nhóm các đầu mục (Card).
- Xoá và cập nhật các board/column/card
- Tìm kiếm board theo tên board hoặc theo card công việc trong board
- Trong board có thể chọn theme, có thể đánh dấu board yêu thích (favorite) và có mục sắp xếp board theo thứ tự truy cập (recently viewed)
- Có thể drag và thay đổi vị trí các column với nhau, hoặc đổi vị trí các card với nhau (thư viện dndKit)

### Card feature

Trong card có những tính năng như:
- Đổi màu cho label
- Đổi màu cho card (half hoặc full)
- Viết và cập nhật description cho card bằng ReactQuill

### Template Features

Có những template với board mẫu liên quan đến các chủ đề khác nhau để user tiện sử dụng mà không cần phải làm từ đầu

### Coming soon

Các user có thể interact với nhau, có thể tạo nhóm để làm việc chung và có thể comment vào board của nhau
Có tính năng update profile (thông tin cá nhân, ảnh đại diện)


### Deployment

Xem preview sản phẩm ở: https://cijs85fp-work-management.vercel.app/

