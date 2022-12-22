// Components
import CallToAction from '../input/CallToAction'
import Container from '../layout/Container'
import Image from 'next/image'
// Styles
import styles from '../../styles/sections/Hero.module.css'

/**
 * The hero section of the application
 * @returns Hero section component
 */
export default function Hero () {
  return (
    <section className={styles.hero}>
      <Container auto fullHeight alignment='row-start'>

        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.slogan}>
              Endless Possibilities
            </div>
            <h1>
              Hacemos marketing <span className={styles.headingHighlight}>estratégico</span>
            </h1>
            <p className={styles.description}>
              <span>Desarrollamos branding, websites y apps</span> en sincronía con
              marketing. <span>Impulsamos empresas</span> con visión, a fin de crear
              un legado de progreso y verdad.
            </p>
          </div>
          <CallToAction />
        </div>

        <div className={styles.imageContainer}>
          <Image
            alt='emah'
            src='/images/sections/hero/hero.png'
            width={640}
            height={640}
            className={styles.image}
            priority
          />
        </div>

      </Container>
      <div className={styles.background} />
    </section>
  )
}
