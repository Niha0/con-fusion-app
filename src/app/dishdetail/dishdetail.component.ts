import { Component, OnInit,ViewChild , Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishService:DishService;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment :Comment;
  dishErrMess : string;
  dishcopy: Dish;
  rating: number =5;
  @ViewChild('cform') feedbackFormDirective;

   constructor(private dishservice: DishService,
    private route:ActivatedRoute,
    private location:Location,
    private cfm:FormBuilder,
    @Inject('BaseURL') private BaseURL) { 
    this.createCommentForm();
    }

    formErrors = {
      'author': '',
      'comment': '',
      'rating': ''
    };
    validationMessages = {
      'author': {
        'required':      'Name is required.',
        'minlength':     'Name must be at least 2 characters long.'
       },
      'comment': {
       'required':      'Comment is required.'
      },
    };
    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errmess  => this.dishErrMess  = <any>errmess );
      this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); }, 
      errmess  => this.dishErrMess  = <any>errmess);
    }

    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    goBack(): void {
    this.location.back();
    }

    
    formatLabel(val: number) {
        if (val >= 5) {
              this.rating = val;
              return val;
        }
    return val;
}
    createCommentForm() {
    this.commentForm = this.cfm.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment:['',[Validators.required]],
      rating: ''
    });
    
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    const today = new Date();
    this.comment = this.commentForm.value;
    this.comment.rating = this.rating;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
    .subscribe(dish => {this.dish = dish; this.dishcopy = dish;},
      errmess => { this.dish == null; this.dishcopy == null; this.dishErrMess = <any>errmess; });

   // this.dish.comments.push(this.comment);
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: '5'
    });
    this.feedbackFormDirective.resetForm();
   }

}
