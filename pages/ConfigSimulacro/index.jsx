import Button from '../../components/Button'
import PremiumC from '../../components/PremiumC'
import { useRouter } from 'next/router'
import PageLayout from '../../layouts/PageLayout'
import { WithAuth } from '../../HOCs/WithAuth'
import { useUser } from '../../context/Context.js'
import { manageSimulacro } from '../../firebase/utils'
import Subtitle from '../../components/Subtitle'
import BlackFont from '../../components/BlackFont'
import Link from 'next/link'

import style from '../../styles/Config.module.css'



function ConfigSimulacro() { 
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
                <div className={style.container}>
                    <span className={style.orange}>Config Mode</span>
                    <img src={`/robot.png`} className={style.robot} alt="user photo" />
                    <BlackFont>
            <span className={style.title}> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar ? 'Hola,' : 'Bienvenida,'}  {`${userDB.aName.split(' ')[0].toUpperCase()}`} personaliza tu simulacro aqui</span>
            </BlackFont><br />                    
                    
                    <BlackFont> 
                    <div className={style.buttonContainer}>
                    {Object.keys(userDB.subjects).map((m, i)=>

                            <Link href="ConfigSimulacro/[Config]" as={`ConfigSimulacro/${m.charAt(0).toUpperCase() + m.slice(1)}`} key={i} >
                                <a className={style.link}>
                                    <Button style='buttonBlackFont'>{m.charAt(0).toUpperCase() + m.slice(1)}</Button>
                                </a>
                            
                            </Link>
                        
                    )}
                    <Button style='buttonSecondary'click={back}>Atras</Button>
                    </div>
                    
                    </BlackFont> 
                    
                    <PremiumC></PremiumC>
                </div>
            }
    
        </PageLayout>
 
        </>
    )
}

export default WithAuth(ConfigSimulacro)
