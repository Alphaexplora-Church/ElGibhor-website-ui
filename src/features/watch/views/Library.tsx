import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useLibraryViewModel } from '../journeys/useLibraryViewModel';
import type { LibraryTab } from '../journeys/useLibraryViewModel';
import {
  formatLongDate,
  formatMonthYear,
  journeyOverview,
  journeyTopic,
  messageCount,
  partImage,
  partLength,
  toMediaEmbed,
} from '../journeys/journeys.media';

interface Teacher {
  name: string;
  role: string;
  sermonCount: number;
  image: string;
}

const AUTOPLAY_DELAY = 4000;
const SWIPE_THRESHOLD = 80;

const variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 60 : -60, scale: 1.02 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -60 : 60, scale: 1.02 }),
};

const thumbnails = [
  'https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg',
  'https://images.pexels.com/photos/34352434/pexels-photo-34352434.jpeg',
  'https://images.pexels.com/photos/2170473/pexels-photo-2170473.jpeg',
];

const TEACHERS: Teacher[] = [
  { name: 'Pastor Mike', role: 'Lead Pastor', sermonCount: 42, image: thumbnails[0] },
  { name: 'Pastor Anna', role: 'Associate Pastor', sermonCount: 18, image: thumbnails[1] },
  { name: 'Pastor Ruben', role: 'Youth Pastor', sermonCount: 12, image: thumbnails[2] },
];

const TABS: { id: LibraryTab; label: string }[] = [
  { id: 'sermons', label: 'All Sermons' },
  { id: 'series', label: 'Series' },
  { id: 'teachers', label: 'Teachers' },
];

const getPaginationRange = (current: number, total: number) => {
  const delta = 1;
  const range: (number | string)[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }
  return range;
};

export const Library: React.FC = () => {
  const vm = useLibraryViewModel();

  const [[activeIndex, direction], setSlide] = useState<[number, number]>([0, 0]);
  const total = vm.heroJourneys.length;
  const current = vm.heroJourneys[activeIndex] ?? null;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      if (total === 0) return;
      const wrapped = ((nextIndex % total) + total) % total;
      setSlide([wrapped, dir]);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);
  const goToIndex = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      goTo(index, index > activeIndex ? 1 : -1);
    },
    [activeIndex, goTo]
  );

  useEffect(() => {
    if (activeIndex > 0 && activeIndex >= total) setSlide([0, 0]);
  }, [activeIndex, total]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (total > 1) {
      timerRef.current = setInterval(() => goTo(activeIndex + 1, 1), AUTOPLAY_DELAY);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, goTo, total]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_THRESHOLD) goNext();
    else if (info.offset.x >= SWIPE_THRESHOLD) goPrev();
  };

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);

  const selectCategory = (name: string | null) => {
    vm.selectCategory(name);
    setCategoryOpen(false);
    setCategorySearch('');
  };

  const filteredCategories = useMemo(() => {
    const query = categorySearch.trim().toLowerCase();
    if (!query) return vm.categoryCounts;
    return vm.categoryCounts.filter((c) => c.name.toLowerCase().includes(query));
  }, [categorySearch, vm.categoryCounts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setCategoryOpen(false);
        setCategorySearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const paginationRange = useMemo(() => getPaginationRange(vm.currentPage, vm.totalPages), [vm.currentPage, vm.totalPages]);

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const embed = vm.nowPlaying ? toMediaEmbed(vm.nowPlaying.part.mediaUrl, vm.nowPlaying.part.mediaType) : null;

  return (
    <div className="bg-[var(--color-background-dark)] w-full min-h-screen pt-16 lg:pt-24">
      {/* HERO */}
      <section className="relative w-full h-[80vh] min-h-[560px] overflow-hidden">
        {current ? (
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current.journeyId}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              {current.thumbnailUrl && (
                <div className="absolute inset-0 bg-cover bg-center select-none" style={{ backgroundImage: `url(${current.thumbnailUrl})` }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-dark)] via-[var(--color-background-dark)]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background-dark)]/90 via-[var(--color-background-dark)]/20 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-16 lg:pb-24">
                <h1 className="font-heading font-black uppercase tracking-tight text-white text-4xl sm:text-6xl lg:text-7xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] max-w-3xl">
                  {current.title}
                </h1>
                <div className="flex items-center gap-3 mt-4 text-sm sm:text-base font-medium text-gray-200">
                  <span className="text-gold font-bold">{formatLongDate(current.createdAt)}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <span className="text-gray-300">{journeyTopic(current)}</span>
                </div>
                <p className="mt-4 text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed line-clamp-3">{journeyOverview(current)}</p>

                <div className="flex items-center gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => vm.playJourney(current)}
                    className="flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-9 rounded-full bg-gold text-royal-purple-dark font-black tracking-wide hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(239,191,4,0.35)]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    Play
                  </button>
                  <button
                    type="button"
                    onClick={() => vm.openSeeMore(current)}
                    className="flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-white/10 border border-white/20 text-white font-bold tracking-wide hover:bg-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" d="M12 16v-4M12 8h.01" />
                    </svg>
                    See More
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-16 lg:pb-24">
            <h1 className="font-heading font-black uppercase tracking-tight text-white text-4xl sm:text-6xl lg:text-7xl max-w-3xl">
              The Library
            </h1>
            <p className="mt-4 text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed">
              {vm.isLoadingCatalog ? 'Loading sermons...' : vm.catalogError ?? 'No sermons have been published yet.'}
            </p>
          </div>
        )}

        {total > 1 && (
          <>
            <button type="button" onClick={goPrev} aria-label="Previous sermon" className="hidden sm:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 border border-white/10 text-white hover:bg-black/50 backdrop-blur-md transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button type="button" onClick={goNext} aria-label="Next sermon" className="hidden sm:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 border border-white/10 text-white hover:bg-black/50 backdrop-blur-md transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {vm.heroJourneys.map((journey, index) => (
                <button
                  key={journey.journeyId}
                  type="button"
                  aria-label={`Go to sermon ${index + 1}`}
                  onClick={() => goToIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-8 bg-gold' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ARCHIVE */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 lg:py-24">
        <div className="mb-10 text-center">
          <h2 className="font-heading font-black uppercase tracking-tight text-white text-3xl sm:text-4xl">
            The <span className="text-gold">Archive</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Every message we've preached, sorted by topic or grouped into the series it came from.
          </p>
        </div>

        {/* tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => vm.setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 ${
                  vm.activeTab === tab.id ? 'bg-gold text-royal-purple-dark' : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* search (sermons tab only) */}
        {vm.activeTab !== 'teachers' && (
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-xs" ref={categoryDropdownRef}>

              <svg className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={vm.searchQuery}
                onChange={(e) => vm.setSearchQuery(e.target.value)}
                placeholder="Search sermons by title..."
                className="w-full h-12 pl-12 pr-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold/60 transition-colors"
              />
            </div>
          </div>
        )}

        {/* category dropdown, searchable — built for a long list of topics (sermons + series tabs) */}
        {vm.activeTab === 'sermons' && (
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md">
              <button
                type="button"
                onClick={() => setCategoryOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between h-12 px-5 rounded-full border text-sm font-bold tracking-wide transition-colors duration-300 ${
                  vm.activeCategory ? 'bg-royal-purple-dark border-royal-purple-dark text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:border-gold/40'
                }`}
              >
                <span className="truncate">{vm.activeCategory ?? 'Filter by topic'}</span>
                <svg
                  className={`w-4 h-4 shrink-0 ml-2 transition-transform duration-300 ${categoryOpen ? 'rotate-180' : ''} ${vm.activeCategory ? 'text-white' : 'text-gray-500'}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {categoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-background-dark)] shadow-2xl"
                  >
                    <div className="border-b border-white/10 p-3">
                      <div className="relative">
                        <input
                          autoFocus
                          type="text"
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          placeholder="Search topics..."
                          className="w-full h-10 pl-4 pr-9 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/60 transition-colors"
                        />
                        <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <circle cx="11" cy="11" r="7" />
                          <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
                        </svg>
                      </div>
                    </div>

                    <div className="max-h-72 overflow-y-auto">
                      {vm.activeCategory && (
                        <button
                          type="button"
                          onClick={() => selectCategory(null)}
                          className="flex w-full items-center px-5 py-3 text-sm font-bold text-gold hover:bg-white/5 transition-colors"
                        >
                          Clear filter
                        </button>
                      )}

                      {filteredCategories.length === 0 ? (
                        <p className="px-5 py-6 text-center text-sm text-gray-500">No topics found.</p>
                      ) : (
                        filteredCategories.map((cat) => (
                          <button
                            key={cat.name}
                            type="button"
                            onClick={() => selectCategory(cat.name)}
                            className={`flex w-full items-center justify-between px-5 py-3 text-sm transition-colors hover:bg-white/5 ${
                              vm.activeCategory === cat.name ? 'text-gold' : 'text-gray-300'
                            }`}
                          >
                            <span>{cat.name}</span>
                            <span className="text-gray-600">{cat.count}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={vm.activeTab + vm.currentPage + (vm.activeCategory ?? '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {vm.activeTab === 'sermons' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {vm.showListSkeleton &&
                    [0, 1, 2, 3].map((i) => (
                      <div key={i} className="bg-white/5 rounded-2xl overflow-hidden flex flex-col animate-pulse">
                        <div className="h-72 sm:h-80 w-full bg-white/5" />
                        <div className="flex flex-col items-center py-4 px-4 gap-2">
                          <div className="h-4 w-2/3 rounded bg-white/10" />
                          <div className="h-3 w-1/3 rounded bg-white/10" />
                        </div>
                      </div>
                    ))}

                  {!vm.showListSkeleton && vm.listError && (
                    <div className="col-span-full text-center py-16">
                      <p className="text-gray-400">{vm.listError}</p>
                      <button
                        type="button"
                        onClick={vm.retry}
                        className="mt-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-gray-300 hover:bg-white/10 transition-colors"
                      >
                        Try again
                      </button>
                    </div>
                  )}

                  {!vm.showListSkeleton && !vm.listError && vm.pageItems.length === 0 && (
                    <div className="col-span-full text-center text-gray-400 py-16">
                      Nothing matches that search or topic yet.
                    </div>
                  )}

                  {!vm.showListSkeleton && !vm.listError && vm.pageItems.map((item) => {
                    const isHovered = hoveredCard === item.journeyId;
                    return (
                      <div key={item.journeyId} className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex flex-col cursor-pointer">
                        <div
                          onMouseEnter={() => setHoveredCard(item.journeyId)}
                          onMouseLeave={() => setHoveredCard(null)}
                          onClick={() => vm.openSeeMore(item)}
                          className="relative h-72 sm:h-80 bg-cover bg-center w-full overflow-hidden bg-royal-purple-dark"
                          style={item.thumbnailUrl ? { backgroundImage: `url(${item.thumbnailUrl})` } : undefined}
                        >
                          <span className="absolute top-3 left-3 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                            {journeyTopic(item)}
                          </span>
                          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <span className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-2'}`}>
                              See More
                              <svg className={`w-4 h-4 text-gold transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-center py-4 px-4 gap-1.5 bg-white z-10">
                          <h3 className="text-royal-purple-dark font-bold text-lg text-center">{item.title}</h3>
                          <p className="text-gray-500 text-xs">{messageCount(item.totalPublishedParts)} • {formatLongDate(item.createdAt)}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              vm.playJourney(item);
                            }}
                            className="mt-2 px-6 py-2 rounded-full bg-royal-purple-dark text-white text-xs font-bold tracking-wide hover:bg-royal-purple-light transition-colors duration-300"
                          >
                            Watch Now
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!vm.showListSkeleton && !vm.listError && vm.pageItems.length > 0 && (
                  <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
                    <button type="button" onClick={() => vm.goToPage(vm.currentPage - 1)} disabled={vm.currentPage === 1} aria-label="Previous page" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    {paginationRange.map((page, idx) =>
                      page === '...' ? (
                        <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
                      ) : (
                        <button
                          key={page}
                          type="button"
                          onClick={() => vm.goToPage(page as number)}
                          aria-label={`Go to page ${page}`}
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                            page === vm.currentPage ? 'bg-gold text-royal-purple-dark' : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button type="button" onClick={() => vm.goToPage(vm.currentPage + 1)} disabled={vm.currentPage === vm.totalPages} aria-label="Next page" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                )}
              </>
            )}

            {vm.activeTab === 'series' && (
              <div className="flex flex-col gap-4">
                {vm.isLoadingCatalog ? (
                  [0, 1, 2].map((i) => (
                    <div key={i} className="h-44 sm:h-40 rounded-2xl border border-white/10 bg-white/[0.03] animate-pulse" />
                  ))
                ) : vm.catalogError ? (
                  <p className="text-center text-gray-400 py-16">{vm.catalogError}</p>
                ) : vm.filteredSeries.length === 0 ? (
                  <p className="text-center text-gray-400 py-16">No series in this topic yet.</p>
                ) : (
                  vm.filteredSeries.map((series) => (
                    <button
                      key={series.journeyId}
                      type="button"
                      onClick={() => vm.openJourney(series)}
                      className="group flex flex-col sm:flex-row items-stretch gap-0 sm:gap-6 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden text-left hover:border-gold/40 transition-colors duration-300"
                    >
                      <div className="relative h-44 sm:h-auto sm:w-56 shrink-0 overflow-hidden">
                        {series.thumbnailUrl && (
                          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${series.thumbnailUrl})` }} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 sm:bg-gradient-to-r sm:from-transparent sm:via-transparent" />
                      </div>

                      <div className="flex flex-1 flex-col justify-center p-5 sm:py-6 sm:pr-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1">{journeyTopic(series)}</span>
                        <h3 className="font-heading font-black uppercase tracking-tight text-white text-xl sm:text-2xl">{series.title}</h3>
                        <p className="text-gray-400 text-sm mt-2 leading-relaxed max-w-lg line-clamp-3">{journeyOverview(series)}</p>
                        <span className="text-xs text-gray-500 mt-3">
                          {messageCount(series.totalPublishedParts)}
                        </span>
                      </div>

                      <div className="hidden sm:flex items-center pr-6">
                        <svg className="w-5 h-5 text-gray-500 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}

            {vm.activeTab === 'teachers' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEACHERS.map((teacher) => (
                  <div key={teacher.name} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden ring-2 ring-gold/60">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${teacher.image})` }} />
                    </div>
                    <div>
                      <h4 className="font-heading font-black uppercase tracking-tight text-white text-base">{teacher.name}</h4>
                      <p className="text-gold text-xs font-bold uppercase tracking-widest mt-0.5">{teacher.role}</p>
                      <p className="text-gray-400 text-xs mt-1">{teacher.sermonCount} messages</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SERIES MODAL */}
      <AnimatePresence>
        {vm.seriesTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={vm.closeSeries}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-background-dark)] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between p-6 sm:p-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{journeyTopic(vm.seriesTarget)}</span>
                  <h2 className="font-heading font-black uppercase tracking-tight text-white text-2xl sm:text-3xl mt-1">{vm.seriesTarget.title}</h2>
                  <p className="text-gray-400 text-sm mt-2 max-w-md line-clamp-4">{journeyOverview(vm.seriesTarget)}</p>
                </div>
                <button
                  type="button"
                  onClick={vm.closeSeries}
                  aria-label="Close"
                  className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="flex flex-col gap-2 px-6 sm:px-8 pb-8 min-h-32">
                {vm.isLoadingSeries &&
                  [0, 1].map((i) => (
                    <div key={i} className="h-20 rounded-xl border border-white/10 animate-pulse" />
                  ))}

                {!vm.isLoadingSeries && vm.seriesError && (
                  <p className="text-center text-sm text-gray-400 py-8">{vm.seriesError}</p>
                )}

                {!vm.isLoadingSeries && !vm.seriesError && vm.seriesDetail?.parts.length === 0 && (
                  <p className="text-center text-sm text-gray-500 py-8">No messages have been published in this series yet.</p>
                )}

                {!vm.isLoadingSeries && !vm.seriesError && vm.seriesDetail?.parts.map((part, i) => {
                  const image = partImage(part, vm.seriesDetail?.journey ?? null);
                  return (
                    <button
                      key={part.partId}
                      type="button"
                      onClick={() => vm.playPart(part)}
                      className="group flex items-center gap-4 rounded-xl border border-white/10 hover:border-gold/40 p-3 text-left transition-colors"
                    >
                      <span className="font-heading font-black text-gold/60 group-hover:text-gold text-lg w-6 text-center shrink-0">{i + 1}</span>
                      <div className="h-14 w-20 rounded-lg overflow-hidden shrink-0 bg-white/5">
                        {image && <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-bold truncate">{part.title}</h4>
                        <p className="text-gray-500 text-xs mt-0.5">{formatMonthYear(part.createdAt)} • {partLength(part)}</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-gold transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEE MORE MODAL */}
      <AnimatePresence>
        {vm.seeMoreJourney && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={vm.closeSeeMore}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-background-dark)] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden"
            >
              <div
                className="h-48 bg-cover bg-center relative bg-royal-purple-dark"
                style={vm.seeMoreJourney.thumbnailUrl ? { backgroundImage: `url(${vm.seeMoreJourney.thumbnailUrl})` } : undefined}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-dark)] to-transparent" />
                <button
                  type="button"
                  onClick={vm.closeSeeMore}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <h2 className="font-heading font-black uppercase tracking-tight text-white text-2xl sm:text-3xl">{vm.seeMoreJourney.title}</h2>
                <div className="flex items-center gap-3 mt-3 text-sm text-gray-300">
                  <span className="text-gold font-bold">{formatLongDate(vm.seeMoreJourney.createdAt)}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500" />
                  <span>{messageCount(vm.seeMoreJourney.totalPublishedParts)}</span>
                </div>

                <div className="mt-6">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Overview</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{journeyOverview(vm.seeMoreJourney)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const journey = vm.seeMoreJourney;
                    vm.closeSeeMore();
                    if (journey) vm.playJourney(journey);
                  }}
                  className="flex items-center justify-center gap-2 h-12 px-7 mt-7 rounded-full bg-gold text-royal-purple-dark font-black tracking-wide hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  Watch Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PLAYER */}
      <AnimatePresence>
        {vm.nowPlaying && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black">
            <button
              type="button"
              onClick={vm.closePlayer}
              aria-label="Back"
              className="absolute top-6 left-6 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 backdrop-blur-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>

            <div className="absolute inset-0">
              {embed?.kind === 'iframe' && (
                <iframe
                  className="w-full h-full"
                  src={embed.src}
                  title={vm.nowPlaying.part.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              {embed?.kind === 'image' && (
                <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${embed.src})` }} />
              )}
              {embed?.kind === 'audio' && (
                <div className="w-full h-full flex items-center justify-center px-6">
                  <audio controls src={embed.src} className="w-full max-w-xl" />
                </div>
              )}
            </div>

            {vm.playing && <div onClick={() => vm.setPlaying(false)} className="absolute inset-0 z-10 cursor-pointer" />}

            <AnimatePresence>
              {!vm.playing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 bg-black/60 flex items-center"
                >
                  <div className="max-w-xl px-6 sm:px-10 lg:px-16">
                    <h1 className="font-heading font-black uppercase tracking-tight text-white text-3xl sm:text-5xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                      {vm.nowPlaying.part.title}
                    </h1>
                    <div className="flex items-center gap-3 mt-4 text-sm sm:text-base font-medium text-gray-200">
                      <span className="text-gold font-bold">{vm.nowPlaying.journey.title}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-400" />
                      <span className="text-gray-300">{partLength(vm.nowPlaying.part) || formatLongDate(vm.nowPlaying.part.createdAt)}</span>
                    </div>
                    <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line line-clamp-6">
                      {vm.nowPlaying.part.readingText || journeyOverview(vm.nowPlaying.journey)}
                    </p>
                    {embed && (
                      <button
                        type="button"
                        onClick={() => vm.setPlaying(true)}
                        className="flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-9 mt-8 rounded-full bg-gold text-royal-purple-dark font-black tracking-wide hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(239,191,4,0.35)]"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        Play
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Library.displayName = 'Library';

export default Library;
