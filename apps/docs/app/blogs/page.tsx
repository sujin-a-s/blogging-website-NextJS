"use client"
import {useEffect, useState} from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast/headless"
import AppBar from "../components/AppBar"

const Spinner = () => (
    <>
    <div className="flex flex-col items-center mb-3 p-4 bg-gray-200 rounded-md justify-center ">
        <div className="p-12 ">
            <div className="flex space-x-2 w-screen max-w-screen-lg">
                <div className="flex justify-center space-x-2 items-center">
                    <div className="rounded-full px-3 py-1"></div>
                    <div className="flex space-x-2">
                        <div className="font-semibold"></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-4 space-y-2">
                <div className="text-xl w-screen max-w-screen-lg font-semibold"></div>
                <div className="w-screen max-w-screen-lg"></div>
            </div>
        </div>
    </div>
        <div className="flex flex-col items-center mb-3 p-4 bg-gray-200 rounded-md justify-center ">
        <div className="p-12 ">
            <div className="flex space-x-2 w-screen max-w-screen-lg">
                <div className="flex justify-center space-x-2 items-center">
                    <div className="rounded-full px-3 py-1"></div>
                    <div className="flex space-x-2">
                        <div className="font-semibold"></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-4 space-y-2">
                <div className="text-xl w-screen max-w-screen-lg font-semibold"></div>
                <div className="w-screen max-w-screen-lg"></div>
            </div>
        </div>
    </div>

<div className="flex flex-col items-center mb-3 p-4 bg-gray-200 rounded-md  justify-center ">
<div className="p-12 ">
    <div className="flex space-x-2 w-screen max-w-screen-lg">
        <div className="flex justify-center space-x-2 items-center">
            <div className="rounded-full px-3 py-1"></div>
            <div className="flex space-x-2">
                <div className="font-semibold"></div>
                <div></div>
            </div>
        </div>
    </div>
    <div className="flex flex-col justify-center items-center mt-4 space-y-2">
        <div className="text-xl w-screen max-w-screen-lg font-semibold"></div>
        <div className="w-screen max-w-screen-lg"></div>
    </div>
</div>
</div>
</>
)

export default function Blogs () {
    interface allBlogstype {
        id : Number,
        title : String,
        content : String,
        created : Date,
        owner : {
            username : String
        }

    }

    const[allBlogs,setAllBlogs] = useState<allBlogstype[]>([])
    const[loading,setLoading] = useState(true)
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
   
    const onClickofaBlog = (id:any)=> {
        router.push(`/blogs/${id}`)
    }

    return (
        <>
            <AppBar/>
            {loading ? (<div className="flex flex-col justify-center items-center h-screen"><Spinner/></div>): (
                allBlogs.length>0 ? (
                    <div >
                        {allBlogs.map((blog, index) => (
                            <div key={index} className="p-12 shadow-md ml-5 ">
                                <div className="flex flex-col justify-center items-start space-x-2  ">
                                    <div className="flex  justify-center  space-x-2 items-center">
                                        <div className="bg-gray-400 rounded-full  px-3 py-1">{blog.owner.username[0]}</div>
                                        <div className="flex space-x-2">
                                            <div className="font-semibold">{blog.owner.username}</div>
                                            <div>{new Date(blog.created).toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center  items-start mt-4 space-y-2">
                                    <div onClick={()=>{onClickofaBlog(blog.id)}} className="text-xl   font-semibold">{blog.title}</div>
                                    <div className=" ">{blog.content.slice(0,75)}...</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-ol justify-center items-center h-screen">no blogs found</div>
                )
            )}

        </>
    );
    
}