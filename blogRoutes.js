import express from 'express';
import multer from 'multer';
import {
  getAllBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
} from '../controllers/blogController.js';


const router = express.Router();

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads')

},
filename:function(req,file,cb){
  const uniqueName =`${Date.now()}-${file.originalname}`;
  cb(null,uniqueName);
}
})
const upload = multer({storage})
router.get('/', getAllBlogs);
router.post('/',upload.single('image'), addBlog);
router.delete('/:id', deleteBlog);

// ✅ PUT /api/blogs/:id
router.put('/:id', updateBlog);

export default router;