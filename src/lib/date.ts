export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
}
export function isPast(dateStr: string) {
  return new Date(dateStr).getTime() < Date.now();
}
