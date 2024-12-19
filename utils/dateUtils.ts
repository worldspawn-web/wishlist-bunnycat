export function formatDate(dateInput: Date | string): string {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error('Invalid date:', dateInput);
    return 'Недопустимая дата';
  }

  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}
