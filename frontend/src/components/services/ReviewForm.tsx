import { useState, type FormEvent } from 'react'
import { Button } from '../ui/Button'
import { ImageUploader } from '../ui/ImageUploader'
import { Select } from '../ui/Select'
import { TextArea } from '../ui/TextArea'
import { ButtonVariant } from '../../enums/ButtonVariant'
import { ImageUploaderShape } from '../../enums/ImageUploaderShape'
import { useCreateReview } from '../../hooks/useCreateReview'

const RATING_OPTIONS = [
  { value: '5', label: '5 estrelas' },
  { value: '4', label: '4 estrelas' },
  { value: '3', label: '3 estrelas' },
  { value: '2', label: '2 estrelas' },
  { value: '1', label: '1 estrela' },
]

type ReviewFormProps = {
  serviceId: number
  serviceRequestId: number
  onSuccess: () => void
}

export function ReviewForm({ serviceId, serviceRequestId, onSuccess }: ReviewFormProps) {
  const createReview = useCreateReview(serviceId)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    await createReview.mutateAsync({ serviceRequestId, rating, comment, image })
    onSuccess()
  }

  function handleImageSelected(file: File) {
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-primary-light bg-surface p-5">
      <h3 className="font-bold text-text">Deixe sua avaliação</h3>

      <div className="flex items-center gap-4">
        <ImageUploader
          value={imagePreview}
          onFileSelected={handleImageSelected}
          shape={ImageUploaderShape.Square}
          size={72}
        />

        <div className="flex-1">
          <Select
            value={String(rating)}
            onChange={(event) => setRating(Number(event.target.value))}
            options={RATING_OPTIONS}
          />
        </div>
      </div>

      <TextArea
        id="comment"
        label="Comentário"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Conte como foi sua experiência (opcional)"
        rows={3}
      />

      {createReview.isError && (
        <p className="text-sm text-red-600">Não foi possível enviar sua avaliação. Tente novamente.</p>
      )}

      <Button type="submit" variant={ButtonVariant.Primary} disabled={createReview.isPending}>
        {createReview.isPending ? 'Enviando...' : 'Enviar avaliação'}
      </Button>
    </form>
  )
}
