import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { StatusBadge } from '../components/common/StatusBadge';
import { TagInput } from '../components/common/TagInput';
import {
  Person,
  Coach,
  NeedOrService,
  TrainingTopic,
  TrainingCategory,
  VerificationStatus
} from '../types';
import {
  exportToCSV,
  toPersianDigits,
  maskNationalCode
} from '../utils/persianUtils';
import {
  LayoutDashboard,
  Users,
  Repeat,
  GraduationCap,
  BookOpen,
  Layers,
  Settings,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Download,
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Eye,
  Shield,
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    role,
    setRole,
    persons,
    updatePersonStatus,
    deletePerson,
    coaches,
    updateCoachStatus,
    deleteCoach,
    needsAndServices,
    updateNeedOrServiceStatus,
    deleteNeedOrService,
    trainingTopics,
    addTrainingTopic,
    updateTrainingTopic,
    deleteTrainingTopic,
    categories,
    addCategory,
    deleteCategory,
    resetToSampleData,
    addToast
  } = useApp();

  const currentTab = searchParams.get('tab') || 'dashboard';

  // Sub-tab search & filter states
  const [searchTerm, setSearchTerm] = useState('');

  // Delete Confirm modal
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'person' | 'coach' | 'needService' | 'topic' | 'category';
    id: string;
    name: string;
  } | null>(null);

  // New Category modal
  const [isNewCatOpen, setIsNewCatOpen] = useState(false);
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // New Topic modal
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);
  const [topicTitle, setTopicTitle] = useState('');
  const [topicCategory, setTopicCategory] = useState(categories[0]?.id || '');
  const [topicShortDesc, setTopicShortDesc] = useState('');
  const [topicAudience, setTopicAudience] = useState('');
  const [topicLevel, setTopicLevel] = useState<'مقدماتی' | 'متوسط' | 'پیشرفته' | 'عمومی'>('متوسط');
  const [topicDuration, setTopicDuration] = useState('');

  // Stats
  const pendingPersons = persons.filter(p => p.status === 'pending').length;
  const pendingCoaches = coaches.filter(c => c.status === 'pending').length;
  const pendingNeeds = needsAndServices.filter(n => n.status === 'pending').length;
  const totalPending = pendingPersons + pendingCoaches + pendingNeeds;

  const totalNeeds = needsAndServices.filter(n => n.type === 'need').length;
  const totalServices = needsAndServices.filter(n => n.type === 'service').length;

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
    setSearchTerm('');
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'person') deletePerson(deleteTarget.id);
    else if (deleteTarget.type === 'coach') deleteCoach(deleteTarget.id);
    else if (deleteTarget.type === 'needService') deleteNeedOrService(deleteTarget.id);
    else if (deleteTarget.type === 'topic') deleteTrainingTopic(deleteTarget.id);
    else if (deleteTarget.type === 'category') deleteCategory(deleteTarget.id);

    setDeleteTarget(null);
  };

  // CSV Exports
  const handleExportPersonsCSV = () => {
    exportToCSV<Person>(
      'workforce_samte_soraya',
      persons,
      [
        { key: 'firstName', label: 'نام' },
        { key: 'lastName', label: 'نام خانوادگی' },
        { key: 'fatherName', label: 'نام پدر' },
        { key: 'nationalCode', label: 'کد ملی' },
        { key: 'birthPlace', label: 'محل تولد' },
        { key: 'birthDate', label: 'تاریخ تولد' },
        { key: 'talents', label: 'استعدادها' },
        { key: 'skills', label: 'مهارت‌ها' },
        { key: 'status', label: 'وضعیت بررسی' },
        { key: 'submissionType', label: 'نوع ثبت' }
      ]
    );
    addToast('فایل اکسل نیروها با موفقیت دانلود شد.');
  };

  const handleExportCoachesCSV = () => {
    exportToCSV<Coach>(
      'coaches_samte_soraya',
      coaches,
      [
        { key: 'firstName', label: 'نام' },
        { key: 'lastName', label: 'نام خانوادگی' },
        { key: 'birthPlace', label: 'محل تولد' },
        { key: 'specialties', label: 'تخصص‌ها' },
        { key: 'teachableSubjects', label: 'موضوعات تدریس' },
        { key: 'status', label: 'وضعیت بررسی' }
      ]
    );
    addToast('فایل اکسل مربیان با موفقیت دانلود شد.');
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatTitle.trim()) return;
    addCategory({
      title: newCatTitle,
      description: newCatDesc || 'دسته‌بندی جدید کارگاهی',
      icon: 'BookOpen'
    });
    setNewCatTitle('');
    setNewCatDesc('');
    setIsNewCatOpen(false);
  };

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicTitle.trim()) return;

    addTrainingTopic({
      title: topicTitle,
      categoryId: topicCategory || categories[0]?.id || 'cat-1',
      shortDescription: topicShortDesc || 'شرح مختصر کارگاه آموزشی',
      targetAudience: topicAudience || 'علاقه‌مندان عمومی',
      level: topicLevel,
      estimatedDuration: topicDuration || '۸ ساعت',
      iconName: 'BookOpen',
      learningObjectives: ['آشنایی با مبانی اولیه', 'تمرین عملی کارگاهی'],
      prerequisites: ['علاقه‌مندی به یادگیری'],
      equipment: [{ id: 'eq-new', name: 'لوازم التحریر و رایانه', quantity: '۱ عدد' }],
      steps: [
        {
          id: 'step-new-1',
          stepNumber: 1,
          title: 'مقدمه و شروع کارگاه',
          description: 'آشنایی شرکت‌کنندگان با اهداف دوره و ابزارهای مورد نیاز.',
          implementationTips: 'در جلسه اول یخ‌شکنی کلاسی را انجام دهید.'
        }
      ],
      expectedOutcome: 'دستیابی به مهارت پایه و ارائه تمرین کلاسی.',
      learningEvaluation: 'ارزیابی بر اساس تکالیف ارائه‌شده در انتهای کارگاه.',
      conclusion: 'استمرار تمرین باعث تثبیت مهارت خواهد بود.',
      resources: [{ title: 'منابع کمکی', description: 'کتاب‌های مرتبط با سرفصل' }],
      status: 'published'
    });

    setTopicTitle('');
    setTopicShortDesc('');
    setTopicAudience('');
    setTopicDuration('');
    setIsNewTopicOpen(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
    {
      id: 'persons',
      label: 'مدیریت نیروها',
      icon: Users,
      badge: pendingPersons > 0 ? pendingPersons : undefined
    },
    {
      id: 'services',
      label: 'مدیریت نیازها و خدمات',
      icon: Repeat,
      badge: pendingNeeds > 0 ? pendingNeeds : undefined
    },
    {
      id: 'coaches',
      label: 'مدیریت مربیان',
      icon: GraduationCap,
      badge: pendingCoaches > 0 ? pendingCoaches : undefined
    },
    { id: 'training', label: 'مدیریت سرفصل‌ها', icon: BookOpen },
    { id: 'categories', label: 'دسته‌بندی‌های آموزشی', icon: Layers },
    { id: 'settings', label: 'تنظیمات سامانه', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
      <Header />

      {/* Admin Notice Bar */}
      <div className="bg-stone-900 text-stone-100 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="font-bold">پنل مدیریت یکپارچه «سمت ثریا»</span>
            <span className="text-stone-400 text-xs hidden sm:inline">
              (دسترسی سطح مدیر کل - نظارت بر ۴ ماژول اصلی)
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {role !== 'admin' && (
              <button
                onClick={() => setRole('admin')}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
              >
                سوئیچ به حالت مدیر
              </button>
            )}
            <Link to="/" className="text-stone-400 hover:text-white flex items-center gap-1 transition-colors">
              <span>مشاهده سایت</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-2 shadow-xs space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-amber-400 text-stone-950' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {toPersianDigits(item.badge)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: DASHBOARD */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-white border border-[#97d4b4]/60 p-4 rounded-2xl shadow-xs">
                  <span className="text-[11px] text-stone-500 block mb-1">نیروهای ثبت‌شده</span>
                  <span className="text-xl font-bold text-[#1e7046]">{toPersianDigits(persons.length)}</span>
                </div>
                <div className="bg-white border border-[#9ec1f7]/60 p-4 rounded-2xl shadow-xs">
                  <span className="text-[11px] text-stone-500 block mb-1">مربیان سامانه</span>
                  <span className="text-xl font-bold text-[#1d4ed8]">{toPersianDigits(coaches.length)}</span>
                </div>
                <div className="bg-white border border-rose-200 p-4 rounded-2xl shadow-xs">
                  <span className="text-[11px] text-stone-500 block mb-1">نیازمندی‌ها</span>
                  <span className="text-xl font-bold text-rose-700">{toPersianDigits(totalNeeds)}</span>
                </div>
                <div className="bg-white border border-emerald-200 p-4 rounded-2xl shadow-xs">
                  <span className="text-[11px] text-stone-500 block mb-1">خدمات و توانمندی</span>
                  <span className="text-xl font-bold text-emerald-700">{toPersianDigits(totalServices)}</span>
                </div>
                <div className="bg-white border border-[#caaaf7]/60 p-4 rounded-2xl shadow-xs">
                  <span className="text-[11px] text-stone-500 block mb-1">سرفصل‌های آموزشی</span>
                  <span className="text-xl font-bold text-[#6d28d9]">{toPersianDigits(trainingTopics.length)}</span>
                </div>
                <div className="bg-white border border-amber-300 p-4 rounded-2xl shadow-xs bg-amber-50/30">
                  <span className="text-[11px] text-amber-800 font-bold block mb-1">در انتظار بررسی</span>
                  <span className="text-xl font-bold text-amber-700">{toPersianDigits(totalPending)}</span>
                </div>
              </div>

              {/* Pending reviews alerts */}
              {totalPending > 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <h3 className="font-bold text-amber-900 text-sm">
                        {toPersianDigits(totalPending)} درخواست در انتظار ارزیابی مدیر است
                      </h3>
                      <p className="text-xs text-amber-800">
                        شامل {toPersianDigits(pendingPersons)} پرونده نیرو، {toPersianDigits(pendingCoaches)} مربی جدید و {toPersianDigits(pendingNeeds)} نیاز/خدمت.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleTabChange('persons')}
                    className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
                  >
                    بررسی موارد معلق
                  </button>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-emerald-900 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>تمام پرونده‌ها و موارد ثبت‌شده توسط مدیر بررسی و تأیید شده‌اند.</span>
                </div>
              )}

              {/* Quick links to 4 core sections */}
              <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
                <h3 className="font-bold text-stone-900 text-sm mb-3">مدیریت مستقیم بخش‌های چهارگانه:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleTabChange('persons')}
                    className="p-3.5 rounded-xl border border-[#97d4b4] bg-[#EAF7F0]/40 hover:bg-[#EAF7F0] text-right transition-colors"
                  >
                    <span className="text-xs font-bold text-[#1e7046] block mb-0.5">۱. شناسایی نیرو</span>
                    <span className="text-[11px] text-stone-600">بررسی خوداظهاری‌ها و مهارت‌ها</span>
                  </button>
                  <button
                    onClick={() => handleTabChange('services')}
                    className="p-3.5 rounded-xl border border-[#e9c878] bg-[#FFF8E8]/40 hover:bg-[#FFF8E8] text-right transition-colors"
                  >
                    <span className="text-xs font-bold text-[#925807] block mb-0.5">۲. نیازمندی‌ها و خدمات</span>
                    <span className="text-[11px] text-stone-600">پیوند نیازها و فرصت‌ها</span>
                  </button>
                  <button
                    onClick={() => handleTabChange('coaches')}
                    className="p-3.5 rounded-xl border border-[#9ec1f7] bg-[#EBF3FF]/40 hover:bg-[#EBF3FF] text-right transition-colors"
                  >
                    <span className="text-xs font-bold text-[#1d4ed8] block mb-0.5">۳. شناسایی مربی</span>
                    <span className="text-[11px] text-stone-600">تأیید اساتید و تخصص‌ها</span>
                  </button>
                  <button
                    onClick={() => handleTabChange('training')}
                    className="p-3.5 rounded-xl border border-[#caaaf7] bg-[#F3EEFF]/40 hover:bg-[#F3EEFF] text-right transition-colors"
                  >
                    <span className="text-xs font-bold text-[#6d28d9] block mb-0.5">۴. سرفصل‌های آموزشی</span>
                    <span className="text-[11px] text-stone-600">تدوین مراحل و کارگاه‌ها</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERSONS MANAGEMENT */}
          {currentTab === 'persons' && (
            <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-50/50">
                <div>
                  <h3 className="font-bold text-stone-900 text-base">مدیریت پرونده‌های شناسایی نیرو</h3>
                  <p className="text-xs text-stone-500">مشاهده مشخصات، تغییر وضعیت بررسی و دریافت خروجی اکسل</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportPersonsCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-stone-500" />
                    <span>خروجی فایل داده‌ها (اکسل)</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold">
                    <tr>
                      <th className="py-3 px-4">نام و نام خانوادگی</th>
                      <th className="py-3 px-4">کد ملی</th>
                      <th className="py-3 px-4">محل و سال تولد</th>
                      <th className="py-3 px-4">استعدادها و مهارت‌ها</th>
                      <th className="py-3 px-4">منبع ثبت</th>
                      <th className="py-3 px-4">وضعیت</th>
                      <th className="py-3 px-4 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {persons.map(p => (
                      <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-stone-900">
                          {p.firstName} {p.lastName}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-stone-600">{toPersianDigits(p.nationalCode)}</td>
                        <td className="py-3.5 px-4 text-stone-600">
                          {p.birthPlace} ({toPersianDigits(p.birthDate.split('/')[0])})
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {p.talents.map((t, idx) => (
                              <span key={idx} className="bg-emerald-50 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-stone-500">
                          {p.submissionType === 'self' ? 'خود فرد' : p.registeredByName || 'مجموعه'}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={p.status}
                            onChange={(e) => updatePersonStatus(p.id, e.target.value as VerificationStatus)}
                            className="text-xs bg-white border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 font-medium focus:ring-1 focus:ring-emerald-600 shadow-2xs cursor-pointer"
                          >
                            <option value="approved">تأییدشده</option>
                            <option value="pending">در انتظار بررسی</option>
                            <option value="needs_revision">نیازمند اصلاح</option>
                            <option value="rejected">ردشده</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setDeleteTarget({ type: 'person', id: p.id, name: `${p.firstName} ${p.lastName}` })}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                            title="حذف پرونده"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES MANAGEMENT */}
          {currentTab === 'services' && (
            <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
                <div>
                  <h3 className="font-bold text-stone-900 text-base">مدیریت نیازمندی‌ها و خدمات ثبت‌شده</h3>
                  <p className="text-xs text-stone-500">نظارت بر تطبیق‌ها، اعلام نیازها و توانمندی‌ها</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold">
                    <tr>
                      <th className="py-3 px-4">نوع</th>
                      <th className="py-3 px-4">دسته</th>
                      <th className="py-3 px-4">عنوان</th>
                      <th className="py-3 px-4">ثبت‌کننده</th>
                      <th className="py-3 px-4">تماس</th>
                      <th className="py-3 px-4 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {needsAndServices.map(ns => (
                      <tr key={ns.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold">
                          {ns.type === 'need' ? (
                            <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded">نیاز</span>
                          ) : (
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">خدمت</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-stone-600 font-medium">{ns.specialty}</td>
                        <td className="py-3.5 px-4 font-semibold text-stone-900 max-w-xs truncate">{ns.title}</td>
                        <td className="py-3.5 px-4 text-stone-600">{ns.submitterName}</td>
                        <td className="py-3.5 px-4 font-mono text-stone-600">{toPersianDigits(ns.contactInfo)}</td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setDeleteTarget({ type: 'needService', id: ns.id, name: ns.title })}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COACHES MANAGEMENT */}
          {currentTab === 'coaches' && (
            <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-50/50">
                <div>
                  <h3 className="font-bold text-stone-900 text-base">مدیریت مربیان و اساتید</h3>
                  <p className="text-xs text-stone-500">تأیید مدارک مربیان خوداظهاری‌شده و خروجی داده‌ها</p>
                </div>
                <button
                  onClick={handleExportCoachesCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-stone-500" />
                  <span>خروجی فایل مربیان</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold">
                    <tr>
                      <th className="py-3 px-4">نام مربی</th>
                      <th className="py-3 px-4">تخصص‌ها</th>
                      <th className="py-3 px-4">موضوعات تدریس</th>
                      <th className="py-3 px-4">منبع</th>
                      <th className="py-3 px-4">وضعیت</th>
                      <th className="py-3 px-4 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {coaches.map(c => (
                      <tr key={c.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-stone-900">
                          {c.firstName} {c.lastName}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {c.specialties.map((s, idx) => (
                              <span key={idx} className="bg-blue-50 text-blue-800 text-[10px] px-1.5 py-0.5 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-stone-600 max-w-xs truncate">
                          {c.teachableSubjects.join('، ')}
                        </td>
                        <td className="py-3.5 px-4 text-stone-500">
                          {c.submissionType === 'self' ? 'خوداظهاری' : 'مدیر'}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={c.status}
                            onChange={(e) => updateCoachStatus(c.id, e.target.value as VerificationStatus)}
                            className="text-xs bg-white border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 font-medium focus:ring-1 focus:ring-blue-600 shadow-2xs cursor-pointer"
                          >
                            <option value="approved">تأییدشده</option>
                            <option value="pending">در انتظار بررسی</option>
                            <option value="needs_revision">نیازمند اصلاح</option>
                            <option value="rejected">ردشده</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setDeleteTarget({ type: 'coach', id: c.id, name: `${c.firstName} ${c.lastName}` })}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                            title="حذف مربی"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: TRAINING TOPICS MANAGEMENT */}
          {currentTab === 'training' && (
            <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-50/50">
                <div>
                  <h3 className="font-bold text-stone-900 text-base">مدیریت سرفصل‌های آموزشی</h3>
                  <p className="text-xs text-stone-500">تدوین سرفصل جدید، انتشار یا پیش‌نویس کردن دوره‌ها</p>
                </div>
                <button
                  onClick={() => setIsNewTopicOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#6d28d9] text-white hover:bg-[#5b21b6] shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>ایجاد سرفصل جدید</span>
                </button>
              </div>

              <div className="divide-y divide-stone-100">
                {trainingTopics.map(topic => {
                  const cat = categories.find(c => c.id === topic.categoryId);

                  return (
                    <div key={topic.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/60 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#6d28d9] bg-[#F3EEFF] px-2 py-0.5 rounded">
                            {cat?.title}
                          </span>
                          <span className="text-xs text-stone-600 font-mono">سطح {topic.level}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            topic.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                          }`}>
                            {topic.status === 'published' ? 'منتشرشده' : 'پیش‌نویس'}
                          </span>
                        </div>
                        <h4 className="font-bold text-stone-900 text-sm">{topic.title}</h4>
                        <p className="text-xs text-stone-500 line-clamp-1">{topic.shortDescription}</p>
                        <span className="text-[11px] text-stone-600 block">
                          تعداد مراحل اجرایی: {toPersianDigits(topic.steps.length)} مرحله
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          to={`/training/${topic.id}`}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>مشاهده راهنما</span>
                        </Link>
                        <button
                          onClick={() => {
                            updateTrainingTopic(topic.id, {
                              status: topic.status === 'published' ? 'draft' : 'published'
                            });
                          }}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            topic.status === 'published'
                              ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                          }`}
                        >
                          {topic.status === 'published' ? 'تبدیل به پیش‌نویس' : 'انتشار عمومی'}
                        </button>
                        <button
                          onClick={() => setDeleteTarget({ type: 'topic', id: topic.id, name: topic.title })}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="حذف سرفصل"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: DYNAMIC CATEGORIES MANAGEMENT */}
          {currentTab === 'categories' && (
            <div className="bg-white border border-stone-200/90 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
                <div>
                  <h3 className="font-bold text-stone-900 text-base">مدیریت دسته‌بندی‌های آموزشی</h3>
                  <p className="text-xs text-stone-500">ایجاد و سازماندهی شاخه‌های تخصصی سرفصل‌ها</p>
                </div>
                <button
                  onClick={() => setIsNewCatOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#6d28d9] text-white hover:bg-[#5b21b6] shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>دسته‌بندی جدید</span>
                </button>
              </div>

              <div className="divide-y divide-stone-100">
                {categories.map(cat => {
                  const topicCount = trainingTopics.filter(t => t.categoryId === cat.id).length;

                  return (
                    <div key={cat.id} className="p-4 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-stone-900 text-sm">{cat.title}</h4>
                          <span className="text-xs text-[#6d28d9] bg-[#ede9fe] px-2 py-0.5 rounded-full font-bold">
                            {toPersianDigits(topicCount)} سرفصل
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">{cat.description}</p>
                      </div>

                      <button
                        onClick={() => setDeleteTarget({ type: 'category', id: cat.id, name: cat.title })}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="حذف دسته‌بندی"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & DEMO MANAGEMENT */}
          {currentTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                <h3 className="font-bold text-stone-900 text-sm">مشخصات سامانه و معماری داده</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  سامانه «سمت ثریا» با هدف استعدادیابی، شناسایی مربیان، تطبیق نیازمندی‌ها و خدمات و بانک سرفصل‌های کارگاهی طراحی شده است. تمام دادگان بر اساس استانداردهای نرم‌افزاری و تفکیک لایه‌های دسترسی پیاده‌سازی شده‌اند.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">نسخه:</span>
                    <span className="font-bold text-stone-800">نسخه ۱.۰.۰ (قالب وزیرمتن)</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">فونت فعال:</span>
                    <span className="font-bold text-stone-800">قلم وزیرمتن (متغیر رسمی)</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-stone-500 block">امنیت کد ملی:</span>
                    <span className="font-bold text-emerald-700">اعتبارسنجی الگوریتمی ده‌رقمی</span>
                  </div>
                </div>
              </div>

              {/* Reset Data card */}
              <div className="bg-white border border-rose-200 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <RotateCcw className="w-4 h-4" />
                  <span>بازنشانی داده‌های آزمایشی</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  در صورتی که در هنگام آزمایش رکوردها را تغییر داده یا حذف کرده‌اید، می‌توانید سامانه را به داده‌های نمونه غنی اولیه (شامل نیروها، مربیان، نیازمندی‌ها و سرفصل جامع ویدیویی) بازگردانید.
                </p>
                <button
                  onClick={resetToSampleData}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-semibold rounded-xl transition-colors"
                >
                  بازنشانی دادگان به داده‌های پیش‌فرض
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-stone-200 p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-stone-900 text-sm">تأیید حذف مورد</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              آیا از حذف «{deleteTarget.name}» اطمینان دارید؟ این عملیات قابل بازگشت نخواهد بود.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg"
              >
                انصراف
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg"
              >
                تأیید و حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Category Modal */}
      {isNewCatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 p-5 shadow-xl space-y-4">
            <h3 className="font-bold text-stone-900 text-sm">افزودن دسته‌بندی آموزشی جدید</h3>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">عنوان دسته *</label>
                <input
                  type="text"
                  required
                  value={newCatTitle}
                  onChange={(e) => setNewCatTitle(e.target.value)}
                  placeholder="مثال: هوش مصنوعی و داده‌کاوی"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6d28d9]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">توضیح کوتاه</label>
                <textarea
                  rows={2}
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="شرح مباحث این حوزه..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6d28d9]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewCatOpen(false)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#6d28d9] hover:bg-[#5b21b6] text-white text-xs font-semibold rounded-lg"
                >
                  ذخیره دسته
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Topic Modal */}
      {isNewTopicOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 p-5 shadow-xl my-6 space-y-4">
            <h3 className="font-bold text-stone-900 text-sm">ایجاد سرفصل آموزشی جدید</h3>
            <form onSubmit={handleCreateTopic} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">عنوان دوره / سرفصل *</label>
                <input
                  type="text"
                  required
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  placeholder="مثال: کارگاه آموزش عکاسی پرتره و مستند"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6d28d9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">دسته‌بندی</label>
                  <select
                    value={topicCategory}
                    onChange={(e) => setTopicCategory(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6d28d9] cursor-pointer"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">سطح دوره</label>
                  <select
                    value={topicLevel}
                    onChange={(e) => setTopicLevel(e.target.value as any)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6d28d9] cursor-pointer"
                  >
                    <option value="مقدماتی">مقدماتی</option>
                    <option value="متوسط">متوسط</option>
                    <option value="پیشرفته">پیشرفته</option>
                    <option value="عمومی">عمومی</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">شرح کوتاه</label>
                <textarea
                  rows={2}
                  value={topicShortDesc}
                  onChange={(e) => setTopicShortDesc(e.target.value)}
                  placeholder="خلاصه‌ای از آنچه شرکت‌کنندگان فرا خواهند گرفت..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6d28d9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">مخاطبان هدف</label>
                  <input
                    type="text"
                    value={topicAudience}
                    onChange={(e) => setTopicAudience(e.target.value)}
                    placeholder="مثلاً: فعالان کانون‌ها و نوجوانان"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6d28d9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">مدت زمان تقریبی</label>
                  <input
                    type="text"
                    value={topicDuration}
                    onChange={(e) => setTopicDuration(e.target.value)}
                    placeholder="مثلاً: ۱۲ ساعت (۳ جلسه)"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6d28d9]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTopicOpen(false)}
                  className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#6d28d9] hover:bg-[#5b21b6] text-white text-xs font-semibold rounded-lg shadow-xs"
                >
                  ایجاد سرفصل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
