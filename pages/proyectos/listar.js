import Link from 'next/link'
//https://raw.githubusercontent.com/DieterPreuss/Tarea2-Gestion_ContenidosDB/main/db_proyectos.json

function Proyectos({ proyecto }) {
  //getStaticProps();
  console.log("proyectos: ");
  console.log(proyecto);
  console.log(proyecto.length);

  return (
    <ul>{proyecto.map((proyecto) => (
      <li key={proyecto.id}>
        <Link href={`/proyectos/${encodeURIComponent(proyecto.id)}`}>
          <a>Nombre: {proyecto.title.rendered} ({proyecto.meta.empresa})</a>
        </Link>
      </li>
    ))}
    </ul>
  )
}

export async function getStaticProps() {

  const res = await fetch('https://Tarea2-GC-WordPress.dieterpreuss.repl.co/wp-json/wp/v2/proyecto')

  //http://localhost/Miwordpress/wp-json/wp/v2/proyecto
  const proyecto = await res.json()
  console.log(proyecto);

  return {
    props: {
      proyecto
    },
  }
}

export default Proyectos