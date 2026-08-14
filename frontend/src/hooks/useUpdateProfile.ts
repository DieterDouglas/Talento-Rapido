import { useMutation } from '@tanstack/react-query'
import { updateProfile } from '../lib/profileService'

export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
  })
}
