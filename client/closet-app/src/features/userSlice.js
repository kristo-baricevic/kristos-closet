import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isAuthenticated: false,
};

const backendBaseUrl = 'https://closet-app-backend.fly.dev';

const socket = new WebSocket('ws://closet-app-backend.fly.dev');


// Async thunk action to register user
export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userData) => {
        try {
        console.log("userData about to post");
        const response = await axios.post(
            `${backendBaseUrl}/api/register`,
            userData
        );
        console.log("userData posted");

        if (response.status === 201) {
            return response.data;
        }
        } catch (error) {
        throw error;
        }
    }
);

// Async thunk action to log in user
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userData) => {
      try {
        const response = await axios.post(
          `${backendBaseUrl}/api/upload`,
          userData
        );
  
        if (response.status === 200) {
          const user = response.data.user;
          const token = response.data.token;
  
          // Set the token in client storage
          localStorage.setItem("token", token);
  
          return user;
        }
      } catch (error) {
        throw error;
      }
    }
);

// Create an async thunk for loginAnonymous
export const loginAnonymous = createAsyncThunk(
    "user/loginAnonymous",
    async () => {
      try {
        console.log("inside loginAnonymous");

        // Send a login request to the server via WebSocket
        const loginMessage = JSON.stringify({
          type: 'login',
          data: {
            anonymous: true,
          },
        });
        
        socket.send(loginMessage);

        // Return a promise that resolves when the response is received
        return new Promise((resolve, reject) => {
          const responseHandler = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'loginResponse') {
              const isAuthenticated = data.isAuthenticated;
              const user = data.user;
              const token = data.token;

              localStorage.setItem('token', token);

              // Resolve the promise with the received data
              resolve({ isAuthenticated, user });
            }
          };
          // Attach the response handler to the WebSocket
          socket.addEventListener('message', responseHandler);
        });
      } catch (error) {
        throw error;
      }
    }
  );

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setAuthentication: (state, action) => {
            state.isAuthenticated = action.payload;
          },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearAuthentication: (state) => {
            state.isAuthenticated = false;
            state.user = null;        
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                // Handle login failure if needed
            })
            .addCase(loginAnonymous.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload.isAuthenticated;
                state.user = action.payload.user;
            })
            .addCase(loginAnonymous.rejected, (state, action) => {
                // Handle the error case here if needed
            });
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const userIsAuthenticated = (state) => state.user.isAuthenticated;

export const userSliceReducer = userSlice.reducer;

