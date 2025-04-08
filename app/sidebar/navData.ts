export interface NavItem {
  href: string;
  label: string;
  badge?: boolean;
}

export const mainNavItems: NavItem[] = [
  { href: "/", label: "모든 주식 목록" },
  { href: "/watchlist", label: "신규 상장 채널", badge: true },
  { href: "/ranking", label: "랭킹" },
  { href: "/portfolio", label: "투자 내역" },
];

export const additionalNavItems: NavItem[] = [
  { href: "/saved", label: "골라줘, AI", badge: true },
  { href: "/narak", label: "나락 점수 계산기", badge: true },
];