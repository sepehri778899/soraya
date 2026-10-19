import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { ArrowRight, ChevronLeft } from 'lucide-react';

export type SectionType = 'workforce' | 'services' | 'coach' | 'training' | 'admin';

interface SectionLayoutProps {
  section: SectionType;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  children: React.ReactNode;
}

export const SectionLayout: React.FC<SectionLayoutProps> = ({
  section,
  title,
  subtitle,
  icon,
  actions,
  breadcrumbs,
  children
}) => {
  // Config for each section's pastel identity
  const themeConfig = {
    workforce: {
      bgBanner: 'bg-[#EAF7F0]',
      borderBanner: 'border-[#97d4b4]/60',
      textAccent: 'text-[#1e7046]',
      badgeBg: 'bg-[#d4f0df]',
      lightGlow: 'from-[#EAF7F0] via-white to-stone-50/50'
    },
    services: {
      bgBanner: 'bg-[#FFF8E8]',
      borderBanner: 'border-[#e9c878]/60',
      textAccent: 'text-[#925807]',
      badgeBg: 'bg-[#fef0c7]',
      lightGlow: 'from-[#FFF8E8] via-white to-stone-50/50'
    },
    coach: {
      bgBanner: 'bg-[#EBF3FF]',
      borderBanner: 'border-[#9ec1f7]/60',
      textAccent: 'text-[#1d4ed8]',
      badgeBg: 'bg-[#dbeafe]',
      lightGlow: 'from-[#EBF3FF] via-white to-stone-50/50'
    },
    training: {
      bgBanner: 'bg-[#F3EEFF]',
      borderBanner: 'border-[#caaaf7]/60',
      textAccent: 'text-[#6d28d9]',
      badgeBg: 'bg-[#ede9fe]',
      lightGlow: 'from-[#F3EEFF] via-white to-stone-50/50'
    },
    admin: {
      bgBanner: 'bg-stone-100',
      borderBanner: 'border-stone-300',
      textAccent: 'text-stone-800',
      badgeBg: 'bg-stone-200',
      lightGlow: 'from-stone-100 via-white to-stone-50/50'
    }
  }[section];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <Header />

      {/* Hero section banner retaining the module's pastel color */}
      <section className={`border-b ${themeConfig.borderBanner} bg-gradient-to-b ${themeConfig.lightGlow}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
            <Link to="/" className="hover:text-stone-800 transition-colors flex items-center gap-1">
              <span>صفحه اصلی</span>
            </Link>
            {breadcrumbs?.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronLeft className="w-3 h-3 text-stone-400" />
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-stone-800 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-stone-800 font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Title & Actions Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {icon && (
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs ${themeConfig.bgBanner} ${themeConfig.borderBanner} ${themeConfig.textAccent}`}>
                  {icon}
                </div>
              )}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
                  {title}
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 font-normal">
                  {subtitle}
                </p>
              </div>
            </div>

            {actions && (
              <div className="flex items-center gap-2 flex-wrap">
                {actions}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-stone-200/80 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-700">سامانه سمت ثریا</span>
            <span>—</span>
            <span>جهت‌گیری به سوی تعالی</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
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
