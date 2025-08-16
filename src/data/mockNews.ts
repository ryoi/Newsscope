import { NewsArticle, TimelineEvent } from '../types';

export const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Global Climate Summit Reaches Historic Agreement on Carbon Emissions',
    content: 'World leaders from 195 countries have reached a groundbreaking agreement at the Global Climate Summit, setting ambitious targets for carbon emission reductions over the next decade. The agreement includes specific commitments from major industrial nations and funding mechanisms for developing countries to transition to renewable energy.',
    excerpt: 'Historic climate agreement sets ambitious carbon reduction targets for the next decade.',
    source: 'Environmental Weekly',
    author: 'Dr. Sarah Chen',
    publishedAt: '2025-01-15T10:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg',
    category: 'Environment',
    tags: ['climate', 'environment', 'politics', 'international'],
    politicalBias: {
      orientation: 'center-left',
      confidence: 0.75,
      reasoning: 'Author has history of environmental advocacy, publication leans slightly progressive on climate issues'
    },
    credibilityScore: 0.92,
    factCheckStatus: {
      status: 'verified',
      confidence: 0.95,
      summary: 'Claims verified through official summit documents and multiple independent sources',
      sources: ['UN Climate Summit Official Documents', 'Reuters', 'Associated Press']
    },
    readTime: 8,
    url: 'https://example.com/climate-summit-agreement'
  },
  {
    id: '2',
    title: 'Tech Giants Report Record Quarterly Earnings Despite Economic Uncertainty',
    content: 'Major technology companies have announced record-breaking quarterly earnings, defying economist predictions of a sector slowdown. Apple, Microsoft, and Google parent Alphabet all exceeded analyst expectations, driven by strong demand for AI services and cloud computing solutions.',
    excerpt: 'Tech sector shows resilience with record earnings amid economic headwinds.',
    source: 'Business Herald',
    author: 'Michael Rodriguez',
    publishedAt: '2025-01-15T08:15:00Z',
    imageUrl: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg',
    category: 'Business',
    tags: ['technology', 'business', 'economy', 'earnings'],
    politicalBias: {
      orientation: 'center-right',
      confidence: 0.68,
      reasoning: 'Publication historically favors business-friendly reporting, author known for pro-market stance'
    },
    credibilityScore: 0.88,
    factCheckStatus: {
      status: 'verified',
      confidence: 0.91,
      summary: 'Earnings figures confirmed through official company filings and SEC documents',
      sources: ['SEC Filings', 'Company Press Releases', 'Financial Times']
    },
    readTime: 5,
    url: 'https://example.com/tech-earnings-record'
  },
  {
    id: '3',
    title: 'New Healthcare Reform Bill Faces Bipartisan Opposition',
    content: 'The proposed healthcare reform legislation has encountered unexpected resistance from both sides of the political aisle. Progressive lawmakers argue the bill doesn\'t go far enough in expanding coverage, while conservative members cite concerns about fiscal responsibility and government overreach.',
    excerpt: 'Healthcare reform faces challenges from unexpected bipartisan opposition.',
    source: 'Political Wire',
    author: 'Jennifer Walsh',
    publishedAt: '2025-01-14T16:45:00Z',
    imageUrl: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg',
    category: 'Politics',
    tags: ['healthcare', 'politics', 'reform', 'bipartisan'],
    politicalBias: {
      orientation: 'center',
      confidence: 0.82,
      reasoning: 'Balanced reporting presenting both progressive and conservative viewpoints equally'
    },
    credibilityScore: 0.85,
    factCheckStatus: {
      status: 'partially-verified',
      confidence: 0.78,
      summary: 'Opposition claims verified, but some details about specific provisions need further verification',
      sources: ['Congressional Records', 'Politico', 'The Hill']
    },
    readTime: 6,
    url: 'https://example.com/healthcare-reform-opposition'
  },
  {
    id: '4',
    title: 'Revolutionary Gene Therapy Shows Promise in Cancer Treatment Trials',
    content: 'A groundbreaking gene therapy developed by researchers at Johns Hopkins University has shown remarkable success in early-stage clinical trials for treating aggressive forms of cancer. The treatment has achieved a 78% success rate in preliminary studies, offering new hope for patients with previously untreatable conditions.',
    excerpt: 'New gene therapy achieves 78% success rate in cancer treatment trials.',
    source: 'Medical Journal Today',
    author: 'Dr. Amanda Foster',
    publishedAt: '2025-01-14T12:20:00Z',
    imageUrl: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg',
    category: 'Health',
    tags: ['health', 'science', 'medical', 'breakthrough'],
    politicalBias: {
      orientation: 'center',
      confidence: 0.9,
      reasoning: 'Scientific reporting with no apparent political agenda, focuses on medical facts'
    },
    credibilityScore: 0.94,
    factCheckStatus: {
      status: 'verified',
      confidence: 0.96,
      summary: 'Clinical trial results confirmed through peer-reviewed publications and institutional sources',
      sources: ['Nature Medicine', 'Johns Hopkins Press Release', 'FDA Clinical Trials Database']
    },
    readTime: 7,
    url: 'https://example.com/gene-therapy-breakthrough'
  },
  {
    id: '5',
    title: 'Border Security Measures Spark Heated Congressional Debate',
    content: 'The House of Representatives engaged in a contentious 12-hour debate over proposed border security measures, with Democrats arguing the legislation is too restrictive while Republicans claim current policies are insufficient to address ongoing security concerns.',
    excerpt: 'Congressional debate intensifies over border security legislation.',
    source: 'Capitol Report',
    author: 'Thomas Jackson',
    publishedAt: '2025-01-13T20:10:00Z',
    imageUrl: 'https://images.pexels.com/photos/8353782/pexels-photo-8353782.jpeg',
    category: 'Politics',
    tags: ['immigration', 'politics', 'congress', 'security'],
    politicalBias: {
      orientation: 'right',
      confidence: 0.73,
      reasoning: 'Author and publication history shows conservative perspective on immigration issues'
    },
    credibilityScore: 0.79,
    factCheckStatus: {
      status: 'partially-verified',
      confidence: 0.72,
      summary: 'Debate details accurate, but some characterizations of opposing positions may be biased',
      sources: ['C-SPAN Records', 'Congressional Transcript', 'Multiple News Outlets']
    },
    readTime: 4,
    url: 'https://example.com/border-security-debate'
  }
];

export const mockTimeline: TimelineEvent[] = [
  {
    id: 't1',
    date: '2025-01-15',
    title: 'Climate Summit Concludes with Agreement',
    summary: 'International climate summit reaches historic consensus on emission targets',
    articles: [mockArticles[0]],
    significance: 'high'
  },
  {
    id: 't2',
    date: '2025-01-14',
    title: 'Healthcare Reform Debate Intensifies',
    summary: 'Bipartisan opposition emerges to proposed healthcare legislation',
    articles: [mockArticles[2]],
    significance: 'medium'
  },
  {
    id: 't3',
    date: '2025-01-13',
    title: 'Border Security Congressional Session',
    summary: 'Extended House debate on border security measures',
    articles: [mockArticles[4]],
    significance: 'medium'
  }
];