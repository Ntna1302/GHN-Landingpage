export type SurveyGroup = {
  id: string
  badge: string
  icon: string
  title: string
  description: string
  theme: 'orange' | 'blue'
  category: 'operations' | 'office'
  link: string
}

export const surveyGroups: SurveyGroup[] = [
  {
    id: '1A',
    badge: 'Nhóm 1A',
    icon: 'Bike',
    title: 'Shipper / Giao Nhận',
    description: 'Dành cho NVPTTT Tuyến, NVGN Giao Hàng Nặng (Freight).',
    theme: 'orange',
    category: 'operations',
    link: 'https://forms.google.com/example-1A',
  },
  {
    id: '1B',
    badge: 'Nhóm 1B',
    icon: 'Truck',
    title: 'Tài xế Vận tải',
    description: 'Dành riêng cho Tài xế xe tải chạy tuyến GXT & TXXT.',
    theme: 'orange',
    category: 'operations',
    link: 'https://forms.google.com/example-1B',
  },
  {
    id: '2A',
    badge: 'Nhóm 2A',
    icon: 'PackageCheck',
    title: 'Vận hành Kho & Bưu cục',
    description: 'Dành cho NV Xử lý (Vùng), NV Phân Hàng, Admin Kho.',
    theme: 'orange',
    category: 'operations',
    link: 'https://forms.google.com/example-2A',
  },
  {
    id: '2B',
    badge: 'Nhóm 2B',
    icon: 'ShieldCheck',
    title: 'Quản lý Tuyến đầu',
    description: 'AM/OM, Supervisor, TBC, Ops Team Leader.',
    theme: 'blue',
    category: 'office',
    link: 'https://forms.google.com/examp le-2B',
  },
  {
    id: '3A',
    badge: 'Nhóm 3A',
    icon: 'LaptopMinimal',
    title: 'Nhân viên Văn phòng',
    description: 'Dành cho chuyên viên, nhân viên khối Indirect HO.',
    theme: 'blue',
    category: 'office',
    link: 'https://forms.gle/t7L2U8E2pQULDngg7',
  },
  {
    id: '3B',
    badge: 'Nhóm 3B',
    icon: 'UserCog',
    title: 'Cấp Quản trị (Mid/Senior)',
    description: 'Dành cho cấp Manager & Director tại HO.',
    theme: 'blue',
    category: 'office',
    link: 'https://forms.google.com/example-3B',
  },
]
