# --- Stage 1: Builder ---
# 使用一個包含完整建置工具的 Node.js 映像
FROM node:trixie-slim AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝所有依賴（包含開發依賴，用於建置）
RUN npm install

# 複製整個專案的原始碼
COPY . .

# 執行建置指令
RUN npm run build

# --- Stage 2: Runner ---
# 使用一個輕量的 Node.js 映像來執行應用程式
FROM node:trixie-slim

# 設定工作目錄
WORKDIR /app

# 從 builder 階段複製建置好的應用程式
COPY --from=builder /app/dist ./dist

# 從 builder 階段複製 package.json 和 package-lock.json
COPY --from=builder /app/package*.json ./

# 只安裝生產環境所需的依賴
RUN npm install --omit=dev

# 向 Docker 網路開放 Node 伺服器的 4000 埠
EXPOSE 4000

# 容器啟動時執行的命令
CMD [ "node", "dist/ng-ssr/server/server.mjs" ]