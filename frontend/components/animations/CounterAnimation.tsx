'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface CounterAnimationProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CounterAnimation({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
}: CounterAnimationProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = countRef.current;
    if (!el || animatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const obj = { count: 0 };
          animate(obj, {
            count: value,
            duration,
            ease: 'easeOutExpo',
            modifier: (v: number) => Math.round(v),
            onUpdate: () => {
              if (el) {
                el.innerText = `${prefix}${Math.round(obj.count).toLocaleString('en-IN')}${suffix}`;
              }
            },
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix, prefix, duration]);

  return (
    <span ref={countRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
