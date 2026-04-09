// 'use client'

// import { useState, useEffect, useCallback } from 'react'

// export type AppStep = 'splash' | 'gate' | 'main'

// export function useHistoryStep(initial: AppStep = 'splash') {
//   const [step, setStepState] = useState<AppStep>(initial)

//   // Tag the initial browser history entry (no new entry created).
//   // splash uses replaceState; gate and main push new entries so the browser
//   // back button navigates: main → gate → splash → external site.
//   useEffect(() => {
//     history.replaceState({ step: initial }, '')
//   }, []) // eslint-disable-line react-hooks/exhaustive-deps

//   const setStep = useCallback((newStep: AppStep) => {
//     setStepState(newStep)
//     if (newStep === 'splash') {
//       history.replaceState({ step: 'splash' }, '')
//     } else {
//       history.pushState({ step: newStep }, '')
//     }
//   }, [])

//   // Sync React state when the user navigates with browser back/forward
//   useEffect(() => {
//     const handle = (e: PopStateEvent) => {
//       const s = e.state?.step as AppStep | undefined
//       if (s === 'splash' || s === 'gate' || s === 'main') {
//         setStepState(s)
//       }
//     }
//     window.addEventListener('popstate', handle)
//     return () => window.removeEventListener('popstate', handle)
//   }, [])

//   return [step, setStep] as const
// }
// 'use client'

// import { useState, useEffect, useCallback } from 'react'

// export type AppStep = 'splash' | 'gate' | 'main'

// export function useHistoryStep(initial: AppStep = 'splash') {
//   const [step, setStepState] = useState<AppStep>(initial)
//   useEffect(() => {
//     if (!history.state?.step) {
//       history.replaceState({ step: initial }, '')
//     }
//   }, [initial])
//   const setStep = useCallback((newStep: AppStep) => {
//   const current = history.state?.step

//   // 🚨 prevent duplicate entries
//   if (current === newStep) return

//   setStepState(newStep)

//   history.pushState({ step: newStep }, '')
// }, [])
//   useEffect(() => {
//         const handle = (e: PopStateEvent) => {
//       const s = e.state?.step as AppStep | undefined

//       if (s === 'splash' || s === 'gate' || s === 'main') {
//         setStepState(s)
//         return
//       }

//       const current = history.state?.step

//       if (!s && current === 'splash') {
//         history.pushState({ step: 'splash' }, '')
//         setStepState('splash')
//       }
//     }
//     window.addEventListener('popstate', handle)
//     return () => window.removeEventListener('popstate', handle)
//   }, [])

//   return [step, setStep] as const
// }
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export type AppStep = 'splash' | 'gate' | 'main'

// Ordered steps — used to rebuild the full history stack
const STEP_ORDER: AppStep[] = ['splash', 'gate', 'main']

export function useHistoryStep() {
  // Always start with 'splash' — SSR-safe, avoids hydration mismatch.
  // The mount effect below computes the real initial step client-side.
  const [step, setStepState] = useState<AppStep>('splash')
  const [ready, setReady] = useState(false)
  const initializedRef = useRef(false)

  // On mount: determine the correct initial step from history.state / sessionStorage,
  // then rebuild the FULL history stack so the back button always works.
  // e.g. if initial='main', we create: splash (replace) → gate (push) → main (push)
  // Guard with ref to prevent StrictMode double-mount from duplicating entries.
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    // Determine initial step (client-only)
    let initial: AppStep = 'splash'
    const hs = history.state?.step
    if (hs === 'splash' || hs === 'gate' || hs === 'main') {
      initial = hs
    } else {
      const seen = sessionStorage.getItem('ees_splash_seen')
      const role = sessionStorage.getItem('ees_role_group')
      if (seen && role) initial = 'main'
      else if (seen) initial = 'gate'
    }

    setStepState(initial)

    // Stack already has the right entry (back-nav, refresh) — skip rebuild
    if (history.state?.step !== initial) {
      const targetIndex = STEP_ORDER.indexOf(initial)
      history.replaceState({ step: 'splash' }, '')
      for (let i = 1; i <= targetIndex; i++) {
        history.pushState({ step: STEP_ORDER[i] }, '')
      }
    }

    setReady(true)
  }, [])

  const setStep = useCallback((newStep: AppStep) => {
    if (history.state?.step === newStep) {
      // Already at this step in history — just update React state, don't push
      setStepState(newStep)
      return
    }

    setStepState(newStep)
    history.pushState({ step: newStep }, '')
  }, [])

  // Sync React state when the user presses browser back/forward
  useEffect(() => {
    const handle = (e: PopStateEvent) => {
      const s = e.state?.step as AppStep | undefined

      if (s === 'splash' || s === 'gate' || s === 'main') {
        setStepState(s)
      }
    }

    window.addEventListener('popstate', handle)
    return () => window.removeEventListener('popstate', handle)
  }, [])

  return [step, setStep, ready] as const
}