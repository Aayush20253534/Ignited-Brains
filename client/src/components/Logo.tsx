export default function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#FF6B00" />
        <path d="M12 20C12 15.582 15.582 12 20 12C24.418 12 28 15.582 28 20C28 22.206 27.015 24.16 25.485 25.538C25.264 25.73 25.092 26.011 25 26.33L24.5 28H15.5L15 26.33C14.908 26.011 14.736 25.73 14.515 25.538C12.985 24.16 12 22.206 12 20Z" fill="white"/>
        <circle cx="17" cy="19" r="1.6" fill="#FF6B00"/>
        <circle cx="23" cy="19" r="1.6" fill="#FF6B00"/>
        <path d="M16.5 23C17.33 23.81 18.6 24.3 20 24.3C21.4 24.3 22.67 23.81 23.5 23" stroke="#FF6B00" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
      <div className="leading-none">
        <div className="font-display text-lg font-extrabold text-slate-900">
          <span className="text-brand-orange">ign</span>ited
        </div>
        <div className="-mt-1 text-[10px] font-bold tracking-[0.2em] text-slate-500">
          B R A I N S <span className="text-brand-orange">.COM</span>
        </div>
      </div>
    </a>
  );
}
