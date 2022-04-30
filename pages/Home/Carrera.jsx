import { useRouter } from 'next/router'
import PageLayout from '../../layouts/PageLayout'
import { WithAuth } from '../../HOCs/WithAuth'
import { useUser } from '../../context/Context.js'
import style from '../../styles/Home.module.css'

function Carrera () {
    const { user, userData } = useUser()
    const router = useRouter()
    function testClick () {
        router.push('/Test')
    }
    function omitirClick () {
        router.push('/Home/Facultad')
    }
    console.log(user)
    console.log('Home')

    return (
    <PageLayout>
        {userData === null &&
        <div className={style.container}>
            <p className={style.subtitle}>Bienvenido: <br/> {`${user.displayName.toUpperCase()}`}</p>  
            <p className={style.paragraph}>Antes de elegir una carrera prueba nuestro Test de orientacion vocacional</p>
            <button className={style.buttonPrimary} onClick={testClick}> Test </button>
            <button className={style.buttonSecondary} onClick={omitirClick}> Omitir </button>
        </div>
        }
        {userData &&
        <div className={style.container}>
            <img src={user.photoURL} className={style.perfil} alt="user photo"/>
            {userData.premium === true && <p className={style.subtitle}> Premium</p>}
            {userData.premium === false && <p className={style.subtitle}> Invited</p>}
            <p className={style.paragraph}> Usuario: {`${user.displayName}`}<br/>Carrera: {userData.career}</p>
            <button className={style.buttonPrimary} onClick={testClick}> Avances </button>
            <button className={style.buttonSecondary} onClick={omitirClick}> Promedio </button>
        </div>
        }
    </PageLayout>
    )
}

export default WithAuth(Carrera)