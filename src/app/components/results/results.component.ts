import { Component, OnInit } from '@angular/core';
import { Sentiment } from 'src/app/models/sentiment';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public sentiments?: Sentiment[];

  private VERY_UNLIKELY: string = "VERY_UNLIKELY";
  private UNLIKELY: string = "UNLIKELY";
  private LIKELY: string = "LIKELY";
  private VERY_LIKELY: string = "VERY_LIKELY";

  public joy: number = 0;
  public joy_prc: number = 0;
  public anger: number = 0;
  public anger_prc: number = 0;
  public sorrow: number = 0;
  public sorrow_prc: number = 0;
  public surprise: number = 0;
  public surprise_prc: number = 0;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.database.getSentiments().subscribe((data: Sentiment[]) => {
      this.sentiments = data;
      console.log(this.sentiments);
      this.calculateSentiments();
    });
  }

  private calculateSentiments(): void {
    let count: number = this.sentiments!.length;
    for (let i = 0; i < count; i++) {
      if (this.sentiments![i].joy == this.VERY_LIKELY || this.sentiments![i].joy == this.LIKELY) {
        this.joy++;
      }
      if (this.sentiments![i].anger == this.VERY_LIKELY || this.sentiments![i].anger == this.LIKELY) {
        this.anger++;
      }
      if (this.sentiments![i].sorrow == this.VERY_LIKELY || this.sentiments![i].sorrow == this.LIKELY) {
        this.sorrow++;
      }
      if (this.sentiments![i].surprise == this.VERY_LIKELY || this.sentiments![i].surprise == this.LIKELY) {
        this.surprise++;
      }
    }

    this.joy_prc = this.joy/100 * count;
    this.anger_prc = this.anger/100 * count;
    this.sorrow_prc = this.sorrow/100 * count;
    this.surprise_prc = this.surprise/100 * count;
  }

}
