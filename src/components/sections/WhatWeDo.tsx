// Components
import Container from '../layout/Container'
// import Link from 'next/link'
// Styles
import styles from '../../styles/sections/WhatWeDo.module.css'
import CallToAction from '../input/CallToAction'

/**
 * This section specifies what organization does
 * @returns WhatWeDo section component
 */
export default function WhatWeDo () {
  return (
    <section id='about' className={styles.section}>
      <Container auto>
        <div className={styles.header}>
          <h2>
            ¿Qué hacemos?
          </h2>
          <p className={styles.description}>
            Desarrollamos branding y marketing en sincronía. Creemos que los<br />
            mejores resultados son logrados cuando la ejecución del branding y<br />
            el marketing empujan a la misma dirección.<br />
            Cuando trabajan en sincronía.
          </p>
        </div>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.cardContainer}>
              <h2 className={styles.cardHeading}>
                Branding
              </h2>
              <p className={styles.cardDescription}>
                <span>Construimos marcas sobresalientes</span>. Creamos el ADN de marca y desarrollamos
                sistemas funcionales de comunicación visual. Le damos forma al carácter de
                tu marca, una imagen atractiva y una identidad única. Creamos alianzas con
                nuestros clientes, y no solo en el plazo de la construcción de la marca.
                Ademas de construir nuevas marcas, <span>renovamos marcas existentes</span>...
              </p>
              <div className={styles.cardFooter}>
                <CallToAction />
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContainer}>
              <h2 className={styles.cardHeading}>
                Marketing
              </h2>
              <p className={styles.cardDescription}>
                <span>Impulsamos a las marcas a la dirección adecuada</span>. Creamos lazos de alianza con
                negocios que buscan crecimiento. Los que buscan un cambio para progresar.
                Ayudamos a recuperar atención en los medios, lograr sus metas y asegurar un
                crecimiento exponencial. <span>Y solo es el comienzo</span>...
              </p>
              <div className={styles.cardFooter}>
                <CallToAction />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
