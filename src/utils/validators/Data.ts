import { format, isValid, parse } from 'date-fns';

export function toDateOrNull(dataStr: string): string | null {
  const dt = parse(dataStr, 'yyyy-MM-dd', new Date());
  if (isValid(dt)) {
    return format(dt, 'yyyy-MM-dd');
  }
  return null;
}
