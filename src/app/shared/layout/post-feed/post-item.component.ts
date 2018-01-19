import {Component, Input, OnDestroy} from '@angular/core';
import {IPost} from "../../../model/IPost";
import {RatingService} from "../../../services/rating.service";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html'
})

export class PostItemComponent implements OnDestroy {

  private alive: boolean = true;

  @Input()
  private userLogged: boolean;

  @Input()
  private post: IPost;


  constructor(private ratingService: RatingService) {}

  private togglePostRating(postId: number): void {
    let hasRated: boolean = this.post.userRated;

    this.ratingService.togglePostRating(postId, hasRated)
      .takeWhile(() => this.alive)
      .subscribe((post: IPost) => {
        this.post = post;
        this.post.userRated = !hasRated;
        console.log(this.post);
      });
  }


  ngOnDestroy(): void {
    this.alive = false;
  }
}
