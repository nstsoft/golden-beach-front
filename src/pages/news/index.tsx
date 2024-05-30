import './news.scss';
import { useNews } from 'hooks';
import { NewsItem } from 'src/components/elements/newsItem';

export const NewsPage = () => {
  const { news } = useNews();

  return (
    <div className="news-page">
      <div className="new-header-container">
        <div className="news-header">
          <h1>NEWS</h1>
        </div>
      </div>
      <div className="news-list">
        {news.map((newsItem) => (
          <NewsItem key={newsItem.id} newsItem={newsItem} />
        ))}
      </div>
    </div>
  );
};
