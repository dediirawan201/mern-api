export const createProduct =  (req,res,next) => {
    const name = req.body.name;
    const price = req.body.price;
    res.json(
        {   
            message: "create Product success!!!",
            data:{ 
                id:1,
                name,
                price
            }
        })
    next()
}

export const getAllProducts = (req,res,next) => {
    res.json(
        {   
            message: "Get All Product success",
            data:{
                id:1,
                name:'yakult',
                price:4000
            }
        });
    next()
}