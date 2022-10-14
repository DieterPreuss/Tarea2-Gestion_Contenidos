//https://raw.githubusercontent.com/DieterPreuss/Tarea2-Gestion_ContenidosDB/main/db_proyectos.json

function Proyectos({ posts }) {
  //getStaticProps();
  console.log("proyectos: ");
  console.log(posts);
  console.log(posts.length);

  return (
    <h1>Hola</h1>
  )
}
/*
<ul>{proyecto.map((proyecto) => (
      <li key={proyecto.id}>{proyecto.title}</li>
    ))}
    </ul>
*/
export async function getStaticProps() {

  const res = await fetch('https://raw.githubusercontent.com/DieterPreuss/Tarea2-Gestion_ContenidosDB/main/db_entradas.json')

  //http://localhost/Miwordpress/wp-json/wp/v2/proyecto
  const posts = await res.json()
  console.log(posts);

  return {
    props: {
      posts
    },
  }
}

export default Proyectos