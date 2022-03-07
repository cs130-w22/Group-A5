import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FaRegCopy } from "react-icons/fa"; //copy symbol
import ErrorMessage from "./ErrorMessage";
import "../style/SessionModal.css";
import "./../style/styles.css"; 

const REACT_APP_CLIENT_ID="7c0965d9847a4d0db32dc57a79ca3d9e";
const REACT_APP_AUTHORIZE_URL="https://accounts.spotify.com/authorize";
const REACT_APP_REDIRECT_URL="http://localhost:3000/redirect";
const SCOPE = 'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state';

const SessionModal = ({type, show, setShow}) => { 
  const [username, setUsername] = useState(""); 
	const [sessionCode, setSessionCode] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [sessionCodeError, setSessionCodeError] = useState("");

	const createSession = async () => {
    let response = await fetch("http://localhost:5001/new_session");
    let data = await response.json();
    // console.log(data);
    setSessionCode(data.code);
    // console.log(sessionCode);

    sessionStorage.setItem("sessionCode", data.code);
    /* const sc = sessionStorage.getItem("sessionCode");
    console.log(sc, "sc from storage in Temp.js createSession"); */
  };

	const updateCode = (event) => {
    setSessionCodeError("");
		setSessionCode(event.target.value);
	}

	const updateUsername = (event) => {
    setUsernameError("");
    setUsername(event.target.value);
  };

	const handleLogin = async () => {
		const hasErrors = await errorChecking(); 
		console.log(hasErrors);
		if(!hasErrors) {
			window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=${SCOPE}&response_type=token&show_dialog=true`;
		}
	};

	const errorChecking = async () => {
		let hasErrors = false; 

    // Check that the user has entered a session code
    if(sessionCode == "") {
      setSessionCodeError("*Please enter a session code");
      hasErrors = true; 
    } else {
      // Check if the session ID exists
      let response = await fetch("http://localhost:5001/session_list");
      let data = await response.json();
      let session_codes = data.code_list;
      console.log(session_codes);

      if (session_codes.includes(sessionCode)) {
        // Check that user has entered a username
        if(username == "") {
          setUsernameError("*Please enter a username");
          hasErrors = true; 
        } else {
          // Check if username already exists within a session
          let usersWithinASession = await fetch(
            `http://localhost:5001/session/users?c=${sessionCode}`
          );
          let data2 = await usersWithinASession.json();
          if (data2.users.includes(username)) {
            setUsernameError("*This username already exists");
            hasErrors = true; 
          } else {
            // Add the user to the session code with the specified username
            response = await fetch(
              `http://localhost:5001/session/join?c=${sessionCode}&n=${username}`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
            data = await response.json();
            console.log(data);
            if(data.status == 0) {
              sessionStorage.setItem("sessionCode", sessionCode);
              sessionStorage.setItem("username", username);
            } else {
              setSessionCodeError("*Error joining session");
              hasErrors = true; 
            }
          }
        }   
      } else {
        setSessionCodeError("*Invalid session code");
        hasErrors = true; 
      }
    }

		return hasErrors;
  };

	const handleJoin = async () => {
		const hasErrors = await errorChecking(); 
		if(!hasErrors) {
			window.location = "/dashboard";
		}
	};

	const handleOnClick = () => {
		if(type=='Create') {
			handleLogin(); 
		} else {
			handleJoin();
		}
	}

	useEffect(() => {
		if(type == 'Create') {
			createSession();
		}
	}, [type])

	return(
		<Modal animation show={show} onHide={() => setShow(false) } centered>
			<Modal.Header className="session-modal header" closeButton>
				<Modal.Title>{type} Session</Modal.Title>
			</Modal.Header>

			<Modal.Body className="session-modal">
				<Form>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Session Code:</Form.Label>
						{type == "Create" ? 
							(<div className="d-flex flex-row align-items-center"> 
                <Form.Control 
                  type="number"  
                  disabled 
                  value={sessionCode}
                />
								<FaRegCopy className="icon" style={{marginLeft: '20px'}} onClick={() => navigator.clipboard.writeText(sessionCode)}/>
							</div>) : 
							(<Form.Control 
								type="number" 
								placeholder="0000" 
								min="1000" 
								max="8999" 
								onChange={updateCode}
								value={sessionCode}
								/>)
						}
            <ErrorMessage>{sessionCodeError}</ErrorMessage>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Username:</Form.Label>
						<Form.Control 
							type="text" 
							onChange={updateUsername}
							value={username}
							/>
            <ErrorMessage>{usernameError}</ErrorMessage>
					</Form.Group>

					<Button className="custom-button float-right"variant="primary" onClick={handleOnClick}>
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default SessionModal; 