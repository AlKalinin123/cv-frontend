import { Avatar, ButtonBase, Box, Typography } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { useMemo, useEffect, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

interface AvatarUploadProps {
  value?: File | null
  onChange?: (file: File | null) => void
  error?: boolean
  helperText?: string
}

export function AvatarUpload({
  value,
  onChange,
  error,
  helperText,
}: AvatarUploadProps) {
  const { t } = useTranslation('common')
  const preview = useMemo(() => {
    if (!value) return undefined
    return URL.createObjectURL(value)
  }, [value])

  useEffect(() => {
    if (!preview) return
    return () => URL.revokeObjectURL(preview)
  }, [preview])

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    onChange?.(file)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ButtonBase
        component="label"
        sx={{
          borderRadius: '40px',
          '&:has(:focus-visible)': {
            outline: '2px solid',
            outlineOffset: '2px',
          },
        }}
      >
        <Avatar
          alt={t('profile.uploadAvatar')}
          src={preview}
          sx={{ width: 96, height: 96 }}
        />

        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </ButtonBase>
      <Box sx={{ ml: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FileUploadIcon />
          <Typography variant="body2">{t('profile.uploadAvatar')}</Typography>
        </Box>
        <Typography variant="caption">
          {t('profile.uploadAvatarHint')}
        </Typography>
      </Box>
      {helperText && (
        <Typography
          variant="caption"
          color={error ? 'error' : 'text.secondary'}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  )
}
