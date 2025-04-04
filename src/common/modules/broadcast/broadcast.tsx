import Button from "common/components/button/button";
import { useState } from "react";
import { mainApiService } from "services/api.service";

const Broadcast: React.FC = () => {
   const [message, setMessage] = useState<string>("");
   const [messageError, setMessageError] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);

   const sendMessage = async () => {
      setLoading(true);
      try {
         if (message.length === 0) {
            setMessageError("Please enter a message");
            setLoading(false);
            setTimeout(() => {
               setMessageError("");
            }, 4000);
            return;
         }
         await mainApiService.sendMessageToAll({ message });
         setMessage("");
      } catch (error) {
         console.error("Error sending message:", error);
      } finally {
         setLoading(false);
      }
   };
   return (
      <div className="flex flex-col gap-3">
         <div className="flex flex-col w-full max-w-[800px]">
            <span className="text-[#5B6B79] text-[14px] mb-[8px]">Message for all bot users</span>
            <div className="flex flex-col">

               <textarea name="content" value={message} className={`w-full !h-[200px] p-6 ${messageError.length !== 0 && "border-[#df6363]"}`}
                  onChange={(e) => {
                     setMessage(e.target.value);
                     setMessageError("");
                  }}
               ></textarea>
               {messageError.length !== 0 && (
                  <span className="text-[#df6363] text-[12px] mt-2">*{messageError}</span>
               )}
            </div>
         </div>
         <Button
            variant="auth"
            className="!w-[145px] !p-0 flex items-center justify-center text-left text-white !font-light"
            onClick={sendMessage}
            disabled={loading}
         >
            {loading && <div className={`loader w-[20px] h-[20px] mr-3`}></div>} <span>Send</span>
         </Button>
      </div>
   )
}
export { Broadcast };