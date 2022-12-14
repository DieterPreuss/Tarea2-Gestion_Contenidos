import Link from 'next/link'

function Entradas({ posts }) {
  //getStaticProps();
  console.log("posts: ");
  console.log(posts);
  console.log(posts.length);
  /*
  ----------------------------------------
  var forEachData = "";
  posts.forEach(
    function(d) {
      forEachData += d.title.rendered
    }
  )
-----------------------------------------
  {posts.map((post) => (
        <li>{post.title}</li>
  ))}
-----------------------------------------
{posts.forEach(d => `<li>${d.id}</li>`)}
-----------------------------------------
*/


  return (
    <ul>{posts.map((post) => (
      <li key={post.id}>
        <Link href={`/entradas/${encodeURIComponent(post.id)}`}>
          <a>Titulo: {post.title.rendered} ({post.date})</a>
        </Link>
      </li>
    ))}
    </ul>
  )
}
// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  //const res = await fetch('https://raw.githubusercontent.com/DieterPreuss/Tarea2GestionContenidosDB/main/db.json')
  const res = await fetch('https://Tarea2-GC-WordPress.dieterpreuss.repl.co/wp-json/wp/v2/posts')
  //console.log(res);

  //http://localhost/Miwordpress/wp-json/wp/v2/posts
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
