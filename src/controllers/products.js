export const createProduct =  (req,res,next) => {
    res.json(
        {   
            message: "create Product success!!!",
            data:{
                id:1,
                name:'yakult',
                price:4000
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