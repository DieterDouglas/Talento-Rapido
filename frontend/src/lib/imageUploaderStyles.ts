import { ImageUploaderShape } from '../enums/ImageUploaderShape'

export const IMAGE_UPLOADER_SHAPE_CLASSES: Record<ImageUploaderShape, string> = {
  [ImageUploaderShape.Circle]: 'rounded-full',
  [ImageUploaderShape.Square]: 'rounded-xl',
}
