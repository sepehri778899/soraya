import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SectionLayout } from '../components/common/SectionLayout';
import { TagInput } from '../components/common/TagInput';
import { StatusBadge } from '../components/common/StatusBadge';
import { Coach, VerificationStatus } from '../types';
import { validateIranianNationalCode, toPersianDigits, maskNationalCode } from '../utils/persianUtils';
import {
  GraduationCap,
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  BookOpen,
  Award,
  Calendar,
  Send,
  X,
  ShieldCheck,
  MapPin,
  Clock
} from 'lucide-react';

export const CoachPage: React.FC = () => {
  const { role, coaches, addCoach, updateCoachStatus, addToast } = useApp();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'self' | 'manager'>('self');
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [collaborationCoach, setCollaborationCoach] = useState<Coach | null>(null);
  const [collaborationMsg, setCollaborationMsg] = useState('');

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [bio, setBio] = useState('');
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [teachingSkills, setTeachingSkills] = useState<string[]>([]);
  const [teachingHistory, setTeachingHistory] = useState('');
  const [professionalExperience, setProfessionalExperience] = useState('');
  const [teachableSubjects, setTeachableSubjects] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setFatherName('');
    setNationalCode('');
    setBirthPlace('');
    setBirthDate('');
    setBio('');
    setSpecialties([]);
    setTeachingSkills([]);
    setTeachingHistory('');
    setProfessionalExperience('');
    setTeachableSubjects([]);
    setNotes('');
    setFormErrors({});
  };

  const handleOpenForm = (mode: 'self' | 'manager') => {
    resetForm();
    setFormMode(mode);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!firstName.trim()) errors.firstName = 'نام الزامی است.';
    if (!lastName.trim()) errors.lastName = 'نام خانوادگی الزامی است.';
    if (!fatherName.trim()) errors.fatherName = 'نام پدر الزامی است.';

    const codeCheck = validateIranianNationalCode(nationalCode);
    if (!codeCheck.isValid) errors.nationalCode = codeCheck.message;

    if (!birthPlace.trim()) errors.birthPlace = 'محل تولد الزامی است.';
    if (!birthDate.trim()) errors.birthDate = 'تاریخ تولد الزامی است.';
    if (!bio.trim()) errors.bio = 'معرفی یا سوابق کوتاه الزامی است.';
    if (specialties.length === 0) errors.specialties = 'حداقل یک حوزه تخصصی مشخص فرمایید.';
    if (teachableSubjects.length === 0) errors.teachableSubjects = 'موضوعات قابل تدریس الزامی است.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const initialStatus: VerificationStatus = formMode === 'manager' && role === 'admin' ? 'approved' : 'pending';

    addCoach(
      {
        firstName,
        lastName,
        fatherName,
        nationalCode,
        birthPlace,
        birthDate,
        bio,
        specialties,
        teachingSkills,
        teachingHistory: teachingHistory || 'ثبت شده توسط متقاضی',
        professionalExperience: professionalExperience || 'سابقه کاری مرتبط',
        teachableSubjects,
        notes,
        submissionType: formMode
      },
      initialStatus
    );

    setIsFormOpen(false);
    resetForm();
  };

  const handleSendCollaborationRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collaborationMsg.trim()) return;
    addToast(`درخواست همکاری با ${collaborationCoach?.firstName} ${collaborationCoach?.lastName} با موفقیت ثبت شد.`);
    setCollaborationCoach(null);
    setCollaborationMsg('');
  };

  // Collect all specialties
  const allSpecialties = Array.from(new Set(coaches.flatMap(c => c.specialties)));

  // Filtered coaches
  const displayedCoaches = coaches.filter(c => {
    // If regular visitor, show only approved coaches
    if (role === 'visitor' && c.status !== 'approved') return false;

    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      fullName.includes(searchQuery.toLowerCase()) ||
      c.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.teachableSubjects.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSpecialty = selectedSpecialty === 'all' || c.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  return (
    <SectionLayout
      section="coach"
      title="شناسایی مربی"
      subtitle="شبکه اساتید، مربیان کارگاهی و راهبران تخصصی پروژه‌ها"
      icon={<GraduationCap className="w-6 h-6" />}
      breadcrumbs={[{ label: 'شناسایی مربی' }]}
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenForm('self')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#1d4ed8] text-white hover:bg-[#1e40af] shadow-xs transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>ثبت‌نام به‌عنوان مربی (خوداظهاری)</span>
          </button>
          {role === 'admin' && (
            <button
              onClick={() => handleOpenForm('manager')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-[#1d4ed8] border border-[#9ec1f7] hover:bg-[#EBF3FF] transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ثبت مستقیم توسط مدیر</span>
            </button>
          )}
        </div>
      }
    >
      {/* Intro Box */}
      <div className="bg-[#EBF3FF] border border-[#9ec1f7]/70 rounded-2xl p-4 sm:p-5 mb-6 text-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#1d4ed8] flex items-center gap-2 mb-1">
            <GraduationCap className="w-4 h-4" />
            بانک مربیان و متخصصان مورد تأیید
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl">
            مربیان مجرب در حوزه‌های رسانه، رشد فردی، فناوری و مدیریت فرهنگی که آماده برگزاری کارگاه‌های عملی و راهبری هسته‌های استعدادیابی هستند. مشخصات هویتی حساس مربیان محفوظ است.
          </p>
        </div>
        <div className="text-xs text-[#1d4ed8] font-bold bg-white/70 border border-[#9ec1f7]/40 px-3 py-2 rounded-xl shrink-0">
          تعداد مربیان فعال: {toPersianDigits(coaches.filter(c => c.status === 'approved').length)}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-3 sm:p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جست‌وجوی نام استاد، تخصص یا موضوع تدریس..."
            className="w-full pr-9 pl-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d4ed8] transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <span className="text-xs text-stone-500 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            تخصص:
          </span>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1d4ed8] text-stone-800 cursor-pointer shadow-2xs"
          >
            <option value="all">همه حوزه‌های تخصصی</option>
            {allSpecialties.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Coaches Grid */}
      {displayedCoaches.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#EBF3FF] text-[#1d4ed8] flex items-center justify-center mx-auto">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-stone-800 text-sm sm:text-base">مربی یافت نشد</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            با فیلتر یا عبارت مورد نظر مربی ثبت‌شده‌ای پیدا نشد. می‌توانید به‌عنوان مربی جدید ثبت‌نام فرمایید.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCoaches.map(coach => (
            <div
              key={coach.id}
              className="bg-white border border-stone-200/90 hover:border-[#9ec1f7] rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:shadow-sm flex flex-col justify-between group"
            >
              <div>
                {/* Header with avatar & name */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#EBF3FF] border border-[#9ec1f7]/60 text-[#1d4ed8] font-bold text-sm flex items-center justify-center shrink-0">
                      {coach.avatarInitials || `${coach.firstName[0]}‌${coach.lastName[0]}`}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm group-hover:text-[#1d4ed8] transition-colors">
                        {coach.firstName} {coach.lastName}
                      </h3>
                      <span className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {coach.birthPlace}
                      </span>
                    </div>
                  </div>

                  <StatusBadge status={coach.status} size="sm" />
                </div>

                {/* Bio */}
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                  {coach.bio}
                </p>

                {/* Specialties */}
                <div className="mb-2.5">
                  <span className="text-[11px] text-stone-500 block mb-1 flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#1d4ed8]" />
                    حوزه‌های تخصصی:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {coach.specialties.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-[#EBF3FF] text-[#1d4ed8] border border-[#9ec1f7]/40 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Teachable subjects */}
                <div>
                  <span className="text-[11px] text-stone-500 block mb-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-stone-400" />
                    موضوعات قابل تدریس:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {coach.teachableSubjects.slice(0, 3).map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700"
                      >
                        {sub}
                      </span>
                    ))}
                    {coach.teachableSubjects.length > 3 && (
                      <span className="text-[11px] text-stone-600 px-1">
                        +{toPersianDigits(coach.teachableSubjects.length - 3)} مورد دیگر
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3.5 mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedCoach(coach)}
                  className="text-[#1d4ed8] font-semibold hover:underline"
                >
                  مشاهده پروفایل کامل
                </button>

                <button
                  onClick={() => setCollaborationCoach(coach)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EBF3FF] text-[#1d4ed8] hover:bg-[#dbeafe] transition-colors font-medium text-[11px]"
                >
                  <Send className="w-3 h-3" />
                  <span>درخواست همکاری</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Profile Detail Modal */}
      {selectedCoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#EBF3FF] border-b border-[#9ec1f7]/60 p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#9ec1f7] text-[#1d4ed8] font-bold text-base flex items-center justify-center">
                  {selectedCoach.avatarInitials}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {selectedCoach.firstName} {selectedCoach.lastName}
                  </h3>
                  <p className="text-xs text-stone-500">
                    مربی مورد تأیید سامانه «سمت ثریا»
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCoach(null)}
                className="p-1.5 rounded-lg hover:bg-stone-200/60 text-stone-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              {/* Bio */}
              <div>
                <h4 className="font-bold text-stone-800 text-xs mb-1">درباره و معرفی مربی:</h4>
                <p className="text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
                  {selectedCoach.bio}
                </p>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="font-bold text-stone-800 text-xs mb-1">حوزه‌های تخصصی:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCoach.specialties.map((s, idx) => (
                    <span key={idx} className="bg-[#EBF3FF] text-[#1d4ed8] px-2.5 py-1 rounded-lg text-xs font-semibold border border-[#9ec1f7]/40">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Teaching History */}
              <div>
                <h4 className="font-bold text-stone-800 text-xs mb-1">سوابق تدریس و فعالیت‌های آموزشی:</h4>
                <p className="text-stone-600 leading-relaxed bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  {selectedCoach.teachingHistory}
                </p>
              </div>

              {/* Professional Experience */}
              <div>
                <h4 className="font-bold text-stone-800 text-xs mb-1">سوابق حرفه‌ای و اجرایی:</h4>
                <p className="text-stone-600 leading-relaxed bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  {selectedCoach.professionalExperience}
                </p>
              </div>

              {/* Teachable subjects */}
              <div>
                <h4 className="font-bold text-stone-800 text-xs mb-1">موضوعات و کارگاه‌های قابل ارائه:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCoach.teachableSubjects.map((sub, idx) => (
                    <span key={idx} className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg text-xs">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Confidential notice */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-500 text-[11px] leading-relaxed">
                اطلاعات سجلی، کد ملی و مستندات هویتی مربی در لایه امن سامانه نگهداری شده و جهت حفظ حریم خصوصی مربیان به‌صورت عمومی منتشر نمی‌شود.
              </div>
            </div>

            <div className="bg-stone-50 border-t border-stone-200 p-3.5 flex items-center justify-between">
              <button
                onClick={() => {
                  setCollaborationCoach(selectedCoach);
                  setSelectedCoach(null);
                }}
                className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ثبت درخواست دوره / همکاری</span>
              </button>

              <button
                onClick={() => setSelectedCoach(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collaboration Request Modal */}
      {collaborationCoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-xl overflow-hidden">
            <div className="bg-[#EBF3FF] border-b border-[#9ec1f7]/60 p-4 flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-sm">
                درخواست همکاری با {collaborationCoach.firstName} {collaborationCoach.lastName}
              </h3>
              <button
                onClick={() => setCollaborationCoach(null)}
                className="p-1 rounded-lg hover:bg-stone-200 text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendCollaborationRequest} className="p-5 space-y-3.5">
              <p className="text-xs text-stone-600 leading-relaxed">
                پیام یا سرفصل پیشنهادی خود را بنویسید تا از طرف دبیرخانه سامانه با این مربی هماهنگ شود.
              </p>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  متن درخواست یا شرح نیاز کارگاهی:
                </label>
                <textarea
                  rows={4}
                  required
                  value={collaborationMsg}
                  onChange={(e) => setCollaborationMsg(e.target.value)}
                  placeholder="موضوع دوره، زمان پیشنهادی، مخاطبان و تعداد جلسات مد نظر..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d4ed8]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCollaborationCoach(null)}
                  className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ارسال درخواست</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Registration Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl my-6 flex flex-col max-h-[92vh]">
            <div className="bg-[#EBF3FF] border-b border-[#9ec1f7]/60 p-4 sm:p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#9ec1f7] text-[#1d4ed8] flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                    {formMode === 'self' ? 'فرم خوداظهاری مربیان و اساتید' : 'ثبت مستقیم مربی توسط مدیریت'}
                  </h3>
                  <p className="text-[11px] text-stone-600">
                    ورود به شبکه مربیان سامانه «سمت ثریا»
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
              {/* Identity fields */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#1d4ed8] pb-1 border-b border-stone-200">
                  ۱. اطلاعات فردی و سجلی مربی
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      نام <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="مثال: علیرضا"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d4ed8]"
                    />
                    {formErrors.firstName && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      نام خانوادگی <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="مثال: کاظمی"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d4ed8]"
                    />
                    {formErrors.lastName && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      نام پدر <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      placeholder="مثال: محمود"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d4ed8]"
                    />
                    {formErrors.fatherName && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.fatherName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      کد ملی (۱۰ رقم) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      value={nationalCode}
                      onChange={(e) => setNationalCode(e.target.value)}
                      placeholder="مثال: 0054321987"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d4ed8] font-mono"
                    />
                    {formErrors.nationalCode && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.nationalCode}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      محل تولد <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      placeholder="مثال: تهران"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d4ed8]"
                    />
                    {formErrors.birthPlace && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.birthPlace}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      تاریخ تولد (شمسی) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      placeholder="مثال: 1365/06/10"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d4ed8]"
                    />
                    {formErrors.birthDate && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.birthDate}</p>}
                  </div>
                </div>
              </div>

              {/* Professional fields */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-[#1d4ed8] pb-1 border-b border-stone-200">
                  ۲. تخصص‌ها، تجربیات تدریس و کارگاهی
                </h4>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    معرفی کوتاه یا زندگی‌نامه حرفه‌ای <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="شرح مختصری از سوابق علمی، پروژه‌ها و رویکرد آموزشی..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d4ed8]"
                  />
                  {formErrors.bio && <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.bio}</p>}
                </div>

                <TagInput
                  label="حوزه‌های تخصصی مربی *"
                  tags={specialties}
                  onChange={setSpecialties}
                  placeholder="مثلاً: مستندسازی، فن بیان، مدیریت پروژه، تولید ویدیو..."
                  suggestions={['تولید محتوا', 'فن بیان', 'مستندسازی', 'مدیریت تشکل', 'روایت‌پژوهی']}
                  colorTheme="coach"
                />
                {formErrors.specialties && <p className="text-rose-600 text-[11px]">{formErrors.specialties}</p>}

                <TagInput
                  label="موضوعاتی که امکان تدریس آن‌ها را دارید *"
                  tags={teachableSubjects}
                  onChange={setTeachableSubjects}
                  placeholder="عنوان کارگاه‌ها یا مباحث آموزشی مد نظر..."
                  suggestions={['کارگاه مستند با موبایل', 'اصول سناریونویسی', 'فن بیان کاربردی', 'بوم مدل تشکل']}
                  colorTheme="coach"
                />
                {formErrors.teachableSubjects && <p className="text-rose-600 text-[11px]">{formErrors.teachableSubjects}</p>}

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    سوابق تدریس و فعالیت‌های آموزشی
                  </label>
                  <textarea
                    rows={2}
                    value={teachingHistory}
                    onChange={(e) => setTeachingHistory(e.target.value)}
                    placeholder="دانشگاه‌ها، کانون‌ها، موسسات، تعداد کارگاه‌های برگزار شده..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d4ed8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    سوابق فعالیت حرفه‌ای و اجرایی
                  </label>
                  <textarea
                    rows={2}
                    value={professionalExperience}
                    onChange={(e) => setProfessionalExperience(e.target.value)}
                    placeholder="پروژه‌ها، آثار تولیدشده، سمت‌های اجرایی یا افتخارات..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d4ed8]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ثبت اطلاعات مربی</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionLayout>
  );
};
