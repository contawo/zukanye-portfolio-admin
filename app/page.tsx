import styles from '@/styles/pages/Page.module.css'
import Navigation from '@/components/Navigation'
import Login from '@/components/Login'

export default function Home() {
  return (
    <main className={styles.main}>
      <Navigation />
      <section className={styles.mainContent}>
        <Login />
      </section>
    </main>
  )
}
