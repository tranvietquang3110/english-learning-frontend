import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PlanResponse } from '../../../../../models/response/plan-response.model';
import { PlanDetailResponse } from '../../../../../models/response/plan-detail-response.model';
import { ItemTypeEnum } from '../../../../../models/item-type-enum';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-planning-calender',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FontAwesomeModule],
  templateUrl: './planning-calender.component.html',
  styleUrl: './planning-calender.component.scss',
})
export class PlanningCalenderComponent implements OnInit, OnChanges {
  @Input() plan: PlanResponse | null = null;

  faTimes = faTimes;
  hoveredGroupId: string | null = null;
  tooltipPosition = { x: 0, y: 0 };
  showTooltip = false;
  hideTooltipTimeout: any = null;
  tooltipTransform = 'translateY(-50%)'; // Default: center vertically

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    locale: 'vi',
    events: [],
    eventDisplay: 'block',
    height: 'auto',
    editable: false,
    selectable: false,
    eventClick: (info) => {
      info.jsEvent.preventDefault();
    },
    eventMouseEnter: (info) => {
      // Clear any pending hide timeout
      if (this.hideTooltipTimeout) {
        clearTimeout(this.hideTooltipTimeout);
        this.hideTooltipTimeout = null;
      }

      const groupId = info.event.extendedProps['groupId'];
      if (groupId) {
        this.hoveredGroupId = groupId;
        this.showTooltip = true;
        // Update tooltip position with smart positioning
        const rect = info.el.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const tooltipWidth = 450; // approximate tooltip width
        const tooltipMaxHeight = 600; // max height from CSS
        const padding = 20; // padding from viewport edges

        // Calculate available space
        const spaceRight = viewportWidth - rect.right;
        const spaceLeft = rect.left;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        // Determine horizontal position
        let x: number;
        let y: number;
        let useVerticalCenter = true;
        let transform = 'translateY(-50%)';

        if (spaceRight >= tooltipWidth + padding) {
          // Place to the right
          x = rect.right + 15;
          y = rect.top + rect.height / 2;
          transform = 'translateY(-50%)';
        } else if (spaceLeft >= tooltipWidth + padding) {
          // Place to the left
          x = rect.left - tooltipWidth - 15;
          y = rect.top + rect.height / 2;
          transform = 'translateY(-50%)';
        } else {
          // Not enough space on sides, place above or below
          useVerticalCenter = false;
          const centerX = rect.left + rect.width / 2;

          if (spaceBelow >= tooltipMaxHeight / 2 + padding) {
            // Place below
            x = centerX;
            y = rect.bottom + 15;
            transform = 'translateX(-50%)';
          } else if (spaceAbove >= tooltipMaxHeight / 2 + padding) {
            // Place above
            x = centerX;
            y = rect.top - 15;
            transform = 'translate(-50%, -100%)';
          } else {
            // Limited space, use best available position
            if (spaceBelow > spaceAbove) {
              // More space below, place below but adjust Y
              x = centerX;
              y = Math.min(
                rect.bottom + 15,
                viewportHeight - tooltipMaxHeight - padding
              );
              transform = 'translateX(-50%)';
            } else {
              // More space above, place above but adjust Y
              x = centerX;
              y = Math.max(rect.top - 15, tooltipMaxHeight / 2 + padding);
              transform = 'translate(-50%, -100%)';
            }
          }
        }

        // Adjust Y position if tooltip would go off screen
        if (useVerticalCenter) {
          const tooltipHalfHeight = Math.min(tooltipMaxHeight / 2, 300);
          // Ensure tooltip doesn't go above viewport
          if (y - tooltipHalfHeight < padding) {
            y = tooltipHalfHeight + padding;
          }
          // Ensure tooltip doesn't go below viewport
          if (y + tooltipHalfHeight > viewportHeight - padding) {
            y = viewportHeight - tooltipHalfHeight - padding;
          }
        } else {
          // For top/bottom placement, ensure tooltip stays in viewport
          if (transform.includes('-100%')) {
            // Tooltip above, ensure bottom of tooltip doesn't go below viewport
            if (y < tooltipMaxHeight + padding) {
              y = tooltipMaxHeight + padding;
            }
          } else {
            // Tooltip below, ensure it doesn't go below viewport
            if (y < padding) {
              y = padding;
            } else if (y + tooltipMaxHeight > viewportHeight - padding) {
              y = viewportHeight - tooltipMaxHeight - padding;
            }
          }
        }

        // Ensure X position doesn't go off screen
        if (
          transform.includes('translateX(-50%)') ||
          transform.includes('translate(-50%')
        ) {
          // Center horizontally, ensure it doesn't go off screen
          const halfWidth = tooltipWidth / 2;
          if (x - halfWidth < padding) {
            x = halfWidth + padding;
          } else if (x + halfWidth > viewportWidth - padding) {
            x = viewportWidth - halfWidth - padding;
          }
        } else {
          // Not centered horizontally
          if (x < padding) {
            x = padding;
          } else if (x + tooltipWidth > viewportWidth - padding) {
            x = viewportWidth - tooltipWidth - padding;
          }
        }

        this.tooltipPosition = { x, y };
        this.tooltipTransform = transform;
      }
    },
    eventMouseLeave: (info) => {
      // Add a small delay before hiding to allow mouse to move to tooltip
      this.hideTooltipTimeout = setTimeout(() => {
        this.showTooltip = false;
        this.hoveredGroupId = null;
      }, 150);
    },
    eventColor: '#3b82f6',
  };

  ngOnInit(): void {
    if (this.plan) {
      this.loadEvents();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['plan'] && this.plan) {
      this.loadEvents();
    }
  }

  loadEvents(): void {
    if (!this.plan) return;

    const events: EventInput[] = [];

    // Add plan group events
    if (this.plan.planGroups) {
      this.plan.planGroups.forEach((group, groupIndex) => {
        const groupColor = this.getColorForIndex(groupIndex);
        events.push({
          title: `📋 ${group.name}`,
          start: group.startDate,
          end: group.endDate,
          backgroundColor: groupColor,
          borderColor: this.darkenColor(groupColor),
          textColor: '#ffffff',
          extendedProps: {
            type: 'group',
            description: group.description,
            groupId: group.id,
          },
        });
      });
    }

    this.calendarOptions.events = events;
  }

  getColorForIndex(index: number): string {
    const colors = [
      '#10b981', // green
      '#f59e0b', // amber
      '#ef4444', // red
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#06b6d4', // cyan
    ];
    return colors[index % colors.length];
  }

  getColorForTopicType(topicType: ItemTypeEnum): string {
    const colorMap: { [key in ItemTypeEnum]?: string } = {
      [ItemTypeEnum.VOCABULARY]: '#3b82f6', // blue
      [ItemTypeEnum.GRAMMAR]: '#f59e0b', // amber
      [ItemTypeEnum.LISTENING]: '#10b981', // green
    };
    return colorMap[topicType] || '#6b7280'; // gray default
  }

  getTopicTypeIcon(topicType: ItemTypeEnum): string {
    const iconMap: { [key in ItemTypeEnum]?: string } = {
      [ItemTypeEnum.VOCABULARY]: '📚',
      [ItemTypeEnum.GRAMMAR]: '📖',
      [ItemTypeEnum.LISTENING]: '🎧',
    };
    return iconMap[topicType] || '📝';
  }

  darkenColor(color: string): string {
    // Simple darken function - reduce brightness
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - 20);
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - 20);
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - 20);
    return `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  getHoveredGroup() {
    if (!this.plan || !this.hoveredGroupId) return null;
    return this.plan.planGroups.find(
      (group) => group.id === this.hoveredGroupId
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  getTopicTypeLabel(topicType: ItemTypeEnum): string {
    const labelMap: { [key in ItemTypeEnum]?: string } = {
      [ItemTypeEnum.VOCABULARY]: 'Từ vựng',
      [ItemTypeEnum.GRAMMAR]: 'Ngữ pháp',
      [ItemTypeEnum.LISTENING]: 'Nghe',
    };
    return labelMap[topicType] || 'Khác';
  }

  onTooltipMouseEnter(): void {
    // Clear hide timeout when mouse enters tooltip
    if (this.hideTooltipTimeout) {
      clearTimeout(this.hideTooltipTimeout);
      this.hideTooltipTimeout = null;
    }
  }

  onTooltipMouseLeave(): void {
    // Hide tooltip when mouse leaves
    this.showTooltip = false;
    this.hoveredGroupId = null;
  }
}
