
import React, { useState, useEffect } from 'react';
import { INITIAL_COUPONS } from '../constants';
import { LoveCoupon } from '../types';

const CouponSection: React.FC = () => {
  const [coupons, setCoupons] = useState<LoveCoupon[]>([]);

  useEffect(() => {
    const savedCoupons = localStorage.getItem('heart_sync_coupons');
    if (savedCoupons) {
      setCoupons(JSON.parse(savedCoupons));
    } else {
      setCoupons(INITIAL_COUPONS);
    }
  }, []);

  const redeem = (id: string) => {
    const updated = coupons.map(c => c.id === id ? { ...c, isRedeemed: true } : c);
    setCoupons(updated);
    localStorage.setItem('heart_sync_coupons', JSON.stringify(updated));
    
    // Optional: Trigger a small feedback like alert
    alert("Kupon berhasil diklaim! Screenshot ini terus kirim ke aku ya! 😉");
  };

  const resetCoupons = () => {
    if (confirm("Yakin mau reset semua kupon? Nanti bisa dipake lagi lho...")) {
      setCoupons(INITIAL_COUPONS);
      localStorage.removeItem('heart_sync_coupons');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map(coupon => (
          <div 
            key={coupon.id} 
            className={`relative p-8 rounded-[2rem] border-2 transition-all duration-300 overflow-hidden ${
              coupon.isRedeemed 
                ? 'bg-slate-50 border-slate-200 opacity-80' 
                : 'bg-white border-red-50 hover:border-red-200 hover:shadow-2xl hover:shadow-red-100 hover:-translate-y-2'
            }`}
          >
            <div className="flex items-start gap-6">
              <div className={`text-5xl p-4 rounded-2xl ${coupon.isRedeemed ? 'bg-slate-200 grayscale' : 'bg-red-50'}`}>
                {coupon.icon}
              </div>
              <div className="flex-1 pt-2">
                <h4 className={`text-xl font-bold ${coupon.isRedeemed ? 'text-slate-400' : 'text-slate-800'}`}>
                  {coupon.title}
                </h4>
                <p className={`text-sm mt-2 leading-relaxed ${coupon.isRedeemed ? 'text-slate-400' : 'text-slate-600'}`}>
                  {coupon.description}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => !coupon.isRedeemed && redeem(coupon.id)}
              disabled={coupon.isRedeemed}
              className={`mt-8 w-full py-4 rounded-2xl text-sm font-bold tracking-wider uppercase transition-all ${
                coupon.isRedeemed 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200 active:scale-95'
              }`}
            >
              {coupon.isRedeemed ? 'Sudah Terpakai' : 'Ambil Kupon'}
            </button>

            {coupon.isRedeemed && (
              <div className="absolute top-4 right-4 rotate-12 pointer-events-none">
                <span className="px-3 py-1 bg-red-100 text-red-500 text-[10px] font-black border-2 border-red-500 rounded-lg uppercase tracking-tighter">
                  VOIDED
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <button 
          onClick={resetCoupons}
          className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2"
        >
          <span>🔄</span> Reset Semua Kupon
        </button>
      </div>
    </div>
  );
};

export default CouponSection;
