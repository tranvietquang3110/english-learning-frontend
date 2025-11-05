import { Component, OnInit } from '@angular/core';
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
import {
  StatisticService,
  TimeRange,
} from '../../../services/StatisticSerivce';
import { StatisticResponse } from '../../../models/response/statistic-response.model';
import { TopicViewSummaryResponse } from '../../../models/response/topic-view-summary-response.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [BaseChartDirective, CommonModule, FormsModule],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss',
})
export class StatisticComponent implements OnInit {
  // Time series chart data
  timeSeriesChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Lượt xem',
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  timeSeriesChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'right',
      },
      title: {
        display: true,
        text: 'Lượt xem theo thời gian',
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

  // Top topics bar chart data
  topTopicsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Tổng lượt xem',
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(20, 184, 166, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(14, 165, 233, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(251, 146, 60)',
          'rgb(168, 85, 247)',
          'rgb(236, 72, 153)',
          'rgb(20, 184, 166)',
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(14, 165, 233)',
        ],
        borderWidth: 1,
      },
    ],
  };

  topTopicsChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top chủ đề được xem nhiều nhất',
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

  // Statistics
  totalViews: number = 0;
  selectedTimeRange: TimeRange = TimeRange.TODAY;
  timeRanges = [
    { value: TimeRange.TODAY, label: 'Hôm nay' },
    { value: TimeRange.ONE_WEEK, label: '1 tuần' },
    { value: TimeRange.ONE_MONTH, label: '1 tháng' },
    { value: TimeRange.TWELVE_MONTHS, label: '12 tháng' },
    { value: TimeRange.ALL, label: 'Tất cả' },
  ];

  topCount: number = 10;
  isLoading: boolean = false;

  constructor(private statisticService: StatisticService) {}

  ngOnInit(): void {
    this.loadTimeSeriesData();
    this.loadTopTopicsData();
  }

  loadTimeSeriesData(): void {
    this.isLoading = true;
    this.statisticService.getTopicViews(this.selectedTimeRange).subscribe({
      next: (response: StatisticResponse) => {
        this.totalViews = response.totalCount;
        this.updateTimeSeriesChart(response.newElementsByPeriod);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading time series data:', error);
        this.isLoading = false;
      },
    });
  }

  loadTopTopicsData(): void {
    this.isLoading = true;
    this.statisticService.getTopicViewsSummary(this.topCount).subscribe({
      next: (response: TopicViewSummaryResponse[]) => {
        this.updateTopTopicsChart(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading top topics data:', error);
        this.isLoading = false;
      },
    });
  }

  updateTimeSeriesChart(data: { [key: string]: number }): void {
    const labels = Object.keys(data).sort();
    const values = labels.map((key) => data[key]);

    this.timeSeriesChartData = {
      ...this.timeSeriesChartData,
      labels: labels,
      datasets: [
        {
          ...this.timeSeriesChartData.datasets[0],
          data: values,
        },
      ],
    };
  }

  updateTopTopicsChart(data: TopicViewSummaryResponse[]): void {
    const labels = data.map((item) => item.topicName);
    const values = data.map((item) => item.totalViews);

    this.topTopicsChartData = {
      ...this.topTopicsChartData,
      labels: labels,
      datasets: [
        {
          ...this.topTopicsChartData.datasets[0],
          data: values,
        },
      ],
    };
  }

  onTimeRangeChange(): void {
    this.loadTimeSeriesData();
  }

  onTopCountChange(): void {
    this.loadTopTopicsData();
  }

  getTimeRangeLabel(): string {
    const range = this.timeRanges.find(
      (tr) => tr.value === this.selectedTimeRange
    );
    return range?.label || '';
  }
}
