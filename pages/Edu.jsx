import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import PageUserLayout from '../layouts/PageUserLayout'
import { WithAuth } from '../HOCs/WithAuth'
import { userDataUpdate } from '../firebase/utils'
import Subtitle from '../components/Subtitle'
import Button from '../components/Button'
import style from '../styles/Edu.module.css'
import BlackFont from '../components/BlackFont'

function Edu() {
    const { userDB, uniData, setUserData } = useUser()
    const router = useRouter()


    function click(university) {
        const object = { university, }
        userDataUpdate(object, setUserData)
        router.push(`/University`)
    }

    function back() {
        router.back()
    }

    // useEffect(() => {
    //     userDB === null ? router.push('/Register'): ''
    // }, [userDB]);
    console.log(uniData)

    return (
        <PageUserLayout>
            <div className={style.container}>
                {userDB && userDB.avatar && <>
                    <div className={style.userDataContainer}>
                        <img src={`/${userDB.avatar}.png`} className={style.perfil} alt="avatar" />
                        <Subtitle> Muy bien {(`${userDB.name}`).split(' ')[0].toUpperCase()} <br /> Donde te postulara</Subtitle>                    </div><br />
                    <div className={style.blackButtonsContainer}>
                        <BlackFont>
                            <div className={style.buttonsContainer}>
                                <Button style={'buttonPrimary'} click={() => click('ESFM')}>ESFM</Button>
                                <Button style={'buttonPrimary'} click={() => click('USFX')}>USFX</Button>
                                <Button style={'buttonSecondary'} click={back}>atras</Button>
                            </div>
                        </BlackFont>

                    </div>

                </>}
            </div>
        </PageUserLayout>
    )
}
export default WithAuth(Edu)