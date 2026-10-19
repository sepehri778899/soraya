import React from 'react';
import { VerificationStatus } from '../../types';
import { Clock, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs gap-1' : 'px-2.5 py-1 text-xs gap-1.5';

  switch (status) {
    case 'approved':
      return (
        <span className={`inline-flex items-center rounded-md font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 ${sizeClasses}`}>
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          تأییدشده
        </span>
      );
    case 'pending':
      return (
        <span className={`inline-flex items-center rounded-md font-medium bg-amber-50 text-amber-800 border border-amber-200/80 ${sizeClasses}`}>
          <Clock className="w-3 h-3 text-amber-600" />
          در انتظار بررسی
        </span>
      );
    case 'needs_revision':
      return (
        <span className={`inline-flex items-center rounded-md font-medium bg-orange-50 text-orange-800 border border-orange-200/80 ${sizeClasses}`}>
          <AlertTriangle className="w-3 h-3 text-orange-600" />
          نیازمند اصلاح
        </span>
      );
    case 'rejected':
      return (
        <span className={`inline-flex items-center rounded-md font-medium bg-rose-50 text-rose-800 border border-rose-200/80 ${sizeClasses}`}>
          <XCircle className="w-3 h-3 text-rose-600" />
          ردشده
        </span>
      );
    default:
      return null;
  }
};
