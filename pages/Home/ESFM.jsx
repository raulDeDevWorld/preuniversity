import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../context/Context.js'
import PageLayout from '../../layouts/PageLayout'
import { WithAuth } from '../../HOCs/WithAuth'
import { dataFac } from '../../firebase/utils'
import Subtitle from '../../components/Subtitle'
import Paragraph from '../../components/Paragraph'
import Button from '../../components/Button'
import style from '../../styles/Facultad.module.css'
import { firebaseConfig } from '../../firebase/config.js'

function Esfm (props) {
    const router = useRouter()
    const [facI, setFacI] = useState(null)
    function continuar () {
        facI !== null 
        ? router.push(`/Home/${facI}`)
        : ''
    }
    function back () {
        router.back()
    }
    console.log(facI)
    function setFacIndex (e) {
        e.preventDefault()
        setFacI(e.target.textContent)
	}
    return (
    <PageLayout className={style.container}>
        <div className={style.container}>
            <Subtitle>Elije tu facultad</Subtitle>
            <ul className={style.list}>
                {/* <li className={`${style.li} ${f == facI ? style.active : ''}`} onClick={setFacIndex}>ESFM</li>
                <li className={`${style.li} ${f == facI ? style.active : ''}`} onClick={setFacIndex}>USFX</li> */}
            </ul>
            <div className={style.buttonsContainer}>
                <Button style={'buttonPrimary'} click={continuar}>continuar</Button>
                <Button style={'buttonSecondary'} click={back}>atras</Button>     
            </div>
        </div>
    </PageLayout>
    )
}


export default Esfm
