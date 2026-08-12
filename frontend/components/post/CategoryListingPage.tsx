'use client';

import React, { useState, useEffect } from 'react';
import { Post, PostCategory, CATEGORIES } from '@/types/post';
import { getPosts } from '@/lib/api';
import { PostCard } from '../post/PostCard';
import { FilterSidebar } from '../post/FilterSidebar';
import { Pagination } from '../ui/Pagination';
import { ListingSkeleton } from '../ui/Skeleton';
import { StaggerList, StaggerItem } from '../animations/StaggerList';

interface CategoryListingPageProps {
  category: PostCategory;
  initialPosts?: Post[];
  initialTotalPages?: number;
}

export function CategoryListingPage({
  category,
  initialPosts = [],
  initialTotalPages = 1,
}: CategoryListingPageProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(initialPosts.length === 0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  // Filters
  const [state, setState] = useState('');
  const [qualification, setQualification] = useState('');

  const catInfo = CATEGORIES.find((c) => c.slug === category);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const res = await getPosts({
          category,
          state: state || undefined,
          qualification: qualification || undefined,
          page,
          limit: 12,
        });
        if (isMounted && res.success) {
          setPosts(res.data);
          setTotalPages(res.pagination.pages);
        }
      } catch (err) {
        console.error('Failed to load posts:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [category, state, qualification, page]);

  const handleResetFilters = () => {
    setState('');
    setQualification('');
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Category Header */}
      <div className="space-y-4 border-b border-[var(--border-color)] pb-6">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[var(--text-main)]">
            {catInfo?.name || category}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {catInfo?.description || `Explore latest ${catInfo?.name} notifications`}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <FilterSidebar
            selectedState={state}
            setSelectedState={setState}
            selectedQualification={qualification}
            setSelectedQualification={setQualification}
            onReset={handleResetFilters}
          />
        </div>

        {/* Posts Grid */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <ListingSkeleton count={6} />
          ) : posts.length === 0 ? (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-12 text-center space-y-4">
              <h3 className="font-heading font-bold text-lg text-[var(--text-main)]">
                No posts found
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                No notifications match your filter criteria. Try resetting the filter.
              </p>
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[#0F9D6E] underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <StaggerItem key={post._id}>
                    <PostCard post={post} />
                  </StaggerItem>
                ))}
              </StaggerList>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => setPage(p)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
