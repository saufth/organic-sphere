'use client'
// Components
import CallToAction from '../input/CallToAction'
import Container from '../layout/Container'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
// Styles
import styles from '../../styles/navigation/Navbar.module.css'

/**
 * The main navbar of application
 * @returns Navbar component
 */
export default function Navbar () {
  const navbarRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const logomarkRef = useRef<HTMLImageElement>(null)
  const logonameRef = useRef<HTMLImageElement>(null)

  const handleScrolling = (event: Event) => {
    const windowNode = (event.currentTarget as Window).scrollY
    if (windowNode > 1) {
      navbarRef.current?.classList.add(styles.navbarSmall)
      logoRef.current?.classList.add(styles.logoSmall)
      logomarkRef.current?.classList.add(styles.logomarkSmall)
      logonameRef.current?.classList.add(styles.logonameSmall)
    } else {
      navbarRef.current?.classList.remove(styles.navbarSmall)
      logoRef.current?.classList.remove(styles.logoSmall)
      logomarkRef.current?.classList.remove(styles.logomarkSmall)
      logonameRef.current?.classList.remove(styles.logonameSmall)
    }
  }

  useEffect(() => {
    const node = navbarRef.current
    if (node) {
      window.addEventListener('scroll', handleScrolling)
      return () => {
        window.removeEventListener('scroll', handleScrolling)
      }
    }
  })

  return (
    <header className={styles.navbar} ref={navbarRef}>
      <Container auto alignment='row-end'>

        <nav aria-label='emah Directorio' className={styles.nav}>
          <ul className={styles.list}>

            <div>
              <Link href='/'>
                <div className={styles.logo} ref={logoRef}>
                  <Image
                    alt='emah logomark'
                    src='/images/logotype/logomark.svg'
                    width={64}
                    height={48}
                    priority
                    ref={logomarkRef}
                  />
                  <Image
                    src='/images/logotype/logoname.svg'
                    alt='emah'
                    width={67.3}
                    height={24}
                    className={styles.logoname}
                    priority
                    ref={logonameRef}
                  />
                </div>
              </Link>
            </div>

            <CallToAction />

          </ul>
        </nav>

      </Container>
    </header>
  )
}
