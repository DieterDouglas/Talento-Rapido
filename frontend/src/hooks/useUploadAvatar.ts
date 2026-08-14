import { useMutation } from '@tanstack/react-query'
import { uploadAvatar } from '../lib/avatarService'

export function useUploadAvatar() {
  return useMutation({
    mutationFn: uploadAvatar,
  })
}
