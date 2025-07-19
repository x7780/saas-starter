import os
import json
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from binance.client import Client
from sklearn.metrics import r2_score

# ======== Binance API 初始化 ========
api_key = ''
api_secret = ''
client = Client(api_key, api_secret)

# ======== 参数配置 ========
TIMEFRAME = '1d'
SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT']

COIN_BIRTHDAYS = {
    'BTCUSDT': pd.to_datetime('2009-01-03'),
    'ETHUSDT': pd.to_datetime('2015-07-30'),
    'BNBUSDT': pd.to_datetime('2017-11-06'),
    'SOLUSDT': pd.to_datetime('2020-03-23'),
}

# ======== JSON 工具函数 ========
def get_latest_date(symbol, timeframe):
    json_path = f"{symbol}.json"
    if not os.path.exists(json_path):
        return None
    
    with open(json_path, 'r') as f:
        data = json.load(f)
        if data:
            return pd.to_datetime(data[-1]['date'])
    return None

def save_df_to_json(df, symbol, timeframe):
    json_path = f"{symbol}.json"
    df['date'] = df['date'].astype(str)  # 转换日期为字符串格式
    
    if os.path.exists(json_path):
        with open(json_path, 'r') as f:
            existing_data = json.load(f)
        combined_data = existing_data + df.to_dict('records')
    else:
        combined_data = df.to_dict('records')
    
    with open(json_path, 'w') as f:
        json.dump(combined_data, f, indent=2)

def load_full_data(symbol, timeframe):
    json_path = f"{symbol}.json"
    if not os.path.exists(json_path):
        return pd.DataFrame()
    
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    df = pd.DataFrame(data)
    df['date'] = pd.to_datetime(df['date'])
    return df

# ======== Binance K线下载 ========
def fetch_binance_klines(symbol, limit=1000):
    """获取指定交易对的最新K线数据，默认获取1000条"""
    klines = client.get_klines(
        symbol=symbol,
        interval=Client.KLINE_INTERVAL_1DAY,
        limit=limit
    )

    if not klines:
        return pd.DataFrame()

    df = pd.DataFrame(klines, columns=[
        'timestamp', 'open', 'high', 'low', 'close', 'volume', 'close_time',
        'qav', 'num_trades', 'taker_base_vol', 'taker_quote_vol', 'ignore'
    ])
    df['date'] = pd.to_datetime(df['timestamp'], unit='ms')
    df = df[['date', 'open', 'high', 'low', 'close']]
    df[['open', 'high', 'low', 'close']] = df[['open', 'high', 'low', 'close']].astype(float)
    return df

# ======== 指标计算 ========
def calculate_geomean(prices, window=200):
    log_prices = np.log(prices)
    rolling_log_means = log_prices.rolling(window=window, min_periods=window).mean()
    return np.exp(rolling_log_means)

def calculate_exp_growth(df_all, birthdate, symbol, window=1000):
    df_fit = df_all[df_all['date'] >= birthdate].copy()

    if len(df_fit) > window:
        df_fit = df_fit.iloc[-window:]

    df_fit['days_since_birth'] = (df_fit['date'] - birthdate).dt.total_seconds() / (24 * 3600)
    df_fit['days_since_birth'] = df_fit['days_since_birth'].clip(lower=1)

    log_days = np.log10(df_fit['days_since_birth'])
    log_price = np.log10(df_fit['close'])
    valid = (log_days > 0) & (log_price > 0)

    if valid.sum() < window:
        print(f"Symbol: {symbol} 数据不足 {window} 天，跳过拟合")
        return pd.Series(np.nan, index=df_all.index)

    slope, intercept = np.polyfit(log_days[valid], log_price[valid], 1)
    r2 = r2_score(log_price[valid], slope * log_days + intercept)
    print(f"Symbol: {symbol}, Slope: {slope:.4f}, Intercept: {intercept:.4f}, R²: {r2:.4f}")

    days_since_birth_all = (df_all['date'] - birthdate).dt.total_seconds() / (24 * 3600)
    days_since_birth_all = days_since_birth_all.clip(lower=1)
    log_days_all = np.log10(days_since_birth_all)
    exp_val = 10 ** (slope * log_days_all + intercept)

    return pd.Series(exp_val.values, index=df_all.index)

def calculate_ahr999(df):
    for col in ['open', 'high', 'low', 'close']:
        df[f'{col}_ahr999'] = ((df[col] / df['geomean']) * (df[col] / df['exp_growth'])).round(2)
    return df

def calculate_price_changes(df):
    """计算价格变化 change, changePercent 和 isPositive"""
    df['change'] = df['open'].diff()  # 当前开盘价与前一天的差值
    df['changePercent'] = (df['change'] / df['open'].shift(1)) * 100  # 计算百分比变化
    df['isPositive'] = df['change'] > 0  # 判断是涨还是跌
    
    # 格式化 change 和 changePercent
    df['change'] = df['change'].round(6)
    df['changePercent'] = df['changePercent'].round(2)
    
    return df

# ======== 主程序入口 ========
if __name__ == "__main__":
    for symbol in SYMBOLS:
        print(f"\n=== 处理交易对: {symbol} ===")

        # 直接获取最新的1000条数据
        new_data = fetch_binance_klines(symbol)
        
        if new_data.empty:
            print(f"{symbol} 无新数据")
            continue

        # 只保留最新的1000条数据
        full_data = new_data.sort_values('date').reset_index(drop=True)
        full_data = full_data.iloc[-1000:] if len(full_data) > 1000 else full_data

        # 计算指标
        full_data['geomean'] = calculate_geomean(full_data['close'], window=200)
        full_data['exp_growth'] = calculate_exp_growth(full_data, COIN_BIRTHDAYS[symbol], symbol, window=1000)
        full_data = calculate_ahr999(full_data)
        full_data = calculate_price_changes(full_data)  # 新增：计算价格变化

        # 准备最终数据
        final_data = full_data[['date', 'open', 'open_ahr999', 'change', 'changePercent', 'isPositive']]
        final_data = final_data.rename(columns={'open_ahr999': 'ahr'})
        final_data = final_data.dropna()  # 过滤空值

        save_df_to_json(final_data, symbol, TIMEFRAME)
        print(f"{symbol} 最新1000条数据已保存到 {symbol}.json")