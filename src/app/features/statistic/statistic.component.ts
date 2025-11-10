import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ChartConfiguration,
  ChartOptions,
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { StatisticResponse } from '../../models/response/statistic-response.model';
import { StatisticService, TimeRange } from '../../services/StatisticSerivce';

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController
);

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss',
})
export class StatisticComponent implements OnInit {
  userStatistics: StatisticResponse = {
    totalCount: 0,
    newElementsByPeriod: {},
  };

  isLoading = false;
  selectedTimeRange: TimeRange = TimeRange.TODAY;
  timeRanges = [
    { value: TimeRange.TODAY, label: 'Hôm nay' },
    { value: TimeRange.ONE_WEEK, label: '1 tuần' },
    { value: TimeRange.ONE_MONTH, label: '1 tháng' },
    { value: TimeRange.TWELVE_MONTHS, label: '12 tháng' },
    { value: TimeRange.ALL, label: 'Tất cả' },
  ];

  // Line chart data for new elements by period
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Số lượng mới',
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê học tập theo thời gian',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Số lượng',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Thời gian',
        },
      },
    },
  };

  // Bar chart data for total statistics
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Tổng số'],
    datasets: [
      {
        data: [0],
        label: 'Tổng số đã học',
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tổng số đã học',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  constructor(private statisticService: StatisticService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.isLoading = true;
    this.statisticService
      .getUserStatisticsSummary(this.selectedTimeRange)
      .subscribe({
        next: (response: StatisticResponse) => {
          console.log(response);
          this.userStatistics = response;
          this.updateCharts(response);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading statistics:', error);
          this.isLoading = false;
        },
      });
  }

  onTimeRangeChange(): void {
    this.loadStatistics();
  }

  getTimeRangeLabel(): string {
    const range = this.timeRanges.find(
      (tr) => tr.value === this.selectedTimeRange
    );
    return range?.label || '';
  }

  updateCharts(data: StatisticResponse): void {
    // Update line chart with newElementsByPeriod
    const periods = Object.keys(data.newElementsByPeriod).sort();
    const values = periods.map((period) => data.newElementsByPeriod[period]);

    this.lineChartData = {
      ...this.lineChartData,
      labels: periods,
      datasets: [
        {
          ...this.lineChartData.datasets[0],
          data: values,
        },
      ],
    };

    // Update bar chart with totalCount
    this.barChartData = {
      ...this.barChartData,
      datasets: [
        {
          ...this.barChartData.datasets[0],
          data: [data.totalCount],
        },
      ],
    };
  }
}
