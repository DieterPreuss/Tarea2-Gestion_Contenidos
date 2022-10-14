import { useRouter } from 'next/router'

function Post({ posts }) {
  const router = useRouter()
  const { id } = router.query
  const datos = posts.find((m) => m.id === { id });

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

  return {
    props: {
      posts
    },
  }
}

export default Post