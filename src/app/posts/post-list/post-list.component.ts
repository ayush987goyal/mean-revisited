import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onEdit(postId: string) {
    this.router.navigate(['/edit', postId]);
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
