import { Component, OnInit, ViewChild } from '@angular/core';
import { NzInputDirectiveComponent, NzMessageService } from 'ng-zorro-antd';
import { EditService } from '../../service/edit.service';


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


    constructor(private service: EditService, private _message: NzMessageService) {
    }

    ngOnInit() {
        this.service.getTags().subscribe((result: any) => {
            if (result.status === '0') {
                this.tags = result.data;
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
