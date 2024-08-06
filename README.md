# EIDS Hướng dẫn cài đặt ứng dụng
***
### 1. Cấu hình & Lưu ý
- File cài đặt để phục vụ môi trường TEST & UAT và thực hiện trên 1 VM
- Môi trường gần PROD hoặc PROD thì đổi sang K8s hoặc tổ chức chia nhỏ thành các VM và chạy theo ACIVE/STANDBY (Bổ sung cài đặt sau)
- Cấu hình tối thiểu 8core/32gb 
- Bộ xử lí AMD các ứng dụng ko tương thích với ARM64
### 2. Cài đặt môi trường docker
- Cài theo file
- Tham chiếu *https://docs.docker.com/get-docker/*
```
apt-get update
apt-get install curl
curl -fsSL https://get.docker.com/ | sh
apt-get install docker-compose-plugin
```
### 3. Lấy bản cài ứng dụng từ private registry sử dụng ECR của AWS
 - cài đặt aws cli
 - Tham chiếu *https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#cliv2-linux-install*
```
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
```
 - Cấu hình key và secret để sử dụng private registry ECR 
```
export AWS_DEFAULT_REGION=ap-southeast-1
export AWS_ACCESS_KEY_ID=AKIAWADGJ2U55R5XVG2I
export AWS_SECRET_ACCESS_KEY=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
```
- Login ECR để lấy các bản cài đặt ứng dụng
```
aws ecr get-login-password \
        --region ap-southeast-1 | docker login \
        --username AWS \
        --password-stdin 412531414331.dkr.ecr.ap-southeast-1.amazonaws.com
```
### 4. Chạy, kiểm tra và publish ứng dụng
- Chạy ứng dụng
```
docker compose up --detach
```
- Kiểm tra các ứng dụng đang trong trạng thái hoạt động
```
docker ps
```
- Kiểm tra các service đang hoạt động: **redis-service, bidvector-service, eid-zone1-service, eid-zone2-service, eid-main-service, nbas-mysql, nbas-service, eid-mysql, eid-service**
- Kiểm tra ứng dụng Core Models sử dụng CURL
```
chmod +x curl-test-core-service.sh
./curl-test-core-service.sh
```
`{"status":200,"msg":"ok","data":[{"UserID":"030098003596","ImageID":"030098003596"}],"trans_id":"2024080104201b22279e9142e99689050f8b066798"}`

- Kiểm tra ứng dụng EID nhận được response là thành công
```
chmod +x curl-test-eid-service.sh
./curl-test-eid-service.sh
```
-  <b style="color:blue"> Publish cổng 8080(Publish internet hoặc forward từ gateway tùy theo kiến trúc của bên napas)</b>
### Hoàn Thành cài đặt
***
