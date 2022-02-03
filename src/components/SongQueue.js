import React from "react";
import { ListGroup } from 'react-bootstrap';
import QueueRow from "./QueueRow";

const SongQueue = () => {
   
    /**
     * Returns the list of songs, their names, their artist, their album names, 
     * the user who added it to the queue, and the number of votes it has.
     */
    function getSongQueue() {

    }
    
    // use the songID as the identifier of the song          

    return (
        <ListGroup id="list-container" className="container-fluid">
            <QueueRow 
                trackID='4dCJwNoQG5Fx42pqIz99Vn'
                // track={testData}
                songNominator="kt"
                numVotes={4}
                voteStatus={false}
            />
            <QueueRow 
                trackID='6I9VzXrHxO9rA9A5euc8Ak'
                // track={testData2}
                songNominator="kt"
                numVotes={2}
                voteStatus={false}
            />
            <QueueRow
                trackID='4MY1Y3WqsRSGB0YiR0kN4e'
                songNominator="kt"
                numVotes={5}
                voteStatus={false}
            />
        </ListGroup>
    );
}

export default SongQueue;