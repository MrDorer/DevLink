import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Github from "../Assets/github.svg"
import axios from 'axios'

const CLIENT_ID = 'eb65046c0d5c4f4b9c06'

function JIT() {
    const navigate = useNavigate()
    const [rerender, setRerender] = useState(false)
    const [itsAllGood, setItsAllGood] = useState(false)
    const [ghUser, setGhUser] = useState('')

    async function getUserData(){
        console.log('Its been triggered')
        await fetch("http://localhost:8082/getUserData", {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("accessToken") 
            }
        }).then((response) => {
            return response.json()
        }).then(async (data) => {
            console.log(data.login)
            setGhUser(data.login)
        })
        
    }

    function loginGH(){
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + "&scope=ghUser:email")
      }
      

      useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam)

        if(codeParam && (localStorage.getItem("accessToken") === null)){
             async function getAccessToken(){
                await fetch("http://localhost:8082/getAccessToken?code=" + codeParam, {
                    method: "GET"
                }).then((response) => {
                    return response.json()
                }).then((data) => {
                    console.log(data)
                    if(data.access_token){
                        localStorage.setItem("accessToken", data.access_token)
                        setRerender(!rerender)
                        setItsAllGood(true)
                        
                    }
                })
             }
             getAccessToken()
        }
        if(itsAllGood === true){
            console.log("Everything is all right")
            getUserData()
        }
        if(ghUser.length > 0){
            axios.post('http://localhost:8082/register/github', {ghUser})
            .then((response) => {
              console.log(response.data)
              sessionStorage.setItem('user', JSON.stringify(response.data));
              navigate('/home')
            })
              
        }  
      }, [rerender, ghUser]);

  return (
    <div>
      <button onClick={loginGH} className="bg-black text-white rounded-md px-4 py-1 w-full flex flex-wrap justify-center">
              <img src={Github} className="mx-2"></img>
              Iniciar sesion con Github
      </button>
    </div>
  )
}



const getLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error);
};

const success = (position) => {
    console.log(position.coords.latitude);
    setLat(position.coords.latitude)
    console.log(position.coords.longitude);
    setLng(position.coords.longitude)
};


export default JIT
