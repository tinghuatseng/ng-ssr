# Dockerfile for the Angular SSR Application

# 使用官方 Node.js 映像
FROM node:20-slim

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有程式碼
COPY . .

# 建置應用程式
RUN npm run build

# 向 Docker 網路開放 Node 伺服器的 4000 埠
EXPOSE 4000

# 容器啟動時執行的命令
CMD ["node", "dist/ng-ssr/server/main.js"]