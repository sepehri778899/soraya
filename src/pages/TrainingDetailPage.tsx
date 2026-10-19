import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SectionLayout } from '../components/common/SectionLayout';
import { toPersianDigits } from '../utils/persianUtils';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Wrench,
  Target,
  FileText,
  BookmarkCheck,
  Video,
  Image as ImageIcon,
  ExternalLink,
  Printer,
  ChevronDown,
  ChevronUp,
  Share2,
  Award,
  Sparkles
} from 'lucide-react';

export const TrainingDetailPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { trainingTopics, categories, addToast } = useApp();

  const topic = trainingTopics.find(t => t.id === topicId);
  const category = categories.find(c => c.id === topic?.categoryId);

  // Active step accordion or view state
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  if (!topic) {
    return (
      <SectionLayout
        section="training"
        title="سرفصل یافت نشد"
        subtitle="موردی با این شناسه در سامانه ثبت نشده است."
        breadcrumbs={[{ label: 'سرفصل‌های آموزشی', href: '/training' }, { label: 'خطا' }]}
      >
        <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center space-y-4">
          <p className="text-sm text-stone-600">سرفصل آموزشی مورد نظر یافت نشد یا غیرفعال شده است.</p>
          <Link
            to="/training"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#6d28d9] text-white text-xs font-semibold rounded-xl"
          >
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت به بانک سرفصل‌ها</span>
          </Link>
        </div>
      </SectionLayout>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('پیوند سرفصل آموزشی در حافظه کپی شد.');
  };

  return (
    <SectionLayout
      section="training"
      title={topic.title}
      subtitle={`سرفصل کارگاهی مصوب در دسته ${category?.title || 'عمومی'}`}
      icon={<BookOpen className="w-6 h-6" />}
      breadcrumbs={[
        { label: 'سرفصل‌های آموزشی', href: '/training' },
        { label: topic.title }
      ]}
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 transition-colors shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>اشتراک‌گذاری</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#6d28d9] text-white hover:bg-[#5b21b6] transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>چاپ طرح درس</span>
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* ================= 1. معرفی آموزش ================= */}
        <section className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[#F3EEFF] text-[#6d28d9] border border-[#caaaf7]/50">
                  {category?.title}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-stone-100 text-stone-700 border border-stone-200">
                  سطح: {topic.level}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  مدت دوره: {toPersianDigits(topic.estimatedDuration)}
                </span>
              </div>

              <h1 className="text-lg sm:text-2xl font-bold text-stone-900 leading-snug">
                {topic.title}
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#F3EEFF]/40 border border-[#caaaf7]/40 p-4 rounded-2xl">
                {topic.shortDescription}
              </p>

              <div className="flex items-center gap-2 text-xs text-stone-600 pt-1">
                <span className="font-semibold text-stone-800">مخاطبان هدف دوره:</span>
                <span>{topic.targetAudience}</span>
              </div>
            </div>

            {topic.coverImage && (
              <div className="lg:w-80 h-48 lg:h-auto rounded-2xl overflow-hidden border border-stone-200 shrink-0 shadow-xs">
                <img
                  src={topic.coverImage}
                  alt={topic.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* ================= 2. اهداف آموزشی & 3. پیش‌نیازها ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ۲. اهداف آموزشی */}
          <section className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
                <div className="w-8 h-8 rounded-xl bg-[#F3EEFF] text-[#6d28d9] flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-stone-900">
                  ۲. اهداف آموزشی و دستاوردها
                </h2>
              </div>

              <ul className="space-y-2.5">
                {topic.learningObjectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-[#6d28d9] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ۳. پیش‌نیازهای آموزش */}
          <section className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <BookmarkCheck className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-stone-900">
                  ۳. پیش‌نیازهای آموزش
                </h2>
              </div>

              <ul className="space-y-2.5">
                {topic.prerequisites.map((pre, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2"></span>
                    <span>{pre}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-200 mt-4">
              شرکت‌کنندگان باید قبل از جلسه اول از احراز شرایط فوق اطمینان حاصل نمایند.
            </p>
          </section>
        </div>

        {/* ================= 4. تجهیزات و ملزومات اجرایی ================= */}
        <section className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
            <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-stone-900">
                ۴. تجهیزات و ملزومات اجرایی کارگاه
              </h2>
              <p className="text-[11px] text-stone-500">
                فهرست کامل ادوات، ابزارها و سخت‌افزارهای مورد نیاز برای برگزاری استاندارد
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                  <th className="py-2.5 px-3 rounded-r-xl">ردیف</th>
                  <th className="py-2.5 px-3">نام وسیله / تجهیزات</th>
                  <th className="py-2.5 px-3">تعداد / مقدار</th>
                  <th className="py-2.5 px-3 rounded-l-xl">توضیحات و مشخصات فنی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {topic.equipment.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-3 text-stone-600 font-mono">{toPersianDigits(idx + 1)}</td>
                    <td className="py-3 px-3 font-semibold text-stone-900">{item.name}</td>
                    <td className="py-3 px-3 text-stone-700 bg-stone-50/40">{toPersianDigits(item.quantity)}</td>
                    <td className="py-3 px-3 text-stone-500 text-xs">{item.description || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ================= 5. مراحل اجرای آموزش (مهم‌ترین قسمت) ================= */}
        <section className="bg-white border border-[#caaaf7]/80 rounded-3xl p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#F3EEFF] border border-[#caaaf7] text-[#6d28d9] flex items-center justify-center font-bold text-sm">
                ۵
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                  مراحل اجرای آموزش
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#ede9fe] text-[#6d28d9]">
                    {toPersianDigits(topic.steps.length)} مرحله مدون
                  </span>
                </h2>
                <p className="text-xs text-stone-500">
                  تایم‌لاین گام‌به‌گام اجرای کارگاه با نکات تکمیلی و رسانه‌های آموزشی
                </p>
              </div>
            </div>
          </div>

          {/* Vertical Step-by-Step Timeline */}
          <div className="space-y-6">
            {topic.steps.map((step, index) => {
              const isSelected = activeStepIndex === index;

              return (
                <div
                  key={step.id}
                  className={`rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-[#caaaf7] bg-white ring-2 ring-[#ede9fe] shadow-sm'
                      : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
                  }`}
                >
                  {/* Step Header */}
                  <div
                    onClick={() => setActiveStepIndex(isSelected ? -1 : index)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#6d28d9] text-white shadow-xs' : 'bg-stone-200 text-stone-700'
                      }`}>
                        {toPersianDigits(step.stepNumber)}
                      </div>
                      <div>
                        <span className="text-[11px] text-[#6d28d9] font-bold block">گام {toPersianDigits(step.stepNumber)}</span>
                        <h3 className="font-bold text-stone-900 text-sm sm:text-base">{step.title}</h3>
                      </div>
                    </div>

                    <button className="text-stone-400 hover:text-stone-700 p-1">
                      {isSelected ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Step Details (Expanded) */}
                  {isSelected && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 space-y-4 border-t border-stone-100 text-xs sm:text-sm">
                      {/* Detailed Description */}
                      <p className="text-stone-700 leading-relaxed font-normal bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
                        {step.description}
                      </p>

                      {/* Implementation Tips */}
                      {step.implementationTips && (
                        <div className="bg-[#EAF7F0] border border-[#97d4b4] rounded-xl p-3.5 flex items-start gap-2.5 text-[#1e7046]">
                          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block text-xs">نکته طلایی و تجربی مربی:</span>
                            <span className="text-xs leading-relaxed font-normal text-stone-800">{step.implementationTips}</span>
                          </div>
                        </div>
                      )}

                      {/* Safety Warnings */}
                      {step.safetyWarnings && (
                        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-start gap-2.5 text-rose-800">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block text-xs">هشدار یا نکته ایمنی:</span>
                            <span className="text-xs leading-relaxed font-normal text-stone-800">{step.safetyWarnings}</span>
                          </div>
                        </div>
                      )}

                      {/* Media Display (Video or Image) */}
                      {step.mediaType === 'video' && step.mediaUrl && (
                        <div className="bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 p-2 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs text-stone-300 px-2 pt-1">
                            <Video className="w-3.5 h-3.5 text-rose-400" />
                            <span>ویدیوی راهنمای این مرحله</span>
                          </div>
                          <video
                            controls
                            src={step.mediaUrl}
                            className="w-full rounded-xl max-h-80 bg-black"
                            poster={topic.coverImage}
                          >
                            مرورگر شما از پخش مستقیم ویدیو پشتیبانی نمی‌کند.
                          </video>
                          {step.mediaCaption && (
                            <p className="text-[11px] text-stone-400 px-2 pb-1 text-center">
                              {step.mediaCaption}
                            </p>
                          )}
                        </div>
                      )}

                      {step.mediaType === 'image' && step.mediaUrl && (
                        <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 p-2 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs text-stone-600 px-2 pt-1">
                            <ImageIcon className="w-3.5 h-3.5 text-[#6d28d9]" />
                            <span>تصویر راهنمای اجرای این مرحله</span>
                          </div>
                          <img
                            src={step.mediaUrl}
                            alt={step.title}
                            className="w-full rounded-xl object-cover max-h-72"
                            loading="lazy"
                          />
                          {step.mediaCaption && (
                            <p className="text-[11px] text-stone-500 px-2 pb-1 text-center font-medium">
                              {step.mediaCaption}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 6. خروجی مورد انتظار & 7. ارزیابی یادگیری ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ۶. خروجی مورد انتظار */}
          <section className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-stone-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-stone-900">
                ۶. خروجی مورد انتظار در پایان کارگاه
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#EAF7F0]/40 border border-[#97d4b4]/40 p-4 rounded-2xl">
              {topic.expectedOutcome}
            </p>
          </section>

          {/* ۷. ارزیابی یادگیری */}
          <section className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-stone-100">
              <div className="w-8 h-8 rounded-xl bg-[#F3EEFF] text-[#6d28d9] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-stone-900">
                ۷. سنجه‌های ارزیابی یادگیری
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 border border-stone-200 p-4 rounded-2xl">
              {topic.learningEvaluation}
            </p>
          </section>
        </div>

        {/* ================= 8. جمع‌بندی و نتیجه‌گیری ================= */}
        <section className="bg-gradient-to-l from-[#F3EEFF] via-white to-[#F3EEFF] border border-[#caaaf7] rounded-3xl p-5 sm:p-7 shadow-xs">
          <h2 className="text-sm sm:text-base font-bold text-[#6d28d9] mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            ۸. جمع‌بندی و نتیجه‌گیری کارگاه
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
            {topic.conclusion}
          </p>
        </section>

        {/* ================= 9. منابع و پیوست‌ها ================= */}
        <section className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-stone-100">
            <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
              <ExternalLink className="w-4 h-4" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-stone-900">
              ۹. منابع، کتاب‌ها و پیوست‌های آموزشی
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topic.resources.map((res, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm mb-1">{res.title}</h4>
                  {res.description && (
                    <p className="text-xs text-stone-500 leading-relaxed">{res.description}</p>
                  )}
                </div>
                {res.url && (
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-stone-900 shrink-0"
                    title="مشاهده پیوند"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </SectionLayout>
  );
};
