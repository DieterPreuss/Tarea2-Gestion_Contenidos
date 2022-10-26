import { useRouter } from 'next/router'

export default function Post({ post, imagen, tags, cats }) {
  //const router = useRouter()
  //const { id } = router.query
  //const datos = paths.find((m) => m.id === { id });
  const datos = post;
  
  
  if (imagen == null){
    imagen="No disponible"
  }
  if (tags == null){
     tags="No disponible"
  }
  
  if (cats == null){
    cats="No disponible"
  }
  
    return (
      <div>
        <h1>Entrada {datos.id}</h1>
        <p>Titulo: {datos.title.rendered}</p>
        <p>Autor: {datos.author}</p>
        <p>Fecha: {datos.date}</p>
        <p>Detalles de Entrada: {datos.about}</p>
        <p>Contenido:</p>
        <div className="product-des" dangerouslySetInnerHTML={{ __html: datos.content.rendered }}></div>
        <p>Featured media:</p><img src={`${imagen}`} />
        <p>Categorías: {cats}</p>
        <p>Tags: {tags}</p>

      </div>
    )

}


export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://Tarea2-GC-WordPress.dieterpreuss.repl.co/wp-json/wp/v2/posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    //idPost: post.id.toString(),
    params: { id: post.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://Tarea2-GC-WordPress.dieterpreuss.repl.co/wp-json/wp/v2/posts/${params.id}`)
  const post = await res.json()

  let imagen = null
  var tagNames = null
  var tags = " | "
  var catNames = null
  var cats = " | "
  
    
  if (await post != null) {
    
    if (await post.tags != null) {
      tagNames = await fetch(`https://tarea2-gc-wordpress.dieterpreuss.repl.co/wp-json/wp/v2/tags?include=${post.tags.toString()}`)
    
    var tagsj= await tagNames.json()
    
    if (await tagsj != null) {
      console.log(tagsj[0])
      tagsj.forEach((el) => {
        tags=tags+el.name+" | "
        console.log(el.name)
      })

      console.log(tags)
    }

    }

    if (await post.categories != null) {
      catNames = await fetch(`https://tarea2-gc-wordpress.dieterpreuss.repl.co/wp-json/wp/v2/categories?include=${post.categories.toString()}`)
    
    var catsj= await catNames.json()
    
    if (await catsj != null) {
      console.log(catsj[0])
      catsj.forEach((el2) => {
        cats=cats+el2.name+" | "
        console.log(el2.name)
      })

      console.log(cats)
    }

    } 
    
  
    if (await post.featured_media != null) {

      const featured = await fetch(`https://tarea2-gc-wordpress.dieterpreuss.repl.co/index.php/wp-json/wp/v2/media/${post.featured_media}`)
      if (await featured != null) {
        const featuredjson = await featured.json()
        imagen = featuredjson.source_url
      }
    }
    
  }
  // Pass post data to the page via props
  if (imagen == null && tags==null && cats==null) {
    return {
      props: {
        post
      }
    }
  }
  else if(tags==null && cats==null) {
    return {
      props: {
        post,
        imagen
      }
    }
  }
  else if(imagen==null && cats==null){
     return {
      props: {
        post,
        tags
      }
    }   
  }
  else if(tags==null && imagen==null){
    return {
      props: {
        post,
        cats
        
      }
    }
  }
  else if(imagen==null){
    return {
      props: {
        post,
        tags,
        cats
        
      }
    }
  }
  else if(tags==null){
    return {
      props: {
        post,        
        imagen,
        cats
        
      }
    }
  }
  else if(cats==null){
    return {
      props: {
        post,
        imagen,
        tags
        
      }
    }
  }
  else{
    return {
      props: {
        post,
        imagen,
        tags,
        cats
        
      }
    }
  }

}

/*
// This function gets called at build time
export async function getStaticPaths() {

  const res = await fetch('https://Tarea2-GC-WordPress.dieterpreuss.repl.co/wp-json/wp/v2/posts')

  const posts = await res.json()
  console.log(posts);

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))

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

*/
