// api/backend.js

const express = require('express');
const axios = require('axios'); 
const app = express();
const router = express.Router();

// Image routes
router.get('/images', async (req, res) => {
  try {
    const response = await axios.get('https://closet-app-backend.fly.dev/images');
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/images/:id', async (req, res) => {
  try {
    const response = await axios.put(`https://closet-app-backend.fly.dev/images/${req.params.id}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/images/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://closet-app-backend.fly.dev/images/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/images/:id', async (req, res) => {
  try {
    const response = await axios.delete(`https://closet-app-backend.fly.dev/images/${req.params.id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/upload', async (req, res) => {
  try {
    const response = await axios.post(`https://closet-app-backend.fly.dev/upload`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

router.post('/register', async (req, res) => {
  try {
    const response = await axios.post(`https://closet-app-backend.fly.dev/register`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

router.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`https://closet-app-backend.fly.dev/login`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

router.post('/logout', async (req, res) => {
  try {
    const response = await axios.post(`https://closet-app-backend.fly.dev/logout`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

router.post('/loginAnonymous', async (req, res) => {
  try {
    const response = await axios.post(`https://closet-app-backend.fly.dev/loginAnonymous`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

router.get('/current', async (req, res) => {
  try {
    const response = await axios.get(`https://closet-app-backend.fly.dev/current`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});


app.use('/api', router); // Mount the router under the /api path

module.exports = app;
