import css from './page.module.css';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: "https://page-not-found.com",
    images: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  }
};

const notFound = () => {
    return (
        <div>
          <h1 className={css.title}>404 - Page not found</h1>
          <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>
 );
}

export default notFound;