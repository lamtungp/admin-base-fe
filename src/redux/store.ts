import { configureStore } from '@reduxjs/toolkit';

import builderReducer from './builder/builder.slice';

export const store = configureStore({
  reducer: { builder: builderReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
