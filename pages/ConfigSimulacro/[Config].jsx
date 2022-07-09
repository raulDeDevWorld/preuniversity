import Button from '../../components/Button'
import Subtitle from '../../components/Subtitle'
import { useState, useEffect } from 'react'
import PageEspecial from '../../layouts/PageEspecial'
import { useUser } from '../../context/Context.js'
import { userDataUpdate, getData } from '../../firebase/utils'
import { useRouter } from 'next/router'
import { WithAuth } from '../../HOCs/WithAuth'
import Error from '../../components/Error'
import Success from '../../components/Success'
import style from '../../styles/PlayConfig.module.css'
import { rob } from '../../utils/robot'
import BlackFont from '../../components/BlackFont'
import PremiumC from '../../components/PremiumC'





function PlayConfig() {
    const { userDB, setUserData } = useUser()
    const [mode, setMode] = useState('suma')
    const [time, setTime] = useState(null)
    const [questions, setQuestions] = useState(null)
    const [difficulty, setDifficulty] = useState(null)

    const router = useRouter()


    function back() {
        router.back()
    }
    function save() {
        const object = {
            config: {
                time: time == null ? userDB.subjects[router.query.Config.toLowerCase()].config.time : time,
                questions: questions == null ? userDB.subjects[router.query.Config.toLowerCase()].config.questions : questions,
                difficulty: difficulty == null ? userDB.subjects[router.query.Config.toLowerCase()].config.difficulty : difficulty,
            }
        }
        userDataUpdate(object, setUserData, router.query.Config)
        setTime(null)
        setQuestions(null)
        setDifficulty(null)
    }


    useEffect(() => {

    });
    return (
        <PageEspecial>
            {userDB !== null && userDB !== 'loading' &&
                <div className={style.container}>
                    <span className={style.config}>Config mode</span>
                    <img src={`/robot.png`} className={style.robot} alt="user photo" />
                    <div className={style.messageBlackContainer}>
                        <BlackFont>
                            <span className={style.message}>{router.query.Config}</span>
                        </BlackFont>
                    </div>
                    <div className={style.configBlackContainer}>
                        <BlackFont>
                            <div className={style.configContainer}>
                                <div className={style.message}>Tiempo</div>
                                <div className={style.containerBoxSelect}>
                                    <div className={`${style.boxSelect} ${userDB.subjects[router.query.Config.toLowerCase()].config.time == 5 ? style.boxSelectNow : ''} ${time == 5 ? style.green : ''}`} onClick={() => setTime(5)}>5</div>
                                    <div className={`${style.boxSelect} ${userDB.subjects[router.query.Config.toLowerCase()].config.time == 10 ? style.boxSelectNow : ''} ${time == 10 ? style.green : ''}`} onClick={() => setTime(10)}>10</div>
                                    <div className={`${style.boxSelect} ${userDB.subjects[router.query.Config.toLowerCase()].config.time == 15 ? style.boxSelectNow : ''} ${time == 15 ? style.green : ''}`} onClick={() => setTime(15)}>15</div>
                                    <div className={`${style.boxSelect} ${userDB.subjects[router.query.Config.toLowerCase()].config.time == 30 ? style.boxSelectNow : ''} ${time == 30 ? style.green : ''}`} onClick={() => setTime(30)}>30</div>
                                    <div className={`${style.boxSelect} ${userDB.subjects[router.query.Config.toLowerCase()].config.time == 60 ? style.boxSelectNow : ''} ${time == 60 ? style.green : ''}`} onClick={() => setTime(60)}>60</div>
                                </div>
                                <div className={style.message}>Cantidad de preguntas</div>
                                <div className={style.containerBoxSelect}>
                                    <div className={`${style.boxSelect} ${userDB.subjects[router.query.Config.toLowerCase()].config.questions == 5 ? style.boxSelectNow : ''} ${questions == 5 ? style.green : ''}`} onClick={() => setQuestions(5)}>5</div>
                                    <div className={`${style.boxSelect} ${userDB.subjects[router.query.Config.toLowerCase()].config.questions == 10 ? style.boxSelectNow : ''} ${questions == 10 ? style.green : ''}`} onClick={() => setQuestions(10)}>10</div>
                                    <div className={`${style.boxSelect} ${userDB.subjects[router.query.Config.toLowerCase()].config.questions == 15 ? style.boxSelectNow : ''} ${questions == 15 ? style.green : ''}`} onClick={() => setQuestions(15)}>15</div>
                                    <div className={`${style.boxSelect} ${userDB.subjects[router.query.Config.toLowerCase()].config.questions == 30 ? style.boxSelectNow : ''} ${questions == 30 ? style.green : ''}`} onClick={() => setQuestions(30)}>30</div>
                                    <div className={`${style.boxSelect} ${userDB.subjects[router.query.Config.toLowerCase()].config.questions == 60 ? style.boxSelectNow : ''} ${questions == 60 ? style.green : ''}`} onClick={() => setQuestions(60)}>60</div>
                                </div>
                                <div className={style.message}>Dificultad</div>
                                <div className={style.buttonsContainer}>
                                    <button className={`${style.button} ${userDB.subjects[router.query.Config.toLowerCase()].config.difficulty == 'facil' ? style.boxSelectNow : ''} ${difficulty == 'facil' ? style.green : ''}`} onClick={() => setDifficulty('facil')}>Facil</button>
                                    <div className={style.boxSelect}>5p</div>
                                </div>
                                <div className={style.buttonsContainer}>
                                    <button className={`${style.button} ${userDB.subjects[router.query.Config.toLowerCase()].config.difficulty == 'regular' ? style.boxSelectNow : ''} ${difficulty == 'regular' ? style.green : ''}`} onClick={() => setDifficulty('regular')}>Regular</button>
                                    <div className={style.boxSelect}>5p</div>
                                </div>
                                <div className={style.buttonsContainer}>
                                    <button className={`${style.button} ${userDB.subjects[router.query.Config.toLowerCase()].config.difficulty == 'dificil' ? style.boxSelectNow : ''} ${difficulty == 'dificil' ? style.green : ''}`} onClick={() => setDifficulty('dificil')}>Dificil</button>
                                    <div className={style.boxSelect}>5p</div>
                                </div>
                                <div className={style.buttonsContainer}>
                                    <button className={`${style.button} ${userDB.subjects[router.query.Config.toLowerCase()].config.difficulty == 'aleatorio' ? style.boxSelectNow : ''} ${difficulty == 'aleatorio' ? style.green : ''}`} onClick={() => setDifficulty('aleatorio')}>Aleatorio</button>
                                    <div className={style.boxSelect}>{'500'}p</div>
                                </div>

                            </div>
                            <Button style='successButton' click={save}>Finalizar</Button>
                        </BlackFont>
                    </div>
                    <PremiumC></PremiumC>
                </div>
            }
        </PageEspecial>
    )
}
export default WithAuth(PlayConfig)