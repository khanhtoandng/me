'use client'
import { useCallback, useEffect, useState } from 'react'

const lettersAndSymbols = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,'

interface AnimatedTextProps {
  text: string
  className?: string
}

export function RandomizedTextEffect({ text, className = '' }: AnimatedTextProps) {
  const [animatedText, setAnimatedText] = useState(text)
  const [hasSeenAnimation, setHasSeenAnimation] = useState<boolean>(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getRandomChar = useCallback(() => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)], [])

  const animateText = useCallback(async () => {
    const duration = 30
    const revealDuration = 40
    const initialRandomDuration = 300

    const generateRandomText = () =>
      text
        .split('')
        .map(() => getRandomChar())
        .join('')

    setAnimatedText(generateRandomText())

    const endTime = Date.now() + initialRandomDuration
    while (Date.now() < endTime) {
      await new Promise((resolve) => setTimeout(resolve, duration))
      setAnimatedText(generateRandomText())
    }

    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, revealDuration))
      setAnimatedText(
        (prevText) =>
          text.slice(0, i + 1) +
          prevText
            .slice(i + 1)
            .split('')
            .map(() => getRandomChar())
            .join('')
      )
    }
  }, [text, getRandomChar])

  useEffect(() => {
    if (!isClient) return

    const isFirstVisit = !localStorage.getItem('hasSeenAnimation')

    if (isFirstVisit) {
      animateText()
      localStorage.setItem('hasSeenAnimation', 'true')
    } else {
      setHasSeenAnimation(true)
    }

    const handleBeforeUnload = () => {
      localStorage.removeItem('hasSeenAnimation')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [animateText, isClient])

  if (!isClient) {
    return <div className={`relative inline-block ${className}`}>{text}</div>
  }

  return <div className={`relative inline-block ${className}`}>{hasSeenAnimation ? text : animatedText}</div>
}
