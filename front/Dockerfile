FROM node:18
WORKDIR /app
COPY package*.json ./
# 추가: .npmrc 파일을 이미지에 복사
COPY .npmrc .
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build
ENTRYPOINT ["serve", "-s", "build"]
