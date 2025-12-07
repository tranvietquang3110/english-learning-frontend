export class CommonUtils {
  static readonly COLOR_LIST = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33A1',
    '#A133FF',
    '#FFA133',
  ];

  static randomColor(): string {
    return this.COLOR_LIST[Math.floor(Math.random() * this.COLOR_LIST.length)];
  }
  static formatNumber(num: number): string {
    return num.toLocaleString('vi-VN');
  }
  static getNow() {
    const now = new Date().toLocaleString('sv-SE');
    return now.replace(' ', 'T');
  }
  static diffDateTimeToString(iso1: string, iso2: string): string {
    const d1 = new Date(iso1);
    const d2 = new Date(iso2);

    let diff = Math.abs(d1.getTime() - d2.getTime()) / 1000; // total seconds

    const days = Math.floor(diff / 86400);
    diff -= days * 86400;

    const hours = Math.floor(diff / 3600);
    diff -= hours * 3600;

    const minutes = Math.floor(diff / 60);
    diff -= minutes * 60;

    const seconds = Math.floor(diff);

    let result = [];

    if (days > 0) result.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) result.push(`${hours}h`);
    if (minutes > 0) result.push(`${minutes}m`);
    if (seconds > 0) result.push(`${seconds}s`);

    // Trường hợp cả 4 đều = 0
    if (result.length === 0) return '0s';

    return result.join(' ');
  }
}
