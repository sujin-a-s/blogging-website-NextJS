import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import blog from "../../assets/logo.jpeg"
export default function AppBar () {

    const router = useRouter()
    const onLogout = async() => {
         const response = await axios.get("/api/user/logout")
         console.log(response)
         if(response.data.status==200){
            
            toast.success("user logged out succesfully")
            router.push("/login")
            
         }else{
            toast.error("logout failed")
         }
         
    }

    const onPublish = () => {
          router.push("/publishBlogs")
    }

    return (
        <div className="flex p-3 shadow-md space-x-2 items-center justify-between">
        <img src={blog.src} className="h-12 w-12" alt="blog logo" /> {/* Apply image styling */}
        <div className=" text-center text-3xl text-cyan-700 font-bold">GLOBAL BLOG</div>
        <div className="flex justify-end space-x-2"> {/* Apply flex and space between for buttons */}
            <button
                onClick={onLogout}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
            >
                Logout
            </button>
            <button
                onClick={onPublish}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
            >
                Publish Blogs
            </button>
        </div>
    </div>
    )
}




{/* <div className="flex p-3 shadow-md space-x-2">
<img src={blog.src} className="h-12 w-12" alt="blog logo"/>
<div className="flex justify-end">
    <button onClick={onLogout} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
    <button onClick={onPublish} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Publish Blogs</button>
</div>
</div> */}