import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class EditService {

    constructor(private http: HttpClient) {
    }

    getTags() {
        return this.http.get(environment.getUrl('blog/getTag'));
    }

    addTag(inputValue: string) {
        return this.http.post(environment.getUrl('blog/addTag'), {label: inputValue});
    }

    removeTag(id: number) {
        return this.http.post(environment.getUrl('blog/removeTag'), {id: id});
    }


    saveArticle(param: { title: string, content: string, shortCuts: string, tags: string }) {
        return this.http.post(environment.getUrl('blog/saveArticle'), param);
    }

    updateArticle(param: { id: number , title: string, content: string, shortCuts: string, tags: string }) {
        return this.http.post(environment.getUrl('blog/updateArticle'), param);
    }
}
