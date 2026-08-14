export const ImageUploaderShape = {
  Circle: 'circle',
  Square: 'square',
} as const

export type ImageUploaderShape = (typeof ImageUploaderShape)[keyof typeof ImageUploaderShape]
