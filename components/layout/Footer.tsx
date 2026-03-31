export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ghn-navy border-t-[5px] border-ghn-o1">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white p-2 shadow-md">
            <img
              src="https://res.cloudinary.com/dtjghirnn/image/upload/v1774863548/LOGO_CHUAN_onyfcy.png"
              alt="GHN Logo"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-sm font-black text-white">Giao Hàng Nhanh</span>
            <span className="text-[10px] font-semibold tracking-widest text-white/50 uppercase">
              EES RACE 2026
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-white/40 sm:text-right">
          <p>© 2026 Giao Hàng Nhanh — Phòng Trải Nghiệm Nhân Viên (EX Team)</p>
          <p className="mt-1 text-white/25">
            Dữ liệu khảo sát được bảo mật và không liên kết danh tính cá nhân
          </p>
        </div>
      </div>

      {/* Animated gradient bar at bottom */}
      <div className="h-1 w-full animate-gradientFlow bg-gradient-to-r from-ghn-o1 via-ghn-o3 to-ghn-b3 bg-[length:200%_100%]" />
    </footer>
  )
}
