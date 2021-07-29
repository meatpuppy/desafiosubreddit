import React from "react";
import ReactMarkdown from "react-markdown";

const Comments = ({ commentsData }) => {
  const { author, body, replies } = commentsData;
  const [viewReplies, setViewReplies] = React.useState(false);


  return (
    <div className="comments">
      <div className="author" style={{borderBottom: "1px solid black"}}>by {author}</div>
      {body !== "" && (
        <ReactMarkdown className="commentText">{body}</ReactMarkdown>
      )}
      {replies !== "" && (
        <button onClick={() => setViewReplies(!viewReplies)}>
          {replies.data.children.length} Replies
        </button>
      )}
      {viewReplies === true &&
        replies !== "" &&
        replies.data.children.map(({ data }, i) => {
          return <Comments key={i} commentsData={data} />;
        })}
    </div>
  );
};

export { Comments };
