import { useState } from 'react'
import { BaseModal } from '@/shared/ui'
import { SkillsForm } from '@/widgets/skills-form'
import { BaseTable } from '@/shared/ui'
import { useGetSkillsQuery } from '@/shared/api/graphql/generated'

const headers = [
  { value: 'name', label: 'Name' },
  { value: 'type', label: 'Type' },
  { value: 'category', label: 'Category' },
]

export const SkillsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: skillsData } = useGetSkillsQuery()
  const tableData =
    skillsData?.skills?.map((skill) => ({
      id: skill.id,
      name: skill.name,
      type: skill.category?.name || '-',
      category: skill.category?.name || '-',
    })) || []

  return (
    <>
      <BaseTable data={tableData} headers={headers} />
      <div>
        {/* <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Create skill
        </Button> */}

        <BaseModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add skill"
        >
          <SkillsForm
            onClose={() => setIsModalOpen(false)}
            onSubmit={() => {}}
          />
        </BaseModal>
      </div>
    </>
  )
}
