'use client'

import styles from './VoiceAgents.module.css'

const agents = [
  {
    name: 'Chloe',
    slug: 'chloe',
    description: 'Company Information Expert',
    details: 'Answers questions about Cosentus services, pricing, and capabilities',
    icon: '💼'
  },
  {
    name: 'Cindy',
    slug: 'cindy',
    description: 'Patient Billing Support',
    details: 'Helps patients with billing questions and payment assistance',
    icon: '💳'
  },
  {
    name: 'Chris',
    slug: 'chris',
    description: 'Insurance Claim Follow-Up',
    details: 'Follows up on insurance claims and resolves denials',
    icon: '📋'
  },
  {
    name: 'Cara',
    slug: 'cara',
    description: 'Eligibility & Benefits Verification',
    details: 'Verifies patient insurance eligibility and benefits',
    icon: '✅'
  },
  {
    name: 'Carly',
    slug: 'carly',
    description: 'Prior Authorization Follow-Up',
    details: 'Follows up on prior authorization requests and approvals',
    icon: '📝'
  },
  {
    name: 'Carson',
    slug: 'carson',
    description: 'Payment Reconciliation',
    details: 'Handles payment reconciliation and discrepancy resolution',
    icon: '💰'
  }
]

export default function VoiceAgents() {
  return (
    <section className={styles.voiceAgentsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>AI Voice Agents</h2>
        <p className={styles.subtitle}>
          Real-time voice conversations with specialized AI assistants
        </p>
        
        <div className={styles.agentsGrid}>
          {agents.map((agent) => (
            <div key={agent.slug} className={styles.agentCard}>
              <div className={styles.agentHeader}>
                <span className={styles.agentIcon}>{agent.icon}</span>
                <div>
                  <h3 className={styles.agentName}>{agent.name}</h3>
                  <p className={styles.agentDescription}>{agent.description}</p>
                </div>
              </div>
              <p className={styles.agentDetails}>{agent.details}</p>
              <div className={styles.iframeContainer}>
                <iframe 
                  src={`https://cosentusai.vercel.app/embed/voice/${agent.slug}?color=87CEEB`}
                  className={styles.voiceIframe}
                  frameBorder="0"
                  allow="microphone"
                  allowFullScreen
                  title={`${agent.name} - ${agent.description}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
