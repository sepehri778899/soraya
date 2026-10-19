/**
 * Utility functions for Persian numbers, National ID validation,
 * Jalali formatting, and Matching engine.
 */

// Convert English numbers to Persian digits
export function toPersianDigits(n: number | string | undefined | null): string {
  if (n === undefined || n === null) return '';
  const str = String(n);
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (w) => persianDigits[+w]);
}

// Convert Persian digits to English numbers (for processing inputs)
export function toEnglishDigits(str: string): string {
  if (!str) return '';
  return str
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
}

// Iranian National Code (کد ملی) Validation
export function validateIranianNationalCode(code: string): { isValid: boolean; message: string } {
  const cleanCode = toEnglishDigits(code).trim();
  
  if (!cleanCode) {
    return { isValid: false, message: 'لطفاً کد ملی را وارد کنید.' };
  }

  if (!/^\d{10}$/.test(cleanCode)) {
    return { isValid: false, message: 'کد ملی باید دقیقاً ۱۰ رقم باشد.' };
  }

  // Reject all repetitive patterns like 0000000000, 1111111111, etc.
  for (let i = 0; i <= 9; i++) {
    if (cleanCode === String(i).repeat(10)) {
      return { isValid: false, message: 'کد ملی وارد شده نامعتبر است.' };
    }
  }

  const checkDigit = parseInt(cleanCode.charAt(9), 10);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCode.charAt(i), 10) * (10 - i);
  }

  const remainder = sum % 11;
  const isValid = (remainder < 2 && checkDigit === remainder) || (remainder >= 2 && checkDigit === 11 - remainder);

  if (!isValid) {
    return { isValid: false, message: 'رقم کنترلی کد ملی نادرست است.' };
  }

  return { isValid: true, message: 'کد ملی معتبر است.' };
}

// Helper to mask sensitive National Code for public view (e.g., 001***4567)
export function maskNationalCode(code: string): string {
  const clean = toEnglishDigits(code);
  if (clean.length !== 10) return '***';
  return toPersianDigits(clean.substring(0, 3) + '****' + clean.substring(7));
}

// Export array of objects to UTF-8 CSV with BOM for Persian Excel support
export function exportToCSV<T extends object>(filename: string, rows: T[], headers: { key: keyof T; label: string }[]) {
  if (!rows || !rows.length) return;

  const headerLine = headers.map(h => `"${h.label.replace(/"/g, '""')}"`).join(',');
  const rowLines = rows.map(row => {
    return headers.map(h => {
      const val = (row as any)[h.key];
      if (Array.isArray(val)) {
        return `"${val.join('، ').replace(/"/g, '""')}"`;
      }
      return `"${String(val ?? '').replace(/"/g, '""')}"`;
    }).join(',');
  });

  const csvContent = '\uFEFF' + [headerLine, ...rowLines].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
