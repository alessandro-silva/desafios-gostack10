import React from 'react';

import Comment from './Comment';
import clara from '../assets/clara.jpg'

function Post({ post }) {
  return (
    <div className="divPost">

      <div className="container1">

        <div className="divImg">
          <img src={post.author.avatar} className="claraimg" />
          <strong className="strongName">
            {post.author.name}
          </strong>
          <div className="divDate">
            {post.date}
          </div>
        </div>

        <div className="divContent">
          {post.content}
        </div>
      </div>
      <div className="divHr">
      </div>
      <div className="container2">
        {<Comment comments={post.comments} />}
      </div>
    </div>
  )
}

export default Post;
