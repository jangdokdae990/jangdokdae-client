export const ISSUE_CATEGORIES = {
  ALL: 'all',
  DOMESTIC: 'domestic',
  GLOBAL: 'global',
  INDUSTRY: 'industry',
  COMPANY: 'company',
} as const;

export type IssueCategory = (typeof ISSUE_CATEGORIES)[keyof typeof ISSUE_CATEGORIES];

export const ISSUE_CATEGORY_LABELS: Record<IssueCategory, string> = {
  all: '전체',
  domestic: '국내',
  global: '글로벌',
  industry: '업종',
  company: '기업',
};
