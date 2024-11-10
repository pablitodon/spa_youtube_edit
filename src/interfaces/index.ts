export interface ILoginResponse {
  token: string;
}

export interface Ilogin {
  email: string;
  password: string;
}

export interface DataForm {
  title: string;
  maxResults?: number | null;
  request: string;
  sortBy?: string | null;
  id?: number;
}

export interface IRespSearch {
  order?: string;
  maxResults?: number;
  query: string;
}

export interface IThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface IThumbnailMap {
  [key: string]: IThumbnail;
}

export interface ISnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnailMap;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface IVideoId {
  [key: string]: string;
}

export interface IYouTubeSearchResult {
  kind: string;
  etag: string;
  id: IVideoId;
  snippet: ISnippet;
  statistics: IStatisticsResponse;
}

export interface IStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount?: string;
  favoriteCount: string;
  commentCount: string;
}

export interface IStatisticsResponse {
  etag: string;
  id: string;
  kind: string;
  statistics: IStatistics;
}
