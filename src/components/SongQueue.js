import React from "react";
import QueueRow from "./QueueRow";

const SongQueue = () => {
   
    /**
     * Returns the list of songs, their names, their artist, their album names, 
     * the user who added it to the queue, and the number of votes it has.
     */
    function getSongQueue() {

    }


    return (
        <div>
            <QueueRow 
                songName="Oops!...I Did It Again" 
                songArtist="Britney Spears"
                songNominator="kt"
                numVotes={4}
                voteStatus={false}
            />
            <QueueRow 
                songName="Heat Waves" 
                songArtist="Glass Animals"
                songNominator="kt"
                numVotes={2}
                voteStatus={false}
            />
        </div>
    );
}

export default SongQueue;