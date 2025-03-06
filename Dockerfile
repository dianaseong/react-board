FROM node:18-alpine AS build

WORKDIR /app

#의존성 설치
COPY package.json package-lock.json ./
RUN npm install 
RUN npm install -g vite
#실행 권한 부여 (Vite 문제 해결)
RUN chmod +x node_modules/.bin/vite

#소스코드 복사 후 빌드
COPY . .
RUN npm run build

#2단계 : 실행
FROM nginx:alpine
COPY --from=build /app/dist  /usr/share/nginx/html
COPY ./nginx/default.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]

