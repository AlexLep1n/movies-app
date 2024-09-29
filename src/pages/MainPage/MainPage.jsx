import classes from './MainPage.module.css';
import MoviesList from '../../components/blocks/MoviesList/MoviesList';
import { useState } from 'react';
import CustomInput from '../../components/ui/CustomInput/CustomInput';
import { Flex, Tabs } from 'antd';
import { GenresContext, PostDataContext } from '../../context';
import useMovies from '../../hooks/useMovies';
import useGenresAndSession from '../../hooks/useGenresAndSession';
import useRatings from '../../hooks/useRatings';

export default function MainPage() {
  const [inputData, setInputData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('Search');
  const [postData, setPostData] = useState({
    movieId: null,
    rating: 0,
  });

  const [movies, isLoading, error, searchTotalPages] = useMovies(inputData, currentPage);
  const [genres] = useGenresAndSession();
  const [ratedMovies, rateTotalPages] = useRatings(postData, currentPage, activeTab);

  return (
    <>
      <GenresContext.Provider value={{ genres }}>
        <PostDataContext.Provider
          value={{
            setPostData,
          }}
        >
          <div className={classes.container}>
            <Flex align="center" vertical="true">
              <Tabs
                onChange={(key) => setActiveTab(key)}
                activeKey={activeTab}
                destroyInactiveTabPane={true}
                items={[
                  {
                    key: 'Search',
                    label: 'Search',
                  },
                  {
                    key: 'Rated',
                    label: 'Rated',
                  },
                ]}
              />
              {activeTab === 'Search' && (
                <CustomInput
                  type="text"
                  placeholder="Type to search..."
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                />
              )}
              <MoviesList
                movies={activeTab === 'Search' ? movies : ratedMovies}
                isLoading={isLoading}
                error={error}
                currentPage={currentPage}
                setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
                totalPages={activeTab === 'Search' ? searchTotalPages : rateTotalPages}
              />
            </Flex>
          </div>
        </PostDataContext.Provider>
      </GenresContext.Provider>
    </>
  );
}
