export function isApiOfflineTime(): boolean {
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      hour12: false,
    }).format(new Date()),
  );

  return hour >= 0 && hour < 8;
}