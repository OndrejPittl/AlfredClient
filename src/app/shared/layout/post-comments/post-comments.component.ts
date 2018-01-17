import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IPost} from "../../../model/IPost";
import {IUser} from "../../../model/IUser";
import {IComment} from "../../../model/IComment";
import {CommentService} from "../../../services/comment.service";


@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html'
})
export class PostCommentsComponent implements OnInit, OnDestroy {

  private alive: boolean = true;

  @Input()
  private post: IPost = {} as IPost;

  @Input()
  private user: IUser = null;

  @Input()
  private userLogged: boolean = false;


  private editedComment: IComment = {} as IComment;

  private isEditing: boolean = false;



  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.commentService.commentEdited$
      .takeWhile(() => this.alive)
      .subscribe((comments: IComment[]) => {
        this.post.comments = comments;
        this.isEditing = false;
        this.editedComment = {} as IComment;
    });
  }

  private deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId)
      .takeWhile(() => this.alive)
      .subscribe(
      comments => {
        this.post.comments = comments;
      }
    );
  }

  private editComment(comment: IComment): void {
    this.editedComment = { ...comment };
    this.isEditing = true;
    //console.log("is editing...");
    //console.log(this.isEditing);
  }

  private isMe(authorId: number): boolean {
    if(!this.userLogged || this.user == null) return false;
    return this.user.id == authorId;
  }


  ngOnDestroy(): void {
    this.alive = false;
  }
}
