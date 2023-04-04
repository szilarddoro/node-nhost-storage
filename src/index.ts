import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { client } from "./client";

const remoteImageUrl =
  "https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*";

const localFilePath = "./cat.jpg";

(async () => {
  try {
    // Download image from remote URL
    const { data } = await axios.get(remoteImageUrl, {
      responseType: "stream",
    });

    if (!data) {
      console.error("Image not found!");

      return;
    }

    // Save image to local file
    data.pipe(fs.createWriteStream(localFilePath)).on("close", async () => {
      const formData = new FormData();

      // Append file to form data
      formData.append("file", fs.createReadStream(localFilePath));

      // Upload file to Nhost Storage
      const { error, fileMetadata } = await client.storage.upload({
        formData,
      });

      if (error) {
        console.error(error.message);

        return;
      }

      console.log(`File has been uploaded successfully!`);
      console.log(fileMetadata);
    });
  } catch (error) {
    console.error(error.message);
  }
})();
