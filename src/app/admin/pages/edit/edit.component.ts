import { Component, OnInit, ViewChild } from '@angular/core';
import { NzInputDirectiveComponent, NzMessageService } from 'ng-zorro-antd';
import { EditService } from '../../service/edit.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


interface Tag {
    id?: number;
    label: string;
    checked: boolean;
}


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    providers: [EditService]
})
export class EditComponent implements OnInit {

    editorContent: string;
    public tags: Tag[] = [];
    public inputVisible = false;
    public inputValue = '';
    shortCuts = '';
    title = '';
    @ViewChild('input')
    input: NzInputDirectiveComponent;

    article: any;
    isAdd = true;


    constructor(private service: EditService, private _message: NzMessageService, private activatedRoute: ActivatedRoute) {

        this.article = window.localStorage.getItem('edit');
        if (this.article) {
            window.localStorage.removeItem('edit');
            this.article = JSON.parse(this.article);
            this.isAdd = false;
            this.editorContent = this.article.article_content;
            this.shortCuts = this.article.article_shortCuts;
            this.title = this.article.article_title;
        }

    }

    ngOnInit() {
        this.service.getTags().subscribe((result: any) => {
            if (result.status === '0') {
                this.tags = result.data;
                if (!this.isAdd && this.article.tagIds) {
                    this.article.tagIds.split(',').forEach(item => {
                        this.tags.map(item2 => {
                            if (item2.id === item * 1) {
                                item2.checked = true;
                            }
                            return item2;
                        });
                    });
                }
            }
        });
    }


    save() {
        const tags = this.tags.filter(item => item.checked);
        if (!this.title) {
            return this._message.warning('标题不能为空');
        } else if (!this.shortCuts) {
            return this._message.warning('简介不能为空');
        } else if (!tags) {
            return this._message.warning('标签不能为空');
        } else if (!this.editorContent) {
            return this._message.warning('内容不能为空');
        }

        this.service.saveArticle(
            {
                title: this.title,
                shortCuts: this.shortCuts,
                tags: JSON.stringify(tags),
                content: this.editorContent
            }
        ).subscribe((result: any) => {
            if (result.status === '0') {
                this._message.success('添加成功');
            }
        });
    }


    update() {
        const tags = this.tags.filter(item => item.checked);
        if (!this.title) {
            return this._message.warning('标题不能为空');
        } else if (!this.shortCuts) {
            return this._message.warning('简介不能为空');
        } else if (!tags) {
            return this._message.warning('标签不能为空');
        } else if (!this.editorContent) {
            return this._message.warning('内容不能为空');
        }

        this.service.updateArticle(
            {
                id: this.article.article_id,
                title: this.title,
                shortCuts: this.shortCuts,
                tags: JSON.stringify(tags),
                content: this.editorContent
            }
        ).subscribe((result: any) => {
            if (result.status === '0') {
                this._message.success('添加成功');
            }
        });
    }

    handleClose(removedTag: Tag): void {
        this.service.removeTag(removedTag.id).subscribe((result: any) => {
            if (result.status === '0') {
                this.tags = this.tags.filter(tag => tag !== removedTag);
            }
        });

    }

    sliceTagName(tag: string): string {
        const isLongTag = tag.length > 20;
        return isLongTag ? `${tag.slice(0, 20)}...` : tag;
    }

    showInput(): void {
        this.inputVisible = true;
        setTimeout(() => {
            this.input.nativeElement.focus();
        }, 10);
    }

    handleInputConfirm(): void {
        if (this.inputValue) {
            this.service.addTag(this.inputValue).subscribe((result: any) => {
                if (result['status'] === '0') {
                    this.tags.push({label: this.inputValue, checked: false, id: result.data.insertId});
                }

                this.inputValue = '';
                this.inputVisible = false;
            });
        }

    }

    tagChecked(checked: boolean, tag: Tag) {
        tag.checked = checked;
    }
}
