import {AbstractComponent} from "./abstract-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

// const INCREMENT_TEN_PERCENT = 1.1;
const ChartTitle = {
  MONEY: `MONEY`,
  TIME: `TIME`,
  TRANSPORT: `TRANSPORT`,
};

const nTypes = [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`];
const mNum = [100, 10, 1000, 50, 300];

export class Statistics extends AbstractComponent {
  constructor() {
    super();
    this._moneyContainer = document.querySelector(`.statistics__chart--money`);


    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this.renderMoneyChart(nTypes, mNum);
  }

  renderChart(ctx, labels, data, title, formatter) {
    ctx.style.backgroundColor = `rgb(242, 242, 242)`;

    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `#ffffff`,
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: true,
            clamp: true,
            anchor: `end`,
            color: `black`,
            font: {
              size: 14,
              style: `bold`,
            },
            formatter,
          },
        },
        title: {
          display: true,
          text: title,
          fontSize: 32,
          fontColor: `#000000`,
          position: `left`,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
              beginAtZero: true,
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              fontSize: 12,
              fontStyle: `bold`,
              padding: 10,
            }
          }]
        },
      },
    });
  }

  renderMoneyChart(types, numbers) {
    if (this._moneyChart) {
      this.updateChart(this._moneyChart, types, numbers);
    } else {
      const ctx = this
        .getElement()
        .querySelector(`.statistics__chart--money`);

      const formatter = (value) => (`€ ${value}`);

      this._moneyChart =
        this.renderChart(ctx, types, numbers, ChartTitle.MONEY, formatter);
    }
  }

  renderTimeChart(types, numbers) {
    if (this._timeChart) {
      this.updateChart(this._timeChart, types, numbers);
    } else {
      const ctx = this
        .getElement()
        .querySelector(`.statistics__chart--time`);

      const formatter = (value) => (`${value}H`);

      this._timeChart =
        this.renderChart(ctx, types, numbers, ChartTitle.TIME, formatter);
    }
  }

  renderTransportChart(types, numbers) {
    if (this._transportChart) {
      this.updateChart(this._transportChart, types, numbers);
    } else {
      const ctx = this
        .getElement()
        .querySelector(`.statistics__chart--transport`);

      const formatter = (value) => (`${value}x`);
      this._transportChart =
        this.renderChart(ctx, types, numbers, ChartTitle.TRANSPORT, formatter);
    }
  }

  // updateChart(chart, labels, data) {
  //   chart.data.labels = labels;
  //   chart.data.datasets[0].data = data;
  //   chart.options.scales.xAxes.ticks.suggestedMax =
  //     data[0] * INCREMENT_TEN_PERCENT;

  //   chart.update();
  // }

  getTemplate() {
    return `<section class="statistics">
    <h2>Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
  }
}
