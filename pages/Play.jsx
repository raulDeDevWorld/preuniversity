import Button from '../components/Button'
import PremiumC from '../components/PremiumC'
import { useRouter } from 'next/router'
import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import { useUser } from '../context/Context.js'
import { manageSimulacro } from '../firebase/utils'
import Subtitle from '../components/Subtitle'
import style from '../styles/Home.module.css'



function Play() { 
    const { userDB, setUserSimulacro } = useUser()

    const router = useRouter()

    function next (materia) {
        manageSimulacro(materia, userDB.university, setUserSimulacro)
        router.push('/Simulacro')
    }

    function back () {
        router.back()
    }
 
    return (
        <>
        <PageLayout>
            {userDB === 'loading' && ''}
         
           
            { userDB !== null && userDB !== 'loading' &&
                <div className={style.containerTwo}>
                    {userDB.premium !== false && <span className={style.subtitle}> Premium</span>}
                    {userDB.premium === false && <span className={style.subtitle}>Free mode</span>}
                 
                    <img src={`/${userDB.avatar}.png`} className={style.perfil} alt="user photo" />
                    <Subtitle> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar? 'Bienvenido': 'Bienvenida'}: <br /> {`${userDB.aName.split(' ')[0].toUpperCase()}`}</Subtitle>
                    
                    
                    
                    
                    {Object.keys(userDB.materias).map((m, i)=>

                        <Button key={i} style='buttonPrimary' click={()=>next(m)}>{m}</Button>
                    )}
                    <Button style='buttonSecondary'click={back}>Atras</Button>
                    <PremiumC></PremiumC>
                </div>
            }
    
        </PageLayout>
 
        </>
    )
}

export default WithAuth(Play)
