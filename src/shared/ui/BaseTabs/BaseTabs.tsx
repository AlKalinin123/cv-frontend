import { useState, type SyntheticEvent, type ReactNode } from 'react'
import { Tabs, Tab, Box } from '@mui/material'

export type TabItem = {
  label: string
  content: ReactNode
}

type BaseTabsProps = {
  tabs: TabItem[]
  defaultTab?: number
}

export const BaseTabs = ({ tabs, defaultTab = 0 }: BaseTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      <Box sx={{ mt: 3 }}>{tabs[activeTab]?.content}</Box>
    </Box>
  )
}
