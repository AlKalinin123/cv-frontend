import { useEffect } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseInput, BaseSelect } from '@/shared/ui'
import type { User } from '@/shared/api/graphql/generated'
import {
  useGetDepartmentsQuery,
  useGetPositionsQuery,
  useUpdateUserMutation,
} from '@/shared/api/graphql/generated'
import { AvatarUpload } from './AvatarUpload'

interface ProfileFormProps {
  user: User | undefined
}

interface ProfileFormValues {
  avatar?: File | null
  firstName: string
  lastName: string
  departmentId: string
  positionId: string
}

const profileSchema = z.object({
  avatar: z.any().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  departmentId: z.string().min(1, 'Department is required'),
  positionId: z.string().min(1, 'Position is required'),
})

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const { control, handleSubmit, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.profile.first_name || '',
      lastName: user?.profile.last_name || '',
      departmentId: user?.department?.id || '',
      positionId: user?.position?.id || '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.profile.first_name || '',
        lastName: user.profile.last_name || '',
        departmentId: user.department?.id || '',
        positionId: user.position?.id || '',
      })
    }
  }, [user, reset])

  const { data: departmentsData, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery()
  const { data: positionsData, isLoading: isPositionsLoading } =
    useGetPositionsQuery()
  const [updateUser] = useUpdateUserMutation()

  const departments = departmentsData?.departments || []
  const positions = positionsData?.positions || []

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateUser({
        input: {
          userId: user?.id || '',
          departmentId: data.departmentId,
          positionId: data.positionId,
          role: user?.role,
          cvsIds: user?.cvs?.map((cv) => cv.id) || [],
        },
      })
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error(error)
      toast.error((error as Error).name)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      {isDepartmentsLoading || isPositionsLoading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2} sx={{ width: 700 }}>
          <Controller
            name="avatar"
            control={control}
            render={({ field, fieldState }) => (
              <AvatarUpload
                {...field}
                onChange={field.onChange}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            {user?.profile.first_name && user?.profile.last_name && (
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {user?.profile.first_name} {user?.profile.last_name}
              </Typography>
            )}
            <Typography variant="body2">{user?.email}</Typography>
            <Typography variant="body2">
              A member since{' '}
              {user?.created_at
                ? new Date(Number(user.created_at)).toDateString()
                : ''}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <BaseInput
                    {...field}
                    label="First Name"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <BaseInput
                    {...field}
                    label="Last Name"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="departmentId"
                control={control}
                render={({ field, fieldState }) => (
                  <BaseSelect
                    {...field}
                    label="Department"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    value={field.value || ''}
                    fullWidth
                    options={departments.map((department) => ({
                      value: department.id,
                      label: department.name,
                    }))}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="positionId"
                control={control}
                render={({ field, fieldState }) => (
                  <BaseSelect
                    {...field}
                    label="Position"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    value={field.value || ''}
                    fullWidth
                    options={positions.map((position) => ({
                      value: position.id,
                      label: position.name,
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
            Update
          </Button>
        </Stack>
      )}
    </form>
  )
}
