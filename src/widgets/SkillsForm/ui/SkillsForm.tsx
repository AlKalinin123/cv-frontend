import { Grid, CircularProgress, Stack, Button } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { BaseSelect } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mastery, useGetSkillsQuery } from '@/shared/api/graphql/generated'

const skillsSchema = z.object({
  skillId: z.string().min(1, 'Skill is required'),
  masteryId: z.string().min(1, 'Mastery is required'),
})

export const SkillsForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skillId: '',
      masteryId: '',
    },
  })

  const { data: skillsData, isLoading: isSkillsLoading } = useGetSkillsQuery()
  const skills = skillsData?.skills || []
  const masteries: { id: string; name: string }[] = Object.values(Mastery).map(
    (mastery) => ({
      id: mastery,
      name: mastery,
    }),
  )

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <form onSubmit={onSubmit}>
      {isSkillsLoading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Controller
                name="skillId"
                control={control}
                render={({ field, fieldState }) => (
                  <BaseSelect
                    {...field}
                    label="Skill"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    value={field.value || skills[0]?.id}
                    fullWidth
                    options={skills.map((skill) => ({
                      value: skill.id,
                      label: skill.name,
                    }))}
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
                    value={field.value || masteries[0]?.id}
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
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: 'flex-end' }}
          >
            Add
          </Button>
        </Stack>
      )}
    </form>
  )
}
