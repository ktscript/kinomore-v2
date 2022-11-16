export interface ISlide {
  id: number;
  title: string;
  image: string;
  rating: string;
  year: number;
  genre: string;
}

export interface SlideProps {
  item: ISlide;
}