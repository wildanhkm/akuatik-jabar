import { EnumCompetitionType } from '../types';
import { UploadableFile } from './file-list';

export async function uploadFile(
  file: UploadableFile,
  url: string,
  compeType: EnumCompetitionType
): Promise<Response> {
  // set up the request data
  let formData = new FormData();
  formData.append('file', file.file);
  formData.append('compeType', compeType.toString());

  // track status and upload file
  file.status = null;
  let response = await fetch(url, { method: 'POST', body: formData });

  // change status to indicate the success of the upload request
  file.status = response.ok ? true : false;

  return response;
}

export function uploadFiles(
  files: UploadableFile[],
  url: string,
  compeType: EnumCompetitionType
): Promise<Response[]> {
  return Promise.all(files.map((file) => uploadFile(file, url, compeType)));
}

export default function createUploader(url: string, compeType: EnumCompetitionType) {
  return {
    uploadFile: function (file: UploadableFile): Promise<Response> {
      return uploadFile(file, url, compeType);
    },
    uploadFiles: function (files: UploadableFile[]): Promise<Response[]> {
      return uploadFiles(files, url, compeType);
    },
  };
}
