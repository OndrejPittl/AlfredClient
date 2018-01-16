import { Component, Input } from '@angular/core';
import {IPost} from "../../../model/IPost";
import {RatingService} from "../../../services/rating.service";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html'
})

export class PostItemComponent {

  @Input()
  private userLogged: boolean;

  @Input()
  private post: IPost;


  constructor(private ratingService: RatingService) {

  }

  private togglePostRating(postId: number): void {
    let hasRated: boolean = this.post.userRated;

    this.ratingService.togglePostRating(postId, hasRated)
      .subscribe((post: IPost) => {
        this.post = post;
        this.post.userRated = !hasRated;
      });
  }

}
