# 深大课表

这是一款专为深大同学开发的课表 App，由这很深大公众号团队开发。并且将源代码开源。

本 App 是用 Cordova 搭建的 Hybrid App，App 端采用了 Vue+Vue-Router+Vuex 的搭配。

## 使用

你可以直接到 Releases 下载已经打包好的 Android 程序，也可以将本项目 `clone` 到本地，编译安装本应用。

### 直接下载

[点击进入 Releases](https://github.com/heyszu/szuschedule-app/releases) 下载对应版本的 .apk 文件，然后发送到手机上安装即可。

### 编译安装

#### 必要环境

- Java 环境（[JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)）
- Android 开发环境（[SDK](https://developer.android.com/studio/index.html)）
- NodeJS 环境（>= 6.0，[NodeJS](http://nodejs.org/)）

#### 开始项目

1. 安装 `cordova`

   ```bash
   npm i -g cordova
   ```

2. `clone` 本项目到你自己的电脑上

   ```bash
   git clone git@github.com:heyszu/szuschedule-app.git
   ```

3. 切换到项目目录，安装依赖

   ```bash
   cd szuschedule-app/app
   npm i
   ```

4. 生成密钥

   ```bash
   cd szuschedule-app
   keytool -genkey -alias iszu.schedule.keystore -keyalg RSA -validity 20000 -keystore iszu.schedule.keystore
   ```

   *记住修改 `build.json` 里 password 为你的密钥密码。*

5. 在 8080 端口启动本地开发项目

   ```bash
   cd szuschedule-app/app
   npm run dev
   ```

6. 在手机上打包测试

   ```bash
   cordova run android
   ```

### 打包项目

```bash
cordova build android
```

## 开源证书

[MIT License](http://jas0ncn.mit-license.org/)