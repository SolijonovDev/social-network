import SidebarRouter from "./com/SidebarRouter";
import { io } from "socket.io-client";
import { useEffect } from "react";
const socket = io("http://localhost:7000",{transports: ['websocket', 'polling', 'flashsocket']});
export default function App() {
  useEffect(()=>{
    socket.on("connect", () => {
      console.log(socket.connected)
    });
    socket.on("disconnect", () => {
      console.log(socket.connected); // false
    });
  },[])
  return (
    <div>
     <SidebarRouter/>
    </div>
  );
}
