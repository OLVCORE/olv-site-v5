interface Props {
  provider: 'google' | 'facebook' | 'linkedin';
  onClick: () => void;
}

// Inline SVGs (monochrome, inherit currentColor)
const Icons = {
  google: (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" fill="currentColor">
      <path d="M12 11v2.8h7.9c-.3 2-2.4 5.8-7.9 5.8-4.7 0-8.6-3.9-8.6-8.6s3.9-8.6 8.6-8.6c2.7 0 4.5 1.1 5.6 2.1l3.8-3.7C19.9 0.8 16.2 0 12 0 5.4 0 0 5.4 0 12s5.4 12 12 12c6.9 0 11.5-4.8 11.5-11.5 0-.8-.1-1.4-.2-2.1H12z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" fill="currentColor">
      <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24h11.494v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.314h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" fill="currentColor">
      <path d="M4.98 3.5C4.98 5 3.9 6 2.43 6h-.05C.99 6 0 5 0 3.5S1.09 1 2.57 1c1.41 0 2.41 1 2.41 2.5zM.26 8.48h4.9V24h-4.9V8.48zM8.7 8.48h4.7v2.11h.07c.66-1.25 2.27-2.56 4.67-2.56 5 0 5.93 3.29 5.93 7.56v8.41h-4.9v-7.45c0-1.78-.03-4.07-2.48-4.07-2.48 0-2.86 1.93-2.86 3.94V24H8.7V8.48z" />
    </svg>
  ),
};

const labels: Record<Props['provider'], string> = {
  google: 'Google',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
};

export default function SocialButton({ provider, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 w-full py-2 rounded border-2 border-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition text-[var(--color-on-surface-opposite)]"
    >
      {Icons[provider]}
      <span className="text-sm font-medium uppercase tracking-wide">
        {labels[provider]}
      </span>
    </button>
  );
} 