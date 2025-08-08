'use client'

import { useCertifications } from '@/hooks/use-certifications'
import { Award, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'

const styles = {
  section: 'w-full',
  headerTitle: 'section-title',
  headerTitleStyle: {
    color: 'var(--headline)',
    borderColor: 'var(--border)',
  },
  headerSubTitle: 'font-jetbrains-mono text-sm font-normal tracking-wider',
  headerSubTitleStyle: { color: 'var(--secondary)' },
  headerDesc: 'font-figtree text-sm mt-2 mb-4',
  headerDescStyle: { color: 'var(--paragraph)' },
}

export default function CertificationsSection() {
  const { certifications, getActiveCertifications } = useCertifications()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const activeCertifications = getActiveCertifications()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const sixMonthsFromNow = new Date()
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)
    return expiry <= sixMonthsFromNow && expiry > new Date()
  }

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false
    return new Date(expiryDate) <= new Date()
  }

  return (
    <section className={styles.section}>
      <header>
        <h1 className={styles.headerTitle} style={styles.headerTitleStyle} data-ninja-font="doto_bold_normal_rg90b">
          Certifications{' '}
          <span
            className={styles.headerSubTitle}
            style={styles.headerSubTitleStyle}
            data-ninja-font="jetbrainsmono_regular_normal_smv0q"
          >
            Professional credentials & achievements
          </span>
        </h1>
        <p className={styles.headerDesc} style={styles.headerDescStyle} data-ninja-font="figtree_light_normal_rmlnd">
          My professional certifications and achievements that validate my expertise in various technologies and
          methodologies. Click on badges to verify credentials.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 justify-items-center max-w-7xl mx-auto px-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="group relative bg-white dark:bg-[var(--card-background)] border border-gray-200 dark:border-[var(--card-border-color)] rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col items-center text-center min-h-[240px] w-full max-w-[300px]"
            onClick={() => cert.verificationUrl && window.open(cert.verificationUrl, '_blank', 'noopener,noreferrer')}
            title={cert.name}
          >
            {/* Large Badge Logo - With border section */}
            <div className="flex-shrink-0 h-[100px] flex items-center justify-center mb-4 w-full border-b border-gray-200 dark:border-[var(--card-border-color)] pb-4">
              {cert.image ? (
                <img
                  src={cert.image}
                  alt={`${cert.name} badge`}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
                </div>
              )}
            </div>

            {/* Certificate Information - Compact layout */}
            <div className="flex-1 flex flex-col w-full">
              {/* Title - Multi-line allowed */}
              <div className="text-center min-h-[48px] flex items-center justify-center mb-3">
                <h3 className="font-bold text-sm md:text-base lg:text-lg text-gray-900 dark:text-[var(--headline)] group-hover:text-blue-600 dark:group-hover:text-[var(--accent)] transition-colors duration-200 leading-tight text-center px-2 w-full">
                  {cert.name}
                </h3>
              </div>

              {/* Issuer - Compact height */}
              <div className="text-center h-[40px] flex items-center justify-center">
                <p className="text-sm md:text-base text-gray-600 dark:text-[var(--secondary)] font-medium text-center px-2 leading-tight">
                  {cert.issuer}
                </p>
              </div>
            </div>

            {/* Verification Link Indicator */}
            {cert.verificationUrl && (
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center text-xs text-blue-600 dark:text-[var(--accent)]">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  <span>Click to verify</span>
                </div>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/30 to-transparent dark:from-[var(--card-background)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
          </div>
        ))}
      </div>

      {activeCertifications.length !== certifications.length && (
        <div className="mt-6 p-4 rounded-lg bg-[var(--card-background)] border border-[var(--card-border-color)]">
          <p className="text-sm text-[var(--secondary)] text-center">
            Showing {activeCertifications.length} active out of {certifications.length} total certifications
          </p>
        </div>
      )}
    </section>
  )
}
