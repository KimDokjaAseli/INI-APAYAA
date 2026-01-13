
import React, { useState } from 'react';
import { INITIAL_COUPONS } from '../constants';
import { LoveCoupon } from '../types';

const CouponSection: React.FC = () => {
  const [coupons, setCoupons] = useState<LoveCoupon[]>(INITIAL_COUPONS);

  const redeem = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, isRedeemed: true } : c));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {coupons.map(coupon => (
        <div 
          key={coupon.id} 
          className={`relative p-6 rounded-2xl border-2 transition-all overflow-hidden ${
            coupon.isRedeemed 
              ? 'bg-slate-100 border-slate-200 grayscale' 
              : 'bg-white border-pink-100 hover:shadow-lg hover:-translate-y-1'
          }`}
        >
          <div className="flex items-start gap-4">
            <span className="text-4xl">{coupon.icon}</span>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">{coupon.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{coupon.description}</p>
            </div>
          </div>
          
          <button
            onClick={() => !coupon.isRedeemed && redeem(coupon.id)}
            disabled={coupon.isRedeemed}
            className={`mt-4 w-full py-2 rounded-xl text-sm font-semibold transition-colors ${
              coupon.isRedeemed 
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                : 'bg-red-500 text-white hover:bg-red-600 shadow-md'
            }`}
          >
            {coupon.isRedeemed ? 'Sudah Digunakan' : 'Klaim Sekarang'}
          </button>

          {coupon.isRedeemed && (
            <div className="absolute top-2 right-2 rotate-12">
              <span className="px-2 py-1 bg-red-100 text-red-500 text-[10px] font-bold border border-red-500 rounded uppercase">REDEEMED</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CouponSection;
