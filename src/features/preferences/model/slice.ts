import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { preferencesStorage } from './storage'

interface PreferencesState {
  theme: string
  interfaceLang: string
  cvLang: string
}

const initialState: PreferencesState = {
  theme: preferencesStorage.getTheme(),
  interfaceLang: preferencesStorage.getInterfaceLang(),
  cvLang: preferencesStorage.getCvLang(),
}

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
      preferencesStorage.setTheme(action.payload)
    },
    setInterfaceLang: (state, action: PayloadAction<string>) => {
      state.interfaceLang = action.payload
      preferencesStorage.setInterfaceLang(action.payload)
    },
    setCvLang: (state, action: PayloadAction<string>) => {
      state.cvLang = action.payload
      preferencesStorage.setCvLang(action.payload)
    },
  },
})

export const { setTheme, setInterfaceLang, setCvLang } =
  preferencesSlice.actions
export const preferencesReducer = preferencesSlice.reducer
