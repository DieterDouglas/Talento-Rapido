type AvatarProps = {
  src: string | null
  name: string
  size?: number
}

export function Avatar({ src, name, size = 32 }: AvatarProps) {
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-light text-sm font-semibold text-primary"
      style={{ width: size, height: size }}
    >
      {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : name.charAt(0).toUpperCase()}
    </div>
  )
}
