'use client'

import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { ExternalLink, X } from 'lucide-react'
import { SurveyGroup } from '@/lib/survey-data'
import { useState, useEffect } from 'react'

interface SurveyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: SurveyGroup | null
}

export function SurveyModal({ open, onOpenChange, group }: SurveyModalProps) {
  const [showForm, setShowForm] = useState(false)
  const [progress, setProgress] = useState(0)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const isOrange = !group || group.theme === 'orange'

  const accentGradient = isOrange
    ? 'linear-gradient(90deg, #FF5200, #FF8C00, #FFB347)'
    : 'linear-gradient(90deg, #0A1F44, #1B6CA8, #2589D3)'

  const primaryColor = isOrange ? '#FF5200' : '#1B6CA8'
  const primaryLight = isOrange ? '#FFF0EB' : '#EBF5FF'
  const primaryBorder = isOrange ? '#FFD0BB' : '#B0D0F0'
  const primaryText = isOrange ? '#C43B00' : '#0D3B6E'
  const btnGradient = isOrange
    ? 'linear-gradient(135deg, #FF5200, #FF8C00)'
    : 'linear-gradient(135deg, #0D3B6E, #1B6CA8)'

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setShowForm(false)
        setProgress(0)
        setIframeLoaded(false)
      }, 300)
    }
  }, [open])

  // Animate progress bar when iframe loads
  useEffect(() => {
    if (showForm) {
      setProgress(0)
      const t1 = setTimeout(() => setProgress(30), 100)
      const t2 = setTimeout(() => setProgress(70), 600)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [showForm])

  useEffect(() => {
    if (iframeLoaded) setProgress(100)
  }, [iframeLoaded])

  const handleConfirm = () => setShowForm(true)

  const groupLabel = group ? `Nhóm ${group.id} — ${group.title}` : ''
  const shortUrl = group?.link
    ? group.link.replace('https://', '').split('/')[0]
    : 'docs.google.com'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 border-0 rounded-[24px] overflow-hidden shadow-2xl gap-0 [&>button]:hidden flex flex-col transition-all duration-300"
        style={showForm
          ? { width: '95vw', maxWidth: '900px', maxHeight: '90vh' }
          : { width: 'calc(100% - 2rem)', maxWidth: '448px', maxHeight: '90vh' }
        }
      >

        {/* ── Top accent bar ── */}
        <div style={{ height: 4, background: accentGradient, flexShrink: 0 }} />

        {showForm ? (
          <>
            {/* ── Browser chrome bar ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 16px', borderBottom: '1px solid #F0F0F0', background: '#FAFAFA',
              flexShrink: 0,
            }}>
              {/* Left: favicon + URL */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                  background: btnGradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <rect x="1" y="1" width="4" height="4" rx="1" fill="white"/>
                    <rect x="6" y="1" width="4" height="4" rx="1" fill="white" opacity=".6"/>
                    <rect x="1" y="6" width="4" height="4" rx="1" fill="white" opacity=".6"/>
                    <rect x="6" y="6" width="4" height="4" rx="1" fill="white" opacity=".35"/>
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: '#6E6E73', fontWeight: 500 }}>
                  {shortUrl} /{' '}
                  <span style={{ color: '#1C1C1E', fontWeight: 600 }}>
                    {groupLabel}
                  </span>
                </span>
              </div>

              {/* Right: badge + close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: '#F0FDF4', border: '1px solid #BBF7D0',
                  borderRadius: 100, padding: '3px 10px',
                  fontSize: 10, fontWeight: 700, color: '#166534',
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }} />
                  Ẩn danh
                </div>
                <button
                  onClick={() => onOpenChange(false)}
                  style={{
                    width: 28, height: 28, borderRadius: 8, border: '1px solid #E8E8E8',
                    background: '#fff', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                  }}
                >
                  <X size={14} color="#6E6E73" />
                </button>
              </div>
            </div>

            {/* ── Progress bar ── */}
            <div style={{ padding: '10px 16px 0', background: '#fff', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: '#8E8E93', fontWeight: 500 }}>
                  {iframeLoaded ? 'Form đã tải xong' : 'Đang tải khảo sát...'}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, color: primaryColor }}>
                  {progress}%
                </span>
              </div>
              <div style={{ height: 4, background: '#F0F0F0', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: accentGradient,
                  borderRadius: 4,
                  transition: 'width 0.6s cubic-bezier(.4,0,.2,1)',
                }} />
              </div>
            </div>

            {/* ── iframe ── */}
            <div style={{ position: 'relative', background: '#F9F9FB' }}>
              {!iframeLoaded && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 12, background: '#F9F9FB', zIndex: 1, minHeight: 280,
                }}>
                  {/* Spinner */}
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: `3px solid ${primaryLight}`,
                    borderTopColor: primaryColor,
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  <span style={{ fontSize: 13, color: '#8E8E93', fontWeight: 500 }}>
                    Đang tải form khảo sát...
                  </span>
                  <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                </div>
              )}
              <iframe
                src={`${group?.link}?embedded=true`}
                style={{
                  width: '100%',
                  height: 'clamp(500px, 75vh, 800px)',
                  border: 'none',
                  display: 'block',
                  opacity: iframeLoaded ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
                onLoad={() => setIframeLoaded(true)}
              />
            </div>

            {/* ── Footer ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', borderTop: '1px solid #F0F0F0',
              background: '#fff', flexShrink: 0, gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8E8E93' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
                Ẩn danh hoàn toàn · Không lưu thông tin cá nhân
              </div>
              {/* <button
                onClick={() => group?.link && window.open(group.link, '_blank', 'noopener,noreferrer')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: btnGradient, color: '#fff', border: 'none',
                  borderRadius: 100, padding: '8px 16px',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  flexShrink: 0, whiteSpace: 'nowrap',
                }}
              >
                <ExternalLink size={13} />
                Mở tab mới
              </button> */}
            </div>
          </>
        ) : (
          <>
            {/* ── Confirmation screen ── */}
            <div style={{ padding: '28px 24px 24px' }}>

              {/* Icon */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: btnGradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 8px 24px ${primaryColor}40`,
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0A1F44', textAlign: 'center', marginBottom: 8, letterSpacing: -0.5 }}>
                Bắt đầu khảo sát
              </h2>
              <p style={{ fontSize: 14, color: '#6E6E73', textAlign: 'center', lineHeight: 1.6, marginBottom: 20 }}>
                Bạn sắp tham gia khảo sát ẩn danh dành cho{' '}
                <span style={{ fontWeight: 700, color: '#0A1F44' }}>{groupLabel}</span>.
              </p>

              {/* Info card */}
              {group && (
                <div style={{
                  background: primaryLight, border: `1px solid ${primaryBorder}`,
                  borderRadius: 16, padding: '14px 18px', marginBottom: 20,
                }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: primaryText, marginBottom: 6 }}>
                    {group.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {[
                      { icon: '🔒', text: 'Ẩn danh hoàn toàn' },
                      { icon: '⏱️', text: '8–10 phút' },
                      { icon: '❓', text: '25 câu hỏi' },
                    ].map(({ icon, text }) => (
                      <div key={text} style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        background: '#fff', border: `1px solid ${primaryBorder}`,
                        borderRadius: 100, padding: '4px 12px',
                        fontSize: 11, fontWeight: 600, color: primaryText,
                      }}>
                        <span style={{ fontSize: 12 }}>{icon}</span>{text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  onClick={handleConfirm}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 16, border: 'none',
                    background: btnGradient, color: '#fff',
                    fontSize: 14, fontWeight: 800, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    letterSpacing: -0.2,
                  }}
                >
                  <ExternalLink size={16} />
                  Đã hiểu, bắt đầu ngay →
                </button>
                <button
                  onClick={() => onOpenChange(false)}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 16,
                    border: '1px solid #E8E8E8', background: '#F9F9FB',
                    color: '#6E6E73', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Huỷ
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}