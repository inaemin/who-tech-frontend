'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  activeCohort: number | null; // null = 전체
  cohorts?: number[];
}

const DEFAULT_COHORTS = [8, 7, 6, 5, 4, 3, 2, 1];

export function CohortTabBar({ activeCohort, cohorts = DEFAULT_COHORTS }: Props) {
  const searchParams = useSearchParams();
  const [optimisticCohort, setOptimisticCohort] = useState(activeCohort);
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : '';

  useEffect(() => {
    setOptimisticCohort(activeCohort);
  }, [activeCohort]);

  const tabClass = (active: boolean) =>
    `-mb-px cursor-pointer rounded-t-md border-b-2 px-4 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors sm:rounded-none sm:px-4 sm:py-2 ${
      active ? 'border-accent-dm text-accent-dm' : 'border-transparent text-text-muted hover:text-text'
    }`;

  return (
    <div className="mb-5 overflow-x-auto border-b border-border overscroll-x-contain overscroll-y-none [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max items-center gap-1 sm:gap-0">
        <Link
          href={`/cohort${suffix}`}
          scroll={false}
          onClick={() => setOptimisticCohort(null)}
          className={tabClass(optimisticCohort === null)}
        >
          전체
        </Link>
        {cohorts.map((c) => (
          <Link
            key={c}
            href={`/cohort/${c}${suffix}`}
            scroll={false}
            onClick={() => setOptimisticCohort(c)}
            className={tabClass(optimisticCohort === c)}
          >
            {c}기
          </Link>
        ))}
      </div>
    </div>
  );
}
