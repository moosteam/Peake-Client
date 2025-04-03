import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 숫자 포맷팅 함수 (1000 -> 1,000)
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(num)
}

