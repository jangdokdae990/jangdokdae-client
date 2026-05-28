export interface Issue {
  id: string;
  title: string;
  summary: string;
  beginnerTranslation: string;
  category: string;
  createdAt: string;
}

export interface IssueTerm {
  term: string;
  definition: string;
}

export interface IssueQuiz {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface IssueDetail extends Issue {
  content: string;
  terms: IssueTerm[];
  quiz?: IssueQuiz;
}
