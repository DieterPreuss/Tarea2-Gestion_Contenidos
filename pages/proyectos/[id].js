import { useRouter } from 'next/router'

export default function Proyecto({ post, imagen }) {
  //const router = useRouter()
  //const { id } = router.query
  //const datos = paths.find((m) => m.id === { id });
  const datos = post;
  //const image = `/_next/image?url=${imagen}&w=1920&q=75`;
  //console.log("image");
  //console.log(image);
  if(imagen==null){
    return (
    <div>
      <h1>Entrada {datos.id}</h1>
      <p>Titulo: {datos.title.rendered}</p>
      <p>Autor: {datos.author}</p>
      <p>Fecha: {datos.date}</p>
      <p>Detalles de Entrada: {datos.about}</p>
      <p>Contenido:</p>
      <div className="product-des" dangerouslySetInnerHTML={{ __html: datos.content.rendered }}></div>
      <p>Categoría: {datos.categories}</p>
      <p>Tags: {datos.tags}</p>

    </div>
  )
  }else{
  return (
    <div>
      <h1>Entrada {datos.id}</h1>
      <p>Titulo: {datos.title.rendered}</p>
      <p>Autor: {datos.author}</p>
      <p>Fecha: {datos.date}</p>
      <p>Detalles de Entrada: {datos.about}</p>
      <p>Contenido:</p>
      <div className="product-des" dangerouslySetInnerHTML={{ __html: datos.content.rendered }}></div>
      <p>Featured media:</p><img src={`${imagen}`}/>
      <p>Categoría: {datos.categories}</p>
      <p>Tags: {datos.tags}</p>

    </div>
  )
  }
}//{posts.forEach(d => `<li>${d.id}</li>`)}
//https://tarea2-gc-wordpress.dieterpreuss.repl.co/index.php/wp-json/wp/v2/media/11

//https://tarea2-gc-wordpress.dieterpreuss.repl.co/index.php/wp-json/wp/v2/media/(featured_media)

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://Tarea2-GC-WordPress.dieterpreuss.repl.co/wp-json/wp/v2/proyecto')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    //idPost: post.id.toString(),
    params: { id: post.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // {fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://Tarea2-GC-WordPress.dieterpreuss.repl.co/wp-json/wp/v2/proyecto/${params.id}`)
  const post = await res.json()

  let imagen = null
  if (await post != null) {
    //console.log("post");
    //console.log(post);
    //console.log("featured media");
    //console.log(post.featured_media);

    const featured = await fetch(`https://tarea2-gc-wordpress.dieterpreuss.repl.co/index.php/wp-json/wp/v2/media/${post.featured_media}`)
    if (await featured != null){
        const featuredjson = await featured.json()
        imagen = featuredjson.source_url
      }
    //console.log("imagen");
    //console.log(imagen);
  }
  // Pass post data to the page via props
  if(imagen==null){
      return {
    props: {
      post
    }
  }    
  }
  else{
    return {
    props: {
      post,
      imagen
    }
  }
  }
}
