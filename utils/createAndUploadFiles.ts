import path from "path";
import fs from "fs";
import { googleDrive } from "../db";


export const createAndUploadFiles = async (mainFolderName: string, schoolFileId: string, res, employeeFoldersArry,
    localFilesPath
    ) => {
    try {
        const drive = await googleDrive();
        const mainfolder = await createFolder(mainFolderName, schoolFileId, drive);
        
        if (mainfolder.status !== 200) {
            return res.status(400).json({ error: "مشكلة في انشاء الملفات" });
          }
          if (mainfolder.data.id) {
            employeeFoldersArry.forEach(async (folder) => {
             const createdFolders =  await createFolder(folder.mainFolder, mainfolder.data.id, drive);
             if(createdFolders.data.id && folder.file){
               await uploadFile(localFilesPath, folder.file, folder.mimeType, createdFolders.data.id )
             } 
             if(createdFolders.data.id && folder.subFolders){
                folder.subFolders.forEach(async (sub) =>{
               const createdFolder =  await createFolder(sub.folder, createdFolders.data.id, drive); 
               if(createdFolder.data.id && sub.file){
                await uploadFile(localFilesPath, sub.file, sub.mimeType, createdFolder.data.id )
               } 
              })   
             } 
            });
          } 
        }catch(error){
            return res.status(400).json({ error: "مشكلة في انشاء الملفات" });
        }
    
    }



  const createFolder = async (name: string, id: string, drive) => {
      
      
    const fileMetadata = {
      name,
      mimeType: "application/vnd.google-apps.folder",
      driveId: "0AKK2FEcg3f53Uk9PVA",
      parents: [id],
    };
    const file = await drive.files.create({
      requestBody: fileMetadata,
      supportsAllDrives: true,
    });
     
    return file;
  };


   const uploadFile = async (fileLocalPath, fileName, mimeType, folderId ) => {
       try {
    const  filePath = path.join(process.cwd(), fileLocalPath, fileName);
     const drive = await googleDrive();
     const res = await drive.files.create({
       requestBody: {
         name: fileName,
         // mimeType: "application/msword/doc",
         mimeType: mimeType,
         driveId: "0AKK2FEcg3f53Uk9PVA",
         parents: [folderId],
       },
       media: {
         mimeType: mimeType,
         body: fs.createReadStream(filePath),
       },
       supportsAllDrives: true,
       supportsTeamDrives: true,
     });
     
   } catch (error) {
     console.log(error);
   }
 }