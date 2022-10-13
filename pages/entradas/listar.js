/*
  function Entradas({ posts }) {
  //getStaticProps();
  console.log("posts: ");
  console.log(posts);
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://www.katyperry.com/wp-json/wp/v2/posts')
  console.log(res);
  const posts = await res.json()
console.log(posts);
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts
    },
  }
}

export default Entradas
*/