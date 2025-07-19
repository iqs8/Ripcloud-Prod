
// import { Button, buttonVariants } from './ui/button'
// import { Upload, UploadIcon } from 'lucide-react'
import {  buttonVariants } from './ui/button'
import {  UploadIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from "@/lib/utils";

const UploadSongButton = () => {
  return (
    <>
        <Link to={"/upload"} 
        className={cn(
            buttonVariants({variant:"outline"})
        )}
        > 
            <UploadIcon className="size-4 mr-2" />
            Upload Songs
        </Link>
    </>
  )
}

export default UploadSongButton