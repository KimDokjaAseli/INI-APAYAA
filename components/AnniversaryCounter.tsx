
import React, { useState, useEffect } from 'react';
import { ANNIVERSARY_DATE } from '../constants';

const AnniversaryCounter: React.FC = () => {
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(ANNIVERSARY_DATE).getTime();
      const now = new Date().getTime();
      const diff = now - start;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimePassed({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-red-100 text-center transition-all hover:scale-105">
      <h3 className="text-red-500 font-semibold mb-4 uppercase tracking-wider text-sm">Waktu Bersamamu</h3>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Hari', value: timePassed.days },
          { label: 'Jam', value: timePassed.hours },
          { label: 'Menit', value: timePassed.minutes },
          { label: 'Detik', value: timePassed.seconds }
        ].map(item => (
          <div key={item.label} className="flex flex-col">
            <span className="text-3xl md:text-4xl font-bold text-slate-800">{item.value}</span>
            <span className="text-xs text-slate-500 uppercase">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-slate-600 italic">"Setiap detik bersamamu adalah anugerah terindah."</p>
    </div>
  );
};

export default AnniversaryCounter;
