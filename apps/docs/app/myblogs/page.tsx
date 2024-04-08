"use client"
import axios from "axios";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AppBar from "../components/AppBar";


const Spinner = () => (
    <>
    <div className="flex flex-col items-center mb-3 p-8 bg-gray-200 rounded-md justify-center ">
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
        <div className="flex flex-col items-center mb-3 p-8 bg-gray-200 rounded-md justify-center ">
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

<div className="flex flex-col items-center mb-3 p-8 bg-gray-200 rounded-md  justify-center ">
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


export default function Myblogs () {

    interface myblogsInput {
        id : number,
        title : String,
        content : String,
        created : Date,
        owner : {
            username : String
        }
        
    }
    const [loading,setLoading] = useState(true)
    const[myblogs,setMyblogs] = useState<myblogsInput[]>([])

    const getmyBlogs = async() => {
        try{
            setLoading(true)
            const response = await axios.get("/api/myblogs")
            console.log(response)
            setMyblogs(response.data.blogs)
            toast.success("blogs retrieved successfully")

        }catch(error:any){
            toast.error(error.message)
        }finally{
            setLoading(false)
        }

    }

    useEffect(()=>{
        getmyBlogs()
    },[])

    const deleteButtonHandler = async(id : number) =>{
        
        try{
            setLoading(true)
            const response = await axios.post("/api/myblogs",{ id } )
            console.log(response)
            if(response.data.status==200){
                toast.success("blog deleted successfully")
                getmyBlogs()
            }else{
                toast.error("blog deletion failed")
            }
        }catch(error : any){
            toast.error(error.message)
        }
    }

    const router = useRouter()
    const editButtonHandler = async(id : any) =>{
        
        try{
            toast.success("redirecting to the edit page")
            router.push(`/myblogs/${id}`)
        }catch(error : any){
            toast.error(error.message)
        }
    }


    return (
        <>
        <AppBar/>
            <div className="flex flex-col justify-center items-center mt-4 text-3xl font-bold">Hello {myblogs[0]?.owner?.username} 👋</div>
            {loading ? (
                <div className="flex flex-col justify-center mt-7 items-center h-screen"><Spinner/></div>
            ) : myblogs?.length>0 ? (
                <div >
                {myblogs.map((blog, index) => (
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
                            <div className="text-xl   font-semibold">{blog.title}</div>
                            <div className=" ">{blog.content.slice(0,75)}...</div>
                        </div>

                        <div className="flex space-x-2  mt-8">
                            <button onClick={()=>deleteButtonHandler(blog.id)} className="px-3 py-2 text-xs font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
                            <button onClick={()=>editButtonHandler(blog.id)}className="px-3 py-2 text-xs font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                        </div> 
                    </div>
                ))}
            </div>
              ) : (
                <p className="flex flex-col justify-center items-center h-screen">No blogs found.</p>
              )

            

            }

        
    </>
    )
}







