import { UserRoundSearch, Zap, Handshake } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollReveal } from '@/components/ScrollReveal'

const trustItems = [
  {
    icon: UserRoundSearch,
    color: 'orange' as const,
    title: 'Ẩn Danh Tuyệt Đối',
    desc: 'Không định danh, không lưu vết. Thông tin bảo mật hoàn toàn 100%.',
  },
  {
    icon: Zap,
    color: 'blue' as const,
    title: 'Nhanh & Tối Ưu',
    desc: 'Bộ câu hỏi thiết kế riêng cho từng nhóm. Chỉ mất 8-10 phút trên điện thoại.',
  },
  {
    icon: Handshake,
    color: 'green' as const,
    title: 'Cam Kết Hành Động',
    desc: 'Kết quả trình bày trực tiếp với C-Level để đưa ra Action Plan trong Q3.',
  },
]

const iconColors = {
  orange: {
    bg: 'from-ghn-o1/15 to-ghn-o2/10',
    text: 'text-ghn-o1',
  },
  blue: {
    bg: 'from-ghn-b1/15 to-ghn-b2/10',
    text: 'text-ghn-b2',
  },
  green: {
    bg: 'from-emerald-500/15 to-emerald-400/10',
    text: 'text-emerald-600',
  },
}

export function TrustStrip() {
  return (
    <section className="relative z-20 -mt-[52px] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <Card className="overflow-hidden rounded-[20px] border-0 bg-white shadow-2xl shadow-ghn-navy/10">
            <div className="grid grid-cols-1 divide-y divide-gray-100 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {trustItems.map((item, i) => {
                const colors = iconColors[item.color]
                return (
                  <div key={i} className="flex items-start gap-4 p-7">
                    <div
                      className={`group flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br transition-transform duration-300 hover:-rotate-[4deg] hover:scale-110 hover:-translate-y-1 ${colors.bg}`}
                    >
                      <item.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="font-heading text-[15px] font-bold text-ghn-navy">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}
