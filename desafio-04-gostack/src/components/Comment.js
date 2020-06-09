
import React from 'react';

import bruxo from '../assets/bruxo.jpg'

function Comment({ comments }) {
  return (
    <>
      {comments.map(comment => <div className="divComment" key={comment.id}>
        <div className="divImg">
        <img src={comment.author.avatar} className="imgBruxo"/>
        </div>

        <div className="divContent2">
        <strong className="strongName2">
          {comment.author.name}
        </strong>
        {comment.content}
        </div>
    
      </div>
      )}
    </>
  );
}

export default Comment;