export type Certification = {
  id: string
  name: string
  issuer: string
  image?: string // Path to the certification badge image
  verificationUrl?: string // URL to verify the certification
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'aws-solutions-architect',
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    image: '/certificates/saa-c03.png',
    verificationUrl: 'https://www.credly.com/badges/46ae5c4d-f69d-4b70-a4dd-4b27c9e9de24',
  },
  {
    id: 'toeic-certificate',
    name: 'TOEIC - 785/990',
    issuer: 'Educational Testing Service (ETS)',
    image: '/certificates/toeic.png',
  },
  {
    id: 'machine-learning-in-production',
    name: 'Machine Learning in Production',
    issuer: 'DeepLearning.AI',
    image: '/certificates/deeplearning-ai.png',
    verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/PTCZPS1U1BYF',
  },
]

export default CERTIFICATIONS
