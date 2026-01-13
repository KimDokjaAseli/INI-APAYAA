
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
  const [mood, setMood] = useState('Kangen Berat');

  const handleGenerate = async () => {
    setIsGenerating(true);
    const text = await generateRomanticLetter(mood, "Sayang");
    setLetter(text);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen relative pb-24 md:pb-0 selection:bg-red-100 selection:text-red-600 font-sans">
      <FloatingHearts />
      
      {/* Sidebar Navigation - Desktop */}
      <nav className="fixed left-0 top-0 h-full w-20 hidden md:flex flex-col items-center py-10 bg-white/70 backdrop-blur-2xl border-r border-red-50 z-50">
        <div className="mb-14 cursor-pointer hover:rotate-12 transition-transform" onClick={() => setActiveSection(AppSection.HOME)}>
          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
            ❤️
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {[
            { id: AppSection.HOME, icon: '🏠', label: 'Rumah Kita' },
            { id: AppSection.LETTERS, icon: '💌', label: 'Pesan Kangen' },
            { id: AppSection.COUPONS, icon: '🎟️', label: 'Kupon LDR' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`p-3 rounded-xl transition-all relative group ${
                activeSection === item.id 
                  ? 'bg-red-500 text-white scale-110 shadow-lg' 
                  : 'text-slate-400 hover:bg-red-50 hover:text-red-400'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <main className="md:ml-20 p-6 md:p-16 relative z-10 max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-romantic text-slate-800 mb-2">
            LDR Survival Kit
          </h1>
          <p className="text-slate-400 font-medium tracking-widest uppercase text-[10px] md:text-xs">
            Dibuat dengan ❤️ & sedikit rasa frustasi karena jauh
          </p>
        </header>

        {activeSection === AppSection.HOME && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <AnniversaryCounter />
            
            <section className="bg-white rounded-[2.5rem] p-1 shadow-2xl shadow-red-100/50 border border-red-50">
              <div className="bg-slate-900 rounded-[2.3rem] p-10 md:p-14 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    Jarak itu cuma <span className="text-red-500 italic">angka</span>, tapi kangennya <span className="underline decoration-pink-500 underline-offset-8">nyata</span>.
                  </h2>
                  <p className="opacity-70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                    "Makasih ya udah mau bertahan sejauh ini meskipun kita cuma bisa tatap-tatapan lewat layar. Web ini buat kamu, biar kalau lagi sepi ada yang bisa diliat."
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setActiveSection(AppSection.LETTERS)}
                      className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-red-500/20 active:scale-95"
                    >
                      Bikin Surat Random 💌
                    </button>
                    <button 
                      onClick={() => setActiveSection(AppSection.COUPONS)}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold transition-all"
                    >
                      Cek Kupon 🎟️
                    </button>
                  </div>
                </div>
                {/* Minimalist Visuals */}
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-10 right-10 text-8xl opacity-10 rotate-12 select-none">🌍</div>
              </div>
            </section>
          </div>
        )}

        {activeSection === AppSection.LETTERS && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl border border-red-50">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Pesan Rahasia</h2>
                <p className="text-slate-400 leading-relaxed">Pilih mood kamu hari ini, nanti Gemini (AI pinter tapi nggak sepinter aku) bakal bikinin pesannya.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-10">
                {['Kangen Berat', 'Lagi Ngambek', 'Mau VC Dong', 'Gabut Pol'].map(m => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-4 py-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                      mood === m 
                        ? 'bg-red-500 border-red-500 text-white shadow-lg' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-red-200 hover:text-red-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-black disabled:bg-slate-300 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isGenerating ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Lagi Ngerangkai Kata...
                  </>
                ) : (
                  'Generate Pesan ✨'
                )}
              </button>

              {letter && (
                <div className="mt-12 p-10 bg-red-50/30 rounded-[2.3rem] border-2 border-dashed border-red-100 relative animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <p className="text-slate-700 leading-relaxed font-romantic text-2xl md:text-3xl italic">
                    "{letter}"
                  </p>
                  <div className="mt-8 text-right">
                    <span className="text-red-500 font-bold text-sm tracking-widest uppercase">— Your Long Distance Human</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === AppSection.COUPONS && (
          <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-slate-800">Virtual Gift Shop</h2>
              <p className="text-slate-400 mt-4 leading-relaxed">
                Karena aku belum bisa kasih kado fisik setiap hari, ini ada beberapa "kupon" yang bisa kamu klaim. 
                Gunakan dengan bijak ya, Yang!
              </p>
            </div>
            <CouponSection />
          </div>
        )}
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[85%] md:hidden bg-slate-900/95 backdrop-blur-xl rounded-[2rem] h-20 flex items-center justify-around z-50 px-6 shadow-2xl">
        {[
          { id: AppSection.HOME, icon: '🏠' },
          { id: AppSection.LETTERS, icon: '💌' },
          { id: AppSection.COUPONS, icon: '🎟️' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all ${
              activeSection === item.id 
                ? 'bg-red-500 text-white -translate-y-6 shadow-2xl ring-8 ring-slate-900/10' 
                : 'text-slate-500'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
