import { useState } from 'react'
import { Button } from '@mui/material'
import { BaseModal } from '@/shared/ui'
import { SkillsForm } from '@/widgets/SkillsForm'

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
        title="Add skill"
      >
        <SkillsForm />
      </BaseModal>
    </div>
  )
}
