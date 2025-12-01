type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: any };

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (val: any) => {
    if (!val && val !== 0) return;
    const t = typeof val;
    if (t === 'string' || t === 'number') {
      out.push(String(val));
      return;
    }
    if (Array.isArray(val)) {
      val.forEach(walk);
      return;
    }
    if (t === 'object') {
      for (const key in val) {
        if (Object.prototype.hasOwnProperty.call(val, key) && val[key]) {
          out.push(key);
        }
      }
    }
  };

  inputs.forEach(walk);
  return out.join(' ');
}

export default cn;
