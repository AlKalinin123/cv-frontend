import { Modal as MuiModal, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close' // Optional: if you want a close 'X' button
import React from 'react'

interface BaseModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode // Equates to the default slot
}

const modalStyles = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500, // You can make this a prop later (e.g., maxWidth)
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}

export const BaseModal = ({
  open,
  onClose,
  title,
  children,
}: BaseModalProps) => {
  return (
    <MuiModal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={modalStyles}>
        {title && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {/* Default Slot Content */}
        {children}
      </Box>
    </MuiModal>
  )
}
