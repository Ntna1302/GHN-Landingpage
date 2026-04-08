'use client'

import { useState, useEffect, useCallback } from 'react'

export type AppStep = 'splash' | 'recap' | 'main'

export function useHistoryStep(initial: AppStep = 'splash') {
  const [step, setStepState] = useState<AppStep>(initial)

  // On mount: replace current history entry with splash
  useEffect(() => {
    history.replaceState({ step: 'splash' }, '')
  }, [])

  // Programmatic navigation: push history entry for recap / main
  const setStep = useCallback((newStep: AppStep) => {
    setStepState(newStep)
    if (newStep === 'recap' || newStep === 'main') {
      history.pushState({ step: newStep }, '')
    }
  }, [])

  // Browser back/forward
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const s = e.state?.step as AppStep | undefined
      setStepState(s === 'recap' || s === 'main' ? s : 'splash')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return [step, setStep] as const
}
