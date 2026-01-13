
import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import AnniversaryCounter from './components/AnniversaryCounter';
import CouponSection from './components/CouponSection';
import { generateRomanticLetter } from './services/geminiService';
import { AppSection } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [letter, setLetter] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Directly generate a random funny/romantic message
    const text = await generateRomanticLetter("Sayang");
    setLetter(text);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen relative pb-28 md:pb-0 selection:bg-red-100 selection:text-red-600 font-sans bg-[#fff5f5]">
      <FloatingHearts />
      
      {/* Navigation - Sidebar (Desktop) */}
      <nav className="fixed left-0 top-0 h-full w-24 hidden md:flex flex-col items-center py-12 bg-white/40 backdrop-blur-2xl border-r border-red-100/50 z-50">
        <div 
          className="mb-16 cursor-pointer hover:scale-110 transition-transform active:rotate-12" 
          onClick={() => setActiveSection(AppSection.HOME)}
        >
          <div className="w-14 h-14 bg-gradient-to-tr from-red-500 to-pink-500 rounded-[1.2rem] flex items-center justify-center text-white text-3xl shadow-xl shadow-red-200">
            ❤️
          </div>
        </div>
        <div className="flex flex-col gap-12">
          {[
            { id: AppSection.HOME, icon: '🏠', label: 'Home' },
            { id: AppSection.LETTERS, icon: '💌', label: 'Pesan' },
            { id: AppSection.COUPONS, icon: '🎟️', label: 'Kupon' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`p-4 rounded-2xl transition-all relative group ${
                activeSection === item.id 
                  ? 'bg-red-500 text-white scale-110 shadow-2xl shadow-red-500/40' 
                  : 'text-slate-400 hover:bg-white hover:text-red-500 shadow-sm'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="absolute left-full ml-6 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none translate-x-2 group-hover:translate-x-0">
                {item.label.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <main className="md:ml-24 p-6 md:p-20 relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-romantic text-slate-800 mb-4 drop-shadow-sm">
            LDR Survival Kit
          </h1>
          <p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs bg-white/50 inline-block px-4 py-1 rounded-full border border-red-50">
            Self-Contained • Love.exe • Virtual Relationship
          </p>
        </header>

        {activeSection === AppSection.HOME && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <AnniversaryCounter />
            
            <section className="bg-white rounded-[3rem] p-1 shadow-[0_32px_64px_-16px_rgba(255,182,193,0.4)] border border-white">
              <div className="bg-[#1a1a1a] rounded-[2.8rem] p-12 md:p-20 text-white relative overflow-hidden">
                <div className="relative z-10 max-w-3xl">
                  <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1]">
                    Jarak cuma <span className="text-red-500 italic">jarak</span>, tapi kangennya <span className="underline decoration-pink-500 underline-offset-[12px] decoration-4">u-limit</span>.
                  </h2>
                  <p className="text-slate-400 text-xl md:text-2xl leading-relaxed mb-12 font-light italic">
                    "Web ini isinya cuma hal-hal kecil biar kamu nggak lupa kalau ada orang di sini yang nungguin kabar kamu setiap hari. No backend, just feelings."
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <button 
                      onClick={() => setActiveSection(AppSection.LETTERS)}
                      className="bg-red-500 hover:bg-red-600 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-red-500/30 active:scale-95 flex items-center gap-3"
                    >
                      Buka Pesan Acak 💌
                    </button>
                    <button 
                      onClick={() => setActiveSection(AppSection.COUPONS)}
                      className="bg-white/5 hover:bg-white/10 text-white border-2 border-white/10 px-10 py-5 rounded-2xl font-black text-lg transition-all backdrop-blur-sm"
                    >
                      Klaim Hadiah 🎟️
                    </button>
                  </div>
                </div>
                {/* Background Decor */}
                <div className="absolute -right-40 -bottom-40 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-20 right-20 text-[12rem] opacity-[0.03] rotate-12 select-none font-bold">LDR</div>
              </div>
            </section>
          </div>
        )}

        {activeSection === AppSection.LETTERS && (
          <div className="max-w-3xl mx-auto space-y-10 animate-in zoom-in-95 duration-500">
            <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl border border-red-50 text-center">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-slate-800 mb-4">Pesan Rahasia</h2>
                <p className="text-slate-400 text-lg">Lagi kangen? Gabut? Klik tombol di bawah biar AI (alias asisten pribadiku) ngerandom kata-kata buat kamu.</p>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="group relative w-full bg-slate-900 text-white py-8 rounded-[2rem] font-black text-2xl shadow-2xl shadow-slate-200 hover:bg-black disabled:bg-slate-300 transition-all flex items-center justify-center gap-4 active:scale-[0.97]"
              >
                {isGenerating ? (
                  <>
                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Menenun Rindu...</span>
                  </>
                ) : (
                  <>
                    <span className="group-hover:rotate-12 transition-transform">✨</span>
                    <span>Buka Pesan Baru</span>
                    <span className="group-hover:-rotate-12 transition-transform">✨</span>
                  </>
                )}
              </button>

              {letter && (
                <div className="mt-16 p-12 bg-red-50/20 rounded-[3rem] border-4 border-dashed border-red-100/50 relative animate-in fade-in slide-in-from-bottom-6 duration-1000 group">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full border border-red-100 text-red-500 font-black text-xs uppercase tracking-[0.2em] shadow-sm">
                    Surat Terkirim
                  </div>
                  <p className="text-slate-700 leading-relaxed font-romantic text-3xl md:text-4xl italic mb-10">
                    "{letter}"
                  </p>
                  <div className="flex items-center justify-center gap-6 opacity-60">
                    <div className="h-[2px] w-12 bg-red-200 rounded-full"></div>
                    <span className="text-red-500 font-black text-xs tracking-widest uppercase">Love Across Screens</span>
                    <div className="h-[2px] w-12 bg-red-200 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === AppSection.COUPONS && (
          <div className="space-y-12 animate-in slide-in-from-right-10 duration-500">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">Virtual Gift Shop</h2>
              <p className="text-slate-400 text-xl leading-relaxed font-medium">
                Karena belum bisa kasih kado fisik tiap hari, ini ada stok kupon "ajaib" yang bisa kamu klaim. 
                Tinggal screenshot terus tagih ke aku ya! 
              </p>
            </div>
            <CouponSection />
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:hidden bg-[#1a1a1a]/95 backdrop-blur-2xl rounded-[2.5rem] h-24 flex items-center justify-around z-50 px-8 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] border border-white/10">
        {[
          { id: AppSection.HOME, icon: '🏠' },
          { id: AppSection.LETTERS, icon: '💌' },
          { id: AppSection.COUPONS, icon: '🎟️' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-16 h-16 flex items-center justify-center rounded-[1.3rem] transition-all duration-300 ${
              activeSection === item.id 
                ? 'bg-red-500 text-white -translate-y-8 shadow-2xl shadow-red-500/50 scale-110 rotate-[360deg]' 
                : 'text-slate-500 hover:text-white active:scale-90'
            }`}
          >
            <span className="text-3xl">{item.icon}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
