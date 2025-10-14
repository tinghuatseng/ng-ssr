# Dockerfile for the Angular SSR Application

# 使用官方 Node.js 映像
FROM node:trixie-slim

# 設定工作目錄
WORKDIR /app
COPY dist/ng-ssr/server ./dist/ng-ssr/server
# 向 Docker 網路開放 Node 伺服器的 4000 埠
EXPOSE 4000

# 容器啟動時執行的命令
# CMD ["ls", "dist/ng-ssr/server"]
CMD ["node", "dist/ng-ssr/server/server.mjs"]
