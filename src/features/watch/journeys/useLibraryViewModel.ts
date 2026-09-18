import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { JourneyCategory, JourneyCategoryCount, JourneyDetail, JourneyPart, JourneySummary, NowPlaying } from './journeys.types';
import { JourneysService } from './journeys.service';

export type LibraryTab = 'sermons' | 'series' | 'teachers';

export const ITEMS_PER_PAGE = 8;
const CATALOG_LIMIT = 50;
const HERO_LIMIT = 5;
const MIN_SEARCH_LENGTH = 2;
const SKELETON_DELAY = 250;

const errorMessage = (err: unknown, fallback: string) => (err instanceof Error ? err.message : fallback);

export function useLibraryViewModel() {
  const [activeTab, setActiveTabState] = useState<LibraryTab>('sermons');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQueryState] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [categories, setCategories] = useState<JourneyCategory[]>([]);
  const [catalog, setCatalog] = useState<JourneySummary[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  const [pageJourneys, setPageJourneys] = useState<JourneySummary[]>([]);
  const [listTotalPages, setListTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState<JourneySummary[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [hasLoadedList, setHasLoadedList] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [seriesTarget, setSeriesTarget] = useState<JourneySummary | null>(null);
  const [seriesDetail, setSeriesDetail] = useState<JourneyDetail | null>(null);
  const [isLoadingSeries, setIsLoadingSeries] = useState(false);
  const [seriesError, setSeriesError] = useState<string | null>(null);

  const [seeMoreJourney, setSeeMoreJourney] = useState<JourneySummary | null>(null);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [playing, setPlaying] = useState(false);

  const detailCache = useRef(new Map<string, JourneyDetail>());
  const seriesRequest = useRef<string | null>(null);
  const skeletonTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadCatalog = useCallback(async () => {
    setIsLoadingCatalog(true);
    setCatalogError(null);
    try {
      const [categoryList, catalogPage] = await Promise.all([
        JourneysService.fetchCategories(),
        JourneysService.fetchJourneys({ page: 1, limit: CATALOG_LIMIT }),
      ]);
      setCategories(categoryList);
      setCatalog(catalogPage.journeys);
    } catch (err) {
      setCatalogError(errorMessage(err, 'Failed to load sermons'));
    } finally {
      setIsLoadingCatalog(false);
    }
  }, []);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const isSearching = debouncedSearch.length >= MIN_SEARCH_LENGTH;

  useEffect(() => {
    if (isSearching) return;
    let cancelled = false;
    setIsLoadingList(true);
    setListError(null);
    JourneysService.fetchJourneys({ page: currentPage, limit: ITEMS_PER_PAGE, category: activeCategory })
      .then((result) => {
        if (cancelled) return;
        setPageJourneys(result.journeys);
        setListTotalPages(result.totalPages);
      })
      .catch((err) => {
        if (!cancelled) setListError(errorMessage(err, 'Failed to load sermons'));
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoadingList(false);
        setHasLoadedList(true);
      });
    return () => {
      cancelled = true;
    };
  }, [isSearching, currentPage, activeCategory, reloadKey]);

  useEffect(() => {
    if (!isSearching) return;
    let cancelled = false;
    setIsLoadingList(true);
    setListError(null);
    JourneysService.searchJourneys(debouncedSearch)
      .then((results) => {
        if (!cancelled) setSearchResults(results);
      })
      .catch((err) => {
        if (!cancelled) setListError(errorMessage(err, 'Failed to search sermons'));
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoadingList(false);
        setHasLoadedList(true);
      });
    return () => {
      cancelled = true;
    };
  }, [isSearching, debouncedSearch, reloadKey]);

  const filteredSearchResults = useMemo(
    () => (activeCategory ? searchResults.filter((j) => j.categories.includes(activeCategory)) : searchResults),
    [searchResults, activeCategory],
  );

  const totalPages = isSearching
    ? Math.max(1, Math.ceil(filteredSearchResults.length / ITEMS_PER_PAGE))
    : listTotalPages;

  const pageItems = isSearching
    ? filteredSearchResults.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : pageJourneys;

  const heroJourneys = useMemo(() => catalog.slice(0, HERO_LIMIT), [catalog]);

  const filteredSeries = useMemo(
    () => (activeCategory ? catalog.filter((j) => j.categories.includes(activeCategory)) : catalog),
    [catalog, activeCategory],
  );

  const categoryCounts = useMemo<JourneyCategoryCount[]>(
    () => categories.map((c) => ({ name: c.name, count: catalog.filter((j) => j.categories.includes(c.name)).length })),
    [categories, catalog],
  );

  const setActiveTab = (tab: LibraryTab) => {
    setActiveTabState(tab);
    setCurrentPage(1);
  };

  const setSearchQuery = (value: string) => {
    setSearchQueryState(value);
    setCurrentPage(1);
  };

  const selectCategory = (name: string | null) => {
    setActiveCategory(name);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => setCurrentPage(Math.max(1, Math.min(totalPages, page)));

  const retry = () => {
    detailCache.current.clear();
    setReloadKey((key) => key + 1);
    loadCatalog();
  };

  const clearSkeletonTimer = () => {
    if (skeletonTimer.current) clearTimeout(skeletonTimer.current);
    skeletonTimer.current = null;
  };

  useEffect(() => clearSkeletonTimer, []);

  const closeSeries = () => {
    clearSkeletonTimer();
    seriesRequest.current = null;
    setSeriesTarget(null);
    setSeriesDetail(null);
    setSeriesError(null);
    setIsLoadingSeries(false);
  };

  const loadDetail = async (journey: JourneySummary, showSeriesModal: boolean): Promise<JourneyDetail | null> => {
    const cached = detailCache.current.get(journey.journeyId);
    if (cached) return cached;

    clearSkeletonTimer();
    seriesRequest.current = journey.journeyId;
    setSeriesDetail(null);
    setSeriesError(null);
    setIsLoadingSeries(false);

    if (showSeriesModal && journey.totalPublishedParts !== 1) {
      setSeriesTarget(journey);
      skeletonTimer.current = setTimeout(() => setIsLoadingSeries(true), SKELETON_DELAY);
    }

    try {
      const detail = await JourneysService.fetchJourneyDetail(journey.journeyId);
      detailCache.current.set(journey.journeyId, detail);
      if (seriesRequest.current !== journey.journeyId) return null;
      clearSkeletonTimer();
      setIsLoadingSeries(false);
      return detail;
    } catch (err) {
      if (seriesRequest.current !== journey.journeyId) return null;
      clearSkeletonTimer();
      setIsLoadingSeries(false);
      if (showSeriesModal) {
        setSeriesTarget(journey);
        setSeriesError(errorMessage(err, 'Failed to load this series'));
      }
      return null;
    }
  };

  const openPlayer = (journey: JourneySummary, part: JourneyPart) => {
    setNowPlaying({ journey, part });
    setPlaying(false);
  };

  const openJourney = async (journey: JourneySummary) => {
    const detail = await loadDetail(journey, true);
    if (!detail) return;
    if (detail.parts.length === 1) {
      closeSeries();
      openPlayer(detail.journey, detail.parts[0]);
      return;
    }
    setSeriesTarget(journey);
    setSeriesDetail(detail);
  };

  const playJourney = async (journey: JourneySummary) => {
    const detail = await loadDetail(journey, false);
    if (!detail) return;
    if (detail.parts.length === 0) {
      setSeriesTarget(journey);
      setSeriesDetail(detail);
      return;
    }
    openPlayer(detail.journey, detail.parts[0]);
  };

  const playPart = (part: JourneyPart) => {
    const journey = seriesDetail?.journey ?? seriesTarget;
    if (!journey) return;
    closeSeries();
    openPlayer(journey, part);
  };

  const closePlayer = () => {
    setNowPlaying(null);
    setPlaying(false);
  };

  return {
    activeTab,
    setActiveTab,
    currentPage,
    totalPages,
    goToPage,
    activeCategory,
    selectCategory,
    categoryCounts,
    searchQuery,
    setSearchQuery,
    heroJourneys,
    isLoadingCatalog,
    catalogError,
    pageItems,
    isLoadingList,
    showListSkeleton: isLoadingList && !hasLoadedList,
    listError,
    filteredSeries,
    retry,
    seriesTarget,
    seriesDetail,
    isLoadingSeries,
    seriesError,
    openJourney,
    playJourney,
    closeSeries,
    playPart,
    seeMoreJourney,
    openSeeMore: setSeeMoreJourney,
    closeSeeMore: () => setSeeMoreJourney(null),
    nowPlaying,
    playing,
    setPlaying,
    closePlayer,
  };
}
