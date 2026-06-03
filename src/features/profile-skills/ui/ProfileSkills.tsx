import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material'
import { useState } from 'react'
import { BaseModal } from '@/shared/ui'
import { SkillsForm } from '@/widgets/skills-form'
import { useParams } from 'react-router'
import {
  Mastery,
  useAddProfileSkillMutation,
  useGetProfileQuery,
  useGetSkillCategoriesQuery,
  useUpdateProfileSkillMutation,
} from '@/shared/api/graphql/generated'
import toast from 'react-hot-toast'

interface ProfileSkillsByCategory {
  name: string
  mastery: string
}
const masteryToValue = {
  [Mastery.Novice]: 20,
  [Mastery.Competent]: 40,
  [Mastery.Advanced]: 60,
  [Mastery.Proficient]: 80,
  [Mastery.Expert]: 100,
}

export const ProfileSkills = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedSkillName, setSelectedSkillName] = useState<string>('')
  const [selectedMasteryId, setSelectedMasteryId] = useState<string>('')
  const { userId } = useParams<{ userId: string }>()
  const { data: profileData } = useGetProfileQuery({ userId: userId ?? '' })
  const { data: skillsCategoryData } = useGetSkillCategoriesQuery()
  const [addProfileSkill] = useAddProfileSkillMutation()
  const [updateProfileSkill] = useUpdateProfileSkillMutation()

  const profile = profileData?.profile
  const profileSkillsByCategory = profile?.skills?.reduce(
    (acc, skill) => {
      const category = skillsCategoryData?.skillCategories.find(
        (skillItem) => skillItem.id === skill.categoryId,
      )?.name

      if (!category) {
        return acc
      }

      if (!acc[category]) {
        acc[category] = []
      }

      acc[category].push({
        name: skill.name,
        mastery: skill.mastery,
      })
      return acc
    },
    {} as Record<string, ProfileSkillsByCategory[]>,
  )

  const addProfileSkillHandler = (data: {
    skillName: string
    masteryId: string
  }) => {
    const categoryId = profile?.skills?.find(
      (skill) => skill.name === data.skillName,
    )?.categoryId
    const skillAlreadyExists = profile?.skills?.some(
      (skill) => skill.name === data.skillName,
    )
    if (skillAlreadyExists) {
      toast.error('Skill already exists')
      return
    } else {
      addProfileSkill({
        input: {
          userId: userId ?? '',
          name: data.skillName,
          mastery: data.masteryId as Mastery,
          categoryId: categoryId ?? '',
        },
      })
    }
  }

  const updateProfileSkillHandler = (data: {
    skillName: string
    masteryId: string
  }) => {
    const categoryId = profile?.skills?.find(
      (skill) => skill.name === data.skillName,
    )?.categoryId

    updateProfileSkill({
      input: {
        userId: userId ?? '',
        name: data.skillName,
        mastery: data.masteryId as Mastery,
        categoryId: categoryId ?? '',
      },
    })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {profileSkillsByCategory &&
        Object.keys(profileSkillsByCategory).length > 0 && (
          <Grid container spacing={4} component="section">
            <BaseModal
              open={isUpdateModalOpen}
              onClose={() => setIsUpdateModalOpen(false)}
              title="Update skill"
            >
              <SkillsForm
                onClose={() => setIsUpdateModalOpen(false)}
                onSubmit={updateProfileSkillHandler}
                profileSkills={profile?.skills || []}
                action="edit"
                selectedSkillName={selectedSkillName}
                selectedMasteryId={selectedMasteryId}
              />
            </BaseModal>
            {Object.entries(profileSkillsByCategory || {}).map(
              ([category, skills]) => (
                <Grid size={{ xs: 12 }} key={category}>
                  <Typography variant="h6" sx={{ fontSize: '16px' }}>
                    {category}
                  </Typography>

                  <Grid container spacing={2}>
                    {skills.map((skill) => (
                      <Grid
                        key={skill.name}
                        size={{
                          xs: 6,
                          md: 6,
                          lg: 3,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            gap: 8,
                            alignItems: 'center',
                          }}
                          onClick={() => {
                            setSelectedSkillName(skill.name)
                            setSelectedMasteryId(skill.mastery)
                            setIsUpdateModalOpen(true)
                          }}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={
                              masteryToValue[
                                skill.mastery as keyof typeof masteryToValue
                              ]
                            }
                            sx={{
                              width: '200px',
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: 'warning.light', // remaining 80%
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: 'error.main', // filled 20%
                              },
                            }}
                          />
                          <span style={{ fontSize: '14px' }}>{skill.name}</span>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ),
            )}
          </Grid>
        )}
      {profileSkillsByCategory &&
        Object.keys(profileSkillsByCategory).length === 0 && (
          <Typography variant="body1">No skills found</Typography>
        )}

      <Box
        component="div"
        sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}
      >
        <Box>
          <Button variant="contained" onClick={() => setIsAddModalOpen(true)}>
            Add skill
          </Button>

          <BaseModal
            open={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            title="Add skill"
          >
            <SkillsForm
              onClose={() => setIsAddModalOpen(false)}
              onSubmit={addProfileSkillHandler}
              profileSkills={profile?.skills || []}
              action="add"
            />
          </BaseModal>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={
              profileSkillsByCategory &&
              Object.keys(profileSkillsByCategory).length === 0
            }
          >
            Remove skills
          </Button>

          <BaseModal
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Remove skills"
          >
            Remove skills
          </BaseModal>
        </Box>
      </Box>
    </Box>
  )
}
