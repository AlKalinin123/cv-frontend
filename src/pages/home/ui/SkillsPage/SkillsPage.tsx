import { useState } from 'react'
import { Button } from '@mui/material'
import { BaseModal } from '@/shared/ui'

export const SkillsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Edit Profile
      </Button>

      <BaseModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create skill"
      >
        Modal content
      </BaseModal>
    </div>
  )
}
