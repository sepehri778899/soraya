export type UserRole = 'visitor' | 'coach' | 'admin';

export type VerificationStatus = 'pending' | 'approved' | 'needs_revision' | 'rejected';

export type SubmissionSource = 'self' | 'manager' | 'coach';

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  nationalCode: string;
  birthPlace: string;
  birthDate: string; // e.g. '1378/04/15'
  bio: string;
  talents: string[];
  skills: string[];
  interests: string[];
  notes?: string;
  submissionType: SubmissionSource;
  registeredByName?: string;
  status: VerificationStatus;
  createdAt: string;
  updatedAt: string;
}

export type ServiceMainCategory = 'training' | 'consulting' | 'finance_equipment' | 'employment';

export type NeedServiceType = 'need' | 'service'; // 'need': نیاز دارم | 'service': می‌توانم ارائه دهم

export interface NeedOrService {
  id: string;
  categoryId: ServiceMainCategory;
  type: NeedServiceType;
  title: string;
  description: string;
  specialty: string;
  tags: string[];
  location: string;
  contactInfo: string;
  submitterName: string;
  submitterRole: string;
  status: VerificationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  nationalCode: string;
  birthPlace: string;
  birthDate: string;
  bio: string;
  specialties: string[];
  teachingSkills: string[];
  teachingHistory: string;
  professionalExperience: string;
  teachableSubjects: string[];
  notes?: string;
  submissionType: SubmissionSource;
  status: VerificationStatus;
  avatarInitials?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingEquipmentItem {
  id: string;
  name: string;
  quantity: string;
  description?: string;
}

export interface TrainingStepItem {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  implementationTips?: string;
  safetyWarnings?: string;
  mediaType?: 'image' | 'video' | 'none';
  mediaUrl?: string;
  mediaCaption?: string;
}

export interface TrainingTopic {
  id: string;
  title: string;
  categoryId: string;
  shortDescription: string;
  targetAudience: string;
  level: 'مقدماتی' | 'متوسط' | 'پیشرفته' | 'عمومی';
  estimatedDuration: string;
  coverImage?: string;
  iconName: string;
  learningObjectives: string[];
  prerequisites: string[];
  equipment: TrainingEquipmentItem[];
  steps: TrainingStepItem[];
  expectedOutcome: string;
  learningEvaluation: string;
  conclusion: string;
  resources: { title: string; url?: string; description?: string }[];
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface TrainingCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
