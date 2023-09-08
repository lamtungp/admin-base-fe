import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PlaceholderPropsType = {
  clientHeight?: number;
  clientWidth?: number;
  clientY?: number;
  clientX?: number;
};

interface BuilderState {
  placeholderProps: PlaceholderPropsType;
}

const initialState: BuilderState = { placeholderProps: {} };

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setPlaceholderProps(state, action) {
      state.placeholderProps = action.payload;
    },
  },
});

export const { setPlaceholderProps } = builderSlice.actions;

export default builderSlice.reducer;
