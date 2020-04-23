import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Post} from './shared/interfaces';
import {PostService} from './shared/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: Post[] = [];
  selectPost: Post[] = [];
  search: string;
  activeItem: number;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    if (localStorage.getItem('state')) {
      this.posts = JSON.parse(localStorage.getItem('state'));
    } else {
      this.postService.getAll()
        .subscribe(posts => {
          this.posts = posts.data;
          this.posts.map((item) => {
            item['deleted'] = false;
          });
        });
    }
  }

  private deleteOrRestore(id: number,  del: boolean = true) {
    this.posts.map(post => {
      if (post.id === id) {
        if (del) {
          post['deleteDate'] = new Date();
        }
        post['deleted'] = del;
        this.posts.sort((a: any,b: any) => a.deleted - b.deleted);
        localStorage.setItem('state', JSON.stringify(this.posts));
      }
    });

  }

  deletePost(id: number) {
    this.deleteOrRestore(id);
  }

  restorePost(id: number) {
    this.deleteOrRestore(id, false);
  }

  updatePost(obj, event: Event) {
    event.preventDefault();
    if (!this.activeItem || this.activeItem !== obj.id) {
      this.activeItem = obj.id;
      this.selectPost = [obj];
    }
  }
}
