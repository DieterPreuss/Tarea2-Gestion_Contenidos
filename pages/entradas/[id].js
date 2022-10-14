import { useRouter } from 'next/router'

function Post({ post }) {
  //const router = useRouter()
  //const { id } = router.query
  //const datos = paths.find((m) => m.id === { id });
  const datos = post;

  return (
    <div>
      <p>ID: {datos.id}</p>
      <p>Titulo: {datos.title.rendered}</p>
      <p>Autor: {datos.author}</p>
      <p>Fecha: {datos.date}</p>
      <p>Detalles de Entrada: {datos.about}</p>
      <p>Foto: Preguntar profe {datos.id}</p>
      <p>Texto: {datos.content.rendered}</p>
      <p>Categoría: {datos.categories}</p>
      <p>Tags: {datos.tags}</p>

    </div>
  )
}

// This function gets called at build time
export async function getStaticPaths() {

  const res = await fetch('https://raw.githubusercontent.com/DieterPreuss/Tarea2-Gestion_ContenidosDB/main/db_entradas.json')

  const posts = await res.json()
  console.log(posts);

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))

  /*return {
    props: {
      posts
    },
  }*/
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {

  const res = await fetch('https://raw.githubusercontent.com/DieterPreuss/Tarea2-Gestion_ContenidosDB/main/db_entradas.json')
  const posts = await res.json()
  
  var idPost = "";
    const post = posts.find((m) => m.id === { idPost });

    // Pass post data to the page via props
    return { props: { post } }
  }

  export default Post


/*
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
    */