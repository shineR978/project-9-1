## 課程內容

- 學生用戶可以進行**搜尋課程**、**取消課程**及**註冊課程**
- 講師用戶可以去**新增課程**、**修改課程**及**刪除課程**
- 新用戶可以去**註冊會員**

## 開發工具

###### 這是一個全棧開發項目，使用 MongoDB 和 Node.js 作為後端開發。後端 API 通過 Postman 進行測試和管理。前端部分採用 React 進行開發，並使用 Bootstrap 來設計和美化 CSS 樣式。這樣的技術組合確保了應用程序的高效運行和優雅的用戶界面。

## 執行專案需要的環境

> 下載 MongoDB 7.0 版本 [MongoDB Community Server Download](https://www.mongodb.com/try/download/community)
> 在命令提示字元輸入 mongosh 可查詢版本

#

### 分別在 client 與 server 資料夾安裝 nodemon

```
npm install --save-dev nodemon
```

### 使用學生與講師的腳本登入資料

```
npm run import-accounts
```

### 啟動 client 與 server 伺服器

###### client

```
npm start
```

###### server

```
nodemon .\index.js
```

###### 已建立的課程(搜尋課程)

- 2024\_入門課程
- 讓自己更有效率
