import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/Auth.slice'
import chatReducer from './slices/Chat.slice'
import socketReducer from './slices/Socket.slice'
import conversationReducer from './slices/Conversation.slice'
// ...
const persistConfig = {
    key: 'auth',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        conversation: conversationReducer,
        chat: chatReducer,
        socket: socketReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


