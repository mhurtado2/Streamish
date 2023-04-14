import { useState} from "react";
import { addVideo, getAllVideos } from "../modules/videoManager";


 export const VideoForm = ({getVideos}) => {
    const [newVideo, setNewVideo] = useState({
        title: "",
        description: "",
        url: "",
    })

const addNewVideoButton = () => { 
   addVideo(newVideo)
  .then(() => {
      getVideos()
  }
  )
}

return <article>
<h2>Add A New Video</h2>
<form>
    
    <label>
    <input 
    type = "text"
    placeholder="Video Title"
    onChange={(changeEvent) => {
        const copy = {...newVideo}
        copy.title = changeEvent.target.value
        setNewVideo(copy)
    }}
    />
    </label>
<label>
    <input 
    type = "text"
    placeholder="Video Description"
    onChange={(changeEvent) => {
        const copy = {...newVideo}
        copy.description =changeEvent.target.value
        setNewVideo(copy)
    }}
    />
</label>
<label>
    <input 
    type = "text"
    placeholder="Video Url"
    onChange={(changeEvent) => {
        const copy = {...newVideo}
        copy.url = changeEvent.target.value
        setNewVideo(copy)
    }}
    />
</label>
<button
    onClick={() => 
        addNewVideoButton()
        }>
   Add New Video
</button>


</form>
</article>
}






