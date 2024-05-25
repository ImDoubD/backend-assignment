import mongoose from 'mongoose';

interface ITrade {
  user_id: string;
  utc_time: Date;
  operation: 'Buy' | 'Sell';
  market: string;
  amount: number;
  price: number;
}

const tradeSchema = new mongoose.Schema<ITrade>({
  user_id: { type: String, index: true },
  utc_time: { type: Date, index: true },
  operation: { type: String, enum: ['Buy', 'Sell'] },
  market: String,
  amount: Number,
  price: Number
});

const Trade = mongoose.model<ITrade>('Trade', tradeSchema);
export default Trade;














