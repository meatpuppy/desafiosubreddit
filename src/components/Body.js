import { Post } from "./Post";
import React, { useEffect } from "react";

                           
const Body = () => {
  const [postList, setPostList] = React.useState(null);

  useEffect(() => {
    fetch("https://www.reddit.com/r/GranblueFantasyVersus/new.json?sort=new")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setPostList(result.data.children);
        
      });
  }, []);

  return (
    <div className="Body">
      <div className="logo">
        <img
          src="https://www.dustloop.com/wiki/images/7/7a/GBVS_Logo.png"
          alt="logo"
        ></img>
      </div>

      {postList &&
        postList.map(({data},i) => {
            return (
              <Post key={i} postData = {data}/>
            );
          }
        )
      }
    </div>
  )
}

export { Body };