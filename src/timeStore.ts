import { useSyncExternalStore } from "react";
import {
  defaultActivities,
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

function isActivity(value: unknown): value is Activity {
  if (!value || typeof value !== "object") return false;

  const activity = value as Partial<Activity>;
  return (
    typeof activity.id === "number" &&
    typeof activity.label === "string" &&
    typeof activity.hours === "number" &&
    Number.isFinite(activity.hours) &&
    typeof activity.color === "string" &&
    (activity.period === undefined ||
      activity.period === "day" ||
      activity.period === "week")
  );
}

function readStoredState(): TimeState {
  const fallback = defaultState();
  if (typeof window === "undefined") return fallback;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return fallback;

    const value = JSON.parse(stored) as Partial<TimeState>;
    return {
      obligations:
        Array.isArray(value.obligations) &&
        value.obligations.every(isActivity)
          ? value.obligations
          : fallback.obligations,
      timeWasters:
        Array.isArray(value.timeWasters) &&
        value.timeWasters.every(isActivity)
          ? value.timeWasters
          : fallback.timeWasters,
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
