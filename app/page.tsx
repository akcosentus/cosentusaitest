'use client'

import { useState } from 'react'
import ChatWidget from './components/ChatWidget'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.logo}>Cosentus</div>
          <div className={styles.navLinks}>
            <a href="#solutions">Solutions</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Streamline Your Revenue Cycle Management
          </h1>
          <p className={styles.heroSubtitle}>
            Empowering healthcare providers with intelligent automation and expert support
          </p>
          
          <ChatWidget />
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💼</div>
            <h3>Claims Management</h3>
            <p>Streamline your claims process with automated workflows and real-time tracking</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Analytics & Reporting</h3>
            <p>Gain insights into your revenue cycle with comprehensive analytics</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>HIPAA Compliant</h3>
            <p>Enterprise-grade security ensuring full HIPAA compliance</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2026 Cosentus. All rights reserved.</p>
      </footer>
    </main>
  )
}

