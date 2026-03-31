'use client'

import { useState } from 'react'
import { surveyGroups, SurveyGroup } from '@/lib/survey-data'
import { SurveyCard } from '@/components/SurveyCard'
import { SurveyModal } from '@/components/SurveyModal'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Truck, Users } from 'lucide-react'

function GroupDivider({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <div className="my-10 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
      <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm">
        <Icon className="h-3.5 w-3.5 text-gray-400" />
        <span className="text-xs font-bold tracking-wide text-gray-500 uppercase">{label}</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
    </div>
  )
}

export function SurveyPortal() {
  const [selectedGroup, setSelectedGroup] = useState<SurveyGroup | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleSelect = (group: SurveyGroup) => {
    setSelectedGroup(group)
    setModalOpen(true)
  }

  const operations = surveyGroups.filter((g) => g.category === 'operations')
  const office = surveyGroups.filter((g) => g.category === 'office')

  return (
    <section id="survey-portal" className="bg-white py-16 px-4 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-4 flex justify-center">
            <span className="rounded-full bg-ghn-o1/10 px-4 py-1.5 text-xs font-bold tracking-[4px] text-ghn-o1 uppercase">
              Chọn đúng nhóm của bạn
            </span>
          </div>
          <h2 className="text-center font-heading text-[clamp(2rem,5vw,3rem)] font-black leading-tight text-ghn-navy">
            Cổng Khảo Sát{' '}
            <span className="text-gradient-orange">EES RACE 2026</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[580px] text-center text-[15px] leading-relaxed text-gray-500">
            Chọn đúng nhóm công việc để đảm bảo bạn nhận được bộ câu hỏi phù hợp nhất.
            Mỗi nhóm có link riêng biệt — ẩn danh hoàn toàn.
          </p>
        </ScrollReveal>

        {/* Operations group */}
        <GroupDivider label="Khối Vận Hành & Tuyến Đầu" icon={Truck} />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {operations.map((group, i) => (
            <SurveyCard key={group.id} group={group} onSelect={handleSelect} index={i} />
          ))}
        </div>

        {/* Office group */}
        <GroupDivider label="Khối Văn Phòng & Quản Lý" icon={Users} />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {office.map((group, i) => (
            <SurveyCard key={group.id} group={group} onSelect={handleSelect} index={i} />
          ))}
        </div>
      </div>

      <SurveyModal open={modalOpen} onOpenChange={setModalOpen} group={selectedGroup} />
    </section>
  )
}
