import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SectionLayout } from '../components/common/SectionLayout';
import { TagInput } from '../components/common/TagInput';
import { NeedOrService, ServiceMainCategory, NeedServiceType } from '../types';
import { toPersianDigits } from '../utils/persianUtils';
import {
  Repeat,
  PlusCircle,
  Search,
  Filter,
  GraduationCap,
  MessageSquare,
  Wrench,
  Briefcase,
  CheckCircle2,
  Sparkles,
  MapPin,
  Phone,
  User,
  ArrowRightLeft,
  X,
  HelpCircle,
  Zap,
  Info
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { role, needsAndServices, addNeedOrService, findMatchesFor } = useApp();

  // State
  const [activeCategory, setActiveCategory] = useState<ServiceMainCategory | 'all'>('all');
  const [filterType, setFilterType] = useState<NeedServiceType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [matchingItem, setMatchingItem] = useState<NeedOrService | null>(null);
  const [viewingItem, setViewingItem] = useState<NeedOrService | null>(null);

  // Form State
  const [formType, setFormType] = useState<NeedServiceType>('need');
  const [formCategory, setFormCategory] = useState<ServiceMainCategory>('training');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterRole, setSubmitterRole] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const categoriesConfig: {
    id: ServiceMainCategory;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    desc: string;
  }[] = [
    {
      id: 'training',
      title: 'آموزش',
      icon: GraduationCap,
      desc: 'درخواست آموزش مهارت یا آمادگی تدریس و مربی‌گری'
    },
    {
      id: 'consulting',
      title: 'مشاوره و تجربه‌نگاری',
      icon: MessageSquare,
      desc: 'راهنمایی در مسیر پروژه‌ها یا انتقال تجربیات موفق'
    },
    {
      id: 'finance_equipment',
      title: 'حمایت مالی و تجهیزاتی',
      icon: Wrench,
      desc: 'تأمین ادوات، فضا، سخت‌افزار یا امکانات مادی'
    },
    {
      id: 'employment',
      title: 'اشتغال‌زایی',
      icon: Briefcase,
      desc: 'فرصت‌های جذب نیرو، کارآموزی و اشتغال فعال'
    }
  ];

  const resetForm = () => {
    setFormType('need');
    setFormCategory('training');
    setTitle('');
    setDescription('');
    setSpecialty('');
    setTags([]);
    setLocation('');
    setContactInfo('');
    setSubmitterName('');
    setSubmitterRole('');
    setFormErrors({});
  };

  const handleOpenForm = (initialType?: NeedServiceType) => {
    resetForm();
    if (initialType) setFormType(initialType);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!title.trim()) errors.title = 'عنوان درخواست یا خدمت الزامی است.';
    if (!description.trim()) errors.description = 'توضیحات کامل الزامی است.';
    if (!specialty.trim()) errors.specialty = 'زمینه تخصصی الزامی است.';
    if (tags.length === 0) errors.tags = 'حداقل یک برچسب مرتبط وارد کنید.';
    if (!submitterName.trim()) errors.submitterName = 'نام ثبت‌کننده الزامی است.';
    if (!contactInfo.trim()) errors.contactInfo = 'اطلاعات ارتباطی (تلفن/پیام‌رسان) الزامی است.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    addNeedOrService({
      categoryId: formCategory,
      type: formType,
      title,
      description,
      specialty,
      tags,
      location: location || 'سراسر کشور / توافقی',
      contactInfo,
      submitterName,
      submitterRole: submitterRole || 'عضو حقیقی سامانه'
    });

    setIsFormOpen(false);
    resetForm();
  };

  // Filtered list
  const filteredItems = needsAndServices.filter(item => {
    const matchesCat = activeCategory === 'all' || item.categoryId === activeCategory;
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesType && matchesSearch;
  });

  return (
    <SectionLayout
      section="services"
      title="نیازمندی‌ها و خدمات"
      subtitle="پیوند هوشمند میان نیازهای واقعی و توانمندی‌های قابل ارائه"
      icon={<Repeat className="w-6 h-6" />}
      breadcrumbs={[{ label: 'نیازمندی‌ها و خدمات' }]}
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenForm('need')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#925807] text-white hover:bg-[#784705] shadow-xs transition-all active:scale-95"
          >
            <HelpCircle className="w-4 h-4" />
            <span>اعلام نیازمندی («نیاز دارم»)</span>
          </button>
          <button
            onClick={() => handleOpenForm('service')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-[#925807] border border-[#e9c878] hover:bg-[#FFF8E8] shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ارائه خدمت («توانمندی دارم»)</span>
          </button>
        </div>
      }
    >
      {/* 4 Main Categories Showcase Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {categoriesConfig.map(cat => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;
          const count = needsAndServices.filter(i => i.categoryId === cat.id).length;

          return (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? 'all' : cat.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#FFF8E8] border-[#e9c878] shadow-sm ring-1 ring-[#e9c878]'
                  : 'bg-white border-stone-200/90 hover:border-stone-300 hover:bg-stone-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#FFF8E8] border border-[#e9c878]/60 text-[#925807] flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#925807] bg-[#fef0c7] px-2 py-0.5 rounded-full">
                  {toPersianDigits(count)} مورد
                </span>
              </div>
              <h3 className="font-bold text-stone-900 text-sm mb-1">{cat.title}</h3>
              <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">{cat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Filter and Tab Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-3 sm:p-4 mb-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Type Toggle Tabs: All / Needs / Services */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-medium w-full md:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`flex-1 md:flex-initial px-3 py-1.5 rounded-lg transition-all ${
              filterType === 'all' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            همه موارد ({toPersianDigits(needsAndServices.length)})
          </button>
          <button
            onClick={() => setFilterType('need')}
            className={`flex-1 md:flex-initial px-3 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              filterType === 'need'
                ? 'bg-rose-50 text-rose-800 shadow-xs font-bold border border-rose-200/60'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            نیازمندی‌ها ({toPersianDigits(needsAndServices.filter(i => i.type === 'need').length)})
          </button>
          <button
            onClick={() => setFilterType('service')}
            className={`flex-1 md:flex-initial px-3 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              filterType === 'service'
                ? 'bg-emerald-50 text-emerald-800 shadow-xs font-bold border border-emerald-200/60'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            توانمندی‌ها و خدمات ({toPersianDigits(needsAndServices.filter(i => i.type === 'service').length)})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جست‌وجوی عنوان، مهارت یا برچسب..."
            className="w-full pr-9 pl-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#925807] transition-all"
          />
        </div>
      </div>

      {/* Grid of Needs & Services */}
      {filteredItems.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#FFF8E8] text-[#925807] flex items-center justify-center mx-auto">
            <Repeat className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-stone-800 text-sm sm:text-base">موردی یافت نشد</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            در دسته و فیلتر انتخاب‌شده داده‌ای موجود نیست. شما می‌توانید اولین نیازمندی یا توانمندی را ثبت کنید.
          </p>
          <button
            onClick={() => handleOpenForm('need')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#925807] text-white text-xs font-semibold rounded-xl hover:bg-[#784705] transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            ثبت مورد جدید
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => {
            const isNeed = item.type === 'need';
            const catName = categoriesConfig.find(c => c.id === item.categoryId)?.title || 'عمومی';
            const matches = findMatchesFor(item);

            return (
              <div
                key={item.id}
                className="bg-white border border-stone-200/90 hover:border-[#e9c878] rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:shadow-sm flex flex-col justify-between group"
              >
                <div>
                  {/* Category and Type Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md">
                      {catName}
                    </span>

                    {/* Distinct Two-Way Visual Tag */}
                    {isNeed ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        اعلام نیازمندی
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        توانمندی / ارائه خدمت
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-stone-900 text-sm mb-2 group-hover:text-[#925807] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-3">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-[#FFF8E8] text-[#925807] border border-[#e9c878]/40"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submitter & Smart Match Footer */}
                <div className="pt-3 border-t border-stone-100 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="flex items-center gap-1 truncate max-w-[150px]">
                      <User className="w-3 h-3 text-stone-400" />
                      {item.submitterName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {item.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {/* Smart Match Button with count */}
                    <button
                      onClick={() => setMatchingItem(item)}
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                        matches.length > 0
                          ? 'bg-[#FFF8E8] text-[#925807] border-[#e9c878] hover:bg-[#fff2d2]'
                          : 'bg-stone-50 text-stone-500 border-stone-200 hover:text-stone-800'
                      }`}
                      title="مشاهده همتایان متناظر هوشمند"
                    >
                      <Sparkles className="w-3 h-3 text-[#925807]" />
                      <span>تطبیق هوشمند ({toPersianDigits(matches.length)})</span>
                    </button>

                    <button
                      onClick={() => setViewingItem(item)}
                      className="text-xs text-[#925807] font-semibold hover:underline"
                    >
                      جزئیات و تماس
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Smart Matching Modal */}
      {matchingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#FFF8E8] border-b border-[#e9c878]/60 p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#e9c878] text-[#925807] flex items-center justify-center">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-1.5">
                    نتایج تطبیق هوشمند نیاز و توانمندی
                  </h3>
                  <p className="text-[11px] text-stone-600">
                    اتصال خودکار بر اساس اشتراک دسته‌بندی و برچسب‌های تخصصی
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMatchingItem(null)}
                className="p-1.5 rounded-lg hover:bg-stone-200/60 text-stone-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {/* Target Item Summary */}
              <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                <span className="text-[11px] font-semibold text-stone-500 block mb-1">
                  مورد مبدأ ({matchingItem.type === 'need' ? 'نیازمندی' : 'توانمندی'}):
                </span>
                <h4 className="font-bold text-stone-900 text-sm mb-1">{matchingItem.title}</h4>
                <div className="flex flex-wrap gap-1 text-[11px] text-[#925807]">
                  {matchingItem.tags.map((t, idx) => (
                    <span key={idx} className="bg-white px-2 py-0.5 rounded border border-[#e9c878]/40">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>تذکر:</strong> این نتایج صرفاً بر مبنای تشابه موضوع و برچسب‌ها به‌صورت هوشمند پیشنهاد می‌شوند و به معنی تأیید قطعی تناسب افراد یا تعهد سامانه نمی‌باشند.
                </span>
              </div>

              {/* Matched counterparts */}
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-2.5">
                  پیشنهادهای متقابل برای پیوند ({toPersianDigits(findMatchesFor(matchingItem).length)} مورد):
                </h4>

                {findMatchesFor(matchingItem).length === 0 ? (
                  <p className="text-xs text-stone-500 text-center py-6 bg-stone-50 rounded-xl border border-dashed border-stone-200">
                    در حال حاضر مورد متناظری در جهت مخالف ثبت نشده است. به محض ثبت مورد جدید در این دسته‌بندی، در این بخش نمایش داده خواهد شد.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {findMatchesFor(matchingItem).map(matched => (
                      <div
                        key={matched.id}
                        className="p-3.5 rounded-xl border border-[#e9c878]/60 bg-[#FFF8E8]/40 hover:bg-[#FFF8E8] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              matched.type === 'service' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {matched.type === 'service' ? 'ارائه‌دهنده خدمت' : 'متقاضی نیاز'}
                            </span>
                            <span className="font-bold text-stone-900 text-xs sm:text-sm">
                              {matched.title}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 line-clamp-1">{matched.description}</p>
                          <div className="flex items-center gap-3 text-[11px] text-stone-500 pt-1">
                            <span>ثبت‌کننده: {matched.submitterName}</span>
                            <span>•</span>
                            <span>مکان: {matched.location}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setViewingItem(matched);
                            setMatchingItem(null);
                          }}
                          className="px-3 py-1.5 bg-[#925807] hover:bg-[#784705] text-white text-xs font-medium rounded-lg shrink-0 transition-colors"
                        >
                          مشاهده تماس
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-stone-50 border-t border-stone-200 p-3.5 flex justify-end">
              <button
                onClick={() => setMatchingItem(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Item View / Contact Modal */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-xl overflow-hidden">
            <div className="bg-[#FFF8E8] border-b border-[#e9c878]/60 p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  viewingItem.type === 'need' ? 'bg-rose-100 text-rose-900' : 'bg-emerald-100 text-emerald-900'
                }`}>
                  {viewingItem.type === 'need' ? 'اعلام نیازمندی' : 'توانمندی و خدمت'}
                </span>
                <span className="text-xs text-stone-500">
                  {categoriesConfig.find(c => c.id === viewingItem.categoryId)?.title}
                </span>
              </div>
              <button
                onClick={() => setViewingItem(null)}
                className="p-1.5 rounded-lg hover:bg-stone-200/60 text-stone-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs sm:text-sm">
              <h3 className="font-bold text-stone-900 text-base">{viewingItem.title}</h3>
              <p className="text-stone-600 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                {viewingItem.description}
              </p>

              <div className="space-y-1">
                <span className="text-stone-500 text-xs">برچسب‌های تخصصی:</span>
                <div className="flex flex-wrap gap-1">
                  {viewingItem.tags.map((t, idx) => (
                    <span key={idx} className="bg-[#FFF8E8] text-[#925807] px-2 py-0.5 rounded text-xs border border-[#e9c878]/40">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="bg-[#FFF8E8]/50 border border-[#e9c878] p-3.5 rounded-xl space-y-2">
                <h4 className="font-bold text-[#925807] text-xs flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  اطلاعات تماس و ثبت‌کننده
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-500 block">ثبت‌کننده:</span>
                    <span className="font-semibold text-stone-800">{viewingItem.submitterName} ({viewingItem.submitterRole})</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">منطقه / موقعیت:</span>
                    <span className="font-semibold text-stone-800">{viewingItem.location}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-[#e9c878]/40">
                    <span className="text-stone-500 block">شماره تماس یا آیدی پیام‌رسان:</span>
                    <span className="font-bold text-stone-900 text-sm font-mono mt-0.5 block">{toPersianDigits(viewingItem.contactInfo)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 border-t border-stone-200 p-3.5 flex justify-end">
              <button
                onClick={() => setViewingItem(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Need / Service Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-stone-200 shadow-2xl my-6 flex flex-col max-h-[92vh]">
            <div className="bg-[#FFF8E8] border-b border-[#e9c878]/60 p-4 sm:p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#e9c878] text-[#925807] flex items-center justify-center">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                    ثبت نیازمندی یا اعلام توانمندی
                  </h3>
                  <p className="text-[11px] text-stone-600">
                    امکان اتصال نیاز به توانمندی متناظر در سراسر کشور
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg hover:bg-stone-200/60 text-stone-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {/* Critical Two-Way Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  نوع ثبت اطلاعات را مشخص فرمایید: <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType('need')}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      formType === 'need'
                        ? 'bg-rose-50 border-rose-300 text-rose-900 ring-2 ring-rose-200'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    «نیاز دارم» (اعلام نیازمندی)
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormType('service')}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      formType === 'service'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-200'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    «می‌توانم ارائه دهم» (توانمندی)
                  </button>
                </div>
              </div>

              {/* Main Category */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  دسته‌بندی اصلی <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as ServiceMainCategory)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#925807] cursor-pointer"
                >
                  <option value="training">۱. آموزش</option>
                  <option value="consulting">۲. مشاوره و تجربه‌نگاری</option>
                  <option value="finance_equipment">۳. حمایت مالی و تجهیزاتی</option>
                  <option value="employment">۴. اشتغال‌زایی</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  عنوان {formType === 'need' ? 'نیازمندی' : 'توانمندی یا خدمت'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    formType === 'need'
                      ? 'مثلاً: نیاز به آموزش تدوین ویدیو با پریمیر'
                      : 'مثلاً: آمادگی آموزش تدوین و ضبط پادکست'
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#925807]"
                />
                {formErrors.title && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.title}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  توضیحات کامل <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="شرح جزئیات، اهداف، شرایط و دامنه مورد نظر..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#925807]"
                />
                {formErrors.description && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.description}</p>}
              </div>

              {/* Specialty & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    زمینه تخصصی <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="مثلاً: تدوین ویدیو / مدیریت تشکل"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#925807]"
                  />
                  {formErrors.specialty && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.specialty}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    شهر یا محدوده جغرافیایی
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="مثلاً: تهران / آنلاین"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#925807]"
                  />
                </div>
              </div>

              {/* Tags */}
              <TagInput
                label="برچسب‌های مرتبط (جهت تطبیق هوشمند) *"
                tags={tags}
                onChange={setTags}
                placeholder="تایپ کنید و افزودن را بزنید..."
                suggestions={['تدوین ویدیو', 'پریمیر', 'مشاوره سازمانی', 'میکروفون', 'استخدام', 'پادکست']}
                colorTheme="services"
              />
              {formErrors.tags && <p className="text-rose-600 text-[11px]">{formErrors.tags}</p>}

              {/* Submitter & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    نام ثبت‌کننده یا مجموعه <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    placeholder="نام فرد یا عنوان کانون"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#925807]"
                  />
                  {formErrors.submitterName && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.submitterName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    اطلاعات تماس (شماره تلفن / پیام‌رسان) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="مثال: 09121234567 یا آیدی ایتا"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#925807]"
                  />
                  {formErrors.contactInfo && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.contactInfo}</p>}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#925807] hover:bg-[#784705] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ثبت و انتشار در سامانه</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionLayout>
  );
};
