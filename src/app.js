import express from 'express';
import ProductManager from './productManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('./products.json')

app.get('/', (req,res)=> {

})

app.get('/products', async (req,res)=> {

    const limit = Number(req.query.limit);

    try {
        const products = await productManager.getProducts();

        if (limit) {
            if (products.length < limit) {
                res.status(200).json(products);
            } else{
                res.status(200).json(products.slice(0,limit));
            }
        } else {
            res.status(200).json(products);
        }

    } catch (error) {
        res.status(404).json({message: error.message})
        
    }
    
    
})

app.get('/products/:idProd', async (req,res)=> {

    try {
        const {idProd} = req.params;
        const product = await productManager.getProductById(Number(idProd));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(400).json({message : 'Product not found'});
        }
    } catch (error) {
        res.status(404).json({message: error.message})  
    }

})


app.listen(8080, ()=> {
    console.log('server express listening on port 8080');
});

