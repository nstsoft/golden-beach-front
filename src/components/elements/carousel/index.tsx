import './carousel.scss';
import Carousel, { type CarouselProps } from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { FC } from 'react';

type Props = { children?: React.ReactNode[]; clasName?: string };

function Item({ node }: { node: React.ReactNode }) {
  return <Paper>{node}</Paper>;
}

export const CustomCarousel: FC<Props & CarouselProps> = ({ children, ...props }) => {
  return (
    <Carousel {...props} className={`custom_carousel ${isMobile ? 'mobile' : ''}`}>
      {children?.map((item, i) => <Item key={i} node={item} />)}
    </Carousel>
  );
};
