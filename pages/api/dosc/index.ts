import { google } from "googleapis";
import path from "path";
import fs from "fs";
import { oauth2Client } from "../users/login";
import handler from "../absence-api/[type]/[id]";

oauth2Client.setCredentials({
  refresh_token:
    "ya29.a0AfH6SMA-AQRaAPTj-WZicKgR8BamaX9KGdr8_q9hA48nfMOfLkGl-318PoKYwMlKlGB5ahkPSeXMa1k6tK0nw-UHKUYe1xKJKgv-abYJKPRd9GxQGQ_ZpCdh-B7lJiF3EtXXRDzZAMXPVyMW_La-9hnI_Ab_",
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const filePath = path.join(process.cwd(), "test", "h.jpg");

async function uploadFile() {
  try {
    const res = await drive.files.create({
      requestBody: {
        name: "edc-team",
        mimeType: "image/jpg",
        driveId: "0AKK2FEcg3f53Uk9PVA",
        parents: ["0AKK2FEcg3f53Uk9PVA"],
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
      supportsAllDrives: true,
      supportsTeamDrives: true,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

// uploadFile();

// delete

async function deleteFile() {
  try {
    const res = await drive.files.delete({
      fileId: "1nesGIgSoZxh0MNNR4vJPF6jJ7p-ncN3f",
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// deleteFile();

// create url

async function createUrl() {
  try {
    const fileID = "1iOEeLmGrSbkrOVkxSNQMAI0tfN-O-1Kh";
    await drive.permissions.create({
      fileId: fileID,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileID,
      fields: "webViewLink, webContentLink",
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// createUrl()
// ! 1
async function folder() {
  var fileMetadata = {
    name: "المدرس عمر",
    mimeType: "application/vnd.google-apps.folder",
    driveId: "0AKK2FEcg3f53Uk9PVA",
    parents: ["0AKK2FEcg3f53Uk9PVA"],
  };
  drive.files.create(
    {
      requestBody: fileMetadata,
      supportsAllDrives: true,
    },
    function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("Folder Id: ", file.id);
      }
    }
  );
}

// folder();

async function allFiles() {
  drive.files.list(
    {
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
      supportsAllDrives: true,
      spaces: "drive",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const files = res.data.files;
      if (files.length) {
        console.log("Files:");
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log("No files found.");
      }
    }
  );
}

// allFiles();
const fileId = "0AKK2FEcg3f53Uk9PVA";
async function getFiles() {
  drive.files.get(
    {
      fileId,
      fields: "parents",
      supportsAllDrives: true,
    },
    function (err, file) {
      if (err) {
        console.log(err);
      } else {
        console.log(file.data);
      }
    }
  );
}

// getFiles();

// Create a file in a folder
// ! 2
async function createFileInFolder() {
  try {
    const folderId = "12F83Qzqe3jKUr5tpd13oXjE6XO3OeNiI";
    const res = await drive.files.create({
      requestBody: {
        name: "edc-team",
        mimeType: "image/jpg",
        // driveId: "0AKK2FEcg3f53Uk9PVA",
        parents: [folderId],
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
      supportsAllDrives: true,
      fields: "id",
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
// createFileInFolder();

// search for a file

async function searchForFile() {
  try {
    const res = await drive.files.list({
      // q: "mimeType: 'application/vnd.google-apps.folder'",
      q: "parents in '12F83Qzqe3jKUr5tpd13oXjE6XO3OeNiI'",
      // fields: "nextPageToken, files(id, name)",
      includeItemsFromAllDrives: true,
      driveId: "0AKK2FEcg3f53Uk9PVA",
      supportsAllDrives: true,
      corpora: "drive",
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
searchForFile();
export default handler;


// for finding all folders
// q: "mimeType: 'application/vnd.google-apps.folder'",