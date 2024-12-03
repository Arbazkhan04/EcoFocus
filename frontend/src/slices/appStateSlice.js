import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: JSON.parse(localStorage.getItem('company')) || null
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    
    setCompanyInStore: (state, action) => {
        state.company = action.payload;
        localStorage.setItem('company', JSON.stringify(action.payload)); // Persist in local storage
      },
    clearSelectionsFromStore: (state) => {
      state.company = null;
      localStorage.removeItem('company');
    },

  },
});

export const { clearSelectionsFromStore, setCompanyInStore } = appStateSlice.actions;

export default appStateSlice.reducer;
