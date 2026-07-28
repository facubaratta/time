export function parseBirthDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : null;
}

export function birthdayInYear(birthDate: Date, year: number) {
  const month = birthDate.getMonth();
  const day = Math.min(
    birthDate.getDate(),
    new Date(year, month + 1, 0).getDate(),
  );
  return new Date(year, month, day);
}

export function getAge(now: Date, birthDate: Date) {
  if (birthDate > now) return null;

  const age =
    now.getFullYear() -
    birthDate.getFullYear() -
    (now < birthdayInYear(birthDate, now.getFullYear()) ? 1 : 0);

  return age <= 120 ? age : null;
}
