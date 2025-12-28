
import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, HealthMetrics, DietPlan, FoodItem, FoodCategory } from '../types';
import { generateDietPlan } from '../services/geminiService';

interface DietSectionProps {
  profile: UserProfile;
  metrics: HealthMetrics;
}

const DietSection: React.FC<DietSectionProps> = ({ profile, metrics }) => {
  const [plan, setPlan] = useState<DietPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState("Sourcing local ingredients...");

  const fetchAiPlan = useCallback(async (force: boolean = false) => {
    // Check cache first
    const cacheKey = `fitnation_diet_${profile.country}_${profile.goal}_${profile.dietPreference}`;
    const cached = localStorage.getItem('fitnation_cached_diet');
    const cachedData = cached ? JSON.parse(cached) : null;

    if (!force && cachedData && cachedData.key === cacheKey) {
      setPlan(cachedData.plan);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setStatusText("Analyzing " + profile.country + " food habits...");
    
    try {
      const aiPlan = await generateDietPlan(profile, metrics);
      if (aiPlan) {
        setPlan(aiPlan);
        localStorage.setItem('fitnation_cached_diet', JSON.stringify({
          key: cacheKey,
          plan: aiPlan,
          timestamp: Date.now()
        }));
      } else {
        throw new Error("Failed to generate plan");
      }
    } catch (err) {
      console.error(err);
      setError("We couldn't generate your AI diet plan right now. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [profile, metrics]);

  useEffect(() => {
    fetchAiPlan();
  }, [fetchAiPlan]);

  useEffect(() => {
    if (loading) {
      const statuses = [
        "Sourcing local ingredients...",
        "Analyzing " + profile.country + " food habits...",
        "Balancing macros for " + profile.goal + "...",
        "Finalizing your affordable plan...",
        "Applying " + profile.dietPreference + " preferences..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        setStatusText(statuses[i % statuses.length]);
        i++;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading, profile]);

  const calculateMealMacros = (items: FoodItem[]) => {
    return items.reduce((acc, item) => ({
      p: acc.p + item.protein,
      c: acc.c + item.carbs,
      f: acc.f + item.fats,
      cal: acc.cal + item.calories
    }), { p: 0, c: 0, f: 0, cal: 0 });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <div className="w-24 h-24 bg-indigo-100 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-xl shadow-indigo-50">
          <svg className="w-12 h-12 text-indigo-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">Chef FitNation is Cooking...</h3>
        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">{statusText}</p>
        <div className="w-48 h-1.5 bg-indigo-50 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-indigo-600 animate-progress"></div>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
           <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </div>
        <h3 className="text-lg font-black text-slate-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-sm text-slate-500 mb-6">{error}</p>
        <button 
          onClick={() => fetchAiPlan(true)}
          className="px-8 py-4 bg-indigo-600 text-white font-black rounded-3xl shadow-lg shadow-indigo-100 active:scale-95 transition-all"
        >
          RETRY GENERATION
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700 pb-10">
      <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 C 20 0 50 0 100 100" stroke="white" fill="transparent" />
          </svg>
        </div>
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black mb-1">AI {profile.country} Plan</h2>
        <p className="text-[11px] opacity-80 font-black uppercase tracking-[0.25em]">Precision Nutrition for {profile.name}</p>
      </div>

      <div className="space-y-6">
        {(Object.keys(plan) as Array<keyof DietPlan>).map((mealKey) => {
          const items = plan[mealKey];
          const mealMacros = calculateMealMacros(items);
          const icons: Record<string, string> = { breakfast: '🍳', lunch: '🍛', snacks: '🍌', dinner: '🍗' };

          return (
            <div key={mealKey} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:scale-[1.01] duration-300">
              <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:bg-indigo-50 transition-colors">
                    {icons[mealKey]}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">{mealKey}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Nutrition Focus: {items[0]?.category}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-black text-slate-800">{mealMacros.cal} <span className="text-[10px] text-slate-400">kcal</span></span>
                  <div className="flex gap-1.5 mt-1">
                    <MacroBadge label="P" value={mealMacros.p} color="bg-rose-50 text-rose-600" />
                    <MacroBadge label="C" value={mealMacros.c} color="bg-emerald-50 text-emerald-600" />
                    <MacroBadge label="F" value={mealMacros.f} color="bg-amber-50 text-amber-600" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-5">
                {items.map((item, idx) => (
                  <div key={`${mealKey}-${item.id || idx}`} className="flex justify-between items-center group/item">
                    <div className="flex items-center gap-5">
                      <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)] group-hover/item:scale-125 transition-transform"></div>
                      <div>
                        <p className="text-base font-black text-slate-700 leading-tight">{item.name}</p>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">
                          {item.serving} • <span className="text-indigo-600">{item.calories} KCAL</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.3em] mb-4 text-center">Daily AI Summary</p>
        <div className="flex justify-around items-center">
           <div className="text-center">
              <p className="text-2xl font-black text-white">{metrics.macros.protein}g</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Target Protein</p>
           </div>
           <div className="w-px h-10 bg-slate-800"></div>
           <div className="text-center">
              <p className="text-2xl font-black text-indigo-400">{metrics.dailyCalories}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Kcal Goal</p>
           </div>
           <div className="w-px h-10 bg-slate-800"></div>
           <div className="text-center">
              <p className="text-2xl font-black text-white">{metrics.macros.carbs}g</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Target Carbs</p>
           </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button 
          onClick={() => fetchAiPlan(true)}
          className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors py-2 px-4 border border-slate-200 rounded-xl"
        >
          Regenerate AI Plan
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          width: 200%;
          animation: progress 2s linear infinite;
        }
      `}} />
    </div>
  );
};

const MacroBadge: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className={`px-2 py-0.5 rounded-lg text-[9px] font-black flex items-center gap-1 ${color} border border-current border-opacity-10`}>
    <span>{label}</span>
    <span>{Math.round(value)}g</span>
  </div>
);

export default DietSection;
