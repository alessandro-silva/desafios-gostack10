import React, { Component } from 'react';

import Post from '../components/Post';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Aguilar Clara",
          avatar: "https://scontent-gru2-2.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/89370853_551341955479430_9185853553476101847_n.jpg?_nc_ht=scontent-gru2-2.cdninstagram.com&_nc_cat=102&_nc_ohc=_We2_cYK6hoAX8nX0mS&oh=f6496828c7ef0ef832cc2863bb044071&oe=5E9F9517"
        },
        date: "22 mar 2020",
        content: "Pessoal, alguém sabe se o BootCamp ainda está disponível?",
        comments: [
          {
            id: 1,
            author: {
              name: "bruxo",
              avatar: "https://scontent-gru2-1.cdninstagram.com/v/t51.2885-15/e35/80735667_194742831665957_7036220208844344413_n.jpg?_nc_ht=scontent-gru2-1.cdninstagram.com&_nc_cat=1&_nc_ohc=xbDLfw9gy1QAX8ivBGI&oh=bd5f31864d88f4bd7a5d02e7eb02ebb3&oe=5EA94FD9"
            },
            content: "Está sim clara, mais somente hoje"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Boca de Lobo",
          avatar: "https://scontent-gru2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/66505571_2437598336297325_7537942564818269314_n.jpg?_nc_ht=scontent-gru2-1.cdninstagram.com&_nc_cat=109&_nc_ohc=yU8BSmOrdQwAX_dU4bT&oh=74577d0d1df8c135d220ee29c15de7b6&oe=5EA0116B"
        },
        date: "22 mar 2020",
        content: "Fala galera, suave? Acabei de receber o envelope e estou precisando de alguem para concluir o tabuleiro. Alguem topa ir comigo nesse foguete ? ",
        comments: [
          {
            id: 2,
            author: {
              name: "Pamela Rosa",
              avatar: "https://scontent-gru1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/65884961_689719548157504_77154262083711842_n.jpg?_nc_ht=scontent-gru1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=PVnb8kZ7Z0IAX-6Gu5n&oh=9bf9a9f70fcf73cf479d5effc760065a&oe=5E9FE5DC"
            },
            content: "Fala boca de lobo suave, eu topo bora concluir esse tabuleiro e embarcar nesse foguete. "
          }
        ]
      }
    ]
  };

  render() {
    return (
      <>
      {this.state.posts.map(post => <Post key={post.id} post={post} />)}
      </>
    )

  }
}

export default PostList;