FROM node:18
WORKDIR /app
COPY package*.json ./
COPY .npmrc . # 추가: .npmrc 파일을 이미지에 복사
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build
ENTRYPOINT ["serve", "-s", "build"]
