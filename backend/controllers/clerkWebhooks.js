import User from "../models/user.model.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify the webhook signature
    await wh.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          username: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0]?.email_address,
          image: data.image_url,
        };

        await User.create(userData);
        break;
      }

      case "user.updated": {
        const userData = {
          _id: data.id,
          username: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0]?.email_address,
          image: data.image_url,
        };

        await User.findOneAndUpdate(
          { _id: data.id },
          userData,
          { new: true, upsert: true }
        );
        break;
      }

      case "user.deleted": {
        await User.findOneAndDelete({ _id: data.id });
        break;
      }

      default:
        // If it's another event type, do nothing
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    return res.status(400).json({
      success: false,
      message: "Webhook verification failed",
      error: error.message,
    });
  }
};

export default clerkWebhooks;
