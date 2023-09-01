import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isAuthenticated: false,
};

// Async thunk action to register user
export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userData) => {
        try {
        console.log("userData about to post");
        const response = await axios.post(
            `https://kristobaricevic.com/api/register`,
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
          `https://kristobaricevic.com/api/login`,
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
      const response = await axios.post('https://kristobaricevic.com/api/loginAnonymous');
      console.log("this is a", response.data.message);
      const isAuthenticated = response.data.isAuthenticated;
      console.log("response", isAuthenticated);
      const user = response.data.user;
      const token = response.data.token;
  
      localStorage.setItem('token', token);
  
      return { isAuthenticated, user };
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

