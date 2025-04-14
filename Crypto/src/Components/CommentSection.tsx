import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { formatDistanceToNow } from "date-fns";
import axios from "../axios";

interface Props {
  coinId: string;
}
interface response {
  items: Comment[];
  page: number;
  totalPages: number;
}

interface Comment {
  id: string;
  title: string;
  content: string;
  createdOn: string;
  createdBy: string;
}

// user: {
//   name: string;
//   avatarUrl: string;
// };
// text: string;
// createdAt: string;

export const CommentSection: React.FC<Props> = ({ coinId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    axios.get<response>(`/comment/${coinId}?page=${page}`).then((res) => {
      setComments(res.data.items);
      setTotalPages(res.data.totalPages);
    });
  }, [coinId, page]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const newComment: Comment = {
      id: uuid(),
      title: title,
      content: text,
      createdOn: new Date().toISOString(),
      createdBy: "You",
    };

    await axios
      .post<Comment>(`/comment/${coinId}`, {
        ...newComment,
      })
      .then((res) => {
        setComments((prev) => [res.data, ...prev]);
        setTitle("");
        setText("");
      });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
      </div>

      <div className="mb-6">
        <div className="flex gap-3 mb-4">
          <img
            src="https://i.pravatar.cc/40"
            className="w-10 h-10 rounded-full"
            alt="user avatar"
          />
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-96 p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comment Title"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your comment..."
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-lg transition duration-200"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt={`${comment.createdBy}'s avatar`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-800">
                  {comment.createdBy}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(comment.createdOn), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              {/* Comment Title */}
              <h3 className="font-semibold text-lg text-gray-800">
                {comment.title}
              </h3>
              <p className="text-sm text-gray-700 leading-snug">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">
          Page {page} / {totalPages}
        </span>
        <button
          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
