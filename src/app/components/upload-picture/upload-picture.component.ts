import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
// 
import { Storage, ref, uploadBytes } from "@angular/fire/storage";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {

  uploadedFiles?: Array<File>;
  imageSrc?: string;
  canUpload: boolean = true;

  constructor(
    private uploadService: UploadFileService,
    // FB
    private storage: Storage
  ) { }

  ngOnInit() { }

  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
    this.preview(element);
    this.canUpload = false;
  }

  preview(event: any): void {
    // for (let i = 0; i < event.target.files.length; i++) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      // reader.onload = e => this.imageSrc?.push(reader.result as string);
      reader.onload = e => this.imageSrc = reader.result as string;

      reader.readAsDataURL(file);
    }
    // }
  }

  upload() {
    let formData: FormData = new FormData();
    for (var i = 0; i < this.uploadedFiles!.length; i++) {
      // formData.append("image", this.uploadedFiles![i], this.uploadedFiles![i].name);
      formData.append("image", this.uploadedFiles![i]);
      // formData.append("name", this.uploadedFiles![i].name);
    }
    console.log(formData);

    this.uploadService.uploadFile(formData).subscribe((res) => {
      console.log('response received is ', res);
    });
  }

  // ==================================================

  fileChange_FB($element: any) {
    const file = $element.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
      .then(res => console.log(res))
      .catch(res => console.log(res));
  }

  // ==================================================

  // selectedFiles?: FileList;
  progressInfos = new Array();
  message = '';

  fileInfos?: Observable<any>;

  selectFiles(event: any): void {
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.uploadedFiles = event.target.files;
    } else {
      this.uploadedFiles = undefined;
      event.srcElement.percentage = null;
    }
  }

  // uploadFiles(): void {
  //   this.message = '';

  //   for (let i = 0; i < this.selectedFiles!.length; i++) {
  //     this.upload_(i, this.selectedFiles![i]);
  //   }
  // }

  // upload_(idx: any, file: any): void {
  //   this.progressInfos[idx] = { value: 0, fileName: file.name };

  //   this.uploadService.upload().subscribe(
  //     (event: any) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
  //       } else if (event instanceof HttpResponse) {
  //         // this.fileInfos = this.uploadService.getFiles();
  //       }
  //     },
  //     (err: any) => {
  //       this.progressInfos[idx].percentage = 0;
  //       this.message = 'Could not upload the file:' + file.name;
  //     });
  // }
}
