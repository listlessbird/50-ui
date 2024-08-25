"use client";
/*
    {
        "id": 1,
        "text": "This is a comment.",
        "children": [
            {
            "id": 2,
            "text": "This is a reply.",
            "children": []
            }
        ]
    }
*/

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  MouseEvent,
  useReducer,
  useState,
} from "react";

type Comment = {
  id: string;
  text: string;
  children: Comment[];
};

type State = Array<Comment>;

type Action =
  | { type: "add-top"; payload: { content: string } }
  | { type: "add-child"; payload: { content: string; parentId: string } };

function handleAddChildComment(
  comments: Comment[],
  parentId: string,
  content: string
): Comment[] {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        children: [
          ...comment.children,
          {
            id: crypto.randomUUID(),
            children: [],
            text: content,
          },
        ],
      };
    }
    return {
      ...comment,
      children: handleAddChildComment(comment.children, parentId, content),
    };
  });
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add-top":
      return [
        ...state,
        { id: crypto.randomUUID(), text: action.payload.content, children: [] },
      ];
    case "add-child": {
      // return state.map((comment) => {
      //   if (comment.id === action.payload.parentId) {
      //     return {
      //       ...comment,
      //       children: [
      //         ...comment.children,
      //         {
      //           id: crypto.randomUUID(),
      //           text: action.payload.content,
      //           children: [],
      //         },
      //       ],
      //     };
      //   }
      //   return comment;
      // });
      return handleAddChildComment(
        state,
        action.payload.parentId,
        action.payload.content
      );
    }

    default:
      return state;
  }
}

export function CommentSection() {
  const [comments, dispatch] = useReducer(reducer, []);

  function onEditClick(e: MouseEvent) {}

  return (
    <div>
      <div className="p-4">
        <CommentInput
          onCommentAdd={(content) => {
            dispatch({ type: "add-top", payload: { content } });
          }}
        />
      </div>
      {comments.map((comment) => {
        return (
          <Comment comment={comment} key={comment.id} dispatch={dispatch} />
        );
      })}
    </div>
  );
}

function Comment({
  comment,
  dispatch,
}: {
  comment: Comment;
  dispatch: Dispatch<Action>;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);

  return (
    <ul className="bg-white text-black p-4 rounded-md comment">
      {/* {comment.id} */}
      <li className="text-lg">{comment.text}</li>
      <div className="flex gap-4 text-sm">
        <button onClick={() => setEditOpen((p) => !p)}>Edit</button>
        <button onClick={() => setReplyOpen((p) => !p)}>Reply</button>
        <button>Delete</button>
      </div>
      <div className="my-2">
        <div className="ps-2">
          {replyOpen && (
            <CommentInput
              onCommentAdd={(content) => {
                dispatch({
                  type: "add-child",
                  payload: { content: content, parentId: comment.id },
                });
              }}
              setOpen={setReplyOpen}
            />
          )}

          {comment.children.map((c) => {
            return <Comment comment={c} dispatch={dispatch} key={c.id} />;
          })}
        </div>
      </div>
    </ul>
  );
}

function CommentInput({
  onCommentAdd,
  setOpen,
}: {
  onCommentAdd: (content: string) => void;
  setOpen?: (open: boolean) => void;
}) {
  const [content, setContent] = useState("");

  console.log(setOpen);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!content) return;

    onCommentAdd(content);
    setContent("");
    setOpen?.(false);
  }

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <Input
        className="w-full bg-white text-black"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoFocus
      />
      <Button>Submit</Button>
    </form>
  );
}
