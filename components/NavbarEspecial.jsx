import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { handleSignOut } from '../firebase/utils'
import style from '../styles/NavbarEspecial.module.css'

export default function NavbarEspecial () {
  const [menu, setMenu] = useState(false)
  const { pathname } = useRouter() 
  function handleMenu(){
    setMenu(!menu)
  }
  return (
      <header>

          <div className={style.navbar}>
              <div className={style.directAcces}>
                  <Link href="/Home">
                      <a className={`${style.linkAD} ${pathname == "/Simulacro" ? style.active : ''}`}>Simulacro</a>
                  </Link>
                  <Link href="/Home">
                      <a className={`${style.linkAD} ${pathname == "/Promedio" ? style.active : ''}`}>Promedio</a>
                  </Link>
              </div>
              <img src="/logo-dark.svg" className={style.logo} alt="logo" />
          </div>

      </header>
  )}