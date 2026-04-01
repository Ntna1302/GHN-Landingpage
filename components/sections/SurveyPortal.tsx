'use client'

import { useState, useEffect } from 'react'
import { surveyGroups, SurveyGroup } from '@/lib/survey-data'
import { SurveyCard } from '@/components/SurveyCard'
import { SurveyModal } from '@/components/SurveyModal'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Truck, Users, Star, LayoutGrid } from 'lucide-react'

/* ── Section divider ────────────────────────────────────── */
function GroupDivider({
  label,
  icon: Icon,
  id,
}: {
  label: string
  icon: React.ElementType
  id?: string
}) {
  return (
    <div id={id} className="my-10 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
      <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm">
        <Icon className="h-3.5 w-3.5 text-gray-400" />
        <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
    </div>
  )
}


/* ── SurveyPortal ───────────────────────────────────────── */
export function SurveyPortal() {
  const [selectedGroup, setSelectedGroup] = useState<SurveyGroup | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [userGroups, setUserGroups] = useState<string[] | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('ees_role_groups')
    if (stored) {
      setUserGroups(stored.split(',').map((g) => g.trim()))
    }
  }, [])

  // Re-read sessionStorage immediately when RoleGate completes (same render cycle)
  useEffect(() => {
    const handler = () => {
      const stored = sessionStorage.getItem('ees_role_groups')
      if (stored) setUserGroups(stored.split(',').map((g) => g.trim()))
    }
    window.addEventListener('ees_role_selected', handler)
    return () => window.removeEventListener('ees_role_selected', handler)
  }, [])

const handleSelect = (group: SurveyGroup) => {
    setSelectedGroup(group)
    setModalOpen(true)
  }

  // No role stored — render original layout
  if (!userGroups) {
    const operations = surveyGroups.filter((g) => g.category === 'operations')
    const office = surveyGroups.filter((g) => g.category === 'office')

    return (
      <section id="survey-portal" className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader />

          <GroupDivider label="Khối Vận Hành & Tuyến Đầu" icon={Truck} />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {operations.map((group, i) => (
              <SurveyCard key={group.id} group={group} onSelect={handleSelect} index={i} />
            ))}
          </div>

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

  // Role stored — show personalised layout
  const matched = surveyGroups.filter((g) => userGroups.includes(g.id))
  const unmatched = surveyGroups.filter((g) => !userGroups.includes(g.id))

  return (
    <section id="survey-portal" className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader />

        {/* Matched cards — user's groups */}
        <GroupDivider label="Khảo sát dành cho bạn" icon={Star} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {matched.map((group, i) => (
            <SurveyCard
              key={group.id}
              group={group}
              onSelect={handleSelect}
              index={i}
              isHighlighted
            />
          ))}
        </div>

        {/* Unmatched cards */}
        {unmatched.length > 0 && (
          <>
            <GroupDivider label="Các nhóm khác" icon={LayoutGrid} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {unmatched.map((group, i) => (
                <SurveyCard
                  key={group.id}
                  group={group}
                  onSelect={handleSelect}
                  index={i}
                  isMuted
                />
              ))}
            </div>
          </>
        )}
      </div>

      <SurveyModal open={modalOpen} onOpenChange={setModalOpen} group={selectedGroup} />
    </section>
  )
}

/* ── Shared section header ──────────────────────────────── */
function SectionHeader() {
  return (
    <ScrollReveal>
      <div className="mb-4 flex justify-center">
        <span className="rounded-full bg-ghn-o1/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[4px] text-ghn-o1">
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
  )
}
