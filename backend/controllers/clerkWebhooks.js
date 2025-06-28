import User from "../models/user.model.js";
import { Webhook } from "svix";

const clerkWebhooks = async (requestAnimationFrame,res)=>{
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": request.headers["svix-id"],
            "svix-timestamp": request.headers["svix-timestamp"],
            "svix-signature": request.headers["svix-signature"]
        }
         await whook.verify(
            JSON.stringify(request.body),
            headers
        );
          const {data,type} = request.body;
          const userData = {
            _id: data.id,
            username: data.first_name + " " + data.last_name,
            email: data.email_addresses[0].email_address,
            image: data.image_url,
            }

            //Switch cases for differnt events

            switch(type){
                case "user.created":{
                    await User.create(userData);
                    break;
                }
                case "user.updated":{
                    await User.findOneAndUpdate(
                        {_id: data.id},
                        userData,
                        {new: true, upsert: true}
                    );
                    break;  
                }
                case "user.deleted":{
                    await User.findOneAndDelete({_id: data.id});
                    break;
                }
                default:{
                    break;
                }
                res.JSON({
                    success: true,
                    message: "Webhook processed successfully"
                })
            }
    } catch (error) {
        console.log(error.message)
        res.JSON({
            success: false,
            message: "Webhook verification failed",
            error: error.message
        });
    }

}

export default clerkWebhooks;