import { Button } from '@/components/ui/button'
import { Send, Mail, MessageCircle } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'

export function Support() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-ghn-navy via-ghn-navy-mid to-ghn-b1 p-10 text-center shadow-2xl shadow-ghn-navy/25">
            {/* Decorative morphing blob */}
            <div
              className="animate-morphBlob pointer-events-none absolute -right-16 -top-16 h-[280px] w-[280px] rounded-full bg-ghn-o1/10 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="animate-morphBlob pointer-events-none absolute -left-16 -bottom-16 h-[220px] w-[220px] rounded-full bg-ghn-b2/10 blur-2xl"
              style={{ animationDelay: '-8s' }}
              aria-hidden="true"
            />

            {/* Icon */}
            <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[16px] bg-white/10 ring-1 ring-white/20">
              <MessageCircle className="h-7 w-7 text-white" />
            </div>

            {/* Content */}
            <h2 className="relative font-heading text-2xl font-black text-white sm:text-3xl">
              Cần hỗ trợ?
            </h2>
            <p className="relative mx-auto mt-3 max-w-[440px] text-[15px] leading-relaxed text-white/65">
              Nếu bạn không chắc mình thuộc nhóm nào, hoặc gặp vấn đề kỹ thuật — đội EX Team
              luôn sẵn sàng hỗ trợ.
            </p>

            {/* Buttons */}
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                nativeButton={false}
                render={<a href="https://t.me/ghneesrace" target="_blank" rel="noopener noreferrer" />}
                className="min-w-[180px] rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/20 hover:shadow-xl hover:shadow-white/10"
                variant="outline"
              >
                <Send className="h-4 w-4" />
                Telegram EX Team
              </Button>

              <Button
                nativeButton={false}
                render={<a href="mailto:ex@ghn.vn" />}
                className="min-w-[180px] rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/20 hover:shadow-xl hover:shadow-white/10"
                variant="outline"
              >
                <Mail className="h-4 w-4" />
                ex@ghn.vn
              </Button>
            </div>

            {/* Bottom note */}
            <p className="relative mt-6 text-[11px] text-white/30">
              Thời gian phản hồi trong vòng 1-2 giờ trong giờ hành chính
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
