import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Person,
  Coach,
  NeedOrService,
  TrainingTopic,
  TrainingCategory,
  UserRole,
  VerificationStatus,
  ToastMessage
} from '../types';
import {
  INITIAL_PERSONS,
  INITIAL_COACHES,
  INITIAL_NEEDS_SERVICES,
  INITIAL_TOPICS,
  INITIAL_CATEGORIES
} from '../data/mockData';

interface MatchResult {
  sourceItem: NeedOrService;
  matchedItems: NeedOrService[];
}

interface AppContextType {
  role: UserRole;
  setRole: (r: UserRole) => void;
  toasts: ToastMessage[];
  addToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Persons (Workforce)
  persons: Person[];
  addPerson: (p: Omit<Person, 'id' | 'createdAt' | 'updatedAt' | 'status'>, initialStatus?: VerificationStatus) => Person;
  updatePerson: (id: string, updates: Partial<Person>) => void;
  deletePerson: (id: string) => void;
  updatePersonStatus: (id: string, status: VerificationStatus) => void;

  // Coaches
  coaches: Coach[];
  addCoach: (c: Omit<Coach, 'id' | 'createdAt' | 'updatedAt' | 'status'>, initialStatus?: VerificationStatus) => Coach;
  updateCoach: (id: string, updates: Partial<Coach>) => void;
  deleteCoach: (id: string) => void;
  updateCoachStatus: (id: string, status: VerificationStatus) => void;

  // Needs and Services
  needsAndServices: NeedOrService[];
  addNeedOrService: (ns: Omit<NeedOrService, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => NeedOrService;
  updateNeedOrService: (id: string, updates: Partial<NeedOrService>) => void;
  deleteNeedOrService: (id: string) => void;
  updateNeedOrServiceStatus: (id: string, status: VerificationStatus) => void;
  findMatchesFor: (item: NeedOrService) => NeedOrService[];

  // Training Topics & Categories
  categories: TrainingCategory[];
  addCategory: (cat: Omit<TrainingCategory, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<TrainingCategory>) => void;
  deleteCategory: (id: string) => void;

  trainingTopics: TrainingTopic[];
  addTrainingTopic: (topic: Omit<TrainingTopic, 'id' | 'createdAt' | 'updatedAt'>) => TrainingTopic;
  updateTrainingTopic: (id: string, updates: Partial<TrainingTopic>) => void;
  deleteTrainingTopic: (id: string) => void;

  // Reset to default sample data
  resetToSampleData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'samte_soraya_role',
  PERSONS: 'samte_soraya_persons',
  COACHES: 'samte_soraya_coaches',
  NEEDS_SERVICES: 'samte_soraya_needs_services',
  TOPICS: 'samte_soraya_topics',
  CATEGORIES: 'samte_soraya_categories'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole) || 'visitor';
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [persons, setPersons] = useState<Person[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERSONS);
      return saved ? JSON.parse(saved) : INITIAL_PERSONS;
    } catch {
      return INITIAL_PERSONS;
    }
  });

  const [coaches, setCoaches] = useState<Coach[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COACHES);
      return saved ? JSON.parse(saved) : INITIAL_COACHES;
    } catch {
      return INITIAL_COACHES;
    }
  });

  const [needsAndServices, setNeedsAndServices] = useState<NeedOrService[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEEDS_SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_NEEDS_SERVICES;
    } catch {
      return INITIAL_NEEDS_SERVICES;
    }
  });

  const [categories, setCategories] = useState<TrainingCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [trainingTopics, setTrainingTopics] = useState<TrainingTopic[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOPICS);
      return saved ? JSON.parse(saved) : INITIAL_TOPICS;
    } catch {
      return INITIAL_TOPICS;
    }
  });

  // Save changes to localStorage for smooth multi-turn preview
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PERSONS, JSON.stringify(persons));
  }, [persons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COACHES, JSON.stringify(coaches));
  }, [coaches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEEDS_SERVICES, JSON.stringify(needsAndServices));
  }, [needsAndServices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(trainingTopics));
  }, [trainingTopics]);

  const setRole = (r: UserRole) => {
    setRoleState(r);
    addToast(`نقش به «${r === 'admin' ? 'مدیر مجموعه' : r === 'coach' ? 'مربی' : 'بازدیدکننده عمومی'}» تغییر یافت`, 'info');
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const nowJalaliString = () => {
    const d = new Date();
    return `${1403}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  };

  // Person CRUD
  const addPerson = (
    p: Omit<Person, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
    initialStatus: VerificationStatus = 'pending'
  ): Person => {
    const newPerson: Person = {
      ...p,
      id: 'per-' + Date.now().toString(),
      status: initialStatus,
      createdAt: nowJalaliString(),
      updatedAt: nowJalaliString()
    };
    setPersons(prev => [newPerson, ...prev]);
    addToast('اطلاعات با موفقیت ثبت شد و در سیستم قرار گرفت.');
    return newPerson;
  };

  const updatePerson = (id: string, updates: Partial<Person>) => {
    setPersons(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updatedAt: nowJalaliString() } : p))
    );
    addToast('اطلاعات با موفقیت به‌روزرسانی شد.');
  };

  const deletePerson = (id: string) => {
    setPersons(prev => prev.filter(p => p.id !== id));
    addToast('رکورد با موفقیت حذف شد.', 'info');
  };

  const updatePersonStatus = (id: string, status: VerificationStatus) => {
    setPersons(prev =>
      prev.map(p => (p.id === id ? { ...p, status, updatedAt: nowJalaliString() } : p))
    );
    const statusText =
      status === 'approved' ? 'تأیید شد' : status === 'rejected' ? 'رد شد' : 'نیازمند اصلاح';
    addToast(`وضعیت بررسی فرد به «${statusText}» تغییر کرد.`);
  };

  // Coach CRUD
  const addCoach = (
    c: Omit<Coach, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
    initialStatus: VerificationStatus = 'pending'
  ): Coach => {
    const initials = (c.firstName[0] || '') + '‌' + (c.lastName[0] || '');
    const newCoach: Coach = {
      ...c,
      id: 'coach-' + Date.now().toString(),
      avatarInitials: initials,
      status: initialStatus,
      createdAt: nowJalaliString(),
      updatedAt: nowJalaliString()
    };
    setCoaches(prev => [newCoach, ...prev]);
    addToast('اطلاعات مربی با موفقیت در سامانه ثبت شد.');
    return newCoach;
  };

  const updateCoach = (id: string, updates: Partial<Coach>) => {
    setCoaches(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates, updatedAt: nowJalaliString() } : c))
    );
    addToast('اطلاعات مربی با موفقیت ویرایش گردید.');
  };

  const deleteCoach = (id: string) => {
    setCoaches(prev => prev.filter(c => c.id !== id));
    addToast('مربی مورد نظر حذف شد.', 'info');
  };

  const updateCoachStatus = (id: string, status: VerificationStatus) => {
    setCoaches(prev =>
      prev.map(c => (c.id === id ? { ...c, status, updatedAt: nowJalaliString() } : c))
    );
    addToast(`وضعیت مربی به روز رسانی شد.`);
  };

  // Needs and Services CRUD
  const addNeedOrService = (
    ns: Omit<NeedOrService, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): NeedOrService => {
    const newItem: NeedOrService = {
      ...ns,
      id: 'ns-' + Date.now().toString(),
      status: role === 'admin' ? 'approved' : 'approved', // instantly accessible for smooth peer exchange
      createdAt: nowJalaliString(),
      updatedAt: nowJalaliString()
    };
    setNeedsAndServices(prev => [newItem, ...prev]);
    addToast(newItem.type === 'need' ? 'نیازمندی شما با موفقیت ثبت شد.' : 'توانمندی شما با موفقیت به ثبت رسید.');
    return newItem;
  };

  const updateNeedOrService = (id: string, updates: Partial<NeedOrService>) => {
    setNeedsAndServices(prev =>
      prev.map(i => (i.id === id ? { ...i, ...updates, updatedAt: nowJalaliString() } : i))
    );
    addToast('مورد با موفقیت به‌روزرسانی شد.');
  };

  const deleteNeedOrService = (id: string) => {
    setNeedsAndServices(prev => prev.filter(i => i.id !== id));
    addToast('مورد انتخاب‌شده حذف شد.', 'info');
  };

  const updateNeedOrServiceStatus = (id: string, status: VerificationStatus) => {
    setNeedsAndServices(prev =>
      prev.map(i => (i.id === id ? { ...i, status, updatedAt: nowJalaliString() } : i))
    );
    addToast('وضعیت مورد تغییر یافت.');
  };

  // Matching algorithm: looks for the opposite type (if target is 'need', search 'service', and vice versa)
  // in the same category or sharing at least one tag or matching specialty keywords
  const findMatchesFor = (targetItem: NeedOrService): NeedOrService[] => {
    const oppositeType = targetItem.type === 'need' ? 'service' : 'need';
    const targetTags = targetItem.tags.map(t => t.trim().toLowerCase());

    return needsAndServices
      .filter(item => {
        if (item.id === targetItem.id) return false;
        if (item.type !== oppositeType) return false;
        if (item.status !== 'approved') return false;

        const sameCategory = item.categoryId === targetItem.categoryId;
        const sharedTags = item.tags.some(tag => targetTags.includes(tag.trim().toLowerCase()));
        const specialtyOverlap =
          item.specialty &&
          targetItem.specialty &&
          (item.specialty.includes(targetItem.specialty) || targetItem.specialty.includes(item.specialty));

        return sameCategory && (sharedTags || specialtyOverlap || true);
      })
      .slice(0, 4);
  };

  // Categories CRUD
  const addCategory = (cat: Omit<TrainingCategory, 'id'>) => {
    const id = 'cat-' + Date.now().toString();
    setCategories(prev => [...prev, { ...cat, id }]);
    addToast('دسته‌بندی آموزشی جدید اضافه شد.');
  };

  const updateCategory = (id: string, updates: Partial<TrainingCategory>) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
    addToast('دسته‌بندی ویرایش شد.');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    addToast('دسته‌بندی حذف شد.', 'info');
  };

  // Training Topics CRUD
  const addTrainingTopic = (
    topic: Omit<TrainingTopic, 'id' | 'createdAt' | 'updatedAt'>
  ): TrainingTopic => {
    const newTopic: TrainingTopic = {
      ...topic,
      id: 'topic-' + Date.now().toString(),
      createdAt: nowJalaliString(),
      updatedAt: nowJalaliString()
    };
    setTrainingTopics(prev => [newTopic, ...prev]);
    addToast('سرفصل آموزشی جدید با موفقیت اضافه شد.');
    return newTopic;
  };

  const updateTrainingTopic = (id: string, updates: Partial<TrainingTopic>) => {
    setTrainingTopics(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates, updatedAt: nowJalaliString() } : t))
    );
    addToast('سرفصل آموزشی به‌روزرسانی شد.');
  };

  const deleteTrainingTopic = (id: string) => {
    setTrainingTopics(prev => prev.filter(t => t.id !== id));
    addToast('سرفصل آموزشی حذف شد.', 'info');
  };

  const resetToSampleData = () => {
    setPersons(INITIAL_PERSONS);
    setCoaches(INITIAL_COACHES);
    setNeedsAndServices(INITIAL_NEEDS_SERVICES);
    setCategories(INITIAL_CATEGORIES);
    setTrainingTopics(INITIAL_TOPICS);
    setRoleState('visitor');
    localStorage.clear();
    addToast('اطلاعات سامانه به داده‌های نمونه اولیه بازنشانی شد.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        toasts,
        addToast,
        removeToast,
        persons,
        addPerson,
        updatePerson,
        deletePerson,
        updatePersonStatus,
        coaches,
        addCoach,
        updateCoach,
        deleteCoach,
        updateCoachStatus,
        needsAndServices,
        addNeedOrService,
        updateNeedOrService,
        deleteNeedOrService,
        updateNeedOrServiceStatus,
        findMatchesFor,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        trainingTopics,
        addTrainingTopic,
        updateTrainingTopic,
        deleteTrainingTopic,
        resetToSampleData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
