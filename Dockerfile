# 1. Build 단계
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# 2. Run 단계 (Nginx)
FROM nginx:alpine
# 빌드된 정적 파일들을 Nginx의 기본 경로로 복사
COPY --from=builder /app/dist /usr/share/nginx/html
# (선택) 작성한 nginx.conf가 있다면 복사 (없으면 기본 설정 사용)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]