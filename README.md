# NgSsr

本專案是使用 [Angular CLI](https://github.com/angular/angular-cli) 19.2.15 版本產生的。

## 開發伺服器

若要啟動本機開發伺服器，請執行：

```bash
ng serve
```

伺服器啟動後，請在瀏覽器中開啟 `http://localhost:4200/`。當您修改任何原始檔案時，應用程式將會自動重新載入。

## 程式碼鷹架

Angular CLI 包含了強大的程式碼鷹架工具。若要產生一個新的元件，請執行：

```bash
ng generate component component-name
```

若要取得完整的可用 schematics 清單（例如 `components`、`directives` 或 `pipes`），請執行：

```bash
ng generate --help
```

## 建置專案

若要建置專案，請執行：

```bash
ng build
```

此指令會編譯您的專案，並將建置產物儲存在 `dist/` 目錄中。在生產模式下，建置過程會為您的應用程式進行效能和速度的最佳化。

## 使用 Docker Compose 進行部署

本專案已設定為可使用 Docker Compose 進行生產環境部署。此方式會在獨立的容器中，分別編排 Angular SSR 應用程式和一個 Nginx 反向代理伺服器。

### 環境需求

- 您的機器上已安裝 [Docker](https://www.docker.com/get-started)。
- 您的機器上已安裝 [Docker Compose](https://docs.docker.com/compose/install/)（通常已包含在 Docker Desktop 中）。

### 架構說明

此部署由兩個服務組成：
1.  **`app`**：一個 Node.js 容器，負責建置並執行 Angular Universal (SSR) 應用程式。
2.  **`nginx`**：一個 Nginx 容器，作為反向代理。它會直接提供靜態檔案，並將動態頁面請求轉發到 `app` 服務。

### 設定檔說明

此設定由兩個關鍵檔案定義：

- **`Dockerfile`**：此檔案是為我們的 Angular SSR 應用程式（`app` 服務）建立 Docker 映像的藍圖。它會執行以下步驟：
    1.  從一個官方的 `node` 基礎映像開始。
    2.  複製 `package.json` 並安裝所有 `npm` 依賴。
    3.  將專案的其餘原始碼複製到映像中。
    4.  執行 `npm run build` 來編譯應用程式並產生 `dist` 資料夾。
    5.  設定預設指令（`CMD`）以啟動 Node.js 伺服器。

您不需要直接執行此檔案。當您執行 `docker-compose up --build` 指令時，Docker Compose 會自動使用它來建置 `app` 映像。

- **`docker-compose.yml`**：這是我們多容器環境的主要控制檔案。它告訴 Docker 如何執行並連接我們的服務：
    1.  它定義了 `app` 和 `nginx` 這兩個服務。
    2.  對於 `app` 服務，它指定使用當前目錄中的 `Dockerfile` 來建置映像（`build: .`）。
    3.  對於 `nginx` 服務，它指定使用 Docker Hub 上的官方 `nginx:alpine` 映像。
    4.  它設定了埠號映射，將您本機的 `localhost:8080` 流量轉發到 `nginx` 容器的 `80` 埠。
    5.  它管理 `volumes`，將您本機的 `nginx.conf` 設定檔和 `dist/ng-ssr/browser` 中的靜態資源掛載到 `nginx` 容器中。

此檔案是您用來管理整個應用程式堆疊的主要介面，需搭配 `docker-compose up` 和 `docker-compose down` 等指令使用。

### 執行步驟

請依照以下步驟部署應用程式：

**1. 建置 Angular 應用程式**

在建置 Docker 映像之前，您需要先建立包含瀏覽器和伺服器端程式碼的 `dist` 資料夾。Nginx 容器需要此資料夾中的瀏覽器靜態資源。

```bash
npm run build
```

**2. 使用 Docker Compose 啟動服務**

當 `dist` 資料夾準備就緒後，使用 Docker Compose 來建置應用程式映像並在背景啟動所有服務。

```bash
docker-compose up --build -d
```
- `up`：建立並啟動容器。
- `--build`：強制重新建置 `app` 映像。當您修改了 Angular 程式碼後，請使用此旗標。
- `-d`：在分離模式（背景）下執行容器。

**3. 驗證應用程式**

容器啟動後，請在瀏覽器中開啟：

[**http://localhost:8080**](http://localhost:8080)

應用程式應該能正常運作。初始頁面由伺服器端渲染，後續的導航則由客戶端處理。

### 管理部署

- **若要停止服務：**
  ```bash
  docker-compose down
  ```

- **若要檢視日誌：**
  ```bash
  # 檢視所有服務的日誌
  docker-compose logs -f

  # 檢視特定服務（例如 app）的日誌
  docker-compose logs -f app
  ```

## 執行單元測試

若要使用 [Karma](https://karma-runner.github.io) 執行單元測試，請使用以下指令：

```bash
ng test
```

## 執行端對端測試

若要進行端對端（e2e）測試，請執行：

```bash
ng e2e
```

Angular CLI 預設未包含端對端測試框架。您可以選擇適合您需求的框架。

## 更多資源

若要取得更多關於 Angular CLI 的資訊，包含詳細的指令參考，請造訪 [Angular CLI 總覽與指令參考](https://angular.dev/tools/cli) 頁面。
