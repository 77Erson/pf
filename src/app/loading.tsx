export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="font-display text-4xl font-bold tracking-tight animate-pulse">
          <span className="text-accent">E</span>RSON
        </div>
        {/* Loading indicator */}
        <div className="mt-6 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
