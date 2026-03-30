const items = [
  'Ẩn danh 100%',
  '25 câu hỏi',
  '8-10 phút',
  '6 luồng khảo sát',
  'Action Plan Q3',
  'Cam kết từ C-Level',
  'Nói lên · Lắng nghe · Thay đổi',
  'EES RACE 2026',
]

const doubled = [...items, ...items]

export function MarqueeStrip() {
  return (
    <div className="hidden overflow-hidden md:block">
      <div className="animate-gradientFlow bg-[length:200%_100%] bg-gradient-to-r from-ghn-o1 via-ghn-o3 to-ghn-b3 py-3.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="flex items-center font-heading text-[13px] font-extrabold tracking-[3px] text-white uppercase"
            >
              {item}
              <span className="mx-5 opacity-50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
