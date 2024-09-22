export interface IVideo {
  id: string;
    title: string;
    description: string;
    url: string;
    eventKey: string
  }

  export interface IVideos {
    videos: IVideo[]
  }