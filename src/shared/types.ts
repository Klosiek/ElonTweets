export type UserData = User | undefined;
export interface User {
  tags: string[];
  currentToken: string[];
}
export interface Set {
  title: string;
  topic: string;
  img: string;
  tags: string[];
}
