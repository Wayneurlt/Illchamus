// "Add to calendar" helpers. Event times are entered in Kenya time (EAT, UTC+3).

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  description?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Kenya local date + time → UTC timestamp like 20261007T060000Z. */
function toUtcStamp(date: string, time: string) {
  const d = new Date(`${date}T${time}:00+03:00`);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
}

const compact = (date: string) => date.replace(/-/g, "");

function addDays(date: string, days: number) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Start/end in calendar format; all-day events use exclusive end dates. */
function range(e: CalendarEvent) {
  if (e.startTime) {
    const endDate = e.endDate || e.date;
    const endTime = e.endTime || (e.endDate ? e.startTime : defaultEnd(e.startTime));
    return { start: toUtcStamp(e.date, e.startTime), end: toUtcStamp(endDate, endTime), allDay: false };
  }
  return { start: compact(e.date), end: compact(addDays(e.endDate || e.date, 1)), allDay: true };
}

/** Two hours after the start, when no end time is given. */
function defaultEnd(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${pad(Math.min((h ?? 0) + 2, 23))}:${pad(m ?? 0)}`;
}

const escapeIcs = (s = "") => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (c) => `\\${c}`);

export function googleCalendarUrl(e: CalendarEvent) {
  const { start, end } = range(e);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${start}/${end}`,
    details: e.description || "",
    location: e.location || "",
    ctz: "Africa/Nairobi",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function downloadIcs(e: CalendarEvent) {
  const { start, end, allDay } = range(e);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Illchamus Community CBO//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${e.id}@illchamus`,
    `DTSTAMP:${stamp}`,
    allDay ? `DTSTART;VALUE=DATE:${start}` : `DTSTART:${start}`,
    allDay ? `DTEND;VALUE=DATE:${end}` : `DTEND:${end}`,
    `SUMMARY:${escapeIcs(e.title)}`,
    e.location ? `LOCATION:${escapeIcs(e.location)}` : "",
    e.description ? `DESCRIPTION:${escapeIcs(e.description)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: `${e.title.replace(/[^\w-]+/g, "-").slice(0, 40) || "event"}.ics` });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
