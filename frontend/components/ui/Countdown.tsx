'use client';

import React from 'react';
import { daysRemaining, getDeadlineText } from '@/lib/utils';
import { Badge } from './Badge';

interface CountdownProps {
  targetDate: string;
  label?: string;
  className?: string;
}

export function Countdown({ targetDate, label = 'Deadline', className }: CountdownProps) {
  const daysLeft = daysRemaining(targetDate);

  if (daysLeft < 0) {
    return (
      <Badge variant="default" className={className}>
        Closed
      </Badge>
    );
  }

  const isUrgent = daysLeft <= 3;
  const text = getDeadlineText(daysLeft);

  return (
    <Badge
      variant={isUrgent ? 'urgent' : 'default'}
      className={className}
    >
      {label ? `${label}: ` : ''}{text}
    </Badge>
  );
}
