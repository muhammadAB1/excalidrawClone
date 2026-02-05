import express from 'express'

const app = express()

const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Phone', price: 800 },
];

// GET all products
app.get('/products', (req, res) => {
  res.send(products)
});

app.post('/specificuser', async (req, res) => {
  const id = req.body._id
  const response = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const newUser = response.json()
  // add date and newUser details in the file
  newUser = newUser + new Date();
  fs.writeFileAsync('./MOCK_DATA.json', JSON.stringify (newUser))
  res.send('success')
})

app(5000, () => {
  console.log('Server running on port 5000')
})
