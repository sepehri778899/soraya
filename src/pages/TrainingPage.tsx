import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SectionLayout } from '../components/common/SectionLayout';
import { toPersianDigits } from '../utils/persianUtils';
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  Layers,
  Sparkles,
  ArrowLeft,
  Video,
  Briefcase,
  Cpu,
  Plus,
  Shield,
  CheckCircle2
} from 'lucide-react';

export const TrainingPage: React.FC = () => {
  const navigate = useNavigate();
  const { role, categories, trainingTopics } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return Video;
      case 'Sparkles':
        return Sparkles;
      case 'Briefcase':
        return Briefcase;
      case 'Cpu':
        return Cpu;
      default:
        return BookOpen;
    }
  };

  const filteredTopics = trainingTopics.filter(topic => {
    // Regular visitors only see published topics
    if (role === 'visitor' && topic.status !== 'published') return false;

    const matchesCat = selectedCategory === 'all' || topic.categoryId === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || topic.level === selectedLevel;
    const matchesSearch =
      !searchQuery ||
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesLevel && matchesSearch;
  });

  return (
    <SectionLayout
      section="training"
      title="سرفصل‌های آموزشی"
      subtitle="بانک راهنماهای کارگاهی، سناریوهای مهارتی و الگوهای اجرایی گام‌به‌گام"
      icon={<BookOpen className="w-6 h-6" />}
      breadcrumbs={[{ label: 'سرفصل‌های آموزشی' }]}
      actions={
        role === 'admin' ? (
          <button
            onClick={() => navigate('/admin?tab=training')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#6d28d9] text-white hover:bg-[#5b21b6] shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>مدیریت و افزودن سرفصل در پنل</span>
          </button>
        ) : undefined
      }
    >
      {/* Dynamic Training Categories row */}
      <div className="mb-6">
        <h2 className="text-xs font-bold text-stone-500 mb-3 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-[#6d28d9]" />
          دسته‌بندی‌های فعال کارگاهی:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map(cat => {
            const IconComp = getCategoryIcon(cat.icon);
            const isSelected = selectedCategory === cat.id;
            const count = trainingTopics.filter(t => t.categoryId === cat.id).length;

            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#F3EEFF] border-[#caaaf7] ring-1 ring-[#caaaf7] shadow-sm'
                    : 'bg-white border-stone-200 hover:border-[#caaaf7]/80 hover:bg-stone-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#F3EEFF] border border-[#caaaf7]/60 text-[#6d28d9] flex items-center justify-center">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#6d28d9] bg-[#ede9fe] px-2 py-0.5 rounded-full">
                    {toPersianDigits(count)} سرفصل
                  </span>
                </div>
                <h3 className="font-bold text-stone-900 text-sm mb-1">{cat.title}</h3>
                <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">{cat.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-3 sm:p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جست‌وجوی عنوان کارگاه یا موضوع..."
            className="w-full pr-9 pl-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6d28d9] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              سطح:
            </span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#6d28d9] text-stone-800 cursor-pointer shadow-2xs"
            >
              <option value="all">همه سطوح</option>
              <option value="مقدماتی">مقدماتی</option>
              <option value="متوسط">متوسط</option>
              <option value="پیشرفته">پیشرفته</option>
              <option value="عمومی">عمومی</option>
            </select>
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-[#6d28d9] hover:underline px-2 py-1"
            >
              نمایش همه دسته‌ها
            </button>
          )}
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F3EEFF] text-[#6d28d9] flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-stone-800 text-sm sm:text-base">سرفصلی یافت نشد</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            با فیلترهای انتخابی کارگاهی موجود نیست. می‌توانید فیلترها را پاک کرده یا دسته‌بندی دیگری را برگزینید.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map(topic => {
            const cat = categories.find(c => c.id === topic.categoryId);

            return (
              <div
                key={topic.id}
                onClick={() => navigate(`/training/${topic.id}`)}
                className="bg-white border border-stone-200/90 hover:border-[#caaaf7] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Topic Image banner if exists */}
                  {topic.coverImage ? (
                    <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                      <img
                        src={topic.coverImage}
                        alt={topic.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-stone-800 shadow-xs">
                          {cat?.title || 'کارگاه'}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-[#6d28d9] text-white shadow-xs">
                          {topic.level}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-20 bg-gradient-to-r from-[#F3EEFF] to-stone-100 p-4 flex items-center justify-between border-b border-stone-100">
                      <span className="text-xs font-bold text-[#6d28d9] bg-[#ede9fe] px-2.5 py-1 rounded-md">
                        {cat?.title || 'سرفصل'}
                      </span>
                      <span className="text-xs font-bold text-stone-700 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                        {topic.level}
                      </span>
                    </div>
                  )}

                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-[#6d28d9] transition-colors leading-snug mb-2">
                      {topic.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {topic.shortDescription}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-stone-500 pt-2 border-t border-stone-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {toPersianDigits(topic.estimatedDuration)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-stone-400" />
                        {toPersianDigits(topic.steps.length)} مرحله اجرایی
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-600">
                    مخاطب: {topic.targetAudience.slice(0, 24)}...
                  </span>

                  <span className="text-[#6d28d9] font-bold flex items-center gap-1 group-hover:underline">
                    <span>مشاهده راهنما</span>
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionLayout>
  );
};
