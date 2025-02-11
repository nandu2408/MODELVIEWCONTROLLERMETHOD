

import multer from "multer";


const storageConfiguration = multer.diskStorage({

destination : (req,file,cb)=>{
    cb(null, "public/images/");
},
filename : (req,file,cb)=>{
    const name = Date.now() + "_"  + file.originalname ;
    cb(null, name)
}

})

export const uploadFile = multer({
    storage : storageConfiguration
})