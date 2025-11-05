# Docker Build và Deploy cho English Learning App

## Cách build và chạy với Docker

### 1. Build Docker image

```bash
docker build -t english-learning:latest .
```

### 2. Chạy container

```bash
docker run -d -p 80:80 --name english-learning-web english-learning:latest
```

### 3. Sử dụng Docker Compose

```bash
docker compose up -d
```

Container sẽ chạy trên port 80. Truy cập ứng dụng tại: `http://localhost`

## Cấu trúc Dockerfile

- **Stage 1 (Build)**: Sử dụng Node.js 20 Alpine để build ứng dụng Angular
- **Stage 2 (Production)**: Sử dụng Nginx Alpine để serve ứng dụng đã build

## Các lệnh hữu ích

### Xem logs

```bash
docker logs english-learning-web
```

### Dừng container

```bash
docker stop english-learning-web
```

### Xóa container

```bash
docker rm english-learning-web
```

### Xóa image

```bash
docker rmi english-learning:latest
```

### Rebuild và restart

```bash
docker compose down
docker compose up -d --build
```
