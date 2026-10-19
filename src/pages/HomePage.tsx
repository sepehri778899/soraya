import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { GlobalSearch } from '../components/common/GlobalSearch';
import { CelestialBackground } from '../components/common/CelestialBackground';
import { toPersianDigits } from '../utils/persianUtils';
import {
  Users,
  Repeat,
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Compass,
  Shield,
  Eye,
  UserCheck,
  Sparkles,
  Orbit,
  ArrowUpLeft,
  Layers,
  ChevronLeft
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { role, setRole, persons, coaches, needsAndServices, trainingTopics } = useApp();
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  const pillars = [
    {
      id: 'workforce',
      path: '/workforce',
      code: 'رکن اول',
      title: 'شناسایی نیرو',
      motto: 'کشف استعدادها و پرونده‌های انسانی',
      story: 'مدار رویش و استعدادیابی — ثبت خوداظهاری هویتی و طبقه‌بندی ظرفیت‌های انسانی',
      icon: Users,
      count: persons.length,
      countLabel: 'پرونده ثبت‌شده',
      accentColor: '#1e7046',
      accentBg: 'bg-emerald-500',
      lightBg: 'bg-[#EAF7F0]/80 hover:bg-[#EAF7F0]',
      borderStyle: 'border-emerald-300/80 hover:border-emerald-500',
      badgeStyle: 'bg-emerald-100/90 text-emerald-900 border-emerald-300',
      iconStyle: 'bg-[#d4f0df] text-[#1e7046] border-emerald-300',
      glowShadow: 'hover:shadow-[0_22px_50px_-6px_rgba(30,112,70,0.35)]',
      neonClass: 'neon-card-workforce',
      gradientOrb: 'from-emerald-400/20 via-emerald-100/10 to-transparent',
      tags: ['ثبت خوداظهاری', 'اعتبارسنجی کد ملی', 'بانک مهارت‌ها']
    },
    {
      id: 'services',
      path: '/services',
      code: 'رکن دوم',
      title: 'نیازمندی‌ها و خدمات',
      motto: 'پیوند هوشمند نیاز و توانمندی',
      story: 'مدار تبادل و هم‌افزایی — پیوند هوشمند نیازمندی‌ها، امکانات و فرصت‌های اشتغال',
      icon: Repeat,
      count: needsAndServices.length,
      countLabel: 'مورد و مبادله',
      accentColor: '#925807',
      accentBg: 'bg-amber-500',
      lightBg: 'bg-[#FFF8E8]/80 hover:bg-[#FFF8E8]',
      borderStyle: 'border-amber-300/80 hover:border-amber-500',
      badgeStyle: 'bg-amber-100/90 text-amber-900 border-amber-300',
      iconStyle: 'bg-[#fef0c7] text-[#925807] border-amber-300',
      glowShadow: 'hover:shadow-[0_22px_50px_-6px_rgba(146,88,7,0.35)]',
      neonClass: 'neon-card-services',
      gradientOrb: 'from-amber-400/20 via-amber-100/10 to-transparent',
      tags: ['۴ دسته اصلی', 'تطبیق هوشمند', 'حمایت تجهیزاتی']
    },
    {
      id: 'coaches',
      path: '/coaches',
      code: 'رکن سوم',
      title: 'شناسایی مربی',
      motto: 'شبکه اساتید و راهبران کارگاهی',
      story: 'مدار حکمت و راهبری — شبکه اساتید کارگاهی و مدرسان صاحب‌تجربه و فن',
      icon: GraduationCap,
      count: coaches.length,
      countLabel: 'استاد و مربی',
      accentColor: '#1d4ed8',
      accentBg: 'bg-blue-600',
      lightBg: 'bg-[#EBF3FF]/80 hover:bg-[#EBF3FF]',
      borderStyle: 'border-blue-300/80 hover:border-blue-500',
      badgeStyle: 'bg-blue-100/90 text-blue-900 border-blue-300',
      iconStyle: 'bg-[#dbeafe] text-[#1d4ed8] border-blue-300',
      glowShadow: 'hover:shadow-[0_22px_50px_-6px_rgba(29,78,216,0.35)]',
      neonClass: 'neon-card-coaches',
      gradientOrb: 'from-blue-400/20 via-blue-100/10 to-transparent',
      tags: ['بانک اساتید', 'درخواست همکاری', 'حریم امن هویتی']
    },
    {
      id: 'training',
      path: '/training',
      code: 'رکن چهارم',
      title: 'سرفصل‌های آموزشی',
      motto: 'طرح درس‌های مدون و کارگاهی',
      story: 'مدار تجربه و عمل — بانک سرفصل‌های اجرایی و کارگاه‌های ۹‌گانه استاندارد',
      icon: BookOpen,
      count: trainingTopics.length,
      countLabel: 'سرفصل مصوب',
      accentColor: '#6d28d9',
      accentBg: 'bg-purple-600',
      lightBg: 'bg-[#F3EEFF]/80 hover:bg-[#F3EEFF]',
      borderStyle: 'border-purple-300/80 hover:border-purple-500',
      badgeStyle: 'bg-purple-100/90 text-purple-900 border-purple-300',
      iconStyle: 'bg-[#ede9fe] text-[#6d28d9] border-purple-300',
      glowShadow: 'hover:shadow-[0_22px_50px_-6px_rgba(109,40,217,0.35)]',
      neonClass: 'neon-card-training',
      gradientOrb: 'from-purple-400/20 via-purple-100/10 to-transparent',
      tags: ['طرح درس ۹ مرحله‌ای', 'ملزومات اجرایی', 'خروجی کارگاهی']
    }
  ];

  const activeStory = hoveredPillar
    ? pillars.find(p => p.id === hoveredPillar)?.story
    : 'منظومه هوشمند «سمت ثریا»؛ کانون پیوند استعدادها، اساتید، نیازها و معارف مهارتی جامعه';

  return (
    <div className="home-viewport bg-[#faf9f6] text-stone-800 select-none relative flex flex-col justify-between overflow-hidden">
      {/* Subtle, Slow-Moving SVG-Based Gradient Animation Background */}
      <CelestialBackground hoveredPillar={hoveredPillar} />

      {/* 1. MINIMAL FROSTED HEADER */}
      <header className="relative z-30 w-full px-3 sm:px-6 py-2 border-b border-stone-200/80 bg-white/85 backdrop-blur-xl shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Brand Logo & Typographic Seal */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-stone-900 to-stone-700 text-stone-100 flex items-center justify-center shadow-xs group">
              <Compass className="w-4 h-4 text-emerald-400 transition-transform duration-500 group-hover:rotate-45" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500 to-purple-500 opacity-0 group-hover:opacity-30 blur-xs transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-stone-950 text-sm tracking-tight flex items-center gap-1.5 font-sans">
                سمت ثریا
              </span>
              <span className="text-[10px] text-stone-500 font-medium hidden xs:inline">
                جهت‌گیری به سوی تعالی
              </span>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-2">
            <GlobalSearch />
          </div>

          {/* Role Switcher & Admin Action */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Minimal Role Switcher */}
            <div className="flex items-center bg-stone-100/90 p-0.5 rounded-lg border border-stone-200 text-[10px]">
              <span className="text-stone-400 px-1.5 hidden md:inline">نقش:</span>
              <button
                onClick={() => setRole('visitor')}
                className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                  role === 'visitor' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                عمومی
              </button>
              <button
                onClick={() => setRole('coach')}
                className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                  role === 'coach' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                مربی
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                  role === 'admin' ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                مدیر
              </button>
            </div>

            {/* Admin Panel button */}
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors shadow-xs"
              title="ورود به پنل مدیریت"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">پنل مدیریت</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. THE ARTISTIC IMMERSIVE NEXUS (FOCUSED TARGET ELEMENT) */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-3 sm:py-5 min-h-0 w-full max-w-7xl mx-auto">
        <div className="w-full flex flex-col items-center justify-center my-auto">
          {/* Master Celestial Emblem & Cinematic Typographic Title */}
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8 md:mb-10 shrink-0 px-2 flex flex-col items-center">
            {/* The Celestial Seal Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-stone-200 shadow-xs mb-3 sm:mb-4 backdrop-blur-md"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-amber-500 relative" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-stone-800">
                مـنـظـومـه هـدایـت بـه تـعـالـی
              </span>
            </motion.div>

            {/* Cinematic Headline with spacious bottom margin */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-extrabold tracking-tight leading-tight mb-2.5 sm:mb-3.5 text-stone-900"
              style={{
                fontSize: 'clamp(1.35rem, 2.2vw + 0.6rem, 2.35rem)'
              }}
            >
              <span className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-950 bg-clip-text text-transparent">
                سَـمْتِ ثُـرَیّــا؛
              </span>{' '}
              <span className="bg-gradient-to-r from-emerald-800 via-stone-900 to-purple-900 bg-clip-text text-transparent">
                افق کشف استعداد و شکوفایی انسان
              </span>
            </motion.h1>

            {/* Dynamic Micro-Storytelling Bar with ample height and presence */}
            <div className="min-h-[28px] sm:min-h-[32px] flex items-center justify-center px-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeStory}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="text-stone-600 text-xs sm:text-sm font-normal max-w-xl text-center leading-relaxed"
                >
                  {activeStory}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* 4 Astral Pillars with comfortable spacious gap */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 max-w-6xl">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isHovered = hoveredPillar === pillar.id;

              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onClick={() => navigate(pillar.path)}
                  onMouseEnter={() => setHoveredPillar(pillar.id)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(pillar.path);
                    }
                  }}
                  className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-3xl border transition-all duration-300 ease-out cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.985] will-change-transform ${pillar.lightBg} ${pillar.borderStyle} ${pillar.glowShadow} ${pillar.neonClass} backdrop-blur-xl overflow-hidden`}
                >
                  {/* Subtle Neon Edge Top Highlight & Sweeping Shimmer Beam */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent overflow-hidden pointer-events-none z-20">
                    <div
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-current to-transparent neon-beam-sweep opacity-75 group-hover:opacity-100"
                      style={{ color: pillar.accentColor }}
                    />
                  </div>

                  {/* Internal Ambient Radial Aura */}
                  <div
                    className={`absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br ${pillar.gradientOrb} blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-150`}
                  />

                  {/* Pillar Top Section */}
                  <div className="relative z-10">
                    {/* Header Row: Astral Node Badge + Icon */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {/* Icon in luminous rounded vessel */}
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-xs border transition-all duration-300 group-hover:scale-115 group-hover:-rotate-3 group-hover:shadow-md ${pillar.iconStyle}`}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" />
                      </div>

                      {/* Astral Pillar Order Tag */}
                      <div className="flex flex-col items-end">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${pillar.badgeStyle}`}>
                          {pillar.code}
                        </span>
                        <span className="text-[10px] font-semibold text-stone-500 mt-0.5">
                          {toPersianDigits(pillar.count)} {pillar.countLabel}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-extrabold text-stone-900 group-hover:text-black tracking-tight mb-1 text-sm sm:text-base flex items-center gap-1.5 transition-colors">
                      <span>{pillar.title}</span>
                    </h2>

                    {/* Motto */}
                    <p className="text-stone-600 text-[11px] sm:text-xs line-clamp-2 leading-relaxed mb-3 transition-colors group-hover:text-stone-800">
                      {pillar.motto}
                    </p>

                    {/* Characteristic Chips */}
                    <div className="hidden sm:flex flex-wrap gap-1">
                      {pillar.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white/80 border border-stone-200/90 text-stone-700 font-medium transition-colors group-hover:bg-white group-hover:border-stone-300 shadow-2xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Portal Action Footer */}
                  <div className="relative z-10 pt-2.5 sm:pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold mt-3">
                    <span
                      className="text-[11px] sm:text-xs font-medium group-hover:font-bold transition-all flex items-center gap-1"
                      style={{ color: pillar.accentColor }}
                    >
                      <span>ورود به کانون</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">
                        • کلیک کنید
                      </span>
                    </span>

                    {/* Interactive Arrow Node */}
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/90 shadow-2xs text-stone-700 border border-stone-200/80 group-hover:text-black group-hover:bg-white transition-all duration-300 group-hover:-translate-x-1.5 group-hover:scale-110 group-hover:shadow-xs">
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* 3. SLIM FOOTER STRIP */}
      <footer className="relative z-30 w-full px-4 py-1.5 sm:py-2 border-t border-stone-200/60 bg-white/80 backdrop-blur-md shrink-0 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800">سامانه سمت ثریا</span>
            <span className="text-stone-300">•</span>
            <span>جهت‌گیری به سوی تعالی و شکوفایی سرمایه انسانی</span>
          </div>
          <div className="flex items-center gap-3 text-stone-600 text-[10px] sm:text-[11px]">
            <span>شناسایی نیرو</span>
            <span>•</span>
            <span>نیازمندی‌ها و خدمات</span>
            <span>•</span>
            <span>شناسایی مربی</span>
            <span>•</span>
            <span>سرفصل‌های آموزشی</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
