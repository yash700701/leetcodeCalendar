const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/leetcode', async (req, res) => {
  try {
    const response = await axios.post('https://leetcode.com/graphql', req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from LeetCode' });
  }
});

app.get('/', (req, res) => {
    res.json({ message: 'LeetCode Proxy is running at port ' + PORT });
})

app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
});
