export interface IVideo {
    title: string;
    description: string;
    url: string;
    eventKey: string
  }

  export interface IVideos {
    videos: IVideo[]
  }