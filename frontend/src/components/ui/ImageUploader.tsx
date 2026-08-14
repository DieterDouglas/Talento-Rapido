import { useRef, useState, type ChangeEvent } from 'react'
import { Camera } from 'lucide-react'
import { ImageUploaderShape } from '../../enums/ImageUploaderShape'
import { IMAGE_UPLOADER_SHAPE_CLASSES } from '../../lib/imageUploaderStyles'

type ImageUploaderProps = {
  value: string | null
  onFileSelected: (file: File) => void
  shape?: ImageUploaderShape
  size?: number
  isUploading?: boolean
}

export function ImageUploader({
  value,
  onFileSelected,
  shape = ImageUploaderShape.Square,
  size = 96,
  isUploading = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    setPreviewUrl(URL.createObjectURL(file))
    onFileSelected(file)
  }

  const displayUrl = previewUrl ?? value

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      disabled={isUploading}
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border-2 border-dashed border-primary-light bg-primary-light/40 text-primary transition-colors hover:border-primary disabled:opacity-70 ${IMAGE_UPLOADER_SHAPE_CLASSES[shape]}`}
      style={{ width: size, height: size }}
    >
      {displayUrl ? (
        <img src={displayUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        <Camera className="h-6 w-6" />
      )}

      {isUploading && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-medium text-white">
          Enviando...
        </span>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </button>
  )
}
