import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const demoProfileSchema = z.object({
  displayName: z.string().min(1),
})

type DemoProfileForm = z.infer<typeof demoProfileSchema>

export function HomePage() {
  const { t } = useTranslation('common')
  const [saved, setSaved] = useState(false)
  const shouldSkipPing = !import.meta.env.VITE_GRAPHQL_URL

  const form = useForm<DemoProfileForm>({
    resolver: zodResolver(demoProfileSchema),
    defaultValues: { displayName: '' },
  })

  return (
    <Box sx={{ p: 3, maxWidth: 480 }}>
      <Stack spacing={2}>
        <Typography variant="h4" component="h1">
          {t('home.heading')}
        </Typography>
        <Typography color="text.secondary">{t('home.subtitle')}</Typography>

        {shouldSkipPing && (
          <Alert severity="warning">
            Set <code>VITE_GRAPHQL_URL</code> to enable the sample GraphQL
            query.
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={form.handleSubmit(() => setSaved(true))}
        >
          <Stack spacing={2}>
            <TextField
              label={t('home.demoForm.nameLabel')}
              error={Boolean(form.formState.errors.displayName)}
              helperText={form.formState.errors.displayName?.message}
              {...form.register('displayName')}
            />
            <Button type="submit" variant="contained">
              {t('home.demoForm.submit')}
            </Button>
          </Stack>
        </Box>

        {saved && <Alert severity="success">{t('home.demoForm.saved')}</Alert>}
      </Stack>
    </Box>
  )
}
