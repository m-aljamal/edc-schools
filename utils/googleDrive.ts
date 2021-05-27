import { google } from "googleapis";
import path from "path";
import fs from "fs";

const credentials = {
  private_key: process.env.private_key,
  client_email: process.env.client_email,
};

export async function getDrive() {
  const client = await google.auth.getClient({
    credentials,
    scopes: "https://www.googleapis.com/auth/drive.file",
  });

  return google.drive({
    version: "v3",
    auth: client,
  });
}

export async function searchForFile() {
    try {
      const drive = await getDrive();
      const res = await drive.files.list({
        q: "mimeType: 'application/vnd.google-apps.folder'",
        // q: "parents in '12F83Qzqe3jKUr5tpd13oXjE6XO3OeNiI'",
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
