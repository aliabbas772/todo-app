import { createSlice } from "@reduxjs/toolkit";

interface TodoState {
  isDark: 'light' | 'dark';
}

const initialState: TodoState = {
  isDark: 'light',
};

const themeSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        toggleTheme: (state) => {
        state.isDark = state.isDark === 'light' ? 'dark' : 'light';
        },
    },
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;