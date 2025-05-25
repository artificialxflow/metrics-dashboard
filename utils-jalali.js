import jalaali from 'jalaali-js';

/**
 * تبدیل تاریخ میلادی (yyyy-mm-dd) به شمسی (yyyy/mm/dd)
 * @param {string} isoDate - تاریخ میلادی به فرمت yyyy-mm-dd
 * @returns {string} تاریخ شمسی به فرمت yyyy/mm/dd
 */
export function toJalaliDate(isoDate) {
  const [gy, gm, gd] = isoDate.split('-').map(Number);
  const { jy, jm, jd } = jalaali.toJalaali(gy, gm, gd);
  return `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
} 