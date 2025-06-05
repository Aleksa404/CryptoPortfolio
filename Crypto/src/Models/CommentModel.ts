export interface PagginatedComments {
  items: CommentResponse[];
  page: number;
  totalPages: number;
}

export interface Comment {
  title: string;
  content: string;
}
export interface CommentResponse {
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
