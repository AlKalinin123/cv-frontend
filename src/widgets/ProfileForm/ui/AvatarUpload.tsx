import { Avatar, ButtonBase, Box, Typography } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import React from 'react'

export function AvatarUpload() {
  const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(
    undefined,
  )

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader()
      reader.onload = () => {
        setAvatarSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Box sx={{ p: 2, display: 'flex' }}>
      <ButtonBase
        component="label"
        role={undefined}
        tabIndex={-1}
        aria-label="Avatar image"
        sx={{
          borderRadius: '40px',
          '&:has(:focus-visible)': {
            outline: '2px solid',
            outlineOffset: '2px',
          },
        }}
      >
        <Avatar alt="Upload new avatar" src={avatarSrc} />
        <input
          type="file"
          accept="image/*"
          style={{
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: '1px',
            margin: '-1px',
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            whiteSpace: 'nowrap',
            width: '1px',
          }}
          onChange={handleAvatarChange}
        />
      </ButtonBase>
      <Box sx={{ ml: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FileUploadIcon />
          <Typography variant="body2">Upload avatar image</Typography>
        </Box>
        <Typography variant="caption">
          png, jpg or gif no more than 0.5MB
        </Typography>
      </Box>
    </Box>
  )
}
