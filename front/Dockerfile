FROM node:18
WORKDIR /app
COPY package*.json ./
# 추가: .npmrc 파일을 이미지에 복사
COPY .npmrc .
COPY . .
RUN npm run build
ENTRYPOINT ["serve", "-s", "build"]
