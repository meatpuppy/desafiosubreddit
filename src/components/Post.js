import React from "react";
import ReactMarkdown from "react-markdown";
import { Comments } from "./Comments";

const Post = ({ postData }) => {
  const {
    title,
    author,
    selftext,
    num_comments,
    media_embed,
    media,
    url,
    thumbnail,
    link_flair_text,
    link_flair_background_color,
    id,
    name,
  } = postData;
  const [commentList, setCommentList] = React.useState(null);
  const [viewComments, setViewComments] = React.useState(false);

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const pullComments = (id, name) => {
    setViewComments(!viewComments);
    if (!commentList) {
      fetch(
        `https://www.reddit.com/r/GranblueFantasyVersus/comments/${id}/${name}.json`
      )
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setCommentList(result[1].data.children);
        });
    }
  };

  return (
    <div className="container">
      <div className="post">
        <div className="header">
          <div className="title">{title}</div>
          <div className="author">by {author}</div>
          <div
            className="type"
            style={{ backgroundColor: link_flair_background_color || "#a6a6a6"}}
          >
            {link_flair_text}
          </div>
        </div>
        {selftext !== "" && (
          <ReactMarkdown className="text">{selftext}</ReactMarkdown>
        )}
        {media && (
          <div
            className="media"
            dangerouslySetInnerHTML={{
              __html: decodeHtml(media_embed.content),
            }}
          />
        )}
        <div className="thumbnail">
          {media === null && thumbnail && thumbnail !== "self" && (
            <a alt="Girl in a jacket" href={url}>
              <img src={url}></img>
            </a>
          )}
        </div>
        <button onClick={() => pullComments(id, name)}>
          {num_comments} Comments
        </button>

        {commentList &&
          viewComments &&
          commentList.map(({ data }, i) => {
            return <Comments key={i} commentsData={data} />;
          })}

        <div className="fadeEffect"></div>
      </div>
    </div>
  );
};

export { Post };
