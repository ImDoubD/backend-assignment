import Trade from './model';
import csv from 'csv-parser';
import fs from 'fs';


export const parseCSV = (csvFilePath: string): Promise<any[]> => {
  const results: any[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        console.log("upload error: ",error);
        reject(error)
    });
  });
};

export const saveTrades = async (tradeData: any[]): Promise<void> => {
  await Trade.insertMany(tradeData);
};

export const calculateBalance = async (timestamp: string): Promise<Record<string, number>> => {
  const trades = await Trade.find({ utc_time: { $lte: new String(timestamp) } });
  const balance: Record<string, number> = {};
  trades.forEach((trade) => {
    const [base, _] = trade.market.split('/');
    if (!balance[base]) balance[base] = 0;
    if(trade.operation === 'Buy'){
        balance[base] += trade.amount;
    } else {
        balance[base] += -trade.amount;
    }
  });
  return balance;
};





























