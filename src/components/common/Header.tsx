import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GlobalSearch } from './GlobalSearch';
import {
  Compass,
  Home,
  Shield,
  UserCheck,
  Eye,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

interface HeaderProps {
  isHome?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isHome = false }) => {
  const location = useLocation();
  const { role, setRole, resetToSampleData } = useApp();

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
            title="صفحه اصلی سمت ثریا"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center shadow-xs group-hover:bg-stone-800 transition-colors">
              <Compass className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-stone-900 text-sm tracking-tight flex items-center gap-1.5">
                سمت ثریا
              </span>
              <span className="text-[10px] text-stone-600 font-medium hidden sm:inline-block">
                جهت‌گیری به سوی تعالی
              </span>
            </div>
          </Link>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-1 sm:mx-3">
          <GlobalSearch />
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {!isHome && (
            <Link
              to="/"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden md:inline">صفحه اصلی</span>
            </Link>
          )}

          {/* Quick links to 4 sections for easy navigation */}
          {!isHome && (
            <div className="hidden lg:flex items-center gap-1 text-xs">
              <Link
                to="/workforce"
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  location.pathname.startsWith('/workforce')
                    ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/60'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                شناسایی نیرو
              </Link>
              <Link
                to="/services"
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  location.pathname.startsWith('/services')
                    ? 'bg-amber-50 text-amber-800 font-semibold border border-amber-200/60'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                نیازمندی‌ها و خدمات
              </Link>
              <Link
                to="/coaches"
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  location.pathname.startsWith('/coaches')
                    ? 'bg-blue-50 text-blue-800 font-semibold border border-blue-200/60'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                شناسایی مربی
              </Link>
              <Link
                to="/training"
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  location.pathname.startsWith('/training')
                    ? 'bg-purple-50 text-purple-800 font-semibold border border-purple-200/60'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                سرفصل‌های آموزشی
              </Link>
            </div>
          )}

          {/* Admin link */}
          <Link
            to="/admin"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              location.pathname.startsWith('/admin')
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>پنل مدیریت</span>
          </Link>

          {/* Role Switcher Pill with clear Demo indication */}
          <div className="flex items-center bg-stone-100/90 p-0.5 rounded-lg border border-stone-200/80 text-[11px]">
            <span className="text-[10px] text-stone-600 px-1.5 hidden sm:inline select-none">
              نقش:
            </span>
            <button
              onClick={() => setRole('visitor')}
              title="مشاهده سامانه در حالت بازدیدکننده عادی"
              className={`px-2 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
                role === 'visitor'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Eye className="w-3 h-3 text-stone-600" />
              <span>عمومی</span>
            </button>
            <button
              onClick={() => setRole('coach')}
              title="مشاهده سامانه در حالت مربی"
              className={`px-2 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
                role === 'coach'
                  ? 'bg-white text-blue-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <UserCheck className="w-3 h-3 text-blue-600" />
              <span>مربی</span>
            </button>
            <button
              onClick={() => setRole('admin')}
              title="دسترسی با نقش مدیر کل سامانه"
              className={`px-2 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
                role === 'admin'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>مدیر</span>
            </button>
          </div>

          {/* Reset button for demo */}
          <button
            onClick={resetToSampleData}
            title="بازنشانی داده‌های آزمایشی"
            className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
