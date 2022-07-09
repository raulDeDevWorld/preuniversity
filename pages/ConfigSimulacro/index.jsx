import Button from '../../components/Button'
import PremiumC from '../../components/PremiumC'
import { useRouter } from 'next/router'
import PageUserLayout from '../../layouts/PageUserLayout'
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
    function next(materia) {
        manageSimulacro(materia, userDB.university, setUserSimulacro)
        router.push('/Simulacro')
    }

    function back() {
        router.back()
    }

    return (
        <>
            <PageUserLayout>
                {userDB === 'loading' && ''}
                {userDB !== null && userDB !== 'loading' &&
                    <div className={style.container}>
                        <span className={style.orange}>Config Mode</span>
                        <img src={`/robot.png`} className={style.robot} alt="user photo" />

                        <div className={style.messageBlackContainer}>
                            <BlackFont>
                                <span className={style.message}> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar ? 'Hola,' : 'Bienvenida,'}  {`${userDB.aName.split(' ')[0].toUpperCase()}`} personaliza tu cuenta aqui</span>
                            </BlackFont>
                        </div>
                        <div className={style.buttonsBlackContainer}>
                        <BlackFont>
                            <div className={style.buttonsContainer}>
                                {Object.keys(userDB.subjects).map((m, i) =>

                                    <Link href="ConfigSimulacro/[Config]" as={`ConfigSimulacro/${m.charAt(0).toUpperCase() + m.slice(1)}`} key={i} >
                                        <a className={style.link}>
                                            <Button style='buttonBlackFont'>{m.charAt(0).toUpperCase() + m.slice(1)}</Button>
                                        </a>

                                    </Link>
                                )}
                                <Button style='buttonSecondary' click={back}>Atras</Button>
                            </div>
                        </BlackFont>
                        </div>

                        <PremiumC></PremiumC>
                    </div>
                }

            </PageUserLayout>

        </>
    )
}

export default WithAuth(ConfigSimulacro)
