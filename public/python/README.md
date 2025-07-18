## 工作原理：
因为使用的是https://vercel.com/免费空间，每次更新https://github.com/都会同步，
所以我们每日更新一次计算一次数字币，缓存到JSON。这样每日都能更新今日数字市场价格，非常完美的想法。

## 安装虚拟环境包
sudo apt install python3-pip
sudo apt install python3-venv
## 创建虚拟环境
python3 -m venv venv
## 进入虚拟环境
source venv/bin/activate
## 执行命令
python3 ahr.py