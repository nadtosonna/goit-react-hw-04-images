import { useState, useEffect } from "react";
import { searchImages } from "shared/api/images";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { Loader } from "./components/Loader/Loader";
import { Notify } from 'notiflix';
import { Modal } from "./components/Modal/Modal";
import { LoadMoreButton } from "./components/Button/Button";
import { Section } from "./components/Section/Section";

export function App() {

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (query === '') return;

    async function fetchImages() {
      setIsLoading(true);
        try {
          const data = await searchImages(query, page);
          if (data.hits.length === 0) {
            Notify.failure('No images found!');
          } 
          setImages(images => [...images, ...data.hits]);
          setTotal(data.totalHits);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
    }
    fetchImages();
  }, [query, page])

  const onSearch = query => {
    setQuery(prevState => {
      if (prevState === query) return prevState;
      setPage(1);
      setImages([]);
      return query;
    });
  }
  
  const onLoadMore = () => {
    setPage((prevState) => prevState + 1);
  }

  const openModal = largeImageURL => {
    setModalOpen(true);
    setLargeImageURL(largeImageURL);
  }

  const closeModal = () => {
    setModalOpen(false);
    setLargeImageURL('');
  }

  const isImages = Boolean(images.length);

  return (
    <>
      <Searchbar onSubmit={onSearch} />
      {isLoading && <Loader />}
      {error && Notify.failure('Please try again later!')}
      <Section>
      {isImages && <ImageGallery images={images} onClick={openModal} />}
      {images.length > 0 && images.length < total && <LoadMoreButton onLoadMore={onLoadMore} />}
      {modalOpen && <Modal onClose={closeModal}> <img src={largeImageURL} alt="" /></Modal>}
      </Section>
    </>
  );
}

