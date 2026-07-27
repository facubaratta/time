import { DAY } from "./time";

export type Period = {
  label: string;
  detail: string;
  start: Date;
  end: Date;
};

const getDay = (dayStart: Date, dayName: string): Period => {
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);
  return {
    label: "Day",
    detail: dayName,
    start: dayStart,
    end: dayEnd,
  };
};

const getWeek = (weekDate: Date, dayStart: Date): Period => {
  const weekday = weekDate.getUTCDay() || 7;
  weekDate.setUTCDate(weekDate.getUTCDate() + 4 - weekday);
  const weekYearStart = new Date(Date.UTC(weekDate.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(
    ((weekDate.getTime() - weekYearStart.getTime()) / DAY + 1) / 7,
  );
  const weekStart = new Date(dayStart);
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);
  return {
    label: "Week",
    detail: `#${weekNumber}`,
    start: weekStart,
    end: weekEnd,
  };
};

const getMonth = (month: number, year: number, name: string): Period => {
  const number = String(month + 1).padStart(2, "0");
  return {
    label: "Month",
    detail: `${name} · ${number}`,
    start: new Date(year, month, 1),
    end: new Date(year, month + 1, 1),
  };
};

const getYear = (year: number): Period => ({
  label: "Year",
  detail: String(year),
  start: new Date(year, 0, 1),
  end: new Date(year + 1, 0, 1),
});

const getDecade = (year: number): Period => {
  const decade = Math.floor(year / 10) * 10;
  return {
    label: "Decade",
    detail: `${decade}–${decade + 9}`,
    start: new Date(decade, 0, 1),
    end: new Date(decade + 10, 0, 1),
  };
};

export function getPeriods(now: Date): Period[] {
  const dayStart = new Date(now);
  const month: number = now.getMonth();
  const year = now.getFullYear();
  return [
    getDay(dayStart, now.toLocaleDateString("en", { weekday: "long" })),
    getWeek(new Date(Date.UTC(year, month, now.getDate())), dayStart),
    getMonth(month, year, now.toLocaleDateString("en", { month: "long" })),
    getYear(year),
    getDecade(year),
  ];
}
