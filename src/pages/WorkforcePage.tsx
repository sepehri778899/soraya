import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SectionLayout } from '../components/common/SectionLayout';
import { TagInput } from '../components/common/TagInput';
import { StatusBadge } from '../components/common/StatusBadge';
import { Person, VerificationStatus } from '../types';
import {
  validateIranianNationalCode,
  maskNationalCode,
  toPersianDigits
} from '../utils/persianUtils';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit2,
  Calendar,
  MapPin,
  Sparkles,
  Award,
  Heart,
  X,
  FileCheck
} from 'lucide-react';

export const WorkforcePage: React.FC = () => {
  const { role, persons, addPerson, updatePerson, updatePersonStatus } = useApp();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTalent, setSelectedTalent] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'self' | 'manager'>('self');
  const [viewingPerson, setViewingPerson] = useState<Person | null>(null);

  // Form Fields State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [bio, setBio] = useState('');
  const [talents, setTalents] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [registeredByName, setRegisteredByName] = useState(
    role === 'admin' ? 'مدیر سامانه' : role === 'coach' ? 'مربی دوره' : ''
  );
  const [consentAccepted, setConsentAccepted] = useState(false);

  // Form Validation Errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Reset form
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setFatherName('');
    setNationalCode('');
    setBirthPlace('');
    setBirthDate('');
    setBio('');
    setTalents([]);
    setSkills([]);
    setInterests([]);
    setNotes('');
    setConsentAccepted(false);
    setFormErrors({});
  };

  const handleOpenForm = (mode: 'self' | 'manager') => {
    resetForm();
    setFormMode(mode);
    setRegisteredByName(
      mode === 'self' ? '' : role === 'admin' ? 'مدیر سامانه' : 'مربی همکار'
    );
    setIsFormOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!firstName.trim()) errors.firstName = 'نام الزامی است.';
    if (!lastName.trim()) errors.lastName = 'نام خانوادگی الزامی است.';
    if (!fatherName.trim()) errors.fatherName = 'نام پدر الزامی است.';

    const codeValidation = validateIranianNationalCode(nationalCode);
    if (!codeValidation.isValid) {
      errors.nationalCode = codeValidation.message;
    }

    if (!birthPlace.trim()) errors.birthPlace = 'محل تولد الزامی است.';
    if (!birthDate.trim()) errors.birthDate = 'تاریخ تولد الزامی است.';
    if (!bio.trim()) errors.bio = 'معرفی کوتاه یا زندگی‌نامه الزامی است.';
    if (talents.length === 0) errors.talents = 'حداقل یک مورد استعداد ثبت نمایید.';
    if (skills.length === 0) errors.skills = 'حداقل یک مهارت مشخص کنید.';
    if (!consentAccepted) errors.consent = 'تأیید رضایت برای ثبت اطلاعات هویتی الزامی است.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Role-dependent initial status: if registered by admin => approved; if self => pending
    const initialStatus: VerificationStatus = formMode === 'manager' && role === 'admin' ? 'approved' : 'pending';

    addPerson(
      {
        firstName,
        lastName,
        fatherName,
        nationalCode,
        birthPlace,
        birthDate,
        bio,
        talents,
        skills,
        interests,
        notes,
        submissionType: formMode,
        registeredByName: formMode === 'manager' ? registeredByName || 'مدیر مجموعه' : undefined
      },
      initialStatus
    );

    setIsFormOpen(false);
    resetForm();
  };

  // Collect all unique talents for filter dropdown
  const allTalents = Array.from(new Set(persons.flatMap(p => p.talents)));

  // Filtered persons
  const filteredPersons = persons.filter(p => {
    // If visitor, only show approved persons
    if (role === 'visitor' && p.status !== 'approved') return false;

    // Search query
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      fullName.includes(searchQuery.toLowerCase()) ||
      p.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.talents.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    // Talent filter
    const matchesTalent = selectedTalent === 'all' || p.talents.includes(selectedTalent);

    // Status filter (only for admin/coach)
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;

    return matchesSearch && matchesTalent && matchesStatus;
  });

  return (
    <SectionLayout
      section="workforce"
      title="شناسایی نیرو"
      subtitle="کشف استعدادها، ثبت توانمندی‌های فردی و شبکه‌سازی انسانی"
      icon={<Users className="w-6 h-6" />}
      breadcrumbs={[{ label: 'شناسایی نیرو' }]}
      actions={
        <div className="flex items-center gap-2">
          {/* Option 1: Self declaration */}
          <button
            onClick={() => handleOpenForm('self')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#1e7046] text-white hover:bg-[#165636] shadow-xs transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>ثبت اطلاعات من (خوداظهاری)</span>
          </button>

          {/* Option 2: Coach/Manager Registration */}
          {(role === 'admin' || role === 'coach') && (
            <button
              onClick={() => handleOpenForm('manager')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white text-[#1e7046] border border-[#97d4b4] hover:bg-[#EAF7F0] transition-colors"
            >
              <FileCheck className="w-4 h-4" />
              <span>ثبت نیرو توسط {role === 'admin' ? 'مدیر' : 'مربی'}</span>
            </button>
          )}
        </div>
      }
    >
      {/* Intro highlight box */}
      <div className="bg-[#EAF7F0] border border-[#97d4b4]/70 rounded-2xl p-4 sm:p-5 mb-6 text-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-sm sm:text-base font-bold text-[#1e7046] flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            فرصت‌های رشد و مشارکت نیروهای مستعد
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl">
            اگر علاقه‌مند به شرکت در دوره‌های مهارت‌افزایی، پیوستن به تیم‌های اجرایی و همکاری در پروژه‌های فرهنگی و علمی هستید، مشخصات و توانمندی‌های فردی خود را ثبت نمایید تا متناسب با ظرفیت‌ها به مربیان و فرصت‌های مناسب متصل شوید.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#1e7046] font-medium shrink-0 bg-white/70 px-3 py-2 rounded-xl border border-[#97d4b4]/40">
          <span>تعداد پرونده‌های فعال:</span>
          <span className="font-bold text-sm">{toPersianDigits(persons.length)}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-3 sm:p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جست‌وجوی نام، مهارت یا استعداد..."
            className="w-full pr-9 pl-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e7046] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {/* Talent Filter */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              استعداد:
            </span>
            <select
              value={selectedTalent}
              onChange={(e) => setSelectedTalent(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1e7046] text-stone-800 cursor-pointer shadow-2xs"
            >
              <option value="all">همه استعدادها</option>
              {allTalents.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Status Filter for Manager/Coach */}
          {(role === 'admin' || role === 'coach') && (
            <div className="flex items-center gap-1.5 shrink-0 mr-2">
              <span className="text-xs text-stone-500">وضعیت:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1e7046] text-stone-800 cursor-pointer shadow-2xs"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="approved">تأییدشده</option>
                <option value="pending">در انتظار بررسی</option>
                <option value="needs_revision">نیازمند اصلاح</option>
                <option value="rejected">ردشده</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Directory Grid */}
      {filteredPersons.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#EAF7F0] text-[#1e7046] flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-stone-800 text-sm sm:text-base">هیچ پرونده‌ای یافت نشد</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            با فیلترها یا عبارت جست‌وجوی انتخاب‌شده موردی پیدا نشد. می‌توانید فیلترها را پاک کرده یا اطلاعات فرد جدیدی را ثبت فرمایید.
          </p>
          <button
            onClick={() => handleOpenForm('self')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1e7046] text-white text-xs font-semibold rounded-xl hover:bg-[#165636] transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            ثبت اولین نیروی مستعد
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPersons.map(person => (
            <div
              key={person.id}
              className="bg-white border border-stone-200/90 hover:border-[#97d4b4] rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:shadow-sm flex flex-col justify-between group"
            >
              <div>
                {/* Header card with name & status */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF7F0] border border-[#97d4b4]/50 text-[#1e7046] font-bold text-sm flex items-center justify-center shrink-0">
                      {person.firstName[0]}‌{person.lastName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm group-hover:text-[#1e7046] transition-colors">
                        {person.firstName} {person.lastName}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          {person.birthPlace}
                        </span>
                        <span>•</span>
                        <span>متولد {toPersianDigits(person.birthDate.split('/')[0])}</span>
                      </div>
                    </div>
                  </div>

                  <StatusBadge status={person.status} size="sm" />
                </div>

                {/* Bio text */}
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                  {person.bio}
                </p>

                {/* Talents */}
                <div className="mb-2.5">
                  <span className="text-[11px] text-stone-500 block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    استعدادها:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {person.talents.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-[#EAF7F0] text-[#1e7046] border border-[#97d4b4]/40 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <span className="text-[11px] text-stone-500 block mb-1 flex items-center gap-1">
                    <Award className="w-3 h-3 text-emerald-600" />
                    مهارت‌ها:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {person.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-normal"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-600">
                  {person.submissionType === 'self' ? 'ثبت خوداظهاری' : `ثبت: ${person.registeredByName || 'مجموعه'}`}
                </span>

                <button
                  onClick={() => setViewingPerson(person)}
                  className="flex items-center gap-1 text-[#1e7046] hover:text-[#165636] font-semibold transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>مشاهده جزئیات</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {viewingPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-stone-200 shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#EAF7F0] border-b border-[#97d4b4]/60 p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#97d4b4] text-[#1e7046] font-bold text-base flex items-center justify-center shadow-xs">
                  {viewingPerson.firstName[0]}‌{viewingPerson.lastName[0]}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {viewingPerson.firstName} {viewingPerson.lastName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-600 mt-0.5">
                    <span>ثبت: {viewingPerson.submissionType === 'self' ? 'خود فرد' : viewingPerson.registeredByName}</span>
                    <span>•</span>
                    <span>تاریخ: {toPersianDigits(viewingPerson.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={viewingPerson.status} />
                <button
                  onClick={() => setViewingPerson(null)}
                  className="p-1.5 rounded-xl hover:bg-stone-200/60 text-stone-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              {/* Identity info */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-stone-600 block text-xs">نام پدر:</span>
                  <span className="font-semibold text-stone-800">
                    {role === 'visitor' ? 'محرمانه' : viewingPerson.fatherName}
                  </span>
                </div>
                <div>
                  <span className="text-stone-600 block text-xs">کد ملی:</span>
                  <span className="font-semibold text-stone-800 font-mono">
                    {role === 'visitor' ? maskNationalCode(viewingPerson.nationalCode) : toPersianDigits(viewingPerson.nationalCode)}
                  </span>
                </div>
                <div>
                  <span className="text-stone-600 block text-xs">محل تولد:</span>
                  <span className="font-semibold text-stone-800">{viewingPerson.birthPlace}</span>
                </div>
                <div>
                  <span className="text-stone-600 block text-xs">تاریخ تولد:</span>
                  <span className="font-semibold text-stone-800">{toPersianDigits(viewingPerson.birthDate)}</span>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h4 className="font-bold text-stone-800 text-xs mb-1">زندگی‌نامه و معرفی کوتاه:</h4>
                <p className="text-stone-600 leading-relaxed bg-white border border-stone-200 p-3 rounded-xl">
                  {viewingPerson.bio}
                </p>
              </div>

              {/* Talents & Skills */}
              <div className="space-y-2">
                <div>
                  <h4 className="font-bold text-stone-800 text-xs mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    استعدادها:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingPerson.talents.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-[#EAF7F0] text-[#1e7046] border border-[#97d4b4]/60 rounded-lg text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-stone-800 text-xs mb-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    مهارت‌ها و توانمندی‌ها:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingPerson.skills.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-stone-100 text-stone-800 border border-stone-200 rounded-lg text-xs font-normal">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {viewingPerson.interests.length > 0 && (
                  <div>
                    <h4 className="font-bold text-stone-800 text-xs mb-1 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      زمینه‌های مورد علاقه:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {viewingPerson.interests.map((it, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-rose-50 text-rose-900 border border-rose-200 rounded-lg text-xs">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {viewingPerson.notes && (role === 'admin' || role === 'coach') && (
                  <div className="pt-2">
                    <h4 className="font-bold text-stone-800 text-xs mb-1">یادداشت‌های ارزیابی داخلی:</h4>
                    <p className="text-xs text-stone-600 bg-amber-50/60 border border-amber-200 p-2.5 rounded-lg">
                      {viewingPerson.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Status Action Buttons for Admin */}
              {role === 'admin' && (
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-stone-700">تغییر وضعیت پرونده:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        updatePersonStatus(viewingPerson.id, 'approved');
                        setViewingPerson(prev => prev ? { ...prev, status: 'approved' } : null);
                      }}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                    >
                      تأیید نهایی
                    </button>
                    <button
                      onClick={() => {
                        updatePersonStatus(viewingPerson.id, 'needs_revision');
                        setViewingPerson(prev => prev ? { ...prev, status: 'needs_revision' } : null);
                      }}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-900 transition-colors"
                    >
                      نیازمند اصلاح
                    </button>
                    <button
                      onClick={() => {
                        updatePersonStatus(viewingPerson.id, 'rejected');
                        setViewingPerson(prev => prev ? { ...prev, status: 'rejected' } : null);
                      }}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 transition-colors"
                    >
                      رد پرونده
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-stone-50 border-t border-stone-200 p-3.5 flex justify-end">
              <button
                onClick={() => setViewingPerson(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl my-6 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="bg-[#EAF7F0] border-b border-[#97d4b4]/60 p-4 sm:p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#97d4b4] text-[#1e7046] flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                    {formMode === 'self' ? 'فرم خوداظهاری شناسایی نیرو' : 'فرم ثبت نیرو توسط مربی / مدیر'}
                  </h3>
                  <p className="text-[11px] text-stone-600">
                    {formMode === 'self'
                      ? 'اطلاعات شما با حفظ محرمانگی بررسی و طبقه‌بندی خواهد شد.'
                      : `ثبت اطلاعات پرونده با منبع رسمی: ${registeredByName || 'مسئول مجموعه'}`}
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

            {/* Form Content */}
            <form onSubmit={handleSubmitForm} className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {/* Informative note */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>نکته مهم:</strong> اطلاعات هویتی و کد ملی به‌منظور احراز هویت دقیق استعدادیابی دریافت می‌شود. این اطلاعات برای عموم کاربران مخفی بوده و صرفاً با رضایت آگاهانه در سامانه پردازش خواهد شد.
                </span>
              </div>

              {/* Section 1: Identity Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#1e7046] pb-1 border-b border-stone-200">
                  ۱. اطلاعات هویتی و سجلی
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
                      placeholder="مثال: محمدرضا"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e7046]"
                    />
                    {formErrors.firstName && (
                      <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      نام خانوادگی <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="مثال: صادقی"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e7046]"
                    />
                    {formErrors.lastName && (
                      <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      نام پدر <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      placeholder="مثال: احمد"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e7046]"
                    />
                    {formErrors.fatherName && (
                      <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.fatherName}</p>
                    )}
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
                      placeholder="مثال: 0019283746"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e7046] font-mono"
                    />
                    {formErrors.nationalCode && (
                      <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.nationalCode}</p>
                    )}
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
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e7046]"
                    />
                    {formErrors.birthPlace && (
                      <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.birthPlace}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      تاریخ تولد (شمسی) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      placeholder="مثال: 1380/04/15"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e7046]"
                    />
                    {formErrors.birthDate && (
                      <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.birthDate}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Talents & Skills */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-[#1e7046] pb-1 border-b border-stone-200">
                  ۲. استعدادها، توانمندی‌ها و سوابق
                </h4>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    زندگی‌نامه یا معرفی کوتاه فرد <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="شرح مختصری از سوابق تحصیلی، فعالیت‌های گروهی و اشتیاق‌ها..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e7046] leading-relaxed"
                  />
                  {formErrors.bio && (
                    <p className="text-rose-600 text-[11px] mt-0.5">{formErrors.bio}</p>
                  )}
                </div>

                <TagInput
                  label="استعدادهای فرد (حداقل یک مورد) *"
                  tags={talents}
                  onChange={setTalents}
                  placeholder="مثلاً: پژوهش، نویسندگی، تولید محتوا، تفکر تحلیلی..."
                  suggestions={['پژوهش', 'نویسندگی', 'تولید محتوا', 'هنر تجسمی', 'ارتباطات', 'برنامه‌نویسی']}
                  colorTheme="workforce"
                />
                {formErrors.talents && (
                  <p className="text-rose-600 text-[11px]">{formErrors.talents}</p>
                )}

                <TagInput
                  label="توانمندی‌ها و مهارت‌ها *"
                  tags={skills}
                  onChange={setSkills}
                  placeholder="مثلاً: Premiere, Photoshop, عکاسی, سخنرانی..."
                  suggestions={['تدوین با Premiere', 'Photoshop', 'طراحی پوستر', 'عکاسی', 'اکسل', 'مدیریت رویداد']}
                  colorTheme="workforce"
                />
                {formErrors.skills && (
                  <p className="text-rose-600 text-[11px]">{formErrors.skills}</p>
                )}

                <TagInput
                  label="زمینه‌های مورد علاقه (اختیاری)"
                  tags={interests}
                  onChange={setInterests}
                  placeholder="مثلاً: پادکست، مستندسازی، کارهای جهادی..."
                  suggestions={['تولید پادکست', 'فعالیت‌های جهادی', 'اردوهای فرهنگی', 'کتابخوانی']}
                  colorTheme="workforce"
                />

                {formMode === 'manager' && (
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      ثبت‌کننده اطلاعات / مسئول معرف
                    </label>
                    <input
                      type="text"
                      value={registeredByName}
                      onChange={(e) => setRegisteredByName(e.target.value)}
                      placeholder="نام مدیر یا مسئول پایگاه ثبت‌کننده"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e7046]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    توضیحات تکمیلی یا ارزیابی اولیه (اختیاری)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="نکات خاص، نیازمندی‌های پشتیبانی یا دوره‌های پیشنهادی..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e7046]"
                  />
                </div>
              </div>

              {/* Consent check */}
              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consentAccepted}
                    onChange={(e) => setConsentAccepted(e.target.checked)}
                    className="mt-0.5 rounded text-[#1e7046] focus:ring-[#1e7046]"
                  />
                  <span className="text-xs text-stone-700 leading-relaxed">
                    صحت اطلاعات فوق را تأیید نموده و رضایت آگاهانه خود را جهت طبقه‌بندی و شبکه‌سازی توانمندی‌ها در سامانه «سمت ثریا» اعلام می‌دارم.
                  </span>
                </label>
                {formErrors.consent && (
                  <p className="text-rose-600 text-[11px] mt-1">{formErrors.consent}</p>
                )}
              </div>

              {/* Form Action Buttons */}
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
                  className="px-5 py-2 bg-[#1e7046] hover:bg-[#165636] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ثبت و ذخیره پرونده</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionLayout>
  );
};
