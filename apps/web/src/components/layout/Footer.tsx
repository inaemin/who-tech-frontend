import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface-alt py-6 mt-auto">
      <div
        className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6"
        style={{ maxWidth: 'var(--container-max, 1200px)' }}
      >
        <p className="text-[12px] text-text-muted">&copy; {new Date().getFullYear()} who.tech. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="text-[12px] font-semibold text-text hover:underline">
            개인정보처리방침
          </Link>
          <a
            href="https://github.com/iftype/who-tech-course"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-text-secondary hover:text-text"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
