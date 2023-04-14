import { useState } from "react";
import { searchAllVideos } from "../modules/videoManager";
import SearchVideoResults from "./SearchVideoResults";


const SearchVideos = () => {
    const [searchedVideos, setSearchedVideos] = useState([]);
    const [queryString, setQueryString] = useState([]);
    const [sortDescBool, setSortDescBool] = useState(false);


    return <article>
        <h2>Search</h2>
        <section>
            <input 
            type = "text"
            placeholder="Enter Search Terms"
            onChange={(changeEvent) => {
                setQueryString(changeEvent.target.value)
            }}
            />
        <label>
            Sort by Descending
            <input 
            type = "checkbox"
            placeholder="Enter Search Terms"
            onChange={(changeEvent) => {
                if (changeEvent.target.checked){
                    setSortDescBool(true)
                }
                else {
                    setSortDescBool(false)
                }
            }}
            />
        </label>
        <button
            onClick={() => {
                searchAllVideos(queryString, sortDescBool)
                .then(response => {
                    setSearchedVideos(response)
                })
            }}>
            Search
        </button>
        </section>

        <section>
            <div>
                {searchedVideos.map((video) => (
                <SearchVideoResults key={video.id}
                 video={video}
                />
                 ))}
            </div>
        </section>

    </article>
}

export default SearchVideos;