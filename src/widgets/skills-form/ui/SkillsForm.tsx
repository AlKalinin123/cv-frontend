import { Grid, CircularProgress, Stack, Button, Box } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { BaseSelect } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Mastery,
  useGetSkillsQuery,
  type SkillMastery,
} from '@/shared/api/graphql/generated'
import toast from 'react-hot-toast'

interface SkillsFormProps {
  onClose: () => void
  onSubmit: (data: { skillName: string; masteryId: string }) => void
  profileSkills?: SkillMastery[]
  action?: 'add' | 'edit'
  selectedSkillName?: string
  selectedMasteryId?: string
}

const skillsSchema = z.object({
  skillName: z.string().min(1, 'Skill is required'),
  masteryId: z.string().min(1, 'Mastery is required'),
})

export const SkillsForm = ({
  onClose,
  onSubmit,
  profileSkills,
  action,
  selectedSkillName,
  selectedMasteryId,
}: SkillsFormProps) => {
  const initialValues = {
    skillName: action === 'edit' ? selectedSkillName || '' : '',
    masteryId: action === 'edit' ? selectedMasteryId || '' : '',
  }

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(skillsSchema),
    values: initialValues,
  })

  const { data: skillsData, isLoading: isSkillsLoading } = useGetSkillsQuery()
  const skills = skillsData?.skills || []
  const masteries: { id: string; name: string }[] = Object.values(Mastery).map(
    (mastery) => ({
      id: mastery,
      name: mastery,
    }),
  )

  const onFormSubmit = handleSubmit((data) => {
    if (action === 'add') {
      const skillExists = profileSkills?.some(
        (skill) => skill.name === data.skillName,
      )
      if (skillExists) {
        toast.error('Skill already exists')
        return
      } else {
        try {
          onSubmit(data)
          onClose()
          toast.success('Skill added successfully')
        } catch (error) {
          toast.error(`Failed to add skill: ${error}`)
        }
      }
    }

    if (action === 'edit') {
      try {
        onSubmit(data)
        onClose()
        toast.success('Skill updated successfully')
      } catch (error) {
        toast.error(`Failed to update skill: ${error}`)
      }
    }
  })

  return (
    <form onSubmit={onFormSubmit}>
      {isSkillsLoading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Controller
                name="skillName"
                control={control}
                render={({ field, fieldState }) => (
                  <BaseSelect
                    {...field}
                    label="Skill"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    value={field.value}
                    fullWidth
                    options={skills.map((skill) => ({
                      value: skill.name,
                      label: skill.name,
                    }))}
                    disabled={action === 'edit'}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <Controller
                name="masteryId"
                control={control}
                render={({ field, fieldState }) => (
                  <BaseSelect
                    {...field}
                    label="Mastery"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    value={field.value}
                    fullWidth
                    options={masteries.map((mastery) => ({
                      value: mastery.id,
                      label: mastery.name,
                    }))}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="outlined"
              onClick={onClose}
              sx={{ alignSelf: 'flex-end' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ alignSelf: 'flex-end' }}
            >
              {action === 'add' ? 'Add' : 'Confirm'}
            </Button>
          </Box>
        </Stack>
      )}
    </form>
  )
}
