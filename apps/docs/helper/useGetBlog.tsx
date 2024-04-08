import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"


interface allBlogstype {
    id : Number,
    title : String,
    content : String,
    created : Date,
    owner : {
        username : String
    }

}

export const useGetBlog = async()=> {
    
    const[allBlogs,setAllBlogs] = useState<allBlogstype[]>([])
    const[loading,setLoading] = useState(false)
    const router = useRouter()

    const getallBlogs = async() =>{
        try{
            setLoading(true)
            const response = await axios.get("/api/blogs")
            console.log(response)
            if(response.data.status==200){
                setAllBlogs(response.data.blogs)
                toast.success("Blogs retrieved successfully")
           }else{
            toast.error(response.data.message)
           }
        }catch(error : any){
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getallBlogs()
    },[])

    return {allBlogs,loading}
   
}