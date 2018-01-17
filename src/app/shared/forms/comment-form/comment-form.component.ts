import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {IComment} from "../../../model/IComment";
import {IPost} from "../../../model/IPost";
import {CommentService} from "../../../services/comment.service";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html'
})
export class CommentFormComponent implements OnInit, OnDestroy {

  private alive: boolean = true;

  @Input()
  private post: IPost = {} as IPost;

  @Input()
  private comment: IComment = {} as IComment;

  @Input()
  private isEditing: boolean = false;



  constructor(private commentService: CommentService) { }

  ngOnInit() { }

  public commentPost(e): void {
    console.log("commenting post");
    console.log(this.isEditing);

    if(this.isEditing) {
      this.editComment();
      return;
    }

    this.commentService.createPostComment(this.comment, this.post.id)
      .takeWhile(() => this.alive)
      .subscribe(comments => {
        this.post.comments = comments;
      });
  }

  public editComment(): void {
    console.log("oooo comment update:");
    this.comment.date = null;
    this.comment.lastModified = null;

    this.commentService.updateComment(this.comment)
      .takeWhile(() => this.alive)
      .subscribe(comments => {
        console.log(comments);

        this.isEditing = false;
        this.comment = {} as IComment;
      });
  }


  ngOnDestroy(): void {
    this.alive = false;
  }
}
