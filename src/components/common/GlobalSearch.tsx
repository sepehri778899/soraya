import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { toPersianDigits } from '../../utils/persianUtils';
import {
  Search,
  X,
  Users,
  GraduationCap,
  BookOpen,
  Repeat,
  ArrowLeft,
  Command,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

interface GlobalSearchProps {
  compactOnMobile?: boolean;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ compactOnMobile = true }) => {
  const navigate = useNavigate();
  const { role, persons, coaches, trainingTopics, needsAndServices, categories } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'workforce' | 'coach' | 'training' | 'services'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  const cleanQuery = query.trim().toLowerCase();

  // Search in Workforce
  const matchedWorkforce = !cleanQuery
    ? []
    : persons
        .filter(p => (role === 'visitor' ? p.status === 'approved' : true))
        .filter(p => {
          const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
          return (
            fullName.includes(cleanQuery) ||
            p.talents.some(t => t.toLowerCase().includes(cleanQuery)) ||
            p.skills.some(s => s.toLowerCase().includes(cleanQuery)) ||
            p.birthPlace.toLowerCase().includes(cleanQuery) ||
            p.bio.toLowerCase().includes(cleanQuery)
          );
        });

  // Search in Coaches
  const matchedCoaches = !cleanQuery
    ? []
    : coaches
        .filter(c => (role === 'visitor' ? c.status === 'approved' : true))
        .filter(c => {
          const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
          return (
            fullName.includes(cleanQuery) ||
            c.specialties.some(s => s.toLowerCase().includes(cleanQuery)) ||
            c.teachableSubjects.some(sub => sub.toLowerCase().includes(cleanQuery)) ||
            c.birthPlace.toLowerCase().includes(cleanQuery) ||
            c.bio.toLowerCase().includes(cleanQuery)
          );
        });

  // Search in Training Topics
  const matchedTraining = !cleanQuery
    ? []
    : trainingTopics
        .filter(t => (role === 'visitor' ? t.status === 'published' : true))
        .filter(t => {
          const cat = categories.find(c => c.id === t.categoryId)?.title.toLowerCase() || '';
          return (
            t.title.toLowerCase().includes(cleanQuery) ||
            t.shortDescription.toLowerCase().includes(cleanQuery) ||
            t.targetAudience.toLowerCase().includes(cleanQuery) ||
            cat.includes(cleanQuery) ||
            t.level.toLowerCase().includes(cleanQuery)
          );
        });

  // Search in Needs and Services
  const matchedServices = !cleanQuery
    ? []
    : needsAndServices.filter(item => {
        return (
          item.title.toLowerCase().includes(cleanQuery) ||
          item.description.toLowerCase().includes(cleanQuery) ||
          item.specialty.toLowerCase().includes(cleanQuery) ||
          item.tags.some(t => t.toLowerCase().includes(cleanQuery)) ||
          item.submitterName.toLowerCase().includes(cleanQuery)
        );
      });

  const totalResultsCount =
    matchedWorkforce.length + matchedCoaches.length + matchedTraining.length + matchedServices.length;

  const handleSelect = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Trigger Button in Header */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 border border-stone-200/90 text-stone-600 hover:text-stone-900 transition-all text-xs group"
        title="جستجوی پیشرفته در سامانه"
        aria-label="جستجوی پیشرفته"
      >
        <Search className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-800 transition-colors" />
        <span className="font-medium text-stone-700 group-hover:text-stone-900">
          جستجوی پیشرفته
        </span>
      </button>

      {/* Global Search Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
          <div
            className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl flex flex-col overflow-hidden max-h-[85vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Box */}
            <div className="p-3.5 sm:p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50/50">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="نام نیرو، تخصص مربی، عنوان سرفصل، مهارت یا نیاز..."
                className="flex-1 bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-lg hover:bg-stone-200/70 text-stone-400 hover:text-stone-700 transition-colors"
                  aria-label="پاک کردن"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="px-2.5 py-1 text-xs font-semibold text-stone-500 hover:text-stone-800 bg-stone-200/60 hover:bg-stone-200 rounded-lg transition-colors shrink-0"
              >
                بستن
              </button>
            </div>

            {/* Category Filter Pills (if query entered) */}
            {cleanQuery && totalResultsCount > 0 && (
              <div className="px-4 py-2 border-b border-stone-100 flex items-center gap-1.5 overflow-x-auto text-xs bg-stone-50/30">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-medium shrink-0 ${
                    activeCategory === 'all'
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  همه ({toPersianDigits(totalResultsCount)})
                </button>
                {matchedWorkforce.length > 0 && (
                  <button
                    onClick={() => setActiveCategory('workforce')}
                    className={`px-2.5 py-1 rounded-lg transition-colors font-medium shrink-0 flex items-center gap-1 ${
                      activeCategory === 'workforce'
                        ? 'bg-[#1e7046] text-white'
                        : 'text-stone-600 hover:bg-emerald-50'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    نیروها ({toPersianDigits(matchedWorkforce.length)})
                  </button>
                )}
                {matchedCoaches.length > 0 && (
                  <button
                    onClick={() => setActiveCategory('coach')}
                    className={`px-2.5 py-1 rounded-lg transition-colors font-medium shrink-0 flex items-center gap-1 ${
                      activeCategory === 'coach'
                        ? 'bg-[#1d4ed8] text-white'
                        : 'text-stone-600 hover:bg-blue-50'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    مربیان ({toPersianDigits(matchedCoaches.length)})
                  </button>
                )}
                {matchedTraining.length > 0 && (
                  <button
                    onClick={() => setActiveCategory('training')}
                    className={`px-2.5 py-1 rounded-lg transition-colors font-medium shrink-0 flex items-center gap-1 ${
                      activeCategory === 'training'
                        ? 'bg-[#6d28d9] text-white'
                        : 'text-stone-600 hover:bg-purple-50'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    سرفصل‌های آموزشی ({toPersianDigits(matchedTraining.length)})
                  </button>
                )}
                {matchedServices.length > 0 && (
                  <button
                    onClick={() => setActiveCategory('services')}
                    className={`px-2.5 py-1 rounded-lg transition-colors font-medium shrink-0 flex items-center gap-1 ${
                      activeCategory === 'services'
                        ? 'bg-[#925807] text-white'
                        : 'text-stone-600 hover:bg-amber-50'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    نیازها و خدمات ({toPersianDigits(matchedServices.length)})
                  </button>
                )}
              </div>
            )}

            {/* Results List */}
            <div className="overflow-y-auto p-3 sm:p-4 divide-y divide-stone-100 flex-1 space-y-3">
              {!cleanQuery ? (
                <div className="py-10 text-center space-y-2 text-stone-500">
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-500 flex items-center justify-center mx-auto mb-2">
                    <Search className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-stone-800">
                    جست‌وجوی جامع در پایگاه «سمت ثریا»
                  </p>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    می‌توانید نام نیروهای مستعد، اساتید و مربیان، عنوان دوره‌های آموزشی یا مهارت‌ها را تایپ فرمایید.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
                    <span className="text-[11px] text-stone-600">جست‌وجوهای متداول:</span>
                    {['تدوین ویدیو', 'فن بیان', 'سناریونویسی', 'مستندسازی', 'صادقی', 'کاظمی'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : totalResultsCount === 0 ? (
                <div className="py-10 text-center space-y-2 text-stone-500">
                  <p className="text-sm font-bold text-stone-800">
                    موردی منطبق با «{query}» یافت نشد
                  </p>
                  <p className="text-xs text-stone-500">
                    لطفاً عبارت دیگری را جست‌وجو کرده یا از کلمات کلیدی کلی‌تر استفاده کنید.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Workforce results */}
                  {(activeCategory === 'all' || activeCategory === 'workforce') &&
                    matchedWorkforce.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-bold text-[#1e7046] flex items-center gap-1 px-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>نیروهای مستعد ({toPersianDigits(matchedWorkforce.length)})</span>
                        </div>
                        <div className="space-y-1.5">
                          {matchedWorkforce.map(p => (
                            <div
                              key={p.id}
                              onClick={() => handleSelect('/workforce')}
                              className="p-3 rounded-xl border border-stone-200/80 hover:border-[#97d4b4] bg-[#EAF7F0]/30 hover:bg-[#EAF7F0] cursor-pointer transition-all flex items-center justify-between gap-3 group"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#EAF7F0] border border-[#97d4b4] text-[#1e7046] font-bold text-xs flex items-center justify-center shrink-0">
                                  {p.firstName[0]}‌{p.lastName[0]}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-[#1e7046] transition-colors">
                                      {p.firstName} {p.lastName}
                                    </h4>
                                    <span className="text-[10px] text-stone-500 flex items-center gap-0.5">
                                      <MapPin className="w-2.5 h-2.5" />
                                      {p.birthPlace}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {p.talents.slice(0, 3).map((t, idx) => (
                                      <span key={idx} className="text-[10px] bg-white/80 px-1.5 py-0.5 rounded text-[#1e7046] border border-[#97d4b4]/40">
                                        {t}
                                      </span>
                                    ))}
                                    {p.skills.slice(0, 2).map((s, idx) => (
                                      <span key={idx} className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <ArrowLeft className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1e7046] group-hover:-translate-x-1 transition-all shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Coaches results */}
                  {(activeCategory === 'all' || activeCategory === 'coach') &&
                    matchedCoaches.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <div className="text-[11px] font-bold text-[#1d4ed8] flex items-center gap-1 px-1">
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span>مربیان و اساتید ({toPersianDigits(matchedCoaches.length)})</span>
                        </div>
                        <div className="space-y-1.5">
                          {matchedCoaches.map(c => (
                            <div
                              key={c.id}
                              onClick={() => handleSelect('/coaches')}
                              className="p-3 rounded-xl border border-stone-200/80 hover:border-[#9ec1f7] bg-[#EBF3FF]/30 hover:bg-[#EBF3FF] cursor-pointer transition-all flex items-center justify-between gap-3 group"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#EBF3FF] border border-[#9ec1f7] text-[#1d4ed8] font-bold text-xs flex items-center justify-center shrink-0">
                                  {c.avatarInitials}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-[#1d4ed8] transition-colors">
                                      {c.firstName} {c.lastName}
                                    </h4>
                                    <span className="text-[10px] text-stone-500">
                                      {c.birthPlace}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {c.specialties.map((s, idx) => (
                                      <span key={idx} className="text-[10px] bg-white/80 px-1.5 py-0.5 rounded text-[#1d4ed8] border border-[#9ec1f7]/40">
                                        {s}
                                      </span>
                                    ))}
                                    {c.teachableSubjects.slice(0, 2).map((sub, idx) => (
                                      <span key={idx} className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">
                                        {sub}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <ArrowLeft className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1d4ed8] group-hover:-translate-x-1 transition-all shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Training topics results */}
                  {(activeCategory === 'all' || activeCategory === 'training') &&
                    matchedTraining.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <div className="text-[11px] font-bold text-[#6d28d9] flex items-center gap-1 px-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>سرفصل‌های آموزشی ({toPersianDigits(matchedTraining.length)})</span>
                        </div>
                        <div className="space-y-1.5">
                          {matchedTraining.map(t => {
                            const cat = categories.find(c => c.id === t.categoryId);

                            return (
                              <div
                                key={t.id}
                                onClick={() => handleSelect(`/training/${t.id}`)}
                                className="p-3 rounded-xl border border-stone-200/80 hover:border-[#caaaf7] bg-[#F3EEFF]/30 hover:bg-[#F3EEFF] cursor-pointer transition-all flex items-center justify-between gap-3 group"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-[#F3EEFF] border border-[#caaaf7] text-[#6d28d9] flex items-center justify-center shrink-0">
                                    <BookOpen className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-[#6d28d9] transition-colors">
                                        {t.title}
                                      </h4>
                                      <span className="text-[10px] font-semibold text-[#6d28d9] bg-[#ede9fe] px-1.5 py-0.5 rounded">
                                        {cat?.title}
                                      </span>
                                      <span className="text-[10px] text-stone-500">
                                        سطح {t.level}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                                      {t.shortDescription}
                                    </p>
                                  </div>
                                </div>
                                <ArrowLeft className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#6d28d9] group-hover:-translate-x-1 transition-all shrink-0" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* Needs & Services results */}
                  {(activeCategory === 'all' || activeCategory === 'services') &&
                    matchedServices.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <div className="text-[11px] font-bold text-[#925807] flex items-center gap-1 px-1">
                          <Repeat className="w-3.5 h-3.5" />
                          <span>نیازمندی‌ها و خدمات ({toPersianDigits(matchedServices.length)})</span>
                        </div>
                        <div className="space-y-1.5">
                          {matchedServices.map(ns => (
                            <div
                              key={ns.id}
                              onClick={() => handleSelect('/services')}
                              className="p-3 rounded-xl border border-stone-200/80 hover:border-[#e9c878] bg-[#FFF8E8]/30 hover:bg-[#FFF8E8] cursor-pointer transition-all flex items-center justify-between gap-3 group"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#FFF8E8] border border-[#e9c878] text-[#925807] flex items-center justify-center shrink-0">
                                  <Repeat className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                      ns.type === 'need' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                                    }`}>
                                      {ns.type === 'need' ? 'نیاز' : 'خدمت'}
                                    </span>
                                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-[#925807] transition-colors">
                                      {ns.title}
                                    </h4>
                                  </div>
                                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                                    {ns.description}
                                  </p>
                                </div>
                              </div>
                              <ArrowLeft className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#925807] group-hover:-translate-x-1 transition-all shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Modal Footer info */}
            <div className="p-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-[11px] text-stone-500">
              <div className="flex items-center gap-2">
                <span>ناوبری سریع: برای انتخاب روی هر مورد کلیک کنید</span>
              </div>
              <div className="flex items-center gap-1">
                <span>کلید خروج برای انصراف</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
