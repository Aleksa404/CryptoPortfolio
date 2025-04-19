export interface PagginatedComments {
  items: Comment[];
  page: number;
  totalPages: number;
}

export interface Comment {
  id: string;
  title: string;
  content: string;
  createdOn: string;
  createdBy: string;
}
//export interface Comment {
//   id: string;
//   user: {
//     name: string;
//     avatarUrl: string;
//   };
//   text: string;
//   createdAt: string;
// }
