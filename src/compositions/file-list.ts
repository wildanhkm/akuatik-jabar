import { ref } from 'vue';

export default function () {
  const files = ref<UploadableFile[]>([]);

  function addFiles(newFiles: FileList | File[]) {
    let newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !fileExists(file.id));
    files.value = files.value.concat(newUploadableFiles);
  }

  function fileExists(otherId: string): boolean {
    return files.value.some(({ id }) => id === otherId);
  }

  function removeFile(file: UploadableFile): void {
    const index = files.value.indexOf(file);

    if (index > -1) files.value.splice(index, 1);
  }

  return { files, addFiles, removeFile };
}

export class UploadableFile {
  file: File;
  id: string;
  url: string;
  status: boolean | null;

  constructor(file: File) {
    this.file = file;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = null;
  }
}
