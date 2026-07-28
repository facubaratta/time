import { useSyncExternalStore } from "react";
import {
  DAY_HOURS,
  defaultActivities,
  totalActivityHours,
  type Activity,
} from "./components/daily/dailyTimeUtils";

type TimeState = {
  obligations: Activity[];
  timeWasters: Activity[];
  birthDate: string;
  lifeExpectancy: number;
};

const STORAGE_KEY = "time-magnitude";

const defaultState = (): TimeState => ({
  obligations: defaultActivities.obligations.map((activity) => ({ ...activity })),
  timeWasters: defaultActivities.wasters.map((activity) => ({ ...activity })),
  birthDate: "",
  lifeExpectancy: 80,
});

function normalizeActivity(value: unknown): Activity | null {
  if (!value || typeof value !== "object") return null;

  const activity = value as Partial<Activity>;
  const period =
    activity.period === "day" || activity.period === "week"
      ? activity.period
      : undefined;
  const maxHours = period === "week" ? DAY_HOURS * 7 : DAY_HOURS;
  const kind =
    activity.kind === "sleep" || activity.visual === "night"
      ? "sleep"
      : undefined;

  if (
    typeof activity.id !== "number" ||
    !Number.isSafeInteger(activity.id) ||
    activity.id <= 0 ||
    typeof activity.label !== "string" ||
    typeof activity.hours !== "number" ||
    !Number.isFinite(activity.hours) ||
    activity.hours < 0 ||
    activity.hours > maxHours ||
    typeof activity.color !== "string" ||
    !/^#[0-9a-f]{6}$/i.test(activity.color) ||
    (activity.period !== undefined && period === undefined) ||
    (activity.kind !== undefined && activity.kind !== "sleep") ||
    (activity.locked !== undefined && typeof activity.locked !== "boolean") ||
    (activity.visual !== undefined && activity.visual !== "night")
  ) {
    return null;
  }

  return {
    id: activity.id,
    label: kind === "sleep" ? "Sleep" : activity.label,
    hours: activity.hours,
    color: activity.color,
    ...(kind ? { period: "day" as const } : period ? { period } : {}),
    ...(kind ? { kind, locked: true, visual: "night" as const } : {}),
  };
}

function normalizeActivities(value: unknown): Activity[] | null {
  if (!Array.isArray(value)) return null;

  const activities = value.map(normalizeActivity);
  if (activities.some((activity) => activity === null)) return null;

  const normalized = activities as Activity[];
  const ids = new Set(normalized.map((activity) => activity.id));
  return ids.size === normalized.length ? normalized : null;
}

function readStoredState(): TimeState {
  const fallback = defaultState();
  if (typeof window === "undefined") return fallback;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return fallback;

    const value = JSON.parse(stored) as Partial<TimeState>;
    const obligationCandidates = normalizeActivities(value.obligations);
    const timeWasterCandidates = normalizeActivities(value.timeWasters);
    const storedObligations =
      obligationCandidates?.filter((activity) => activity.kind === "sleep")
        .length === 1
        ? obligationCandidates
        : null;
    const storedTimeWasters = timeWasterCandidates?.some(
      (activity) => activity.kind === "sleep",
    )
      ? null
      : timeWasterCandidates;
    const obligations = storedObligations ?? fallback.obligations;
    const timeWasters = storedTimeWasters ?? fallback.timeWasters;
    const activitiesFitDay =
      totalActivityHours([...obligations, ...timeWasters]) <= DAY_HOURS;

    return {
      obligations: activitiesFitDay ? obligations : fallback.obligations,
      timeWasters: activitiesFitDay ? timeWasters : fallback.timeWasters,
      birthDate:
        typeof value.birthDate === "string"
          ? value.birthDate
          : fallback.birthDate,
      lifeExpectancy:
        typeof value.lifeExpectancy === "number" &&
        Number.isFinite(value.lifeExpectancy) &&
        value.lifeExpectancy >= 1 &&
        value.lifeExpectancy <= 120
          ? value.lifeExpectancy
          : fallback.lifeExpectancy,
    };
  } catch {
    return fallback;
  }
}

let state = readStoredState();
const listeners = new Set<() => void>();

function saveState() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The UI remains usable when browser storage is unavailable.
  }
}

function updateState(patch: Partial<TimeState>) {
  state = { ...state, ...patch };
  saveState();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    state = readStoredState();
    listeners.forEach((listener) => listener());
  });
}

export function useTimeStore() {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

export const timeStore = {
  setObligations: (obligations: Activity[]) => updateState({ obligations }),
  setTimeWasters: (timeWasters: Activity[]) => updateState({ timeWasters }),
  setBirthDate: (birthDate: string) => updateState({ birthDate }),
  setLifeExpectancy: (lifeExpectancy: number) =>
    updateState({
      lifeExpectancy: Math.min(120, Math.max(1, lifeExpectancy)),
    }),
};
