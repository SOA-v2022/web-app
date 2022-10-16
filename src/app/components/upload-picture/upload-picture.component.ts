import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
// 
import { Storage, ref, uploadBytes } from "@angular/fire/storage";

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {

  uploadedFiles?: Array<File>;
  constructor(
    private uploadService: UploadFileService,
    // 
    private storage: Storage
  ) { }

  ngOnInit() { }

  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
  }

  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles!.length; i++) {
      formData.append("uploads[]", this.uploadedFiles![i], this.uploadedFiles![i].name);
    }
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
}
