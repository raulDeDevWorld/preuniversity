import Head from 'next/head'


export default function PageEspecial ({ children }) {
  return (
    <>
        <Head>
        <title>Swoou Preuniversity: Banco de preguntas y Simulacro para examenes de admision</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" /> 
        <meta name="apple-mobile-web-app-status-bar-style" content="#000000" /> 
        <meta name="description" content="Desarrollando tecnología para hacer de un mundo complicado un mundo más sencillo" />
        <meta name="keywords" content="Swoou, Swoou preuniversity, banco de preguntas, cursos preuniversitarios, simulacro examen de admision" />
        <meta name="author" content="Raul Choque Romero" />
        </Head>
        <main> { children } </main>
  
    </>
  )
}
