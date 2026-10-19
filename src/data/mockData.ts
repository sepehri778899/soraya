import { Person, NeedOrService, Coach, TrainingTopic, TrainingCategory } from '../types';

export const INITIAL_CATEGORIES: TrainingCategory[] = [
  {
    id: 'media-content',
    title: 'رسانه و تولید محتوا',
    description: 'کارگاه‌های عملی ویدیو، صوت، پادکست، گرافیک و نویسندگی خلاق',
    icon: 'Video',
  },
  {
    id: 'personal-growth',
    title: 'مهارت‌های فردی و تفکر انتقادی',
    description: 'مدیریت زمان، حل مسئله، کار تیمی و مهارت‌های ارتباطی مؤثر',
    icon: 'Sparkles',
  },
  {
    id: 'cultural-management',
    title: 'مدیریت و فعالیت‌های فرهنگی',
    description: 'مدیریت پروژه، جذب سرمایه، تشکل‌داری و رویدادسازی مردمی',
    icon: 'Briefcase',
  },
  {
    id: 'tech-innovation',
    title: 'فناوری و مهارت‌های دیجیتال',
    description: 'ابزارهای هوش مصنوعی، طراحی وب، امنیت داده و اتوماسیون سازمانی',
    icon: 'Cpu',
  },
];

export const INITIAL_TOPICS: TrainingTopic[] = [
  {
    id: 'video-production-mastery',
    title: 'آشنایی با اصول تولید محتوای ویدیویی',
    categoryId: 'media-content',
    shortDescription: 'راهنمای گام‌به‌گام و عملی از ایده و سناریو تا فیلم‌برداری، نورپردازی و تدوین نهایی ویدیو برای انتشار در فضای مجازی.',
    targetAudience: 'نوجوانان و جوانان علاقه‌مند به رسانه، مربیان فرهنگی و تولیدکنندگان محتوا',
    level: 'متوسط',
    estimatedDuration: '۱۶ ساعت (۴ جلسه ۴ ساعته)',
    iconName: 'Video',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    learningObjectives: [
      'شناخت ساختار یک ویدیوی جذاب و تکنیک قلاب (Hook) در ۳ ثانیه اول',
      'تسلط بر نورپردازی سه‌نقطه‌ای با امکانات در دسترس و کم‌هزینه',
      'اصول صدابرداری بدون نویز و تنظیم زاویه‌ها و کادربندی استاندارد',
      'یادگیری برش‌های ریتمیک، تصحیح رنگ و اضافه کردن زیرنویس پویا در نرم‌افزارهای تدوین',
      'توانایی تولید یک اثر کامل و مستقل در کارگاه عملی'
    ],
    prerequisites: [
      'آشنایی مقدماتی با کار با گوشی هوشمند یا دوربین عکاسی',
      'علاقه‌مندی به داستان‌گویی تصویری و کار تیمی'
    ],
    equipment: [
      { id: 'eq-1', name: 'گوشی هوشمند دارای دوربین باکیفیت یا دوربین DSLR', quantity: '۱ دستگاه به ازای هر گروه دو نفره', description: 'قابلیت ضبط حداقل 1080p با ۳۰ فریم' },
      { id: 'eq-2', name: 'میکروفون یقه‌ای بی‌سیم یا با سیم', quantity: '۱ عدد برای هر تیم', description: 'ترجیحاً میکروفون ۳.۵ میلی‌متری یا تایپ‌سی' },
      { id: 'eq-3', name: 'سه‌پایه دوربین و هولدر موبایل ضدلغزش', quantity: '۱ عدد', description: 'برای ثبات کامل کادر تصویر' },
      { id: 'eq-4', name: 'کیت نور رینگ‌لایت یا دو عدد نور سافت‌باکس رومیزی', quantity: '۱ مجموعه', description: 'جهت نورپردازی صورت و جداسازی پس‌زمینه' },
      { id: 'eq-5', name: 'رایانه یا لپ‌تاپ جهت تدوین', quantity: '۱ دستگاه', description: 'دارای نرم‌افزار پریمیر یا CapCut دسکتاپ' }
    ],
    steps: [
      {
        id: 'step-1',
        stepNumber: 1,
        title: 'ایده‌پردازی، پیش‌تولید و نوشتن سناریوی دو ستونه',
        description: 'در این گام، شرکت‌کنندگان ساختار روایت تصویری را مرور می‌کنند. جدول سناریونویسی شامل دو ستون صدا و تصویر تکمیل می‌شود و قلاب آغازین، بدنه محتوا و دعوت به اقدام (Call To Action) مشخص می‌گردد.',
        implementationTips: 'به هنرجویان تأکید شود که برای یک ویدیوی ۶۰ ثانیه‌ای حداکثر ۱۴۰ کلمه سناریو تنظیم کنند تا ریتم بیان یکنواخت و پرکشش باقی بماند.',
        safetyWarnings: 'هنگام تهیه سناریو از بازنشر محتوای بدون حق نشر پرهیز شود.',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
        mediaCaption: 'نمونه جدول سناریونویسی و تفکیک استوری‌بورد تصویری'
      },
      {
        id: 'step-2',
        stepNumber: 2,
        title: 'کادربندی، ترکیب‌بندی و نورپردازی اصولی',
        description: 'آموزش قانون یک‌سوم (Rule of Thirds)، تنظیم خط چشم سوژه و پیاده‌سازی نور سه‌نقطه‌ای (نور اصلی Key Light، نور پرکننده Fill Light و نور پشتی Rim/Back Light).',
        implementationTips: 'نور اصلی با زاویه ۴۵ درجه نسبت به سوژه قرار گیرد تا سایه‌های ملایم و عمق طبیعی به چهره بدهد.',
        safetyWarnings: 'کابل‌های پایه‌های نور با چسب به زمین محکم شوند تا از افتادن پایه‌ها جلوگیری به عمل آید.',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800&q=80',
        mediaCaption: 'چیدمان هندسی پایه‌های نور در فضای داخلی کارگاه'
      },
      {
        id: 'step-3',
        stepNumber: 3,
        title: 'صدابرداری شفاف و تنظیمات صوتی محیط',
        description: 'اتصال میکروفون یقه‌ای در فاصله ۱۵ تا ۲۰ سانتی‌متری از دهان سوژه، سنجش سطح صدا (Audio Level بین -۱۲ تا -۶ دسی‌بل) و کاهش انعکاس صوت در اتاق ضبط با استفاده از پتو یا پرده‌های جاذب.',
        implementationTips: 'قبل از شروع ضبط اصلی، حتماً ۱۰ ثانیه سکوت مطلق اتاق را ضبط کنید تا در تدوین برای حذف نویز (Noise Reduction) استفاده شود.',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
        mediaCaption: 'نصب صحیح میکروفون یقه‌ای و مانیتورینگ بلندی صدا'
      },
      {
        id: 'step-4',
        stepNumber: 4,
        title: 'اجرای ضبط، مدیریت سوژه و هدایت دوربین',
        description: 'تمرین تنفس و ادای کلمات، تصویربرداری چند زاویه‌ای (A-Roll برای صحبت رو به دوربین و B-Roll برای نماهای کات‌اِوی و جزئیات دست‌ها و وسایل).',
        implementationTips: 'سوژه در ابتدا و انتهای هر برداشت ۳ ثانیه لبخند و سکوت حفظ کند تا تدوینگر فضای کافی برای برش داشته باشد.',
        mediaType: 'video',
        mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        mediaCaption: 'راهنمای ضبط نماهای فرعی و هماهنگی مجری با دوربین'
      },
      {
        id: 'step-5',
        stepNumber: 5,
        title: 'تدوین ریتمیک، صداگذاری و خروجی مناسب انتشار',
        description: 'وارد کردن راش‌ها به نرم‌افزار، حذف سکوت‌ها و کلمات تکراری (Jump Cut حساب‌شده)، افزودن موسیقی پس‌زمینه با ولوم ملایم (-۲۲ دسی‌بل)، تصحیح رنگ اولیه و قرار دادن زیرنویس هماهنگ.',
        implementationTips: 'در ویدیوی شبکه‌های اجتماعی بیش از ۷۰ درصد کاربران بدون صدا ویدیو را تماشا می‌کنند؛ بنابراین زیرنویس خوانا نقش حیاتی دارد.',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80',
        mediaCaption: 'خط زمانی نرم‌افزار تدوین و هماهنگی موسیقی با تصویر'
      }
    ],
    expectedOutcome: 'هر شرکت‌کننده در انتهای کارگاه یک ویدیوی ۹۰ ثانیه‌ای استاندارد و پردازش‌شده با موضوع معرفی یک مفهوم علمی، فرهنگی یا خدمت اجتماعی با کیفیت آماده انتشار تحویل می‌دهد.',
    learningEvaluation: 'ارزیابی بر مبنای جدول سنجه استاندارد: ۳۰٪ کیفیت سناریو و قلاب، ۳۰٪ کیفیت نور و صدا، ۲۵٪ تدوین و ریتم، ۱۵٪ رعایت استانداردهای گرافیکی و خروجی.',
    conclusion: 'تولید محتوای اثربخش بیش از تجهیزات گران‌قیمت، نیازمند وضوح ایده، احترام به وقت مخاطب و تکرار مستمر است. مهارت‌های فراگرفته‌شده در این کارگاه شالوده توانمندسازی رسانه‌ای در عصر دیجیتال خواهد بود.',
    resources: [
      { title: 'کتاب راهنمای تصویربرداری و تدوین مستند', description: 'مرجع آموزشی تکمیلی برای یادگیری نماها و قاب‌بندی سینمایی' },
      { title: 'بانک فونت‌ها و فایل‌های گرافیکی لایه‌باز فارسی', url: 'https://vazirmatn.ir', description: 'منبع آزاد برای استفاده از تایپوگرافی وزیرمتن در ویدیوها' }
    ],
    status: 'published',
    createdAt: '1403/01/15',
    updatedAt: '1403/06/20'
  },
  {
    id: 'public-speaking-and-rhetoric',
    title: 'اصول فن بیان، سخنوری و اقناع مخاطب',
    categoryId: 'personal-growth',
    shortDescription: 'کارگاه عملی تقویت لحن، کنترل استرس، ارتباط چشمی و ساختاردهی به ارائه‌های عمومی و کلاسی.',
    targetAudience: 'مربیان، فعالان فرهنگی و ارائه‌دهندگان پروژه‌ها',
    level: 'مقدماتی',
    estimatedDuration: '۸ ساعت (۲ جلسه ۴ ساعته)',
    iconName: 'Sparkles',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    learningObjectives: [
      'تکنیک‌های تنفس دیافراگمی و گرم‌کردن تارهای صوتی',
      'مدیریت ترس از سخنرانی در برابر جمعیت',
      'ساختاردهی به سخنرانی با فرمول پیام کلیدی و داستان‌گویی'
    ],
    prerequisites: ['اشتیاق به تمرین گروهی و پذیرش بازخورد سازنده'],
    equipment: [
      { id: 'eq-p1', name: 'تریبون یا فضای باز صحنه', quantity: '۱ عدد' },
      { id: 'eq-p2', name: 'میکروفون دستی و بلندگو', quantity: '۱ سیستم صوتی' }
    ],
    steps: [
      {
        id: 's-1',
        stepNumber: 1,
        title: 'تنفس دیافراگمی و آمادگی فیزیکی',
        description: 'تمرین‌های روزانه ۵ دقیقه‌ای برای پر کردن هوای شش‌ها و کنترل لرزش صدا در لحظات اول صحبت.',
        implementationTips: 'شست دست را روی دیافراگم بگذارید و به آرامی دم عمیق بگیرید.'
      },
      {
        id: 's-2',
        stepNumber: 2,
        title: 'طراحی آغاز کوبنده و ارتباط غیرکلامی',
        description: 'استفاده از زبان بدن باز، حفظ لبخند آرام و خیره نشدن به یک نقطه خاص.',
        implementationTips: 'در ۳۰ ثانیه ابتدایی یک سؤال چالش‌برانگیز یا یک آمار تکان‌دهنده مطرح کنید.'
      }
    ],
    expectedOutcome: 'ارائه یک سخنرانی ۳ دقیقه‌ای ضبط‌شده توسط هر شرکت‌کننده همراه با کارنامه تحلیل نقاط قوت و زمینه‌های بهبود.',
    learningEvaluation: 'تحلیل فیلم سخنرانی هر فرد توسط مربی و همتایان با چک‌لیست ۱۰ معیاره استاندارد.',
    conclusion: 'فن بیان مهارتی کاملاً اکتسابی است که با درک ماهیت پیام و تمرین منظم حاصل می‌شود.',
    resources: [
      { title: 'تمرینات صوتی و صداسازی برای گویندگان', description: 'فایل صوتی تمرین‌های گرم‌کردن حنجره' }
    ],
    status: 'published',
    createdAt: '1403/02/10',
    updatedAt: '1403/05/18'
  },
  {
    id: 'cultural-organization-management',
    title: 'مبانی راه‌اندازی و مدیریت تشکل‌های مردمی',
    categoryId: 'cultural-management',
    shortDescription: 'روش‌های جذب نیرو، نگه‌داشت داوطلبان، سازماندهی ساختار و ثبت رسمی مجموعه‌های فرهنگی و اجتماعی.',
    targetAudience: 'مسئولان و کادر اجرایی کانون‌ها و مجموعه‌های فرهنگی',
    level: 'پیشرفته',
    estimatedDuration: '۱۲ ساعت (۳ جلسه ۴ ساعته)',
    iconName: 'Briefcase',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    learningObjectives: [
      'تعریف مأموریت، چشم‌انداز و تدوین منشور ارزشی تشکل',
      'مدل‌های مشارکت مردمی و نظام ارزیابی عملکرد خادمان',
      'مدیریت مالی شفاف و جذب حمایت‌های عمومی'
    ],
    prerequisites: ['سابقه فعالیت اجرایی در یک نهاد یا تشکل مردمی'],
    equipment: [
      { id: 'eq-c1', name: 'تخته وایت‌برد و ماژیک رنگی', quantity: '۲ عدد' },
      { id: 'eq-c2', name: 'برگه‌های طراحی بوم مدل سازمانی', quantity: 'به تعداد گروه‌ها' }
    ],
    steps: [
      {
        id: 'st-c1',
        stepNumber: 1,
        title: 'ترسیم بوم هویت و هسته مرکزی تشکل',
        description: 'تعیین مسئله محوری که تشکل قصد حل آن را در محله یا جامعه هدف دارد.',
        implementationTips: 'از هدف‌های کلی‌گویانه بپرهیزید و یک هدف متمرکز و ملموس بنویسید.'
      }
    ],
    expectedOutcome: 'سند راهبردی ۳ ساله تدوین‌شده برای تشکل مورد نظر شامل چارت سازمانی و برنامه اقدام سال اول.',
    learningEvaluation: 'داوری طرح‌ها توسط دو تن از مدیران باسابقه تشکل‌های فرهنگی کشور.',
    conclusion: 'پایداری فعالیت‌های اجتماعی در گرو نهادسازی و احترام به کرامت نیروهای داوطلب است.',
    resources: [
      { title: 'کتاب الگوهای مدیریت جهادی و مردمی', description: 'مجموعه تجربیات موفق تشکل‌های فرهنگی پیشرو' }
    ],
    status: 'published',
    createdAt: '1403/03/01',
    updatedAt: '1403/07/12'
  }
];

export const INITIAL_PERSONS: Person[] = [
  {
    id: 'per-1',
    firstName: 'محمدرضا',
    lastName: 'صادقی',
    fatherName: 'احمد',
    nationalCode: '0019283746',
    birthPlace: 'تهران',
    birthDate: '1379/08/14',
    bio: 'دانشجوی کارشناسی مهندسی نرم‌افزار، علاقه‌مند به فعالیت‌های فرهنگی رسانه‌ای و تولید ویدیوهای آموزشی کوتاه.',
    talents: ['پژوهش علمی', 'نویسندگی', 'تحلیل داده'],
    skills: ['تدوین با Premiere', 'عکاسی پرتره', 'طراحی وب مقدماتی'],
    interests: ['تولید محتوای آموزشی', 'اردوهای جهادی', 'پادکست'],
    notes: 'نیروی بسیار پرانگیزه و مسئولیت‌پذیر با توانایی هماهنگی تیمی بالا.',
    submissionType: 'self',
    status: 'approved',
    createdAt: '1403/05/10',
    updatedAt: '1403/05/12'
  },
  {
    id: 'per-2',
    firstName: 'فاطمه',
    lastName: 'حسینی',
    fatherName: 'علی',
    nationalCode: '0451829304',
    birthPlace: 'مشهد',
    birthDate: '1381/03/22',
    bio: 'طراح گرافیک و تصویرساز کتاب کودک، فعال در تشکل‌های دانشجویی و علاقه‌مند به کارگاه‌های مهارت‌افزایی.',
    talents: ['هنر تجسمی', 'داستان‌سرایی', 'تفکر خلاق'],
    skills: ['Illustrator', 'فتوشاپ', 'طراحی هویت بصری'],
    interests: ['آموزش به کودکان', 'طراحی پوستر فرهنگی'],
    notes: 'آماده همکاری در طراحی پوسترهای سرفصل‌های آموزشی مجموعه.',
    submissionType: 'manager',
    registeredByName: 'مدیر پایگاه رضوی',
    status: 'approved',
    createdAt: '1403/06/01',
    updatedAt: '1403/06/05'
  },
  {
    id: 'per-3',
    firstName: 'سید علی',
    lastName: 'موسوی',
    fatherName: 'سید محمد',
    nationalCode: '1287654321',
    birthPlace: 'اصفهان',
    birthDate: '1382/11/05',
    bio: 'علاقه‌مند به صدابرداری، اجرای پادکست و گویندگی نریشن.',
    talents: ['گویندگی', 'ارتباطات عمومی'],
    skills: ['ادوب آدیشن', 'تنظیم صدای محیط'],
    interests: ['پادکست تاریخی', 'مستندسازی صوتی'],
    notes: 'در حال تکمیل دوره آموزشی گویندگی مقدماتی.',
    submissionType: 'self',
    status: 'pending',
    createdAt: '1403/07/15',
    updatedAt: '1403/07/15'
  },
  {
    id: 'per-4',
    firstName: 'امیرحسین',
    lastName: 'قاسمی',
    fatherName: 'رضا',
    nationalCode: '0078912345',
    birthPlace: 'شیراز',
    birthDate: '1380/05/19',
    bio: 'توسعه‌دهنده فرانت‌اند و علاقه‌مند به راه‌اندازی سامانه‌های عام‌المنفعه.',
    talents: ['حل مسئله ریاضی', 'برنامه‌نویسی'],
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    interests: ['طراحی سامانه‌های آموزشی', 'هوش مصنوعی'],
    notes: 'در انتظار بررسی مدارک فنی.',
    submissionType: 'self',
    status: 'pending',
    createdAt: '1403/07/18',
    updatedAt: '1403/07/18'
  }
];

export const INITIAL_COACHES: Coach[] = [
  {
    id: 'coach-1',
    firstName: 'دکتر علیرضا',
    lastName: 'کاظمی',
    fatherName: 'محمود',
    nationalCode: '0054321987',
    birthPlace: 'تهران',
    birthDate: '1361/06/10',
    bio: 'مدرس دانشگاه، مستندساز و پژوهشگر ارشد ارتباطات و رسانه با بیش از ۱۵ سال سابقه تدریس عملی.',
    specialties: ['تولید مستند', 'کارگردانی محتوای دیجیتال', 'روایت‌پژوهی'],
    teachingSkills: ['روش تدریس کارگاهی', 'نقد اثر', 'طراحی سرفصل'],
    teachingHistory: 'مدرس دوره‌های رسانه‌ای در دانشگاه تهران، کانون‌های فرهنگی و باشگاه خبرنگاران جوان (۱۳۹۰ تا کنون)',
    professionalExperience: 'کارگردانی ۵ مستند تلویزیونی برگزیده و داور دو جشنواره ملی رسانه‌ای',
    teachableSubjects: ['مستندسازی با موبایل', 'اصول سناریونویسی و استوری‌بورد', 'اخلاق رسانه'],
    notes: 'امکان برگزاری کارگاه‌های فشرده آخر هفته در تهران و استان‌ها.',
    submissionType: 'manager',
    status: 'approved',
    avatarInitials: 'ع‌ک',
    createdAt: '1403/02/01',
    updatedAt: '1403/04/10'
  },
  {
    id: 'coach-2',
    firstName: 'مهندس سارا',
    lastName: 'رستمی',
    fatherName: 'ابراهیم',
    nationalCode: '0067891234',
    birthPlace: 'تبریز',
    birthDate: '1368/09/15',
    bio: 'مشاور مدیریت پروژه‌های فرهنگی و مربی مهارت‌های تیمی و خلاقیت سازمانی.',
    specialties: ['مدیریت پروژه چابک', 'تسهیل‌گری کارگاه', 'مهارت‌های ارتباطی'],
    teachingSkills: ['تسهیل‌گری جلسات طوفان فکری', 'بازی‌وارسازی آموزشی (Gamification)'],
    teachingHistory: 'برگزاری بیش از ۴۰ کارگاه توانمندسازی برای تشکل‌های دانشجویی و مردمی',
    professionalExperience: 'مدیر عملیات اندیشکده حکمرانی محلی و مشاور بیش از ۱۰ استارتاپ اجتماعی',
    teachableSubjects: ['مدیریت زمان و تمرکز', 'طراحی بوم فعالیت فرهنگی', 'حل تعارض در تیم'],
    notes: 'مربی بسیار متعهد با بازخوردهای عالی از مخاطبان دوره‌ها.',
    submissionType: 'manager',
    status: 'approved',
    avatarInitials: 'س‌ر',
    createdAt: '1403/03/12',
    updatedAt: '1403/06/01'
  },
  {
    id: 'coach-3',
    firstName: 'استاد حسن',
    lastName: 'نجفی',
    fatherName: 'حسین',
    nationalCode: '1298765430',
    birthPlace: 'قم',
    birthDate: '1365/04/01',
    bio: 'مدرس فن بیان، گویندگی رادیو و اصول خطابه و سخنرانی در مجامع عمومی.',
    specialties: ['فن بیان', 'گویندگی و پادکست', 'زبان بدن'],
    teachingSkills: ['اصلاح تنفس و صدا', 'تمرینات تنفسی عملی'],
    teachingHistory: 'مدرس صدا و سیما و مراکز آموزش عالی فرهنگی به مدت ۸ سال',
    professionalExperience: 'گوینده برنامه‌های مستند رادیویی و نریتور بیش از ۵۰ پادکست معتبر',
    teachableSubjects: ['فن بیان کاربردی', 'تکنیک‌های خوانش متن', 'اصول دکلمه و شعرخوانی'],
    notes: 'ثبت‌نام خوداظهاری؛ در انتظار نهایی‌سازی مدارک همکاری.',
    submissionType: 'self',
    status: 'pending',
    avatarInitials: 'ح‌ن',
    createdAt: '1403/07/10',
    updatedAt: '1403/07/10'
  }
];

export const INITIAL_NEEDS_SERVICES: NeedOrService[] = [
  // 1. آموزش (Training) - Pair ready for matching!
  {
    id: 'ns-1',
    categoryId: 'training',
    type: 'need',
    title: 'نیاز به آموزش تدوین ویدیویی و موشن‌گرافیک مقدماتی',
    description: 'برای تیم رسانه‌ای کانون فرهنگی محله نیازمند یک کارگاه آموزشی عملی تدوین با پریمیر هستیم تا بچه‌ها بتوانند گزارش‌های تصویری هفتگی تولید کنند.',
    specialty: 'تدوین ویدیو',
    tags: ['تدوین ویدیو', 'پریمیر', 'موشن گرافیک', 'رسانه'],
    location: 'تهران - منطقه ۱۲',
    contactInfo: '۰۹۱۲۰۰۰۰۰۰۱',
    submitterName: 'محمدرضا صادقی',
    submitterRole: 'عضو کانون فرهنگی',
    status: 'approved',
    createdAt: '1403/06/15',
    updatedAt: '1403/06/15'
  },
  {
    id: 'ns-2',
    categoryId: 'training',
    type: 'service',
    title: 'آموزش تخصصی تدوین ویدیو و تصویربرداری با گوشی و دوربین',
    description: 'آمادگی برگزاری کارگاه حضوری یا مجازی ۴ جلسه‌ای آموزش کار با نرم‌افزار پریمیر و اصول کادربندی برای مجموعه‌های مردم‌نهاد و داوطلبانه.',
    specialty: 'تدوین ویدیو',
    tags: ['تدوین ویدیو', 'پریمیر', 'تصویربرداری', 'رسانه'],
    location: 'تهران و امکان اعزام استانی',
    contactInfo: '۰۹۱۹۰۰۰۰۰۰۲',
    submitterName: 'استودیو رسانه نور',
    submitterRole: 'مجموعه تخصصی رسانه‌ای',
    status: 'approved',
    createdAt: '1403/06/18',
    updatedAt: '1403/06/18'
  },
  // 2. مشاوره و تجربه‌نگاری (Consulting) - Pair ready for matching!
  {
    id: 'ns-3',
    categoryId: 'consulting',
    type: 'need',
    title: 'نیازمند مشاوره در ساختارسازی و اساسنامه تشکل فرهنگی',
    description: 'گروهی از جوانان محله در شرف تأسیس یک مؤسسه خیریه و توانمندسازی آموزشی هستیم و به راهنمایی حقوقی و ساختار سازمانی نیاز داریم.',
    specialty: 'مدیریت تشکل',
    tags: ['مشاوره سازمانی', 'اساسنامه', 'تشکل مردمی', 'مدیریت فرهنگی'],
    location: 'مشهد مقدس',
    contactInfo: '۰۹۳۵۰۰۰۰۰۰۳',
    submitterName: 'سید علی موسوی',
    submitterRole: 'نماینده گروه داوطلب',
    status: 'approved',
    createdAt: '1403/07/01',
    updatedAt: '1403/07/01'
  },
  {
    id: 'ns-4',
    categoryId: 'consulting',
    type: 'service',
    title: 'مشاوره رایگان ساختارسازی، اساسنامه و تجربه‌نگاری تشکل‌ها',
    description: 'با بیش از یک دهه سابقه مدیریت نهادهای خیریه و فرهنگی، آماده ارائه جلسات هدایت و انتقال تجربه به گروه‌های نوپا هستم.',
    specialty: 'مدیریت تشکل',
    tags: ['مشاوره سازمانی', 'اساسنامه', 'تشکل مردمی', 'تجربه‌نگاری'],
    location: 'مشهد و مشاوره آنلاین سراسر کشور',
    contactInfo: '۰۹۳۶۰۰۰۰۰۰۴',
    submitterName: 'مهندس سارا رستمی',
    submitterRole: 'مشاور سازمان‌های مردم‌نهاد',
    status: 'approved',
    createdAt: '1403/07/04',
    updatedAt: '1403/07/04'
  },
  // 3. حمایت مالی و تجهیزاتی (Financial & Equipment) - Pair ready for matching!
  {
    id: 'ns-5',
    categoryId: 'finance_equipment',
    type: 'need',
    title: 'نیاز به سه‌پایه و میکروفون یقه‌ای برای تولید مستند محله',
    description: 'برای ضبط مصاحبه با پیشکسوتان و معتمدین محله، به امانت گرفتن یک دستگاه میکروفون بی‌سیم و سه‌پایه حرفه‌ای به مدت ۳ روز نیازمندیم.',
    specialty: 'تجهیزات صوتی تصویری',
    tags: ['تجهیزات', 'میکروفون', 'سه‌پایه', 'ضبط مستند'],
    location: 'اصفهان',
    contactInfo: '۰۹۱۸۰۰۰۰۰۰۵',
    submitterName: 'کانون پژوهش شهید مطهری',
    submitterRole: 'مسئول تجهیزات کانون',
    status: 'approved',
    createdAt: '1403/07/10',
    updatedAt: '1403/07/10'
  },
  {
    id: 'ns-6',
    categoryId: 'finance_equipment',
    type: 'service',
    title: 'امانت‌سپاری رایگان تجهیزات صوت، تصویر و میکروفون به پروژه‌های مردمی',
    description: 'مرکز توسعه رسانه‌ای ما دارای میکروفون‌های Rode Wireless، سه‌پایه Manfrotto و نورهای پرتابل است و به پروژه‌های دانشجویی و جهادی امانت می‌دهد.',
    specialty: 'تجهیزات صوتی تصویری',
    tags: ['تجهیزات', 'میکروفون', 'سه‌پایه', 'استودیو'],
    location: 'اصفهان - خیابان مطهری',
    contactInfo: '۰۹۱۷۰۰۰۰۰۰۶',
    submitterName: 'خانه هنر و رسانه اصفهان',
    submitterRole: 'مدیر فنی استودیو',
    status: 'approved',
    createdAt: '1403/07/12',
    updatedAt: '1403/07/12'
  },
  // 4. اشتغال‌زایی (Employment) - Pair ready for matching!
  {
    id: 'ns-7',
    categoryId: 'employment',
    type: 'need',
    title: 'جویای فرصت شغلی یا کارآموزی در زمینه تدوین و طراحی گرافیک',
    description: 'مسلط به فتوشاپ و تدوین ویدیو با نرم‌افزارهای دسکتاپ، آماده همکاری پاره‌وقت یا پروژه‌ای با مراکز آموزشی و ناشران محتوا.',
    specialty: 'طراحی و تدوین',
    tags: ['استخدام', 'تدوین', 'طراحی گرافیک', 'کارآموزی'],
    location: 'تهران / دورکاری',
    contactInfo: '۰۹۳۳۰۰۰۰۰۰۷',
    submitterName: 'فاطمه حسینی',
    submitterRole: 'طراح آزاد (فریلنسر)',
    status: 'approved',
    createdAt: '1403/07/14',
    updatedAt: '1403/07/14'
  },
  {
    id: 'ns-8',
    categoryId: 'employment',
    type: 'service',
    title: 'امکان جذب و استخدام ۲ تدوینگر و گرافیست جوان در استودیوی پویا',
    description: 'دفتر انتشارات و تولید محتوای دیجیتال ما به دنبال جذب نیروی مستعد و علاقه‌مند با حقوق منظم، بیمه و محیط رشد کاری صمیمی است.',
    specialty: 'طراحی و تدوین',
    tags: ['استخدام', 'تدوین', 'طراحی گرافیک', 'تولید محتوا'],
    location: 'تهران - انقلاب',
    contactInfo: '۰۹۳۰۰۰۰۰۰۰۸',
    submitterName: 'مؤسسه نشر افق',
    submitterRole: 'مسئول منابع انسانی',
    status: 'approved',
    createdAt: '1403/07/16',
    updatedAt: '1403/07/16'
  }
];
