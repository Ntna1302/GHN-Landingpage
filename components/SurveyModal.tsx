'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Send, ExternalLink } from 'lucide-react'
import { SurveyGroup } from '@/lib/survey-data'

interface SurveyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: SurveyGroup | null
}

export function SurveyModal({ open, onOpenChange, group }: SurveyModalProps) {
  const isOrange = !group || group.theme === 'orange'

  const topBar = isOrange
    ? 'bg-gradient-to-r from-ghn-o1 via-ghn-o2 to-ghn-o3'
    : 'bg-gradient-to-r from-ghn-b1 via-ghn-b2 to-ghn-b3'

  const iconBg = isOrange
    ? 'bg-gradient-to-br from-ghn-o1 to-ghn-o2 shadow-ghn-o1/30'
    : 'bg-gradient-to-br from-ghn-b1 to-ghn-b2 shadow-ghn-b2/30'

  const primaryBtn = isOrange
    ? 'bg-gradient-to-r from-ghn-o1 to-ghn-o2 shadow-ghn-o1/25 hover:shadow-ghn-o1/40'
    : 'bg-gradient-to-r from-ghn-b1 to-ghn-b2 shadow-ghn-b2/25 hover:shadow-ghn-b2/40'

  const handleConfirm = () => {
    if (group?.link) {
      window.open(group.link, '_blank', 'noopener,noreferrer')
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-h-[85vh] max-w-md overflow-y-auto rounded-[20px] border-0 p-0 shadow-2xl">
        {/* Top accent bar */}
        <div className={`h-1 w-full flex-shrink-0 ${topBar}`} />

        <div className="p-4 sm:p-6">
          <DialogHeader className="items-center text-center">
            {/* Icon */}
            <div
              className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full shadow-lg ${iconBg}`}
            >
              <Send className="h-5 w-5 text-white" />
            </div>

            <DialogTitle className="font-heading text-xl font-bold text-ghn-navy">
              Chuyển hướng khảo sát
            </DialogTitle>

            <DialogDescription className="mt-2 text-center text-[15px] leading-relaxed text-gray-600">
              Hệ thống chuẩn bị chuyển hướng bạn đến form khảo sát ẩn danh dành cho{' '}
              <span className="font-semibold text-ghn-navy">
                {group ? `Nhóm ${group.id} — ${group.title}` : ''}
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          {/* Info box */}
          {group && (
            <div className="mt-5 rounded-[14px] bg-surface p-4">
              <p className="text-sm text-gray-500">
                <span className="block font-semibold text-ghn-navy">{group.description}</span>
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Ẩn danh hoàn toàn · Không lưu thông tin cá nhân
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2">
            <Button
              onClick={handleConfirm}
              size="lg"
              className={`h-12 w-full rounded-2xl text-sm font-bold text-white shadow-lg hover:brightness-110 ${primaryBtn}`}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Đã hiểu, bắt đầu →
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-10 w-full rounded-2xl border-gray-200 text-gray-500 hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
            >
              Huỷ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
