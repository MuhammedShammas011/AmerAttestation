type IconProps = { className?: string };

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.6v2.3H8.3v2.8h2.4V21h2.8z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.94 8.5H4.05V19h2.9V8.5zM5.5 4.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM19.95 19h-2.9v-5.7c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8V19h-2.9s.04-9.5 0-10.5h2.9v1.5c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4V19z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.6a2.7 2.7 0 0 0-1.9-1.9C18 5.2 12 5.2 12 5.2s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.6 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.4 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.4zM10 15V9l5.2 3-5.2 3z" />
    </svg>
  );
}

export function PinterestIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-3.3 17.4c-.05-.7-.09-1.9.02-2.7.1-.7.7-4.5.7-4.5s-.2-.4-.2-1c0-.9.5-1.6 1.2-1.6.6 0 .8.4.8 1 0 .6-.4 1.5-.6 2.4-.2.7.4 1.3 1.1 1.3 1.3 0 2.2-1.7 2.2-3.6 0-1.5-1-2.6-2.8-2.6-2 0-3.3 1.5-3.3 3.2 0 .6.2 1 .4 1.3.1.1.1.2.1.4l-.2.8c0 .1-.1.2-.3.1-1-.4-1.5-1.6-1.5-2.9 0-2.1 1.8-4.7 5.3-4.7 2.8 0 4.7 2 4.7 4.2 0 2.9-1.6 5-3.9 5-.8 0-1.5-.4-1.8-.9l-.5 1.9c-.2.7-.6 1.5-.9 2.1A9 9 0 1 0 12 3z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4 4l7.2 8.9L4.4 20h2l6-6.6L17 20h3l-7.5-9.3L19.5 4h-2l-5.6 6.1L8.6 4H4z" />
    </svg>
  );
}
