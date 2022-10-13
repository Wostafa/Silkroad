import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './Store';

export type CurrentUserType = { displayName: string | null, uid: string } | null

interface UserState {
  current: CurrentUserType
}

const initialState: UserState = {
  current: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addCurrentUser: (state, action: PayloadAction<CurrentUserType>) => {
      state.current = action.payload
    }
  }
})

export const { addCurrentUser } = userSlice.actions;
export const selectUser = (state: RootState): CurrentUserType => state.user.current;
export default userSlice.reducer