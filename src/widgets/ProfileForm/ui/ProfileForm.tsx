import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { AvatarUpload } from './AvatarUpload'
import { BaseInput } from '@/shared/ui'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@/shared/api/graphql/generated'
import { useEffect } from 'react'

interface ProfileFormProps {
  user: User | undefined
}

interface ProfileFormValues {
  avatar?: File | null
  firstName: string
  lastName: string
  department: string
  position: string
}

const profileSchema = z.object({
  avatar: z.any().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  department: z.string().nonempty('Department is required'),
  position: z.string().nonempty('Position is required'),
})

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const { control, handleSubmit, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      firstName: user?.profile.first_name || '',
      lastName: user?.profile.last_name || '',
      department: user?.department?.name || '',
      position: user?.position?.name || '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.profile.first_name || '',
        lastName: user.profile.last_name || '',
        department: user.department?.name || '',
        position: user.position?.name || '',
      })
    }
  }, [user, reset])

  const onSubmit = handleSubmit((data) => {
    // TODO: API call
    console.log(data)
  })
  return (
    <form onSubmit={onSubmit}>
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
              name="department"
              control={control}
              render={({ field, fieldState }) => (
                <BaseInput
                  {...field}
                  label="Department"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="position"
              control={control}
              render={({ field, fieldState }) => (
                <BaseInput
                  {...field}
                  label="Position"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
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
    </form>
  )
}
