import { CERTIFICATIONS } from '@/data/Certifications'

export function useCertifications() {
  return {
    certifications: CERTIFICATIONS,
    totalCertifications: CERTIFICATIONS.length,
    getActiveCertifications: () => {
      return CERTIFICATIONS
    },
    getCertificationsByIssuer: (issuer: string) => {
      return CERTIFICATIONS.filter((cert) => cert.issuer.toLowerCase().includes(issuer.toLowerCase()))
    },
    getCertificationById: (id: string) => {
      return CERTIFICATIONS.find((cert) => cert.id === id)
    },
  }
}

export type UseCertificationsReturn = ReturnType<typeof useCertifications>
