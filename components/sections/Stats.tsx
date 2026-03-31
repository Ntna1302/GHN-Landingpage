import { Card } from '@/components/ui/card'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { ScrollReveal } from '@/components/ScrollReveal'

const stats = [
  { value: 25, suffix: '', suffixMuted: null, label: 'Câu hỏi / Bài KS', accent: true },
  { value: 6, suffix: '', suffixMuted: null, label: 'Luồng khảo sát', accent: false },
  { value: 8, suffix: '', suffixMuted: '-10 phút', label: 'Thời gian hoàn thành', accent: true },
  { value: 100, suffix: '%', suffixMuted: null, label: 'Ẩn danh tuyệt đối', accent: false },
]

export function Stats() {
  return (
    <section className="bg-surface py-14 px-4 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-body text-xs font-semibold tracking-[5px] text-ghn-o1 uppercase">
              Con số ấn tượng
            </p>
            <h2 className="font-heading text-3xl font-black text-ghn-navy sm:text-4xl">
              Khảo sát được thiết kế{' '}
              <span className="text-gradient-orange">cho bạn</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card className="group relative overflow-hidden rounded-[20px] border-0 bg-white p-4 text-center shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-6">
                {/* Accent top bar */}
                {stat.accent && (
                  <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-[20px] bg-gradient-to-r from-ghn-o1 to-ghn-o2" />
                )}
                <div className="flex items-baseline justify-center gap-0.5 leading-none">
                  <span
                    className={`font-heading text-[clamp(2.2rem,5vw,3rem)] font-black ${
                      stat.accent ? 'text-gradient-orange' : 'text-ghn-navy'
                    }`}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  {stat.suffixMuted && (
                    <span className="font-heading text-[22px] font-normal text-gray-400">
                      {stat.suffixMuted}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs font-semibold text-gray-400">{stat.label}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
