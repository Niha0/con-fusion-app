import { Component, OnInit ,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader:Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private dishService: DishService,
    private leaderService:LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    console.log(this.BaseURL);
    
   this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish);
    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader);
    console.log(this.dish.image);
    console.log(this.leader.image);
    console.log(this.promotion.image);
   
  }
 

}
