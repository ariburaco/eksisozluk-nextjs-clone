export interface Topic {
  title: string;
  link: string;
  entryCount?: number;
};


export interface Entry {
  id: string;
  topic: Topic;
  content: string;
  author: Author;
  date: string;
  favoriteCount: number;
}

export interface Author {
  authorName: string;
  authorId: string;
  authorLink: string;
  authorAvatarLink: string;
}

export interface EntriesResult {
  pages: number,
  currentPage: number,
  pageLimit: number,
  entries: Entry[],
}