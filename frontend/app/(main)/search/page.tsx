'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Post } from '@/types/post';
import { searchPosts } from '@/lib/api';
import { PostCard } from '@/components/post/PostCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { ListingSkeleton } from '@/components/ui/Skeleton';
import { StaggerList, StaggerItem } from '@/components/animations/StaggerList';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!query) {
      setPosts([]);
      return;
    }

    let isMounted = true;
    async function performSearch() {
      setLoading(true);
      try {
        const res = await searchPosts(query, { page, limit: 12 });
        if (isMounted && res.success) {
          setPosts(res.data);
          setTotalPages(res.pagination.pages);
          setTotalCount(res.pagination.total);
        }
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    performSearch();
    return () => {
      isMounted = false;
    };
  }, [query, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-[var(--text-main)]">
          Search Notifications
        </h1>
        <SearchBar defaultValue={query} size="lg" />
        {query && (
          <p className="text-xs md:text-sm text-[var(--text-muted)]">
            Showing results for <span className="font-semibold text-[#0F9D6E]">"{query}"</span>
            {!loading && <span> ({totalCount} found)</span>}
          </p>
        )}
      </div>

      {/* Results Grid */}
      <div className="space-y-6">
        {loading ? (
          <ListingSkeleton count={6} />
        ) : !query ? (
          <div className="text-center py-12 text-[var(--text-muted)] text-sm">
            Enter a search term above to find jobs, results, admit cards, or syllabus.
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-12 text-center space-y-3">
            <h3 className="font-heading font-bold text-lg text-[var(--text-main)]">
              No results found for "{query}"
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
              Try searching with different keywords like "UPSC", "SSC", "Railway", or "Admit Card".
            </p>
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
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><ListingSkeleton /></div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
