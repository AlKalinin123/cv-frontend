import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseModal } from '@/shared/ui'
import { SkillsForm } from '@/widgets/skills-form'
import { BaseTable } from '@/shared/ui'
import { useGetSkillsQuery } from '@/shared/api/graphql/generated'

export const SkillsPage = () => {
  const { t } = useTranslation('common')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: skillsData } = useGetSkillsQuery()

  const headers = [
    { value: 'name', label: t('skills.name') },
    { value: 'type', label: t('skills.type') },
    { value: 'category', label: t('skills.category') },
  ]

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
        <BaseModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={t('skills.addSkill')}
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
