import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../shared/post.service';
import {Post} from '../shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnChanges {
  post: Post;
  loading = false;
  @Input() posts;
  @Input() selectPost;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectPost.currentValue.length) {
      this.posts.name = changes.selectPost.currentValue[0].name;
      this.posts.shortInfo = changes.selectPost.currentValue[0].info;
      this.posts.more = changes.selectPost.currentValue[0].more;
      this.getPostById(this.posts.more);
    }
  }

  ngOnInit(): void {
    this.getPostById(this.posts[0].more, true);
  }

  getPostById(url: string, firstLoad: boolean = false) {
    this.loading = true;
    this.postsService.getById(url).subscribe(post => {
      this.post = post;
      if (firstLoad) {
        this.posts.name = this.posts[0].name;
        this.posts.shortInfo = this.posts[0].shortInfo;
      }
      this.loading = false;
    });
  }

}
